"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/**
 * BTS popup — a small story-style video card that slides in once the visitor
 * scrolls past the hero, sitting directly above the floating Otamatsuri
 * countdown (pill: bottom-24/28 at z-9975; this: above it at z-9974).
 *
 * Clips are 8s, 480x854, ~300KB each, muted — they cycle automatically.
 * Nothing loads until the popup is actually shown.
 */

const CLIPS = [1, 2, 3, 4, 5].map((n) => ({
  src: `/bts/bts-${n}.mp4`,
  poster: `/bts/bts-${n}-poster.jpg`,
}));

const DISMISS_KEY = "otamatsuri-bts-dismissed";

export default function BtsPopup() {
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true); // hidden until storage is checked
  const [reducedMotion, setReducedMotion] = useState(false);
  const [userStarted, setUserStarted] = useState(false);
  const [clip, setClip] = useState(0);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    // "a little past the hero" — most heroes here are ~100vh
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
   * Keep it playing. A single play() call is not enough: Chrome pauses muted
   * media "to save power" (AbortError: video-only background media was paused)
   * — especially mid entrance-animation, when the card is still near opacity 0.
   * The clips now carry a silent audio track so they aren't classed as
   * video-only, and this poll re-starts anything that gets paused out from
   * under us. It stops as soon as the card is hidden or dismissed.
   */
  useEffect(() => {
    if (!visible || dismissed || (reducedMotion && !userStarted)) return;

    const tryPlay = () => {
      const v = videoRef.current;
      if (v && v.paused) v.play().catch(() => {});
    };
    tryPlay();
    const id = setInterval(tryPlay, 1000);
    return () => clearInterval(id);
  }, [visible, dismissed, reducedMotion, userStarted, clip]);

  const hide = () => {
    setDismissed(true);
    try { sessionStorage.setItem(DISMISS_KEY, "1"); } catch { /* private mode */ }
  };

  // The event page already tells the full story, and the countdown pill this
  // anchors to is hidden there.
  if (pathname === "/otamatsuri-2026") return null;

  const show = visible && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.92 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-40 right-4 md:bottom-[11.5rem] md:right-8 z-[9974]"
        >
          <div className="relative">
            <Link
              href="/community#drops"
              aria-label="Behind the scenes of the new Otamatsuri film — see the drop log"
              className="group block w-32 md:w-40 overflow-hidden rounded-xl border border-otaku/50 hover:border-otaku bg-ink shadow-lg shadow-black/60 transition-colors"
            >
              <div className="relative aspect-[9/16]">
                <video
                  ref={videoRef}
                  key={CLIPS[clip].src}
                  src={CLIPS[clip].src}
                  poster={CLIPS[clip].poster}
                  muted
                  playsInline
                  autoPlay={!reducedMotion || userStarted}
                  preload="auto"
                  onCanPlay={(e) => {
                    if (!reducedMotion || userStarted) e.currentTarget.play().catch(() => {});
                  }}
                  onEnded={() => setClip((c) => (c + 1) % CLIPS.length)}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Label */}
                <div className="absolute inset-x-0 top-0 p-2 bg-gradient-to-b from-ink/85 to-transparent">
                  <p className="font-sans text-[8px] tracking-widest2 uppercase text-otaku-light font-medium flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5" aria-hidden>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-otaku opacity-60" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-otaku" />
                    </span>
                    BTS · New Film
                  </p>
                </div>

                {/* Progress dots */}
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-ink/85 to-transparent flex items-center justify-between">
                  <div className="flex gap-1">
                    {CLIPS.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i === clip ? "w-3 bg-otaku" : "w-1 bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-sans text-[8px] tracking-widest uppercase text-white/60 group-hover:text-otaku-light transition-colors">
                    More →
                  </span>
                </div>
              </div>
            </Link>

            {/* Visitors who asked for reduced motion get a still with an opt-in
                play control rather than video starting at them unannounced. */}
            {reducedMotion && !userStarted && (
              <button
                type="button"
                onClick={() => {
                  setUserStarted(true);
                  videoRef.current?.play().catch(() => {});
                }}
                aria-label="Play the behind-the-scenes clips"
                className="absolute inset-0 z-10 flex items-center justify-center bg-ink/45 rounded-xl hover:bg-ink/30 transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-otaku text-ink flex items-center justify-center text-[11px] pl-0.5">
                  ▶
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={hide}
              aria-label="Hide the behind-the-scenes videos"
              className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-ink border border-white/25 text-white/60 hover:text-white hover:border-white/50 flex items-center justify-center text-xs leading-none transition-colors"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
