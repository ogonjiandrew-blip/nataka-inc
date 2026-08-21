import { put, list } from "@vercel/blob";
import { moveJob, readJob, type Job } from "./boothQueue";

/**
 * Generation — one provider, one wallet, both stages on Higgsfield.
 *
 * The rule the whole file exists to enforce: IT HAS TO BE THEM. A clip of a
 * stranger in an anime world is worth nothing to someone who just paid to see
 * themselves in one, so every path here is anchored to the customer's own
 * photo and none of them is free to invent a face.
 *
 *   nano-banana-pro  makes the anime frame from the customer's photo. It is
 *                    Google's Gemini image model resold — the same engine that
 *                    held likeness on every card we approved this week — but
 *                    reached through the Higgsfield key, so no Google account,
 *                    no second billing, no GOOGLE_API_KEY.
 *   Kling 3.0 Pro    animates that frame. image2video moves the person it is
 *                    handed rather than generating one, so whoever is in the
 *                    still is who comes out of the clip.
 *
 * Neither slug appears in GET /models — that listing is incomplete. Both were
 * verified live against this account on 2026-08-19 via their validation
 * errors. soul/reference remains banned: it is a STYLE reference and produces
 * strangers.
 *
 * The design point that removes the need for a laptop: every call here is
 * asynchronous. Submitting returns a status URL in about a second and the work
 * continues on their side whether or not anyone is connected. So no request
 * ever waits for a render — a job moves one step per request, driven by
 * whichever screen polls next, and if every screen is closed the work still
 * finishes and the next person to look collects it.
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

export function generationReady() {
  return !!auth();
}
export function videoReady() {
  return !!auth();
}
/** The exact-face engine. Optional — without it stills fall back to popcorn. */
export function exactFaceReady() {
  return !!googleKey();
}

/**
 * Stills: Google Gemini first, popcorn/auto as the fallback.
 *
 * The renders that nailed the face — the ones this booth is being measured
 * against — were made by Gemini (sold in Higgsfield's app as "Nano Banana
 * Pro"). The API's nano-banana-pro endpoint CANNOT be that path: it drops its
 * image input silently. Proven 2026-08-19 by echo test — "reproduce this photo
 * unchanged" was sent seven ways (input_images as strings/objects, image_urls,
 * images, image_url, input_image_urls, and again via their own CDN upload) and
 * every one returned a hallucinated unrelated photo. It is text-to-image on
 * this surface, and it is exactly what shipped the wrong faces.
 *
 * So the same model is reached the only way it can be reached serverlessly:
 * Google's own API, GOOGLE_API_KEY. When the key is absent, stills fall back
 * to popcorn/auto — the one Higgsfield endpoint that both reads the face and
 * builds the world (strong likeness, tends to flatter). The rest of the sweep,
 * for the record: soul/reference copies the photo but ignores the prompt at
 * every style_strength; soul/character needs a 40-credit pre-trained Soul ID;
 * reve/edit is model_blocked on this plan.
 *
 * The trap under all of it: this API accepts unknown fields and silently
 * drops them, so a wrong field name does not error — it just quietly
 * generates a stranger at full price.
 */
const IMAGE_MODEL = process.env.BOOTH_IMAGE_MODEL || "higgsfield-ai/popcorn/auto";
const GOOGLE_IMAGE_MODEL = process.env.BOOTH_GOOGLE_IMAGE_MODEL || "gemini-3-pro-image-preview";

/**
 * Video: Kling 2.5-turbo standard. prompt + image_url + duration (int).
 *
 * NOT 3.0 Pro, which this booth ran for one day and which quietly ate ~185
 * credits across two to four clips — somewhere near 50-90 credits each. It
 * conceals that: POST /estimate returns "0.000" for it at every duration, and
 * it does not appear in GET /models at all, so neither the price list nor the
 * estimator will warn you. The balance dropping is the only signal.
 *
 * 2.5-turbo estimates honestly at 3.36 credits (~$0.21), roughly twenty times
 * cheaper for output Andrew judged good enough side by side, and being the
 * turbo line it also returns well inside the seven minutes 3.0 Pro made a
 * paying customer wait.
 *
 * Rule this cost us a day to learn: only run a model whose /estimate returns a
 * non-zero price. A zero means unpriced, never free.
 */
const ANIMATE_MODEL =
  process.env.HIGGSFIELD_VIDEO_MODEL || "kling-video/v2.5-turbo/standard/image-to-video";

