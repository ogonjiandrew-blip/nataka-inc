"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/*
 * Photocard maker — the K-pop collectible, made Kenyan.
 * Everything runs in the visitor's browser: pick a frame, type a name,
 * download a collector-style card. No accounts, no uploads, no backend.
 */

const BASE = "/stills/otamatsuri/community";

const FRAMES = [
  { n: 1,  label: "The Oath" },
  { n: 19, label: "Standoff" },
  { n: 5,  label: "Crimson" },
  { n: 12, label: "Skyward" },
  { n: 17, label: "Golden Hour" },
  { n: 14, label: "Windswept" },
];

const THEMES = {
  otaku: { name: "ANIME", accent: "#FF6B54", deep: "#E8442E", tagline: "OTAMATSURI · KENYA" },
  kpop:  { name: "K-POP", accent: "#FF8FB8", deep: "#FF3D7F", tagline: "K-WAVE · KENYA" },
} as const;

type ThemeKey = keyof typeof THEMES;

// Card canvas — classic photocard proportions (11:17)
const W = 1080;
const H = 1670;
// The stills are 1920x1080 with ~140px letterbox bars; this is the content band.
const SRC_TOP = 140;
const SRC_H = 800;

function serialFor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return String((h % 899) + 100);
}

function roundedPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function star(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  // 4-point sparkle
  ctx.moveTo(cx, cy - size);
  ctx.quadraticCurveTo(cx + size * 0.12, cy - size * 0.12, cx + size, cy);
  ctx.quadraticCurveTo(cx + size * 0.12, cy + size * 0.12, cx, cy + size);
  ctx.quadraticCurveTo(cx - size * 0.12, cy + size * 0.12, cx - size, cy);
  ctx.quadraticCurveTo(cx - size * 0.12, cy - size * 0.12, cx, cy - size);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// Deterministic sparkle positions so the same card always renders the same
const SPARKLES: Array<[number, number, number, number]> = [
  [150, 240, 26, 0.85], [935, 180, 18, 0.7], [880, 520, 30, 0.55],
  [120, 760, 16, 0.6], [990, 1010, 22, 0.75], [180, 1180, 28, 0.5],
];

export default function PhotocardMaker() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgCache = useRef<Map<number, HTMLImageElement>>(new Map());

  const [frame, setFrame] = useState(FRAMES[0]);
  const [theme, setTheme] = useState<ThemeKey>("otaku");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  const loadFrame = useCallback((n: number): Promise<HTMLImageElement> => {
    const cached = imgCache.current.get(n);
    if (cached) return Promise.resolve(cached);
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => { imgCache.current.set(n, img); resolve(img); };
      img.onerror = reject;
      img.src = `${BASE}/${n}.jpg`;
    });
  }, []);

  const draw = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = await loadFrame(frame.n);
    const t = THEMES[theme];
    const displayName = name.trim().slice(0, 18).toUpperCase();

    ctx.clearRect(0, 0, W, H);

    // Rounded-corner clip for the whole card
    ctx.save();
    roundedPath(ctx, 0, 0, W, H, 64);
    ctx.clip();

    // Photo — portrait centre-crop from the letterbox-free band of the still
    const srcW = SRC_H * (W / H);
    const srcX = (img.width - srcW) / 2;
    ctx.fillStyle = "#080808";
    ctx.fillRect(0, 0, W, H);
    ctx.drawImage(img, srcX, SRC_TOP, srcW, SRC_H, 0, 0, W, H);

    // Bottom gradient for text legibility
    const grad = ctx.createLinearGradient(0, H * 0.55, 0, H);
    grad.addColorStop(0, "rgba(8,8,8,0)");
    grad.addColorStop(1, "rgba(8,8,8,0.92)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Soft top gradient for the header chips
    const topGrad = ctx.createLinearGradient(0, 0, 0, 260);
    topGrad.addColorStop(0, "rgba(8,8,8,0.55)");
    topGrad.addColorStop(1, "rgba(8,8,8,0)");
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, W, 260);

    // Sparkles
    for (const [x, y, s, a] of SPARKLES) star(ctx, x, y, s, a * 0.5);

    // CSS font shorthand: weight BEFORE size, or the whole string is ignored
    const heavy = (size: number) => `900 ${size}px "Arial Black", Arial, sans-serif`;

    // Header — brand tag left, serial right
    ctx.fillStyle = "#FFFFFF";
    ctx.font = heavy(44);
    ctx.textBaseline = "top";
    ctx.fillText("OTAMATSURI", 72, 78);
    ctx.fillStyle = t.accent;
    ctx.font = heavy(26);
    const serial = `OTM-26 · NO.${serialFor(displayName || frame.label)}`;
    const sw = ctx.measureText(serial).width;
    ctx.fillText(serial, W - 72 - sw, 90);

    // Footer — accent rule, fan name, tagline
    ctx.fillStyle = t.deep;
    ctx.fillRect(72, H - 320, 120, 10);

    if (displayName) {
      ctx.fillStyle = "#FFFFFF";
      ctx.font = heavy(displayName.length > 12 ? 88 : 108);
      ctx.fillText(displayName, 72, H - 272);
    } else {
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.font = heavy(108);
      ctx.fillText(frame.label.toUpperCase(), 72, H - 272);
    }

    ctx.fillStyle = t.accent;
    ctx.font = heavy(30);
    ctx.fillText(t.tagline, 72, H - 140);
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = heavy(24);
    const brand = "NATAKA.INC";
    const bw = ctx.measureText(brand).width;
    ctx.fillText(brand, W - 72 - bw, H - 136);

    ctx.restore();

    // Theme border on top of everything
    ctx.save();
    roundedPath(ctx, 10, 10, W - 20, H - 20, 56);
    ctx.strokeStyle = t.deep;
    ctx.lineWidth = 20;
    ctx.stroke();
    roundedPath(ctx, 34, 34, W - 68, H - 68, 40);
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  }, [frame, theme, name, loadFrame]);

  useEffect(() => {
    draw();
  }, [draw]);

  const download = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setBusy(true);
    try {
      await draw();
      canvas.toBlob((blob) => {
        if (!blob) { setBusy(false); return; }
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        const who = name.trim() ? name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") : frame.label.toLowerCase().replace(/\s+/g, "-");
        a.download = `otamatsuri-photocard-${who}.png`;
        a.click();
        URL.revokeObjectURL(a.href);
        setBusy(false);
      }, "image/png");
    } catch {
      setBusy(false);
    }
  };

  const t = THEMES[theme];

  return (
    <section id="photocard" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24" ref={ref}>
      <div className="flex items-center gap-3 mb-6">
        <span className="h-px w-10" style={{ background: t.deep }} />
        <p className="font-sans text-[10px] tracking-widest2 uppercase font-medium" style={{ color: t.accent }}>
          Make Yours · Free
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
        <h2 className="leading-none">
          <span className="font-geist font-black text-[clamp(1.8rem,6vw,4.5rem)] text-white uppercase block">
            Your Name.
          </span>
          <span className="font-display font-semibold italic text-[clamp(1.8rem,6vw,4.5rem)] block" style={{ color: t.deep }}>
            On a Photocard.
          </span>
        </h2>
        <p className="font-sans text-white/65 text-sm leading-relaxed max-w-sm">
          Pick a frame from the Otamatsuri shoot, put your name on it, and download your
          own collector card. Post it, set it as your status, trade it — it&apos;s yours.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start"
      >
        {/* Controls */}
        <div className="space-y-8 max-w-xl">
          <div>
            <p className="font-sans text-[10px] text-white/50 tracking-widest uppercase mb-3 font-medium">1 · Pick your side</p>
            <div className="flex gap-2">
              {(Object.keys(THEMES) as ThemeKey[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTheme(k)}
                  aria-pressed={theme === k}
                  className="font-geist font-black text-xs px-6 py-3.5 uppercase tracking-widest border transition-colors duration-200"
                  style={
                    theme === k
                      ? { background: THEMES[k].deep, borderColor: THEMES[k].deep, color: k === "kpop" ? "#fff" : "#080808" }
                      : { borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.65)" }
                  }
                >
                  {THEMES[k].name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-sans text-[10px] text-white/50 tracking-widest uppercase mb-3 font-medium">2 · Pick a frame</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {FRAMES.map((f) => (
                <button
                  key={f.n}
                  type="button"
                  onClick={() => setFrame(f)}
                  aria-pressed={frame.n === f.n}
                  className={`relative aspect-square overflow-hidden border-2 transition-colors duration-200 ${
                    frame.n === f.n ? "" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  style={frame.n === f.n ? { borderColor: t.deep } : undefined}
                  title={f.label}
                >
                  <Image
                    src={`${BASE}/${f.n}.jpg`}
                    alt={`Photocard frame — ${f.label}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                    quality={50}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-sans text-[10px] text-white/50 tracking-widest uppercase mb-3 font-medium">3 · Your name or handle</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={18}
              placeholder="e.g. WANJIKU or @kenyanotaku"
              className="w-full bg-ink border border-white/15 text-white/85 font-sans text-sm px-4 py-3.5 focus:outline-none transition-colors placeholder:text-white/40"
              style={{ borderColor: name ? t.deep : undefined }}
            />
          </div>

          <button
            type="button"
            onClick={download}
            disabled={busy}
            className="font-geist font-black text-xs px-8 py-4 uppercase tracking-widest transition-colors duration-200 disabled:opacity-60"
            style={{ background: t.deep, color: theme === "kpop" ? "#fff" : "#080808" }}
          >
            {busy ? "Making it…" : "Download My Card ↓"}
          </button>

          <p className="font-sans text-white/35 text-[11px] leading-relaxed">
            Made in your browser — your name never leaves your phone. Card frames are from
            the Otamatsuri shoot by Nataka Inc.
          </p>
        </div>

        {/* Live preview */}
        <div className="mx-auto lg:mx-0">
          <div
            className="relative"
            style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6))" }}
          >
            <canvas
              ref={canvasRef}
              width={W}
              height={H}
              className="w-[240px] md:w-[300px] h-auto rounded-2xl"
              aria-label="Photocard preview"
            />
          </div>
          <p className="font-sans text-white/40 text-[10px] tracking-widest uppercase text-center mt-4">
            Live preview
          </p>
        </div>
      </motion.div>
    </section>
  );
}
