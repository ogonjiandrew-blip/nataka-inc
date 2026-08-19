import { put, list, del } from "@vercel/blob";

/**
 * Booth photo handoff.
 *
 * Why this exists: a wa.me link carries text and never an image, and the Web
 * Share API cannot be aimed at a specific WhatsApp number — it opens the OS
 * picker and the customer is left hunting for the booth in their contacts.
 * That was the wrong tool and it made the send feel broken.
 *
 * So the photo travels out of band. The phone POSTs it here the moment it is
 * taken and gets a four-character code. The wa.me message — which goes
 * straight to the booth number, one tap, no picker — carries that code. The
 * booth console reads the code out of the pasted message and pulls the photo
 * down on its own.
 *
 * Codes are deliberately short and human-readable so the operator can also
 * just type one in if anything goes wrong, and they collide rarely enough at
 * one festival's volume to not matter. Photos are festival-day scratch: the
 * cleanup below drops anything older than 12 hours on each write.
 */

export const runtime = "nodejs";

// Unambiguous alphabet: no O/0, no I/1/L. Read aloud across a noisy booth.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const newCode = () =>
  Array.from({ length: 4 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join("");

const MAX_BYTES = 8 * 1024 * 1024;
const TWELVE_HOURS = 12 * 60 * 60 * 1000;

function configured() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

/** Drop yesterday's photos so the store does not grow without bound. */
async function sweep() {
  try {
    const { blobs } = await list({ prefix: "booth/" });
    const stale = blobs.filter((b) => Date.now() - new Date(b.uploadedAt).getTime() > TWELVE_HOURS);
    if (stale.length) await del(stale.map((b) => b.url));
  } catch {
    /* sweeping is housekeeping — never fail an upload over it */
  }
}

export async function POST(req: Request) {
  if (!configured()) {
    // The page treats this as "no photo" and falls back to the booth camera,
    // so a missing store degrades the product instead of breaking it.
    return Response.json({ error: "photo-store-not-configured" }, { status: 503 });
  }

  const type = req.headers.get("content-type") || "";
  if (!type.startsWith("image/")) {
    return Response.json({ error: "expected an image body" }, { status: 415 });
  }

  const body = await req.arrayBuffer();
  if (!body.byteLength) return Response.json({ error: "empty body" }, { status: 400 });
  if (body.byteLength > MAX_BYTES) {
    return Response.json({ error: "image too large" }, { status: 413 });
  }

  const code = newCode();
  try {
    const blob = await put(`booth/${code}.jpg`, body, {
      access: "public",
      contentType: "image/jpeg",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    void sweep();
    return Response.json({ code, url: blob.url });
  } catch (e) {
    return Response.json({ error: String(e).slice(0, 200) }, { status: 500 });
  }
}

/** GET ?code=ABCD → { url } so the booth console can download it. */
export async function GET(req: Request) {
  const code = (new URL(req.url).searchParams.get("code") || "").toUpperCase().trim();
  if (!/^[A-Z0-9]{4}$/.test(code)) {
    return Response.json({ error: "bad code" }, { status: 400 });
  }
  if (!configured()) {
    return Response.json({ error: "photo-store-not-configured" }, { status: 503 });
  }
  try {
    const { blobs } = await list({ prefix: `booth/${code}` });
    if (!blobs.length) return Response.json({ error: "not found" }, { status: 404 });
    return Response.json({ url: blobs[0].url, uploadedAt: blobs[0].uploadedAt });
  } catch (e) {
    return Response.json({ error: String(e).slice(0, 200) }, { status: 500 });
  }
}