/**
 * A claim stops two concurrent requests submitting the same job twice, so it
 * has to outlive the longest work it guards — the inline image render, capped
 * at 90s by its own timeout. At the old 120s the two were close enough that a
 * slow render would lose its claim mid-flight and a second request would start
 * a duplicate at full price.
 */
const CLAIM_MS = 180_000;
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
  // Quota exhaustion also arrives as 429, and that one never clears on its
  // own. Retrying it silently is how a dead booth looks identical to a busy
  // one — the operator sees "generating…" forever and no error anywhere.
  if (/quota|billing|exceeded|exhausted|PERMISSION_DENIED|API key|disabled/i.test(message)) {
    return false;
  }
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
 * Start the anime frame. The customer's photo is required, not optional — a
 * frame without it would be a generated stranger, which is the one output this
 * booth must never produce.
 */
async function submitStill(job: Job, refUrl: string) {
  return submit(IMAGE_MODEL, {
    prompt: job.prompt,
    // The field takes up to 8 references. Repeating the one photo we have
    // weights identity harder than a single copy does, and costs nothing extra.
    image_urls: [refUrl, refUrl, refUrl],
    aspect_ratio: "9:16",
  });
}

/**
 * The exact-face path: Gemini reads the photo as true multimodal input, so
 * the face is not "referenced" — it is looked at. Synchronous, ~30s, well
 * inside Vercel Pro's 300s.
 */
