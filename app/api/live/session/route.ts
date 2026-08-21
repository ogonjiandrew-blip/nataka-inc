import { NextRequest, NextResponse } from "next/server";

/**
 * Mints a short-lived Decart client token for the /live AI mirror.
 *
 * The permanent key stays server-side in DECART_API_KEY. The browser only ever
 * receives an ephemeral token (10 min, lucy-2.5 only, 5 min max session) minted
 * against Decart's `POST /v1/client/tokens` endpoint — the same flow their own
 * SDK's TokensClient uses.
 *
 * COST CONTROL. Lucy bills ~$0.04/second. This endpoint is the only thing
 * standing between a public URL and someone else's GPU bill, so it enforces:
 *   · LIVE_ACCESS_CODE — when set, callers must present it (?code= or header).
 *     Leave it unset for a private/local booth; SET IT before any public deploy.
 *   · a per-IP mint rate limit, so one client can't fan out sessions.
 *   · maxSessionDuration, capping any single session server-side.
 *
 * Without DECART_API_KEY the route answers `{ configured: false }` and the page
 * falls back to the local WebGL looks engine, which needs no key at all.
 */

export const dynamic = "force-dynamic";

const DECART_TOKEN_URL = "https://api.decart.ai/v1/client/tokens";

/** Max token mints per IP per window. A booth reconnects every 5 min; 12/hour
 *  is generous for one station and still caps a runaway or a scraper. */
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000;

/** Per-session ceiling. The client auto-reconnects, so this is a billing
 *  circuit-breaker, not a user-visible limit. */
const MAX_SESSION_SECONDS = 300;

const mints = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (mints.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  mints.set(ip, hits);
  if (mints.size > 500) {
    // opportunistic sweep so the map can't grow without bound
    mints.forEach((v, k) => {
      if (v.every((t: number) => now - t >= RATE_WINDOW_MS)) mints.delete(k);
    });
  }
  return hits.length > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.DECART_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ configured: false });
  }

  // Access gate — only enforced when an access code is configured.
  const gate = process.env.LIVE_ACCESS_CODE;
  if (gate) {
    const supplied =
      req.nextUrl.searchParams.get("code") ?? req.headers.get("x-live-access") ?? "";
    if (supplied !== gate) {
      return NextResponse.json({ configured: true, ok: false, error: "forbidden" }, { status: 403 });
    }
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ configured: true, ok: false, error: "rate_limited" }, { status: 429 });
  }

  try {
    const res = await fetch(DECART_TOKEN_URL, {
      method: "POST",
      headers: { "X-API-KEY": apiKey, "content-type": "application/json" },
      body: JSON.stringify({
        expiresIn: 600,
        // full mode + cheap mode; nothing else this key could be abused for
        allowedModels: ["lucy-2.5", "lucy-restyle-2"],
        constraints: { realtime: { maxSessionDuration: MAX_SESSION_SECONDS } },
        metadata: { source: "natakainc.com/live" },
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[live/session] Decart token mint failed: ${res.status} ${detail}`);
      // 402/403 from the billing side means credit, not a network blip — the
      // client uses this to stop retrying instead of hammering a dead account.
      const billing = res.status === 402 || /credit|quota|balance|payment/i.test(detail);
      return NextResponse.json(
        { configured: true, ok: false, error: billing ? "no_credit" : "token_mint_failed" },
        { status: 502 },
      );
    }

    const data = (await res.json()) as { apiKey: string; expiresAt: string };
    return NextResponse.json({
      configured: true,
      ok: true,
      apiKey: data.apiKey,
      expiresAt: data.expiresAt,
    });
  } catch (err) {
    console.error("[live/session] Decart unreachable:", err);
    return NextResponse.json(
      { configured: true, ok: false, error: "decart_unreachable" },
      { status: 502 },
    );
  }
}
