import { put } from "@vercel/blob";
import { moveJob, type Job } from "./boothQueue";

/**
 * Serverless generation — no booth laptop required.
 *
 * The trick that makes this possible on Vercel: neither half of the work needs
 * a long-lived process.
 *
 *   still  — one synchronous call, about 25-30s, which fits inside a 60s
 *            function.
 *   video  — Veo is a long-running operation. Submitting returns an operation
 *            name in a second or two; the render continues on Google's side
 *            whether or not anyone is connected. We just store the name and
 *            check it on later requests.
 *
 * So nothing here ever waits for a render. The job is advanced a step at a
 * time by whichever request happens to arrive next — the customer's page
 * polling for their picture, or Booth Control polling its queue. Both call
 * `advance()`, both are safe to call at once, and if every screen is closed
 * the render still completes at Google and gets collected the next time
 * anyone looks.
 */

const API = "https://generativelanguage.googleapis.com/v1beta";

function key() {
  return process.env.GOOGLE_API_KEY || "";
}

export function generationReady() {
  return !!key();
}

/**
 * Guard against two requests generating the same job twice. Whoever claims it
 * writes a timestamp; anyone arriving inside the window leaves it alone. The
 * window has to outlast a still (~30s) but expire fast enough that a crashed
 * attempt retries rather than wedging the job forever.
 */
const CLAIM_MS = 100_000;
function claimed(job: Job) {
  const at = job.claimedAt ? new Date(job.claimedAt).getTime() : 0;
  return Date.now() - at < CLAIM_MS;
}

async function storeResult(id: string, kind: "still" | "video", bytes: Buffer) {
  const ext = kind === "still" ? "jpg" : "mp4";
  const blob = await put(`deliver/${id}.${ext}`, bytes, {
    access: "public",
    contentType: kind === "still" ? "image/jpeg" : "video/mp4",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return blob.url;
}

/** The customer's photo, if they took one. Returns base64 + mime. */
async function loadPhoto(photoCode: string | null) {
  if (!photoCode) return null;
  try {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: `booth/${photoCode}` });
    if (!blobs.length) return null;
    const res = await fetch(blobs[0].url);
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer()).toString("base64");
  } catch {
    return null;
  }
}

async function generateStill(job: Job): Promise<Buffer> {
  const photo = await loadPhoto(job.photoCode);
  const parts: unknown[] = [{ text: job.prompt }];
  if (photo) parts.push({ inline_data: { mime_type: "image/jpeg", data: photo } });

  const model = process.env.BOOTH_IMAGE_MODEL || "gemini-3-pro-image-preview";
  const res = await fetch(`${API}/models/${model}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key() },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: { responseModalities: ["IMAGE"] },
    }),
  });
  const j = await res.json();
  if (!res.ok) throw new Error(`image ${res.status}: ${JSON.stringify(j).slice(0, 160)}`);
  const found = (j?.candidates?.[0]?.content?.parts || []).find(
    (p: Record<string, unknown>) => p.inline_data || p.inlineData
  );
  if (!found) throw new Error("no image returned");
  const d = (found.inline_data || found.inlineData) as { data: string };
  return Buffer.from(d.data, "base64");
}

/* ------------------------------------------------------------- video --------
   Video runs on Higgsfield, not Google. Veo 3.1 Fast is about KES 95 a clip
   and standard is KES 310; Higgsfield is roughly KES 20 for the same six
   seconds, and those credits are already bought. Over a festival that is the
   difference between video being a loss-leader and being the margin.

   Higgsfield is asynchronous in the same way Veo is — submit, get a status
   URL, poll it — so nothing here has to wait either, and the no-machine
   design is unchanged.

   It also takes its input image as a public URL rather than base64, and our
   still is already sitting in Blob at a public URL. So the still we just made
   is handed straight over with nothing re-encoded or re-uploaded. */

function hfAuth() {
  const id = process.env.HIGGSFIELD_API_KEY_ID;
  const secret = process.env.HIGGSFIELD_API_KEY_SECRET;
  return id && secret ? `Key ${id}:${secret}` : null;
}

export function videoReady() {
  return !!hfAuth();
}

/** Submit the video. Returns the status URL to poll; does not wait. */
async function submitVideo(job: Job, stillUrl: string): Promise<string> {
  const auth = hfAuth();
  if (!auth) throw new Error("Higgsfield API key not configured");

  const model = process.env.HIGGSFIELD_VIDEO_MODEL || "higgsfield-ai/dop/standard";
  const res = await fetch(`https://platform.higgsfield.ai/${model}`, {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      image_url: stillUrl,
      prompt: job.motionPrompt || job.prompt,
    }),
  });
  const j = await res.json();
  if (!res.ok) throw new Error(`video submit ${res.status}: ${JSON.stringify(j).slice(0, 160)}`);

  // Their docs are explicit: use the returned URL, never build it yourself.
  const statusUrl =
    j.status_url ||
    (j.request_id ? `https://platform.higgsfield.ai/requests/${j.request_id}/status` : null);
  if (!statusUrl) throw new Error(`no status url: ${JSON.stringify(j).slice(0, 160)}`);
  return statusUrl as string;
}

