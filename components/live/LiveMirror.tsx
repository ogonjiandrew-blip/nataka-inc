"use client";

/**
 * NATAKA LIVE — the AI mirror.
 *
 * Two engines behind one viewfinder:
 *
 *  1. INSTANT LOOKS — a local WebGL shader pipeline over the webcam. Runs at
 *     60fps on-device, costs nothing, works with no key and no internet. Seven
 *     Nairobi-flavoured grades. This is the floor the page never falls below.
 *
 *  2. AI ENGINE — Decart Lucy 2.5 over WebRTC via @decartai/sdk. The browser
 *     fetches an ephemeral token from /api/live/session (permanent key never
 *     leaves the server) and streams the camera up; every frame comes back
 *     rewritten from a text prompt.
 *
 * BOOTH HARDENING (a festival day is 8 hours, not an 8-minute demo):
 *   · Sessions are capped server-side at 5 min. `generationEnded` fires when the
 *     cap hits — we reconnect automatically so the mirror never dies mid-guest.
 *   · Any unexpected drop reconnects with backoff, up to MAX_RETRIES, then
 *     surfaces one clear manual retry instead of a black rectangle.
 *   · Idle auto-stop: an empty chair stops billing after IDLE_STOP_MS.
 *   · Live cost meter from `generationTick` so the operator watches the burn.
 *   · `?booth=1` locks the free-text prompt (a public screen is a brand risk),
 *     and surfaces the meter + connection quality.
 */

import { useCallback, useEffect, useRef, useState } from "react";

/* ────────────────────────────── shader looks ───────────────────────────── */

const VERT = `attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

/* One fragment shader, switched by uLook. uUvScale/uUvOffset implement
   cover-fit cropping so the video fills the canvas without stretching. */
const FRAG = `precision mediump float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uUvScale;
uniform vec2 uUvOffset;
uniform int uLook;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

vec2 mapUv(vec2 uv) {
  // mirror horizontally so it behaves like a mirror, then cover-fit
  vec2 m = vec2(1.0 - uv.x, 1.0 - uv.y);
  return m * uUvScale + uUvOffset;
}

vec3 sampleAt(vec2 uv) { return texture2D(uTex, mapUv(uv)).rgb; }

