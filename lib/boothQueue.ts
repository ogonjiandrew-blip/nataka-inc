import { put, list, del } from "@vercel/blob";

/**
 * Booth job queue.
 *
 * The customer submits from the website and gets nothing until a human at the
 * booth approves it. That approval IS the payment gate: without it anyone who
 * finds the URL could run our generator for free. The operator's view is
 * password-protected and the customer never sees another customer's request.
 *
 * Why Blob and not a database: the site had no datastore, the event is days
 * away, and one Blob store covers both the photos and this queue. Status lives
 * in the PATHNAME (`jobs/pending/<id>.json`), so listing a status is a single
 * cheap call that never fetches any bodies — that is what makes polling from
 * two screens affordable.
 *
 * Who does the generating: not Vercel. A Veo render runs for minutes and a
 * serverless function is killed long before that, so the booth laptop polls
 * for approved jobs, generates locally with its own key, and posts the results
 * back here. The website only ever holds the queue and the finished files.
 */

export type JobStatus = "pending" | "approved" | "working" | "done" | "rejected";

export interface Job {
  id: string;
  /** Secret the customer's browser holds. Without it they cannot read a job. */
  token: string;
  createdAt: string;
  name: string;
  world: string;
  power: string;
  variant: "epic" | "kawaii";
  format: "photo" | "video";
  /** Code from /api/booth-photo, if they took a picture on their phone. */
  photoCode: string | null;
  prompt: string;
  /** Short motion brief for the video stage — the still already holds the world. */
  motionPrompt?: string | null;
  status: JobStatus;
  /** Filled as each deliverable lands. */
  stillUrl?: string | null;
  videoUrl?: string | null;
  note?: string | null;
  /**
   * Higgsfield status URLs for the two renders. Their existence is what lets
   * this run without a machine: the work continues on Higgsfield's side and
   * any later request can collect it.
   */
  stillOp?: string | null;
  videoOp?: string | null;
  /** Set while one request is generating, so a second does not duplicate it. */
  claimedAt?: string | null;
}

const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const rand = (n: number) =>
  Array.from({ length: n }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join("");

export const newJobId = () => rand(6);
export const newToken = () => rand(18);

export function storeReady() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

const jobPath = (status: JobStatus, id: string) => `jobs/${status}/${id}.json`;

/** Write the job at the path its status implies, clearing any older path. */
async function writeAt(status: JobStatus, job: Job) {
  const body = JSON.stringify({ ...job, status });
  await put(jobPath(status, job.id), body, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

export async function createJob(job: Omit<Job, "status">): Promise<Job> {
  const full: Job = { ...job, status: "pending" };
  await writeAt("pending", full);
  return full;
}

/** One list call: the pathname alone tells us the status. */
async function locate(id: string): Promise<{ status: JobStatus; url: string } | null> {
  const { blobs } = await list({ prefix: "jobs/" });
  const hit = blobs.find((b) => b.pathname.endsWith(`/${id}.json`));
  if (!hit) return null;
  const status = hit.pathname.split("/")[1] as JobStatus;
  return { status, url: hit.url };
}

export async function readJob(id: string): Promise<Job | null> {
  const found = await locate(id);
  if (!found) return null;
  try {
    const res = await fetch(found.url, { cache: "no-store" });
    if (!res.ok) return null;
    const job = (await res.json()) as Job;
    // The path is authoritative; a stale body must never win.
    return { ...job, status: found.status };
  } catch {
    return null;
  }
}

export async function moveJob(
  id: string,
  to: JobStatus,
  patch: Partial<Job> = {}
): Promise<Job | null> {
  const found = await locate(id);
  if (!found) return null;
  const res = await fetch(found.url, { cache: "no-store" });
  if (!res.ok) return null;
  const job = { ...((await res.json()) as Job), ...patch, status: to };
  await writeAt(to, job);
  if (found.status !== to) {
    try {
      await del(found.url);
    } catch {
      /* the new path already wins; a leftover is harmless */
    }
  }
  return job;
}

/** Jobs in one status, newest first. Only these bodies are fetched. */
export async function listByStatus(status: JobStatus, limit = 40): Promise<Job[]> {
  const { blobs } = await list({ prefix: `jobs/${status}/` });
  const recent = blobs
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    .slice(0, limit);
  const jobs = await Promise.all(
    recent.map(async (b) => {
      try {
        const r = await fetch(b.url, { cache: "no-store" });
        return r.ok ? ((await r.json()) as Job) : null;
      } catch {
        return null;
      }
    })
  );
  return jobs.filter((j): j is Job => !!j).map((j) => ({ ...j, status }));
}

/** Never leak the token to the operator's screen or anyone else's. */
export function publicJob(job: Job) {
  const { token, ...rest } = job;
  void token;
  return rest;
}

/** Timing-safe-ish comparison for the shared operator secret. */
export function keyOk(supplied: string | null): boolean {
  const real = process.env.BOOTH_KEY;
  if (!real) return false;
  if (!supplied || supplied.length !== real.length) return false;
  let diff = 0;
  for (let i = 0; i < real.length; i++) diff |= real.charCodeAt(i) ^ supplied.charCodeAt(i);
  return diff === 0;
}
