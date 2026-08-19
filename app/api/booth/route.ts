import {
  createJob,
  newJobId,
  newToken,
  readJob,
  storeReady,
  type Job,
} from "@/lib/boothQueue";
import { advance } from "@/lib/boothGenerate";

/**
 * The customer's end of the queue. Two operations, both unauthenticated
 * because the customer has no account — what protects a job is the random
 * token their browser holds, and what protects our generator is that nothing
 * runs until a human at the booth approves it.
 */

export const runtime = "nodejs";
// Every generation call is submit-and-poll now, so each request is seconds.
// Pro's 300s ceiling is pure headroom.
export const maxDuration = 300;

const MAX_PROMPT = 4000;

export async function POST(req: Request) {
  if (!storeReady()) {
    return Response.json({ error: "store-not-configured" }, { status: 503 });
  }

  let body: Partial<Job> & { prompt?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad json" }, { status: 400 });
  }

  const name = String(body.name || "").trim().slice(0, 24);
  const prompt = String(body.prompt || "").trim().slice(0, MAX_PROMPT);
  const world = String(body.world || "").trim().slice(0, 40);
  const power = String(body.power || "").trim().slice(0, 40);

  if (!name || !prompt || !world || !power) {
    return Response.json({ error: "missing fields" }, { status: 400 });
  }

  const job = await createJob({
    id: newJobId(),
    token: newToken(),
    createdAt: new Date().toISOString(),
    name,
    world,
    power,
    variant: body.variant === "kawaii" ? "kawaii" : "epic",
    format: body.format === "photo" ? "photo" : "video",
    photoCode: body.photoCode ? String(body.photoCode).toUpperCase().slice(0, 4) : null,
    prompt,
    motionPrompt: body.motionPrompt ? String(body.motionPrompt).slice(0, 1200) : null,
    stillUrl: null,
    videoUrl: null,
    stillOp: null,
    videoOp: null,
    claimedAt: null,
  });

  // The id is shown to the customer so they can read it out at the booth; the
  // token stays in their tab and dies with it, which is what makes one approval
  // good for exactly one session.
  return Response.json({ id: job.id, token: job.token, status: job.status });
}

export async function GET(req: Request) {
  const u = new URL(req.url);
  const id = (u.searchParams.get("id") || "").toUpperCase().trim();
  const token = u.searchParams.get("token") || "";
  if (!id || !token) return Response.json({ error: "missing id or token" }, { status: 400 });
  if (!storeReady()) return Response.json({ error: "store-not-configured" }, { status: 503 });

  const found = await readJob(id);
  if (!found || found.token !== token) {
    // Same answer for "no such job" and "wrong token" — do not confirm ids.
    return Response.json({ error: "not found" }, { status: 404 });
  }

  // The customer's own polling is what drives their generation forward. No
  // machine has to be awake anywhere for this to complete.
  const job = await advance(found);

  return Response.json({
    id: job.id,
    status: job.status,
    format: job.format,
    stillUrl: job.stillUrl ?? null,
    videoUrl: job.videoUrl ?? null,
    note: job.note ?? null,
  });
}