void main() {
  vec2 uv = vUv;
  vec3 col;

  if (uLook == 0) {
    // RAW — gentle filmic lift, nothing else
    col = sampleAt(uv);
    col = pow(col, vec3(0.96));
  }
  else if (uLook == 1) {
    // MATATU NEON — chromatic split, scanlines, saturated night-route glow
    float off = 0.004 + 0.002 * sin(uTime * 2.0);
    col.r = sampleAt(uv + vec2(off, 0.0)).r;
    col.g = sampleAt(uv).g;
    col.b = sampleAt(uv - vec2(off, 0.0)).b;
    float l = luma(col);
    col = mix(vec3(l), col, 1.7);                       // push saturation
    col += vec3(0.05, 0.0, 0.12) * (1.0 - l);           // violet floor
    col.gb += vec2(0.06, 0.10) * smoothstep(0.7, 1.0, l); // cyan bloom in highlights
    float scan = sin(uv.y * uRes.y * 1.6) * 0.06;
    col -= scan;
  }
  else if (uLook == 2) {
    // ANIME INK — sobel edges as ink over posterised cel colour
    vec2 px = 1.0 / uRes;
    float tl = luma(sampleAt(uv + px * vec2(-1.0,  1.0)));
    float  t = luma(sampleAt(uv + px * vec2( 0.0,  1.0)));
    float tr = luma(sampleAt(uv + px * vec2( 1.0,  1.0)));
    float  l = luma(sampleAt(uv + px * vec2(-1.0,  0.0)));
    float  r = luma(sampleAt(uv + px * vec2( 1.0,  0.0)));
    float bl = luma(sampleAt(uv + px * vec2(-1.0, -1.0)));
    float  b = luma(sampleAt(uv + px * vec2( 0.0, -1.0)));
    float br = luma(sampleAt(uv + px * vec2( 1.0, -1.0)));
    float gx = -tl - 2.0*l - bl + tr + 2.0*r + br;
    float gy = -tl - 2.0*t - tr + bl + 2.0*b + br;
    float edge = smoothstep(0.25, 0.75, length(vec2(gx, gy)));
    vec3 base = sampleAt(uv);
    base = floor(base * 5.0) / 5.0;                     // cel posterise
    base = mix(vec3(luma(base)), base, 1.25);
    col = mix(base, vec3(0.02), edge);                  // ink the lines
  }
  else if (uLook == 3) {
    // NAIROBI VHS 1998 — tape jitter, chroma bleed, noise, rolling band
    float jitter = (hash(vec2(floor(uTime * 12.0), floor(uv.y * 40.0))) - 0.5) * 0.006;
    vec2 juv = uv + vec2(jitter, 0.0);
    float bleed = 0.006;
    col.r = sampleAt(juv + vec2(bleed, 0.0)).r;
    col.g = sampleAt(juv).g;
    col.b = sampleAt(juv - vec2(bleed, 0.0)).b;
    col = mix(vec3(luma(col)), col, 0.75);              // washed chroma
    col = col * 0.92 + 0.04;                            // lifted blacks
    col += (hash(uv * uTime * 60.0) - 0.5) * 0.10;      // tape noise
    float band = smoothstep(0.0, 0.02, abs(fract(uv.y - uTime * 0.11) - 0.5) - 0.47);
    col *= 0.85 + 0.15 * band;
  }
  else if (uLook == 4) {
    // THERMAL — heat-camera LUT
    float l = luma(sampleAt(uv));
    col = vec3(
      smoothstep(0.35, 0.85, l),
      smoothstep(0.15, 0.65, l) * 0.85,
      smoothstep(0.0, 0.35, l) * (1.0 - smoothstep(0.45, 0.9, l))
    );
    col = mix(vec3(0.0, 0.0, 0.15), col, smoothstep(0.0, 0.1, l));
  }
  else if (uLook == 5) {
    // CHROME NOIR — hard silver monochrome, crushed, vignetted
    float l = luma(sampleAt(uv));
    l = smoothstep(0.12, 0.88, l);
    col = vec3(l) * vec3(0.96, 0.98, 1.02);
    float d = distance(uv, vec2(0.5));
    col *= 1.0 - d * d * 1.1;
  }
  else {
    // 8-BIT — arcade pixels, 4-level palette
    vec2 grid = vec2(120.0, 68.0);
    vec2 puv = (floor(uv * grid) + 0.5) / grid;
    col = sampleAt(puv);
    col = floor(col * 4.0) / 4.0;
    col = mix(vec3(luma(col)), col, 1.4);
  }

  // shared: faint vignette so every look sits in the viewfinder
  float vd = distance(vUv, vec2(0.5));
  col *= 1.0 - vd * vd * 0.35;

  gl_FragColor = vec4(col, 1.0);
}`;

const LOOKS = [
  { id: 0, name: "RAW", tag: "CAM 01" },
  { id: 1, name: "MATATU NEON", tag: "NITE RTE" },
  { id: 2, name: "ANIME INK", tag: "CEL 05" },
  { id: 3, name: "NAIROBI VHS", tag: "1998" },
  { id: 4, name: "THERMAL", tag: "IR-2" },
  { id: 5, name: "CHROME NOIR", tag: "AG-X" },
  { id: 6, name: "8-BIT", tag: "ARCADE" },
] as const;

/* FULL mode rewrites what you ARE — costume, character, whole world. */
const PROMPTS_FULL = [
  { name: "TUXEDO", prompt: "wearing a sharp black tuxedo with a bow tie, red carpet premiere lighting" },
  { name: "ANIME HERO", prompt: "hand-drawn anime character, cel shaded, dramatic shonen lighting" },
  { name: "MAASAI ROYAL", prompt: "regal East African royalty in red shuka-inspired robes and beaded regalia, studio portrait" },
  { name: "CYBER NAIROBI", prompt: "cyberpunk Nairobi street at night, neon signs, rain, blade runner lighting" },
  { name: "70s FILM", prompt: "1970s Kenyan film still, faded Kodachrome colours, film grain" },
  { name: "ASTRONAUT", prompt: "wearing a NASA astronaut suit inside the international space station" },
] as const;

/* CHEAP mode is a style-transfer model: it restyles the frame rather than
   re-inventing the subject. Asking it for a tuxedo gives a mushy tuxedo, so it
   gets its own presets written to what it is actually good at. */
const PROMPTS_CHEAP = [
  { name: "ANIME CEL", prompt: "anime cel animation style, bold ink outlines, flat vibrant colour" },
  { name: "OIL PAINT", prompt: "thick oil painting, visible brush strokes, gallery portrait" },
  { name: "COMIC INK", prompt: "black and white comic book ink, heavy crosshatching, halftone dots" },
  { name: "NEON NIGHT", prompt: "neon-drenched night photography, magenta and cyan rim light, wet reflections" },
  { name: "WATERCOLOUR", prompt: "loose watercolour wash, soft bleeding pigment, paper texture" },
  { name: "GOLD HOUR", prompt: "warm golden hour cinematic grade, soft haze, shallow depth" },
] as const;

/* ── booth economics & resilience ── */
/* Decart bills realtime "per active generation time". lucy-2.5 is $0.02/sec;
   lucy-restyle-2 is $0.01/sec — literally half the booth's running cost, which
   is why it's worth a toggle rather than a code change. (Their $0.04/sec figure
   is the batch VIDEO rate, which is what resellers quote.) generationTick
   reports the active time, so the meter is real spend, not wall-clock. */
const AI_MODES = {
  full: {
    model: "lucy-2.5" as const,
    label: "FULL",
    usdPerSec: 0.02,
    blurb: "Costume, character, whole world",
    prompts: PROMPTS_FULL,
  },
  cheap: {
    model: "lucy-restyle-2" as const,
    label: "CHEAP · HALF PRICE",
    usdPerSec: 0.01,
    blurb: "Restyles the frame, keeps the person",
    prompts: PROMPTS_CHEAP,
  },
};
type AiMode = keyof typeof AI_MODES;

const KES_PER_USD = 130;        // approximate, for the operator's on-screen meter
/* Decart's dashboard counts credits, not dollars: 10,000 credits = $100, so a
   credit is one US cent. The meter shows credits too, so the booth number can
   be reconciled against platform.decart.ai/billing without doing arithmetic. */
const CREDITS_PER_USD = 100;
const IDLE_STOP_MS = 45_000;   // empty chair → stop billing
/* Hard ceiling on one continuous billed run, regardless of activity. A guest
   waving at the mirror keeps resetting the idle timer, so without this a single
   session could run all afternoon. Resuming is one tap. */
const MAX_RUN_SECONDS = 120;
const MAX_RETRIES = 5;         // consecutive reconnect attempts before giving up

/* ─────────────────────────────── component ─────────────────────────────── */

type CamState = "idle" | "starting" | "live" | "denied" | "nocam" | "busy";
type AiState =
  | "idle" | "checking" | "offline" | "connecting" | "queued"
  | "live" | "reconnecting" | "asleep" | "capped" | "error" | "exhausted" | "forbidden";
type Engine = "looks" | "ai";
type Quality = "good" | "fair" | "poor" | "critical";

export default function LiveMirror() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);   // raw camera (texture source)
  const aiVideoRef = useRef<HTMLVideoElement>(null); // Lucy output
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<{
    gl: WebGLRenderingContext;
    uTime: WebGLUniformLocation | null;
    uRes: WebGLUniformLocation | null;
    uLook: WebGLUniformLocation | null;
    uUvScale: WebGLUniformLocation | null;
    uUvOffset: WebGLUniformLocation | null;
  } | null>(null);
  const rafRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);

  /* realtime session refs — deliberately refs, not state: the reconnect logic
     must read current values from inside SDK callbacks without stale closures. */
  const rtRef = useRef<{
    disconnect: () => void;
    setPrompt: (p: string, o?: { enhance?: boolean }) => Promise<void>;
  } | null>(null);
  const wantAiRef = useRef(false);     // should we be streaming right now?
  const connectingRef = useRef(false); // guards against double-connect
  const retryRef = useRef(0);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const promptRef = useRef<string>(PROMPTS_FULL[0].prompt);
  const modeRef = useRef<AiMode>("full");
  const billedRef = useRef(0);         // seconds actually generated
  const runSecondsRef = useRef(0);     // seconds in the CURRENT continuous run
  const costRef = useRef(0);           // USD, accumulated at the rate in force
  const lastActiveRef = useRef(Date.now());
  const stopAiRef = useRef<(next: AiState) => void>(() => {});
  const accessCodeRef = useRef<string>("");

  const lookRef = useRef(1);
  const startedAtRef = useRef(0);
  const fpsCounter = useRef({ frames: 0, last: 0 });

  const [cam, setCam] = useState<CamState>("idle");
  const [engine, setEngine] = useState<Engine>("looks");
  const [look, setLook] = useState(1);
  const [ai, setAi] = useState<AiState>("idle");
  const [aiChip, setAiChip] = useState(0);
  const [customPrompt, setCustomPrompt] = useState("");
  const [fps, setFps] = useState(0);
  const [clock, setClock] = useState("00:00:00:00");
  const [billed, setBilled] = useState(0);
  const [cost, setCost] = useState(0);
  const [mode, setMode] = useState<AiMode>("full");
  const [quality, setQuality] = useState<Quality | null>(null);
  const [queuePos, setQueuePos] = useState<number | null>(null);
  const [booth, setBooth] = useState(false);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState<string>("");

  lookRef.current = look;
  modeRef.current = mode;

  /* Booth mode is read from the URL directly rather than useSearchParams —
     that hook would opt this statically-rendered page into dynamic rendering. */
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setBooth(q.get("booth") === "1");
    accessCodeRef.current = q.get("code") ?? "";
  }, []);

  /* ── local WebGL engine ── */

  const initGL = useCallback(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video || glRef.current) return;

    const gl = canvas.getContext("webgl", { premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    glRef.current = {
      gl,
      uTime: gl.getUniformLocation(prog, "uTime"),
      uRes: gl.getUniformLocation(prog, "uRes"),
      uLook: gl.getUniformLocation(prog, "uLook"),
      uUvScale: gl.getUniformLocation(prog, "uUvScale"),
      uUvOffset: gl.getUniformLocation(prog, "uUvOffset"),
    };
  }, []);

  const renderLoop = useCallback((t: number) => {
    const ctx = glRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (ctx && canvas && video && video.readyState >= 2) {
      const { gl } = ctx;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }

      // cover-fit: crop video UVs to canvas aspect
      const va = video.videoWidth / video.videoHeight;
      const ca = w / h;
      let sx = 1, sy = 1;
      if (ca > va) sy = va / ca; else sx = ca / va;
      gl.uniform2f(ctx.uUvScale, sx, sy);
      gl.uniform2f(ctx.uUvOffset, (1 - sx) / 2, (1 - sy) / 2);

      // texture + program stay bound from initGL — just refresh the frame
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video);
      gl.uniform1f(ctx.uTime, t / 1000);
      gl.uniform2f(ctx.uRes, w, h);
      gl.uniform1i(ctx.uLook, lookRef.current);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      const fc = fpsCounter.current;
      fc.frames++;
      if (t - fc.last >= 1000) {
        setFps(fc.frames);
        fc.frames = 0;
        fc.last = t;
        const el = (performance.now() - startedAtRef.current) / 1000;
        const hh = String(Math.floor(el / 3600)).padStart(2, "0");
        const mm = String(Math.floor((el % 3600) / 60)).padStart(2, "0");
        const ss = String(Math.floor(el % 60)).padStart(2, "0");
        const ff = String(Math.floor((el % 1) * 30)).padStart(2, "0");
        setClock(`${hh}:${mm}:${ss}:${ff}`);
      }
    }
    rafRef.current = requestAnimationFrame(renderLoop);
  }, []);

  /* ── camera ── */

  const startCamera = useCallback(async (preferId?: string) => {
    setCam("starting");
    try {
      const wanted = preferId ?? deviceId;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          ...(wanted ? { deviceId: { exact: wanted } } : {}),
          width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 },
        },
      });
      // stop the previous feed before adopting the new one (device switching)
      streamRef.current?.getTracks().forEach((tr) => tr.stop());
      streamRef.current = stream;

      /* Labels are only populated after permission is granted, so enumerate
         here rather than on mount. A booth with a Cam Link has at least two
         cameras and the default is almost never the one you want. */
      navigator.mediaDevices.enumerateDevices().then((all) => {
        const vids = all.filter((d) => d.kind === "videoinput");
        setCameras(vids);
        const active = stream.getVideoTracks()[0]?.getSettings().deviceId;
        if (active) setDeviceId(active);
      }).catch(() => {});
      const video = videoRef.current!;
      video.srcObject = stream;
      await video.play();
      startedAtRef.current = performance.now();
      initGL();
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(renderLoop);
      setCam("live");

      /* If the OS or another app steals the camera (OBS grabbing the same
         capture device is the classic booth failure), surface it instead of
         freezing on the last frame. */
      stream.getVideoTracks()[0]?.addEventListener("ended", () => {
        setCam("idle");
        wantAiRef.current = false;
        rtRef.current?.disconnect();
        rtRef.current = null;
      });
    } catch (err: unknown) {
      /* Getting this mapping right matters more than it looks. At a booth the
         three failures need three different human actions, and calling them all
         "permission denied" sends the operator hunting browser settings while
         the real cause is OBS not running. */
      const name = err instanceof DOMException ? err.name : "";
      if (name === "NotFoundError" || name === "OverconstrainedError") setCam("nocam");
      else if (name === "NotReadableError" || name === "AbortError") setCam("busy");
      else setCam("denied");
    }
  }, [initGL, renderLoop, deviceId]);

  /* ── Lucy 2.5 engine ── */

  const teardownAi = useCallback(() => {
    if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    retryTimerRef.current = null;
    connectingRef.current = false;
    try { rtRef.current?.disconnect(); } catch { /* already gone */ }
    rtRef.current = null;
    if (aiVideoRef.current) aiVideoRef.current.srcObject = null;
  }, []);

  /* connectAi is stored in a ref so SDK callbacks can re-enter it without
     tripping the exhaustive-deps cycle (connect → handler → connect). */
  const connectAiRef = useRef<() => Promise<void>>(async () => {});

  const connectAi = useCallback(async () => {
    if (!streamRef.current || connectingRef.current || !wantAiRef.current) return;
    connectingRef.current = true;

    try {
      /* The booth code travels in a header, never a query string, so it stays
         out of server logs and referrers. Public visitors have no code and get
         Instant Looks only — which is the free demo, and costs nothing to serve. */
      const res = await fetch("/api/live/session", {
        method: "POST",
        headers: accessCodeRef.current ? { "x-live-access": accessCodeRef.current } : {},
      });
      const session = await res.json();

      if (!session.configured) { setAi("offline"); wantAiRef.current = false; connectingRef.current = false; return; }
      if (!session.ok) {
        connectingRef.current = false;
        /* Terminal vs transient matters enormously on a festival floor.
           Credit/auth failures will never fix themselves, so stop and say so.
           A dropped uplink is the common case — venue wifi blips for a few
           seconds — and must retry itself, or a 3-second outage would kill the
           booth until a human noticed. */
        const terminal = session.error === "no_credit"
          || session.error === "forbidden"
          || session.error === "rate_limited";
        if (terminal) {
          setAi(session.error === "no_credit" ? "exhausted"
              : session.error === "forbidden" ? "forbidden" : "error");
          wantAiRef.current = false;
        } else {
          scheduleReconnect();
        }
        return;
      }

      setAi((s) => (s === "live" ? "reconnecting" : "connecting"));

      const { createDecartClient, models } = await import("@decartai/sdk");
      const client = createDecartClient({ apiKey: session.apiKey });
      const model = models.realtime(AI_MODES[modeRef.current].model);

      const rt = await client.realtime.connect(streamRef.current, {
        model,
        mirror: true,
        onRemoteStream: (out: MediaStream) => {
          const v = aiVideoRef.current;
          if (v) { v.srcObject = out; v.play().catch(() => {}); }
        },
        onQueuePosition: (q: { position: number }) => {
          setQueuePos(q.position);
          setAi("queued");
        },
        onConnectionQuality: (r: { quality: Quality }) => setQuality(r.quality),
        initialState: { prompt: { text: promptRef.current, enhance: true } },
      });

      rtRef.current = rt;
      connectingRef.current = false;

      rt.on("connectionChange", (state: string) => {
        if (state === "generating" || state === "connected") {
          retryRef.current = 0;      // a good session clears the failure streak
          setQueuePos(null);
          setAi("live");
        } else if (state === "reconnecting") {
          setAi("reconnecting");
        } else if (state === "disconnected") {
          scheduleReconnect();
        }
      });

      /* Exact billed seconds, straight from the engine. Cost accrues at the rate
         in force when the tick arrives, so a mid-day switch to cheap mode is
         reflected honestly instead of retroactively repricing the whole day.

         The spend guards live HERE rather than in a React effect: this handler
         fires only while money is actually being spent, so it cannot drift, be
         skipped by a stale closure, or fail to re-arm after a reconnect. A
         timer-based guard let a test run 146s when it should have capped at 45. */
      runSecondsRef.current = 0;
      rt.on("generationTick", (tick: { seconds: number }) => {
        billedRef.current += tick.seconds;
        runSecondsRef.current += tick.seconds;
        costRef.current += tick.seconds * AI_MODES[modeRef.current].usdPerSec;
        setBilled(billedRef.current);
        setCost(costRef.current);

        if (runSecondsRef.current >= MAX_RUN_SECONDS) { stopAiRef.current("capped"); return; }
        if (Date.now() - lastActiveRef.current > IDLE_STOP_MS) stopAiRef.current("asleep");
      });

      /* The 5-minute server-side cap lands here. Expected, not an error —
         reconnect immediately so a guest mid-transformation never sees it. */
      rt.on("generationEnded", () => {
        if (wantAiRef.current) scheduleReconnect(400);
      });

      rt.on("error", (e: unknown) => {
        console.error("[live] Lucy error:", e);
        scheduleReconnect();
      });
    } catch (err) {
      console.error("[live] Lucy connect failed:", err);
      connectingRef.current = false;
      scheduleReconnect();
    }
    // scheduleReconnect is hoisted below and stable via refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  connectAiRef.current = connectAi;

  const scheduleReconnect = useCallback((delay?: number) => {
    if (!wantAiRef.current) return;
    if (retryTimerRef.current) return; // one flight at a time

    try { rtRef.current?.disconnect(); } catch { /* already gone */ }
    rtRef.current = null;
    connectingRef.current = false;

    if (retryRef.current >= MAX_RETRIES) {
      setAi("error");
      wantAiRef.current = false;
      return;
    }

    const wait = delay ?? Math.min(1000 * 2 ** retryRef.current, 8000);
    retryRef.current += 1;
    setAi("reconnecting");
    retryTimerRef.current = setTimeout(() => {
      retryTimerRef.current = null;
      void connectAiRef.current();
    }, wait);
  }, []);

  const startAi = useCallback(() => {
    if (cam !== "live") return;
    wantAiRef.current = true;
    retryRef.current = 0;
    lastActiveRef.current = Date.now();
    setAi("checking");
    void connectAiRef.current();
  }, [cam]);

  const stopAi = useCallback((next: AiState) => {
    wantAiRef.current = false;
    runSecondsRef.current = 0;
    teardownAi();
    setAi(next);
    setQueuePos(null);
  }, [teardownAi]);

  stopAiRef.current = stopAi;

  /* Real gestures, captured at the window. React's synthetic handlers on the
     wrapper miss touch on some devices and anything dispatched programmatically,
     which is precisely how the idle timer got starved of "still busy" signals. */
  useEffect(() => {
    const mark = () => { lastActiveRef.current = Date.now(); };
    const opts = { passive: true, capture: true } as const;
    window.addEventListener("pointerdown", mark, opts);
    window.addEventListener("keydown", mark, opts);
    window.addEventListener("touchstart", mark, opts);
    return () => {
      window.removeEventListener("pointerdown", mark, opts);
      window.removeEventListener("keydown", mark, opts);
      window.removeEventListener("touchstart", mark, opts);
    };
  }, []);

  /* Switching camera mid-session must also move the AI uplink onto the new
     track, otherwise Lucy keeps streaming the old device. Declared here, after
     teardownAi, so the deps array isn't evaluated against an uninitialised const. */
  const switchCamera = useCallback(async (id: string) => {
    const wasAi = wantAiRef.current;
    wantAiRef.current = false;
    teardownAi();
    setAi("idle");
    await startCamera(id);
    if (wasAi) { wantAiRef.current = true; retryRef.current = 0; void connectAiRef.current(); }
  }, [startCamera, teardownAi]);

  /* Mode change swaps the underlying model, so the session must be rebuilt.
     Prompts are mode-specific, so move to the matching preset too rather than
     carrying a costume prompt onto a style-transfer model. */
  const switchMode = useCallback((next: AiMode) => {
    if (next === modeRef.current) return;
    modeRef.current = next;
    setMode(next);
    setAiChip(0);
    promptRef.current = AI_MODES[next].prompts[0].prompt;
    lastActiveRef.current = Date.now();
    if (wantAiRef.current) {
      teardownAi();
      retryRef.current = 0;
      setAi("connecting");
      void connectAiRef.current();
    }
  }, [teardownAi]);

  const applyPrompt = useCallback((text: string) => {
    promptRef.current = text;
    lastActiveRef.current = Date.now();
    if (rtRef.current) void rtRef.current.setPrompt(text, { enhance: true });
    else if (engine === "ai" && cam === "live" && !wantAiRef.current) startAi();
  }, [engine, cam, startAi]);

  const switchEngine = useCallback((next: Engine) => {
    setEngine(next);
    lastActiveRef.current = Date.now();
    if (next === "ai") startAi();
    else stopAi("idle");
  }, [startAi, stopAi]);

  /* Backstop only. The authoritative spend guards run inside generationTick
     (see connectAi); this catches the case where the uplink is up but no ticks
     arrive at all, so billing state can't get stuck invisible. */
  useEffect(() => {
    if (ai !== "live" && ai !== "reconnecting" && ai !== "queued") return;
    const iv = setInterval(() => {
      if (Date.now() - lastActiveRef.current > IDLE_STOP_MS * 2) stopAiRef.current("asleep");
    }, 5000);
    return () => clearInterval(iv);
  }, [ai]);

  const markActive = useCallback(() => { lastActiveRef.current = Date.now(); }, []);

  /* ── lifecycle ── */
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
      wantAiRef.current = false;
      try { rtRef.current?.disconnect(); } catch { /* already gone */ }
      streamRef.current?.getTracks().forEach((tr) => tr.stop());
    };
  }, []);

  const goFullscreen = useCallback(() => {
    frameRef.current?.requestFullscreen?.().catch(() => {});
  }, []);

  const aiActive = engine === "ai" && ai === "live";
  const activeMode = AI_MODES[mode];

  /* ─────────────────────────────── render ────────────────────────────── */

  return (
    <div className="w-full" onPointerDown={markActive} onKeyDown={markActive}>
      {/* the monitor */}
      <div
        ref={frameRef}
        className="relative w-full aspect-[4/3] sm:aspect-video bg-ink-200 overflow-hidden select-none"
      >
        {/* raw camera — texture source, never shown directly */}
        <video ref={videoRef} playsInline muted className="absolute w-px h-px opacity-0 pointer-events-none" />

        {/* local engine output */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            cam === "live" && !aiActive ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Lucy output */}
        <video
          ref={aiVideoRef}
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            aiActive ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* idle / permission states */}
        {cam !== "live" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
            <div className="font-nataka font-black uppercase tracking-widest2 text-[10px] text-teal/70">
              NTK-LIVE · SIGNAL STANDBY
            </div>
            {cam === "idle" && (
              <>
                <p className="font-display text-3xl sm:text-4xl text-cream/90 max-w-md leading-tight">
                  The mirror is off until you switch it on.
                </p>
                <button
                  onClick={() => startCamera()}
                  className="font-nataka font-black uppercase tracking-widest2 text-xs bg-teal text-ink px-8 py-4 hover:bg-teal-light transition-colors"
                >
                  Start the mirror
                </button>
                <p className="text-cream/40 text-xs max-w-xs">
                  Uses your camera, on this device. Nothing is recorded, nothing is uploaded in Looks mode.
                </p>
              </>
            )}
            {cam === "starting" && (
              <p className="font-nataka font-black uppercase tracking-widest2 text-xs text-cream/60 animate-pulse">
                Acquiring signal…
              </p>
            )}
            {cam === "denied" && (
              <>
                <p className="font-display text-2xl text-cream/90 max-w-md">Camera access was blocked.</p>
                <p className="text-cream/50 text-sm max-w-sm">
                  Allow camera access for this site in your browser bar, then press start again.
                </p>
                <button
                  onClick={() => startCamera()}
                  className="font-nataka font-black uppercase tracking-widest2 text-xs border border-teal text-teal px-8 py-4 hover:bg-teal hover:text-ink transition-colors"
                >
                  Try again
                </button>
              </>
            )}
            {cam === "busy" && (
              <>
                <p className="font-display text-2xl text-cream/90 max-w-md">
                  Camera found, but it isn&apos;t sending video.
                </p>
                <p className="text-cream/50 text-sm max-w-sm">
                  If this is the OBS Virtual Camera, open OBS and press{" "}
                  <span className="text-teal">Start Virtual Camera</span>. Otherwise close
                  whatever app is already holding the camera, then try again.
                </p>
                <button
                  onClick={() => startCamera()}
                  className="font-nataka font-black uppercase tracking-widest2 text-xs border border-teal text-teal px-8 py-4 hover:bg-teal hover:text-ink transition-colors"
                >
                  Try again
                </button>
              </>
            )}
            {cam === "nocam" && (
              <p className="font-display text-2xl text-cream/90 max-w-md">
                No camera on this device. Connect the a7 IV (USB or Cam Link), or start the
                OBS Virtual Camera.
              </p>
            )}
          </div>
        )}

        {/* viewfinder OSD */}
        {cam === "live" && (
          <>
            {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map(
              (pos) => (
                <div key={pos} className={`absolute ${pos} w-6 h-6 border-teal/60 pointer-events-none`} />
              ),
            )}
            <div className="absolute top-4 inset-x-0 px-8 flex items-center justify-between pointer-events-none font-nataka font-black uppercase tracking-widest2 text-[9px] sm:text-[10px]">
              <span className="flex items-center gap-2 text-cream/80">
                <span className="w-2 h-2 rounded-full bg-[#D61F2C] animate-pulse" />
                LIVE
              </span>
              <span className="text-teal/80">
                {aiActive ? `AI · ${activeMode.model.toUpperCase()}` : `LOOK · ${LOOKS[look].name}`}
              </span>
              <span className="text-cream/60">{clock}</span>
            </div>
            <div className="absolute bottom-4 inset-x-0 px-8 flex items-center justify-between pointer-events-none font-nataka font-black uppercase tracking-widest2 text-[9px] sm:text-[10px] text-cream/50">
              <span>NTK-LIVE 01 · NAIROBI</span>
              <span className="hidden sm:inline">
                {engine === "ai" ? "DECART UPLINK" : "ON-DEVICE GPU"}
                {quality && engine === "ai" && (
                  <span className={quality === "good" ? "text-teal/70" : quality === "fair" ? "text-[#F5C542]" : "text-[#D61F2C]"}>
                    {" "}· LINK {quality.toUpperCase()}
                  </span>
                )}
              </span>
              <span className="text-teal/70">{fps} FPS</span>
            </div>

            {/* AI status — every state says what to do next, never a black screen */}
            {engine === "ai" && ai !== "live" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
                <div className="bg-ink/85 px-6 py-5 text-center max-w-sm pointer-events-auto">
                  <p className="font-nataka font-black uppercase tracking-widest2 text-[10px] text-teal">
                    {ai === "checking" && "Checking AI engine…"}
                    {ai === "connecting" && "Connecting to Lucy 2.5"}
                    {ai === "reconnecting" && "Reconnecting — hold still"}
                    {ai === "queued" && `In queue${queuePos !== null ? ` · position ${queuePos}` : ""}`}
                    {ai === "asleep" && "Mirror asleep — saving credit"}
                    {ai === "capped" && "Session limit reached — tap to continue"}
                    {ai === "offline" && "AI engine offline on this deployment"}
                    {ai === "exhausted" && "AI credit finished"}
                    {ai === "error" && "AI engine unreachable"}
                    {ai === "forbidden" && "Booth code missing or wrong"}
                  </p>
                  {(ai === "asleep" || ai === "capped" || ai === "error" || ai === "exhausted" || ai === "forbidden") && (
                    <p className="mt-2 text-cream/50 text-xs">
                      {ai === "asleep" || ai === "capped"
                        ? "Tap to wake it for the next guest."
                        : "Instant Looks still run — switch tab to keep the booth moving."}
                    </p>
                  )}
                  {(ai === "asleep" || ai === "capped" || ai === "error") && (
                    <button
                      onClick={startAi}
                      className="mt-4 font-nataka font-black uppercase tracking-widest2 text-[10px] bg-teal text-ink px-6 py-3 hover:bg-teal-light transition-colors"
                    >
                      {ai === "asleep" || ai === "capped" ? "Wake the mirror" : "Retry"}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* operator cost meter — booth mode only */}
            {booth && billed > 0 && (
              <div className="absolute top-12 right-8 text-right pointer-events-none font-nataka font-black uppercase tracking-widest2 text-[9px]">
                <div className="text-cream/40">AI SECONDS {Math.round(billed)}</div>
                <div className="text-teal/80">
                  {Math.round(cost * CREDITS_PER_USD).toLocaleString()} CREDITS · KES{" "}
                  {Math.round(cost * KES_PER_USD).toLocaleString()}
                </div>
                <div className="text-cream/30">
                  {activeMode.label.split(" ")[0]} · KES {(activeMode.usdPerSec * KES_PER_USD).toFixed(2)}/S
                </div>
              </div>
            )}

            <button
              onClick={goFullscreen}
              aria-label="Fullscreen booth mode"
              className="absolute top-3 right-3 sm:top-auto sm:bottom-12 sm:right-8 w-8 h-8 hidden sm:flex items-center justify-center text-cream/40 hover:text-teal transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 5V1h4M13 5V1H9M1 9v4h4M13 9v4H9" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* engine switch + preset rail */}
      <div className="border border-cream/10 border-t-0">
        <div className="flex font-nataka font-black uppercase tracking-widest2 text-[10px]">
          <button
            onClick={() => switchEngine("looks")}
            className={`flex-1 py-4 transition-colors ${
              engine === "looks" ? "bg-teal text-ink" : "bg-ink-100 text-cream/50 hover:text-cream"
            }`}
          >
            Instant looks
          </button>
          <button
            onClick={() => switchEngine("ai")}
            className={`flex-1 py-4 transition-colors ${
              engine === "ai" ? "bg-teal text-ink" : "bg-ink-100 text-cream/50 hover:text-cream"
            }`}
          >
            AI engine · Lucy 2.5
          </button>
        </div>

        {/* Camera picker — a booth with a Cam Link has several video inputs and
            the browser default is almost never the a7 IV. */}
        {cam === "live" && cameras.length > 1 && (
          <div className="px-4 pt-4 flex items-center gap-3">
            <span className="font-nataka font-black uppercase tracking-widest2 text-[9px] text-cream/40 shrink-0">
              Source
            </span>
            <select
              value={deviceId}
              onChange={(e) => void switchCamera(e.target.value)}
              className="flex-1 bg-ink-100 border border-cream/15 focus:border-teal outline-none text-cream/80 text-xs px-3 py-2"
            >
              {cameras.map((d, i) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label || `Camera ${i + 1}`}
                </option>
              ))}
            </select>
          </div>
        )}

        {engine === "looks" ? (
          <div className="flex gap-2 p-4 overflow-x-auto">
            {LOOKS.map((lk) => (
              <button
                key={lk.id}
                onClick={() => setLook(lk.id)}
                className={`shrink-0 px-4 py-3 border font-nataka font-black uppercase tracking-widest2 text-[9px] transition-colors ${
                  look === lk.id
                    ? "border-teal text-teal"
                    : "border-cream/15 text-cream/50 hover:border-cream/40 hover:text-cream"
                }`}
              >
                <span className="block">{lk.name}</span>
                <span className="block mt-1 text-[8px] opacity-50">{lk.tag}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {/* Cheap mode halves the running cost. Worth a visible switch, not a
                buried setting — it is the single biggest lever on booth margin. */}
            <div className="flex gap-2">
              {(Object.keys(AI_MODES) as AiMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className={`flex-1 px-3 py-3 border text-left transition-colors ${
                    mode === m
                      ? "border-teal text-teal"
                      : "border-cream/15 text-cream/45 hover:border-cream/40 hover:text-cream"
                  }`}
                >
                  <span className="block font-nataka font-black uppercase tracking-widest2 text-[9px]">
                    {AI_MODES[m].label}
                  </span>
                  <span className="block mt-1 text-[10px] opacity-60 normal-case tracking-normal">
                    {AI_MODES[m].blurb}
                  </span>
                  <span className="block mt-1 font-nataka font-black uppercase tracking-widest2 text-[8px] opacity-50">
                    KES {(AI_MODES[m].usdPerSec * KES_PER_USD).toFixed(2)}/sec
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {activeMode.prompts.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => { setAiChip(i); applyPrompt(p.prompt); }}
                  className={`shrink-0 px-4 py-3 border font-nataka font-black uppercase tracking-widest2 text-[9px] transition-colors ${
                    aiChip === i
                      ? "border-teal text-teal"
                      : "border-cream/15 text-cream/50 hover:border-cream/40 hover:text-cream"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* Free text is a liability on a public booth screen — booth mode
                hides it and leaves only the curated presets. */}
            {!booth && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (customPrompt.trim()) { setAiChip(-1); applyPrompt(customPrompt.trim()); }
                }}
                className="flex gap-2"
              >
                <input
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Type your own world — “rooftop in Tokyo at night, raining”"
                  className="flex-1 bg-ink-100 border border-cream/15 focus:border-teal outline-none text-cream text-sm px-4 py-3 placeholder:text-cream/30"
                />
                <button
                  type="submit"
                  className="font-nataka font-black uppercase tracking-widest2 text-[10px] border border-teal text-teal px-5 hover:bg-teal hover:text-ink transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
