"use client";

/**
 * Cinematic preloader — shown once per browser session.
 * Film stills flicker like a projector warming up, the NATAKA letters
 * rise in, a mono word-cycle scrambles underneath, the counter runs
 * 0→100, then a double curtain (teal chasing ink) sweeps the screen up.
 *
 * `?loader=1` forces it to show again (testing hook).
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = "NATAKA".split("");

const FLICKER_IMAGES = [
  "/stills/1/1.jpg",
  "/stills/4/1.jpg",
  "/stills/1/7.jpg",
  "/stills/4/4.jpg",
  "/stills/ssaru/2.jpg",
  "/stills/1/5.jpg",
];

const WORDS = ["FILM", "MUSIC VIDEOS", "BRAND", "CAMPAIGNS", "NAIROBI"];
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/\\*#";

const DURATION = 2300;

export default function Preloader() {
  const [show, setShow] = useState<boolean | null>(null);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [frame, setFrame] = useState(0);
  const [word, setWord] = useState(WORDS[0]);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("loader");
    const force = param !== null;
    const hold = param === "hold"; // freeze open for layout inspection
    if (sessionStorage.getItem("nataka-loaded") && !force) {
      setShow(false);
      return;
    }
    setShow(true);
    sessionStorage.setItem("nataka-loaded", "1");

    // counter — fast start, slow landing
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else if (!hold) setTimeout(() => setDone(true), 300);
    };
    raf = requestAnimationFrame(tick);

    // projector flicker — quick cuts between stills
    const flicker = setInterval(() => setFrame((f) => f + 1), 240);

    // word cycle with scramble settle
    let wordIdx = 0;
    const cycleWord = () => {
      wordIdx = (wordIdx + 1) % WORDS.length;
      const target = WORDS[wordIdx];
      let step = 0;
      const STEPS = 8;
      const scramble = setInterval(() => {
        step++;
        setWord(
          target
            .split("")
            .map((ch, i) =>
              ch === " " ? " " :
              i < (step / STEPS) * target.length
                ? ch
                : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            )
            .join("")
        );
        if (step >= STEPS) clearInterval(scramble);
      }, 35);
    };
    const wordTimer = setInterval(cycleWord, 520);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(flicker);
      clearInterval(wordTimer);
    };
  }, []);

  if (show === false || show === null) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[99999] bg-ink overflow-hidden"
          aria-hidden
        >
          {/* teal chase layer — lags slightly behind the ink curtain on exit */}
          <motion.div
            exit={{ y: "-100%" }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-x-0 bottom-0 h-full bg-teal translate-y-full"
          />

          {/* flickering stills — projector warming up.
              Mobile: full-bleed backdrop (no box edges cutting through the text).
              Desktop: framed viewfinder box. */}
          <div className="absolute inset-0 md:hidden overflow-hidden opacity-[0.10]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FLICKER_IMAGES[frame % FLICKER_IMAGES.length]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "grayscale(0.4) contrast(1.1)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "repeating-linear-gradient(0deg, rgba(8,8,8,0.4) 0 1px, transparent 1px 3px)",
              }}
            />
          </div>
          <div className="absolute inset-0 hidden md:flex items-center justify-center">
            <div className="relative w-[68vw] max-w-[460px] aspect-[4/3] overflow-hidden opacity-[0.16]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FLICKER_IMAGES[frame % FLICKER_IMAGES.length]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "grayscale(0.4) contrast(1.1)" }}
              />
              {/* scan-line shimmer */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, rgba(8,8,8,0.4) 0 1px, transparent 1px 3px)",
                }}
              />
            </div>
          </div>

          {/* frame markers — corners, like a viewfinder */}
          <div className="absolute inset-8 md:inset-14 pointer-events-none">
            {(["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
               "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"] as const).map((pos) => (
              <motion.span
                key={pos}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className={`absolute w-6 h-6 border-white/25 ${pos}`}
              />
            ))}
          </div>

          {/* centre stack */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* REC dot + roll text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="font-mono text-[10px] text-white/45 tracking-[0.35em] uppercase">
                Roll Camera
              </span>
            </motion.div>

            {/* logo letters rise in */}
            <div className="flex overflow-hidden mb-4">
              {LETTERS.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="font-nataka font-black text-[clamp(2.8rem,10vw,6.5rem)] text-white leading-none tracking-tight"
                >
                  {l}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.85, duration: 0.35, ease: "backOut" }}
                className="font-nataka font-black text-[clamp(2.8rem,10vw,6.5rem)] text-teal leading-none"
              >
                .
              </motion.span>
            </div>

            {/* scrambling word cycle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-mono text-[11px] text-teal tracking-[0.45em] uppercase mb-12 h-4 tabular-nums"
            >
              {word}
            </motion.p>

            {/* progress line */}
            <div className="w-[220px] h-px bg-white/10 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-teal transition-[width] duration-100 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* counter bottom-right */}
          <div className="absolute bottom-6 right-7 md:bottom-10 md:right-12 flex items-baseline gap-1">
            <span className="font-geist font-black text-6xl md:text-8xl text-white/12 tabular-nums leading-none">
              {String(pct).padStart(3, "0")}
            </span>
            <span className="font-mono text-xs text-teal/60">%</span>
          </div>

          {/* timecode bottom-left — like a camera HUD */}
          <span className="absolute bottom-8 left-7 md:bottom-12 md:left-12 font-mono text-[10px] text-white/30 tracking-[0.25em] tabular-nums">
            TC 00:00:{String(Math.floor(pct / 4)).padStart(2, "0")}:{String(pct % 25).padStart(2, "0")}
          </span>

          {/* est. label top-centre */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-[9px] md:text-[10px] text-white/35 tracking-[0.2em] md:tracking-[0.35em] uppercase whitespace-nowrap"
          >
            Nataka Inc — Nairobi, KE
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