async function generateStillExact(job: Job, refUrl: string): Promise<Buffer> {
  const img = await fetch(refUrl, { signal: AbortSignal.timeout(20_000) });
  if (!img.ok) throw new Error(`could not read the photo (${img.status})`);
  const b64 = Buffer.from(await img.arrayBuffer()).toString("base64");

  // A hanging call is worse than a failing one. Without this, a request that
  // Google never answers holds the job's claim until Vercel kills it at 300s,
  // the claim expires at 120s, the next poll re-claims, and the job loops
  // forever showing "generating…" — which is exactly what a stuck video order
  // did. Ninety seconds is far past the ~25s a real render takes, so this only
  // ever fires on a call that was never coming back. Timing out throws, which
  // drops the order to popcorn instead of stranding it.
  const res = await fetch(`${GOOGLE}/models/${GOOGLE_IMAGE_MODEL}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": googleKey() },
    signal: AbortSignal.timeout(90_000),
    body: JSON.stringify({
      contents: [
        { parts: [{ text: job.prompt }, { inline_data: { mime_type: "image/jpeg", data: b64 } }] },
      ],
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

/**
 * Start the clip from a finished anime frame. There is deliberately no path
 * that starts a video without one: a frame is what holds the customer's face,
 * so no frame means no clip rather than a clip of a stranger.
 */
async function submitVideo(job: Job, frameUrl: string) {
  return submit(ANIMATE_MODEL, {
    image_url: frameUrl,
    prompt: job.motionPrompt || job.prompt,
    duration: 5,
  });
}

/**
 * Refuse to run a model that will not quote a price.
 *
 * Kling 3.0 Pro answered "0.000" to every estimate and then charged something
 * like 50-90 credits a clip, which is how a day's video budget vanished into
 * four renders with nothing in the logs to show it. A zero quote does not mean
 * free, it means unpriced — and unpriced is exactly the thing that should never
 * run unattended against a prepaid balance at a festival.
 *
 * The check is cheap (estimate costs nothing) and fails open on a network
 * error: a booth that stops selling because the estimator hiccupped would be a
 * worse bug than the one this prevents.
 */
async function priceOk(modelPath: string, body: Record<string, unknown>, a: string) {
  try {
    const res = await fetch(`${HF}/estimate/${modelPath}`, {
      method: "POST",
      headers: { Authorization: a, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return; // estimator unavailable — proceed
    const j = await res.json();
    if (Number(j.credits) > 0) return; // priced, go ahead
    throw new Error(
      `${modelPath} reports no price (credits=${j.credits}) — refusing to run an unpriced model`
    );
  } catch (e) {
    if (String(e).includes("refusing to run")) throw e;
    // Anything else is an estimator problem, not a pricing problem.
  }
}

async function submit(modelPath: string, body: Record<string, unknown>): Promise<string> {
  const a = auth();
  if (!a) throw new Error("Higgsfield API key not configured");
  await priceOk(modelPath, body, a);

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

  // Every failure this pipeline has had looked the same from outside — a job
  // sitting at "working" forever — because the transient path deliberately
  // clears the note. One line per tick makes the actual step visible.
  const step = job.videoOp
    ? "4-collect-video"
    : job.stillOp
      ? "2-collect-still"
      : claimed(job)
        ? "claimed-waiting"
        : job.stillUrl
          ? "3-submit-video"
          : "1-submit-still";
  console.log(
    `[booth ${job.id}] tick step=${step} status=${job.status} fmt=${job.format} ` +
      `still=${!!job.stillUrl} stillOp=${!!job.stillOp} videoOp=${!!job.videoOp} claimedAt=${job.claimedAt || "-"}`
  );

  // ---- step 4: the video is rendering — is it ready? ----
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

  // ---- step 2: the frame is rendering — is it ready? ----
  // No claim needed: collecting spends nothing, and two requests storing the
  // same bytes to the same path is harmless. The spend-guarded transition to
  // the video happens in step 3 on a later poll.
  if (job.stillOp && !job.stillUrl) {
    try {
      const bytes = await collect(job.stillOp);
      if (!bytes) return job;
      const url = await store(job.id, "still", bytes);
      if (job.format === "photo") {
        return (
          (await moveJob(job.id, "done", { stillUrl: url, stillOp: null, claimedAt: null })) ||
          job
        );
      }
      return (
        (await moveJob(job.id, "working", { stillUrl: url, stillOp: null, claimedAt: null })) ||
        job
      );
    } catch (e) {
      // The frame failed. Clearing stillOp sends the job back through step 1,
      // which resubmits — the claim window spaces retries out.
      const msg = String(e);
      return (
        (await moveJob(job.id, "approved", {
          stillOp: null,
          claimedAt: null,
          note: isTransient(msg) ? null : `Generation failed: ${msg.slice(0, 120)}`,
        })) || job
      );
    }
  }

  if (claimed(job)) return job;

  // ---- step 3: frame delivered, video not started yet ----
  if (job.stillUrl && !job.videoOp && job.format !== "photo") {
    const stamped = await takeClaim(job);
    if (!stamped) return job;
    try {
      // Kling pulls the frame from the public URL we stored, so nothing is
      // re-encoded between the two stages.
      const videoOp = await submitVideo(stamped, stamped.stillUrl!);
      console.log(`[booth ${job.id}] video submitted`);
      return (await moveJob(job.id, "working", { videoOp, claimedAt: null })) || stamped;
    } catch (e) {
      const msg = String(e);
      console.error(`[booth ${job.id}] video submit failed (transient=${isTransient(msg)}):`, msg);
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

  // ---- step 1: start the anime frame ----
  if (!job.stillUrl && !job.stillOp) {
    // Claiming clears any note from a previous attempt: a customer watching a
    // retry should not keep reading the error from the last one.
    const stamped = await takeClaim(job);
    if (!stamped) return job; // someone else owns this tick

    // No photo means no face to keep, and the face is the product. Hold the
    // job where the crew can see why instead of generating somebody else.
    const ref = await photoUrl(stamped.photoCode);
    if (!ref) {
      return (
        (await moveJob(job.id, "approved", {
          claimedAt: null,
          note: "Held: no photo attached. Take one at the booth and re-approve.",
        })) || stamped
      );
    }

    try {
      // Exact-face path when Google is configured: generate inline, store, and
      // let step 3 start the video on the next poll.
      //
      // A configured key is not a working key — a quota-zero project answers
      // 429 to every request. Falling through to popcorn rather than failing
      // means a dead Google account costs likeness, never the sale.
      if (exactFaceReady()) {
        try {
          const bytes = await generateStillExact(stamped, ref);
          const url = await store(job.id, "still", bytes);
          if (stamped.format === "photo") {
            return (await moveJob(job.id, "done", { stillUrl: url, claimedAt: null })) || stamped;
          }
          return (await moveJob(job.id, "working", { stillUrl: url, claimedAt: null })) || stamped;
        } catch (googleErr) {
          console.error(`[booth ${job.id}] exact-face engine failed, using backup:`, googleErr);
        }
      }
      // Backup: popcorn, submit-and-collect.
      const stillOp = await submitStill(stamped, ref);
      return (await moveJob(job.id, "working", { stillOp, claimedAt: null })) || stamped;
    } catch (e) {
      const msg = String(e);
      console.error(`[booth ${job.id}] step 1 failed (transient=${isTransient(msg)}):`, msg);
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
