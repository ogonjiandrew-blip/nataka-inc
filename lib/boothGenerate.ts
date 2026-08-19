import { put, list } from "@vercel/blob";
import { moveJob, readJob, type Job } from "./boothQueue";

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
const GOOGLE = "https://generativelanguage.googleapis.com/v1beta";

function auth() {
  const id = process.env.HIGGSFIELD_API_KEY_ID;
  const secret = process.env.HIGGSFIELD_API_KEY_SECRET;
  return id && secret ? `Key ${id}:${secret}` : null;
}

function googleKey() {
  return process.env.GOOGLE_API_KEY || "";
}

/**
 * The photo is the product: it has to be THEM. Only Google can do that.
 *
 * Higgsfield's public API has no identity-preserving image model — Soul
 * Reference treats the input as a STYLE reference and returns a stranger,
 * Soul Character needs a per-person trained model, and neither is usable at a
 * booth. The model behind every card approved this week, nano_banana_pro, is
 * Google's Gemini image model resold; going direct is the same model without
 * the middleman.
 *
 * Video stays on Higgsfield: animating an existing frame needs no identity
 * work, and dop is roughly a fifth of Veo's price.
 */
export function generationReady() {
  return !!googleKey();
}
export function videoReady() {
  return !!auth();
}

const IMAGE_MODEL = process.env.BOOTH_IMAGE_MODEL || "gemini-3-pro-image-preview";
const VIDEO_MODEL = process.env.HIGGSFIELD_VIDEO_MODEL || "higgsfield-ai/dop/standard";

/** A claim stops two concurrent requests submitting the same job twice. */
const CLAIM_MS = 120_000;
function claimed(job: Job) {
  const at = job.claimedAt ? new Date(job.claimedAt).getTime() : 0;
  return Date.now() - at < CLAIM_MS;
}

/**
 * Higgsfield allows four concurrent requests per account. That is a real
 * ceiling on a busy booth, and it is transient rather than a fault — the job
 * simply has to wait its turn. Treating it as an error would show a paying
 * customer a scary message about a queue position they cannot influence.
 */
function isTransient(message: string) {
  return /concurrent request|rate.?limit|429|too many/i.test(message);
}

/**
 * Take the claim, then read it back and check ours is the one that stuck.
 *
 * Blob is not a database with transactions: two requests can both read a job
 * with no claim, both write one, and both submit. That is exactly how four
 * concurrent renders got fired for a single customer. Reading back after
 * writing is a cheap compare-and-set — whoever's timestamp survives owns the
 * job, and the loser backs off instead of spending another generation.
 */
async function takeClaim(job: Job): Promise<Job | null> {
  const mine = new Date().toISOString();
  const stamped = await moveJob(job.id, "working", { claimedAt: mine, note: null });
  if (!stamped) return null;
  const check = await readJob(job.id);
  if (!check || check.claimedAt !== mine) return null;
  return check;
}

/**
 * The anime frame, on Google. Synchronous, ~30s, and it holds the customer's
 * face — which is the entire product. Vercel Pro allows 300s functions, so
 * this comfortably completes inside one request.
 */
async function generateStill(job: Job, refUrl: string | null): Promise<Buffer> {
  const key = googleKey();
  if (!key) throw new Error("GOOGLE_API_KEY not configured");

  const parts: unknown[] = [{ text: job.prompt }];
  if (refUrl) {
    const img = await fetch(refUrl);
    if (img.ok) {
      const b64 = Buffer.from(await img.arrayBuffer()).toString("base64");
      parts.push({ inline_data: { mime_type: "image/jpeg", data: b64 } });
    }
  }

  const res = await fetch(`${GOOGLE}/models/${IMAGE_MODEL}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: { responseModalities: ["IMAGE"] },
    }),
  });
  const j = await res.json();
  if (!res.ok) throw new Error(`image ${res.status}: ${JSON.stringify(j).slice(0, 200)}`);

  const found = (j?.candidates?.[0]?.content?.parts || []).find(
    (p: Record<string, unknown>) => p.inline_data || p.inlineData
  );
  if (!found) throw new Error(`no image returned: ${JSON.stringify(j).slice(0, 200)}`);
  const d = (found.inline_data || found.inlineData) as { data: string };
  return Buffer.from(d.data, "base64");
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

  if (claimed(job)) return job;

  // ---- step 2b: picture delivered, video not started yet ----
  // Reached when the video submit was refused (usually the concurrency
  // ceiling). Without this the job would sit with a photo and never retry.
  if (job.stillUrl && !job.videoOp && job.format !== "photo") {
    const stamped = await takeClaim(job);
    if (!stamped) return job;
    try {
      const videoOp = await submit(VIDEO_MODEL, {
        image_url: stamped.stillUrl!,
        prompt: stamped.motionPrompt || stamped.prompt,
      });
      return (await moveJob(job.id, "working", { videoOp, claimedAt: null })) || stamped;
    } catch (e) {
      const msg = String(e);
      if (isTransient(msg)) {
        return (await moveJob(job.id, "working", { claimedAt: null, note: null })) || stamped;
      }
      // Not transient: stop retrying and close with what we have.
      return (
        (await moveJob(job.id, "done", {
          claimedAt: null,
          note: `Video unavailable (${msg.slice(0, 90)}). Your picture is above.`,
        })) || stamped
      );
    }
  }

  // ---- step 1: make the anime frame ----
  // Runs inline. On Vercel Pro a function gets 300s and this takes about 30,
  // so there is no submit-then-collect dance for the image and no window in
  // which two requests can both think it is unstarted.
  if (!job.stillUrl) {
    // Claiming clears any note from a previous attempt: a customer watching a
    // retry should not keep reading the error from the last one.
    const stamped = await takeClaim(job);
    if (!stamped) return job; // someone else owns this tick
    try {
      // No reference means the world still gets built, it just will not be
      // them — the booth camera covers that case.
      const ref = await photoUrl(stamped.photoCode);
      const bytes = await generateStill(stamped, ref);
      const url = await store(job.id, "still", bytes);

      if (stamped.format === "photo") {
        return (await moveJob(job.id, "done", { stillUrl: url, claimedAt: null })) || stamped;
      }
      if (!videoReady()) {
        return (
          (await moveJob(job.id, "done", {
            stillUrl: url,
            claimedAt: null,
            note: "Video is unavailable right now — your picture is above.",
          })) || stamped
        );
      }
      // Higgsfield pulls the frame from the public URL we just wrote, so
      // nothing is re-encoded or re-uploaded between the two stages.
      try {
        const videoOp = await submit(VIDEO_MODEL, {
          image_url: url,
          prompt: stamped.motionPrompt || stamped.prompt,
        });
        return (
          (await moveJob(job.id, "working", { stillUrl: url, videoOp, claimedAt: null })) ||
          stamped
        );
      } catch (e) {
        // Never lose the picture because the video queue was full — step 2b
        // retries the video half on the next poll.
        const msg = String(e);
        return (
          (await moveJob(job.id, "working", {
            stillUrl: url,
            claimedAt: null,
            note: isTransient(msg) ? null : `Video didn't start: ${msg.slice(0, 110)}`,
          })) || stamped
        );
      }
    } catch (e) {
      const msg = String(e);
      return (
        (await moveJob(job.id, "approved", {
          claimedAt: null,
          note: isTransient(msg) ? null : `Generation failed: ${msg.slice(0, 120)}`,
        })) || stamped
      );
    }
  }

  return job;
}
