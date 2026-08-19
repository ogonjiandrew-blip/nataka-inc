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

export async function GET() {
  const env = process.env;
  return Response.json(
    {
      blob: !!env.BLOB_READ_WRITE_TOKEN,
      boothKey: !!env.BOOTH_KEY,
      // The anime frame needs Google: it is the only one of the two that
      // preserves the customer's face.
      google: !!env.GOOGLE_API_KEY,
      // Animating that frame needs no identity work, so it runs on Higgsfield
      // at roughly a fifth of Veo's price.
      higgsfield: !!(env.HIGGSFIELD_API_KEY_ID && env.HIGGSFIELD_API_KEY_SECRET),
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