/** Check a submitted video. Returns bytes when finished, null while running. */
async function collectVideo(statusUrl: string): Promise<Buffer | null> {
  const auth = hfAuth();
  if (!auth) throw new Error("Higgsfield API key not configured");

  const res = await fetch(statusUrl, { headers: { Authorization: auth } });
  const j = await res.json();
  const status = String(j.status || "").toLowerCase();

  if (status === "failed" || status === "canceled") {
    throw new Error(`Higgsfield returned ${status}`);
  }
  if (status === "nsfw") {
    // Their moderation, not a fault the customer can fix by waiting.
    throw new Error("the render was blocked by content moderation");
  }
  if (status !== "completed") return null;

  const url = j.video?.url || j.result?.url || j.output?.url;
  if (!url) throw new Error(`completed but no video url: ${JSON.stringify(j).slice(0, 160)}`);

  const dl = await fetch(url);
  if (!dl.ok) throw new Error(`video download ${dl.status}`);
  return Buffer.from(await dl.arrayBuffer());
}

/**
 * Move a job forward by one step. Safe to call from any request, as often as
 * you like. Returns the job as it now stands.
 */
export async function advance(job: Job): Promise<Job> {
  if (!generationReady()) return job;
  if (job.status !== "approved" && job.status !== "working") return job;

  // Step 3: a video is already rendering at Google — see if it is ready.
  if (job.videoOp && !job.videoUrl) {
    try {
      const bytes = await collectVideo(job.videoOp);
      if (!bytes) return job; // still rendering, nothing to do
      const url = await storeResult(job.id, "video", bytes);
      return (await moveJob(job.id, "done", { videoUrl: url })) || job;
    } catch (e) {
      return (
        (await moveJob(job.id, "done", {
          note: `Video didn't finish: ${String(e).slice(0, 120)}. Your picture is above.`,
        })) || job
      );
    }
  }

  if (claimed(job)) return job;

  // Step 1: the still.
  if (!job.stillUrl) {
    const stamped = await moveJob(job.id, "working", { claimedAt: new Date().toISOString() });
    if (!stamped) return job;
    try {
      const bytes = await generateStill(stamped);
      const url = await storeResult(job.id, "still", bytes);

      if (stamped.format === "photo") {
        return (await moveJob(job.id, "done", { stillUrl: url, claimedAt: null })) || stamped;
      }
      if (!videoReady()) {
        // Photo still delivered; only the video half is unavailable.
        return (
          (await moveJob(job.id, "done", {
            stillUrl: url,
            claimedAt: null,
            note: "Video is unavailable right now — your picture is above.",
          })) || stamped
        );
      }
      // Hand the finished frame straight over. Higgsfield pulls it from the
      // public Blob URL we just wrote, so nothing is re-uploaded.
      const statusUrl = await submitVideo(stamped, url);
      return (
        (await moveJob(job.id, "working", {
          stillUrl: url,
          videoOp: statusUrl,
          claimedAt: null,
        })) || stamped
      );
    } catch (e) {
      return (
        (await moveJob(job.id, "approved", {
          claimedAt: null,
          note: `Generation failed: ${String(e).slice(0, 140)}`,
        })) || stamped
      );
    }
  }

  return job;
}
