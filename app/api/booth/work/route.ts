import { put } from "@vercel/blob";
import { keyOk, listByStatus, moveJob, storeReady } from "@/lib/boothQueue";

/**
 * The booth laptop's end.
 *
 * Vercel cannot do this work: a Veo render runs for minutes and a serverless
 * function is killed long before it finishes. So the laptop polls here for
 * approved jobs, generates locally with its own key, and posts the finished
 * files back. Same BOOTH_KEY as the operator screen.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

function guard(req: Request) {
  const supplied =
    new URL(req.url).searchParams.get("key") || req.headers.get("x-booth-key");
  if (!keyOk(supplied)) return Response.json({ error: "unauthorised" }, { status: 401 });
  if (!storeReady()) return Response.json({ error: "store-not-configured" }, { status: 503 });
  return null;
}

/** Claim the oldest approved job, flipping it to working so no one doubles up. */
export async function GET(req: Request) {
  const bad = guard(req);
  if (bad) return bad;

  const approved = await listByStatus("approved");
  if (!approved.length) return Response.json({ job: null });

  const oldest = approved.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )[0];

  const claimed = await moveJob(oldest.id, "working");
  if (!claimed) return Response.json({ job: null });

  return Response.json({
    job: {
      id: claimed.id,
      name: claimed.name,
      world: claimed.world,
      power: claimed.power,
      variant: claimed.variant,
      format: claimed.format,
      photoCode: claimed.photoCode,
      prompt: claimed.prompt,
    },
  });
}

/**
 * Deliver. The laptop posts one finished file at a time as it lands, so the
 * customer sees the still while the video is still rendering.
 *
 * Body: { id, kind: "still" | "video", dataUrl }  → stores and links it
 *       { id, kind: "done" }                      → marks the job finished
 *       { id, kind: "fail", note }                → hands it back with a reason
 */
export async function POST(req: Request) {
  const bad = guard(req);
  if (bad) return bad;

  let body: { id?: string; kind?: string; dataUrl?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad json" }, { status: 400 });
  }

  const id = String(body.id || "").toUpperCase().trim();
  if (!id) return Response.json({ error: "missing id" }, { status: 400 });

  if (body.kind === "fail") {
    const job = await moveJob(id, "approved", {
      note: String(body.note || "Generation failed — try again.").slice(0, 200),
    });
    return job
      ? Response.json({ ok: true })
      : Response.json({ error: "not found" }, { status: 404 });
  }

  if (body.kind === "done") {
    const job = await moveJob(id, "done");
    return job
      ? Response.json({ ok: true })
      : Response.json({ error: "not found" }, { status: 404 });
  }

  if (body.kind !== "still" && body.kind !== "video") {
    return Response.json({ error: "unknown kind" }, { status: 400 });
  }

  const raw = String(body.dataUrl || "");
  const m = raw.match(/^data:(image\/jpeg|video\/mp4);base64,(.+)$/);
  if (!m) return Response.json({ error: "expected a jpeg or mp4 data url" }, { status: 400 });

  const bytes = Buffer.from(m[2], "base64");
  if (!bytes.length || bytes.length > 40 * 1024 * 1024) {
    return Response.json({ error: "bad size" }, { status: 413 });
  }

  const ext = body.kind === "still" ? "jpg" : "mp4";
  const blob = await put(`deliver/${id}.${ext}`, bytes, {
    access: "public",
    contentType: m[1],
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  // Stay in working: the customer can already see this file, and the job only
  // closes when the laptop says done.
  const job = await moveJob(id, "working", {
    [body.kind === "still" ? "stillUrl" : "videoUrl"]: blob.url,
  });
  if (!job) return Response.json({ error: "not found" }, { status: 404 });

  return Response.json({ ok: true, url: blob.url });
}
