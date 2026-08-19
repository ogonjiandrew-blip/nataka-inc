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

export async function GET() {
  const env = process.env;
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
