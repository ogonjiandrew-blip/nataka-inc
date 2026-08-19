import { keyOk, listByStatus, moveJob, publicJob, storeReady } from "@/lib/boothQueue";
import { advance, exactFaceReady, generationReady, videoReady } from "@/lib/boothGenerate";

/**
 * The operator's end. Everything here is behind BOOTH_KEY, because this is
 * where the free-generation gate lives: seeing a request and letting it
 * through is the same action as taking the money.
 *
 * The prompts are visible here and nowhere else — the customer's own page
 * never renders the prompt text, so our prompt library stays ours.
 */

export const runtime = "nodejs";
export const maxDuration = 300;

function guard(req: Request) {
  const supplied =
    new URL(req.url).searchParams.get("key") || req.headers.get("x-booth-key");
  if (!keyOk(supplied)) {
    return Response.json({ error: "unauthorised" }, { status: 401 });
  }
  if (!storeReady()) {
    return Response.json({ error: "store-not-configured" }, { status: 503 });
  }
  return null;
}

export async function GET(req: Request) {
  const bad = guard(req);
  if (bad) return bad;

  const [pending, approved, working, done] = await Promise.all([
    listByStatus("pending"),
    listByStatus("approved"),
    listByStatus("working"),
    listByStatus("done", 12),
  ]);

  // This screen also pushes work along, so a job still finishes when the
  // customer has closed their page. One job per poll keeps the request short.
  const next = [...approved, ...working][0];
  if (next) {
    try {
      await advance(next);
    } catch {
      /* the next poll retries */
    }
  }

  return Response.json({
    generationReady: generationReady(),
    videoReady: videoReady(),
    exactFaceReady: exactFaceReady(),
    pending: pending.map(publicJob),
    approved: approved.map(publicJob),
    working: working.map(publicJob),
    done: done.map(publicJob),
  });
}

export async function POST(req: Request) {
  const bad = guard(req);
  if (bad) return bad;

  let body: { id?: string; action?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad json" }, { status: 400 });
  }

  const id = String(body.id || "").toUpperCase().trim();
  if (!id) return Response.json({ error: "missing id" }, { status: 400 });

  if (body.action === "approve") {
    const job = await moveJob(id, "approved", { note: null });
    if (!job) return Response.json({ error: "not found" }, { status: 404 });
    return Response.json({ ok: true, status: job.status });
  }

  if (body.action === "reject") {
    const job = await moveJob(id, "rejected", {
      note: String(body.note || "Not approved at the booth.").slice(0, 200),
    });
    if (!job) return Response.json({ error: "not found" }, { status: 404 });
    return Response.json({ ok: true, status: job.status });
  }

  return Response.json({ error: "unknown action" }, { status: 400 });
}
