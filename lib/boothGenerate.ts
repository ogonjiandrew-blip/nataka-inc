import { put, list } from "@vercel/blob";
import { moveJob, type Job } from "./boothQueue";

/**
 * Generation — Higgsfield for both halves, no machine required.
 *
 * Everything runs on one provider, one key and one prepaid balance. Google is
 * gone: it needed its own billing account, its own key, and Veo cost roughly
 * five times per clip what Higgsfield does.
 *
 * The design point that removes the need for a laptop: every Higgsfield call
 * is asynchronous. Submitting returns a status URL in about a second and the
 * render continues on their side whether or not anyone is connected. So no
 * request here ever waits for a render — a job moves one step per request,
 * driven by whichever screen polls next, and if every screen is closed the
 * work still finishes and the next person to look collects it.
 *
 * Three steps, each of them quick:
 *   1. submit the still           → store its status URL
 *   2. collect it, submit the video → store the video's status URL
 *   3. collect the video          → done
 */

const HF = "https://platform.higgsfield.ai";

function auth() {
  const id = process.env.HIGGSFIELD_API_KEY_ID;
  const secret = process.env.HIGGSFIELD_API_KEY_SECRET;
  return id && secret ? `Key ${id}:${secret}` : null;
}

export function generationReady() {
  return !!auth();
}
/** Kept separate so Booth Control can report the two halves independently. */
export function videoReady() {
  return !!auth();
}

const IMAGE_MODEL = process.env.HIGGSFIELD_IMAGE_MODEL || "higgsfield-ai/soul/reference";
const VIDEO_MODEL = process.env.HIGGSFIELD_VIDEO_MODEL || "higgsfield-ai/dop/standard";

/** A claim stops two concurrent requests submitting the same job twice. */
const CLAIM_MS = 90_000;
function claimed(job: Job) {
  const at = job.claimedAt ? new Date(job.claimedAt).getTime() : 0;
  return Date.now() - at < CLAIM_MS;
}

async function submit(modelPath: string, body: Record<string, unknown>): Promise<string> {
  const a = auth();
  if (!a) throw new Error("Higgsfield API key not configured");

  const res = await fetch(`${HF}/${modelPath}`, {
    method: "POST",
    headers: { Authorization: a, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${modelPath} ${res.status}: ${JSON.stringify(j).slice(0, 160)}`);

  // Their docs are explicit: use the returned URL rather than building one.
  const statusUrl =
    j.status_url || (j.request_id ? `${HF}/requests/${j.request_id}/status` : null);
  if (!statusUrl) throw new Error(`no status url: ${JSON.stringify(j).slice(0, 160)}`);
  return statusUrl as string;
}

/**
 * Check a submitted job. Returns the finished file's bytes, or null while it
 * is still running. Throws on the terminal failures worth telling someone
 * about.
 */
async function collect(statusUrl: string): Promise<Buffer | null> {
  const a = auth();
  if (!a) throw new Error("Higgsfield API key not configured");

  const res = await fetch(statusUrl, { headers: { Authorization: a } });
  const j = await res.json().catch(() => ({}));
  const status = String(j.status || "").toLowerCase();

  if (status === "failed" || status === "canceled") throw new Error(`Higgsfield returned ${status}`);
  if (status === "nsfw") throw new Error("blocked by content moderation");
  if (status !== "completed") return null;

  const url =
    j.video?.url ||
    j.image?.url ||
    j.result?.url ||
    j.output?.url ||
    (Array.isArray(j.images) ? j.images[0]?.url : null) ||
    (Array.isArray(j.results) ? j.results[0]?.url : null);
  if (!url) throw new Error(`completed but no output url: ${JSON.stringify(j).slice(0, 200)}`);

  const dl = await fetch(url);
  if (!dl.ok) throw new Error(`download ${dl.status}`);
  return Buffer.from(await dl.arrayBuffer());
}

async function store(id: string, kind: "still" | "video", bytes: Buffer) {
  const blob = await put(`deliver/${id}.${kind === "still" ? "jpg" : "mp4"}`, bytes, {
    access: "public",
    contentType: kind === "still" ? "image/jpeg" : "video/mp4",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return blob.url;
}

/** The customer's phone photo, as a public URL Higgsfield can pull. */
async function photoUrl(code: string | null): Promise<string | null> {
  if (!code) return null;
  try {
    const { blobs } = await list({ prefix: `booth/${code}` });
    return blobs.length ? blobs[0].url : null;
  } catch {
    return null;
  }
}

/**
 * Move a job forward by one step. Safe to call from any request, as often as
 * you like.
 */
export async function advance(job: Job): Promise<Job> {
  if (!generationReady()) return job;
  if (job.status !== "approved" && job.status !== "working") return job;

  // ---- step 3: the video is rendering — is it ready? ----
  if (job.videoOp && !job.videoUrl) {
    try {
      const bytes = await collect(job.videoOp);
      if (!bytes) return job;
      const url = await store(job.id, "video", bytes);
      return (await moveJob(job.id, "done", { videoUrl: url })) || job;
    } catch (e) {
      // The picture already landed, so close the job rather than lose it.
      return (
        (await moveJob(job.id, "done", {
          note: `Video didn't finish (${String(e).slice(0, 90)}). Your picture is above.`,
        })) || job
      );
    }
  }

  // ---- step 2: the still is rendering — collect it and start the video ----
  if (job.stillOp && !job.stillUrl) {
    try {
      const bytes = await collect(job.stillOp);
      if (!bytes) return job;
      const url = await store(job.id, "still", bytes);

      if (job.format === "photo") {
        return (await moveJob(job.id, "done", { stillUrl: url, claimedAt: null })) || job;
      }
      // Higgsfield pulls the frame from the public URL we just wrote, so
      // nothing is re-encoded or re-uploaded between the two stages.
      const videoOp = await submit(VIDEO_MODEL, {
        image_url: url,
        prompt: job.motionPrompt || job.prompt,
      });
      return (
        (await moveJob(job.id, "working", { stillUrl: url, videoOp, claimedAt: null })) || job
      );
    } catch (e) {
      return (
        (await moveJob(job.id, "approved", {
          stillOp: null,
          claimedAt: null,
          note: `Generation failed: ${String(e).slice(0, 120)}`,
        })) || job
      );
    }
  }

  if (claimed(job)) return job;

  // ---- step 1: nothing submitted yet — start the still ----
  if (!job.stillUrl && !job.stillOp) {
    const stamped = await moveJob(job.id, "working", { claimedAt: new Date().toISOString() });
    if (!stamped) return job;
    try {
      const ref = await photoUrl(stamped.photoCode);
      const body: Record<string, unknown> = {
        prompt: stamped.prompt,
        aspect_ratio: "3:4",
      };
      // Without a reference the model still makes the world, it just will not
      // be them — the booth camera covers that case.
      if (ref) body.image_reference_url = ref;

      const stillOp = await submit(IMAGE_MODEL, body);
      return (await moveJob(job.id, "working", { stillOp, claimedAt: null })) || stamped;
    } catch (e) {
      return (
        (await moveJob(job.id, "approved", {
          claimedAt: null,
          note: `Could not start: ${String(e).slice(0, 120)}`,
        })) || stamped
      );
    }
  }

  return job;
}
