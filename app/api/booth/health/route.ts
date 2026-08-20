/**
 * Config health.
 *
 * Reports only whether each piece of configuration is PRESENT — never a value,
 * never a fragment of one. It exists because the failure it diagnoses is
 * silent by design: a missing key makes generation skip rather than throw, so
 * a job sits at "approved" with no error anywhere to read. Rather than guess
 * from the outside, ask the deployment.
 */

export const runtime = "nodejs";
// Without this Next prerenders the route at build time and the "live" health
// report is actually a fossil from the last deploy.
export const dynamic = "force-dynamic";

/**
 * Ask Google to make one tiny image and report exactly what it says.
 *
 * Presence of a key is not the same as a key that works: the wrong project,
 * a disabled API and an exhausted quota all look identical from outside, and
 * generation catches its own errors, so nothing reaches the logs. This spends
 * one small render to turn that silence into a sentence.
 */
async function probeGoogle(key: string, model: string) {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "A plain red circle on white." }] }],
          generationConfig: { responseModalities: ["IMAGE"] },
        }),
      }
    );
    const body = await res.text();
    if (res.ok) {
      const hasImage = /inline_?[Dd]ata/.test(body);
      return { ok: hasImage, status: res.status, detail: hasImage ? "image returned" : body.slice(0, 400) };
    }
    return { ok: false, status: res.status, detail: body.slice(0, 500) };
  } catch (e) {
    return { ok: false, status: 0, detail: String(e).slice(0, 300) };
  }
}

export async function GET(req: Request) {
  const env = process.env;

  // ?probe=1 costs a render, so it is opt-in rather than part of every check.
  if (new URL(req.url).searchParams.get("probe") && env.GOOGLE_API_KEY) {
    const model = env.BOOTH_GOOGLE_IMAGE_MODEL || "gemini-3-pro-image-preview";
    const [primary, fallback] = await Promise.all([
      probeGoogle(env.GOOGLE_API_KEY, model),
      probeGoogle(env.GOOGLE_API_KEY, "gemini-2.5-flash-image"),
    ]);
    return Response.json(
      { model, primary, fallbackModel: "gemini-2.5-flash-image", fallback },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  return Response.json(
    {
      blob: !!env.BLOB_READ_WRITE_TOKEN,
      boothKey: !!env.BOOTH_KEY,
      // Higgsfield runs the booth: popcorn stills fallback + Kling video.
      higgsfield: !!(env.HIGGSFIELD_API_KEY_ID && env.HIGGSFIELD_API_KEY_SECRET),
      // Google is the exact-face engine (the model behind the renders that
      // held likeness). Optional but strongly wanted: without it stills run
      // on popcorn, which is a strong likeness rather than an exact one.
      google: !!env.GOOGLE_API_KEY,
      // Which names ARE set, so a typo is visible immediately instead of
      // looking identical to a missing variable.
      sawBoothRelatedNames: Object.keys(env)
        .filter((k) => /GOOGLE|GEMINI|BOOTH|BLOB|HIGGS/i.test(k))
        .sort(),
      deployedAt: env.VERCEL_DEPLOYMENT_ID ? "vercel" : "local",
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
