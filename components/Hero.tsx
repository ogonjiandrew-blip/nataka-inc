"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTextScramble } from "@/hooks/useTextScramble";
import MagneticButton from "@/components/MagneticButton";
import LetterReveal from "@/components/LetterReveal";

function useCountUp(target: number, trigger: boolean, duration = 1800) {
  // Seed with the real target so SSR, no-JS, crawlers and the pre-animation
  // frame all show the correct number — never a frozen "0+".
  const [val, setVal] = useState(target);
  useEffect(() => {
    if (!trigger) return;
    setVal(0);
    const start = performance.now();
    const tick = (now: number) => {
      const p    = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [trigger, target, duration]);
  return val;
}

const stats = [
  { target: 150, suffix: "+", label: "Campaigns Delivered" },
  { target: 80,  suffix: "+", label: "Brands Elevated"     },
  { target: 4,   suffix: "+", label: "Years of Impact"     },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Trigger entrance immediately on mount — faster hero paint / better LCP
    setReady(true);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0.52, 0.92]);
  const textY          = useTransform(scrollYProgress, [0, 1],   ["0%", "22%"]);
  const textOpacity    = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const line1 = useTextScramble("WE CREATE",  ready, 400);
  const line2 = useTextScramble("WHAT MOVES", ready, 700);
  const line3 = useTextScramble("PEOPLE.",    ready, 1000);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden">

      {/* Video */}
      {/* 14KB poster paints immediately (fast LCP); the montage streams in behind it */}
      <video src="/videos/hero.mp4" autoPlay muted loop playsInline preload="metadata"
        poster="/videos/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover" />

      {/* Base overlay */}
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-ink pointer-events-none" />

      {/* Hard gradient at the bottom — gives the text a solid ground to sit on */}
      <div className="absolute bottom-0 inset-x-0 h-[70%] bg-gradient-to-t from-ink via-ink/80 to-transparent pointer-events-none" />

      {/* Top vignette for nav legibility */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-ink/75 to-transparent pointer-events-none" />

      {/* ── Content ── */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-36 md:pb-44"
      >
        {/* Location label */}
        <div className="mb-6">
          <LetterReveal
            text="Nairobi, Kenya  ·  Media & Marketing"
            inView={ready}
            delay={0.2}
            stagger={0.025}
            className="font-sans text-teal text-[10px] tracking-widest2 uppercase font-medium"
          />
        </div>

        {/* Scramble headline — with text-shadow for depth */}
        <div className="mb-5 md:mb-8" aria-label="We Create What Moves People.">
          <div
            className="font-geist font-black leading-[0.92] uppercase"
            style={{ fontSize: "clamp(1.9rem, 9vw, 8.5rem)" }}
          >
            {/* Line 1 — white with shadow */}
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={ready ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.77, 0, 0.175, 1] }}
              style={{
                color: "#FFFFFF",
                textShadow: "0 2px 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.5)",
              }}
            >
              {line1}
            </motion.div>

            {/* Line 2 — teal with glow */}
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={ready ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.77, 0, 0.175, 1] }}
              style={{
                color: "#0ABFBF",
                textShadow: "0 0 60px rgba(10,191,191,0.45), 0 2px 40px rgba(0,0,0,0.7)",
              }}
            >
              {line2}
            </motion.div>

            {/* Line 3 — white with shadow */}
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={ready ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.9, delay: 0.75, ease: [0.77, 0, 0.175, 1] }}
              style={{
                color: "#FFFFFF",
                textShadow: "0 2px 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.5)",
              }}
            >
              {line3}
            </motion.div>
          </div>
        </div>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="font-sans text-white/85 text-sm md:text-lg max-w-md leading-relaxed mb-8 md:mb-10 font-light"
          style={{ textShadow: "0 1px 20px rgba(0,0,0,0.6)" }}
        >
          Full-service media &amp; marketing for brands that refuse to be ignored.
          Strategy. Production. Culture.
        </motion.p>

        {/* CTAs — white primary, teal outline secondary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          {/* White primary — maximum contrast against anything on screen */}
          <MagneticButton
            href="#work"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-ink font-geist font-black text-xs tracking-widest uppercase hover:bg-cream transition-colors duration-300"
            strength={0.3}
          >
            See Our Work
          </MagneticButton>

          {/* Teal outline secondary */}
          <MagneticButton
            href="#contact"
            className="inline-flex items-center justify-center px-10 py-4 border border-teal/60 text-teal font-sans text-xs tracking-widest uppercase hover:border-teal hover:bg-teal/10 transition-all duration-300"
            strength={0.2}
          >
            Start a Project
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-28 right-8 md:right-12 hidden md:flex flex-col items-center gap-2"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-teal/70 to-transparent" />
        <span className="font-sans text-white/35 text-[9px] tracking-widest uppercase mt-1">Scroll</span>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-0 inset-x-0 border-t border-white/8 bg-ink/85 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 grid grid-cols-3">
          {stats.map(s => <StatItem key={s.label} {...s} trigger={ready} />)}
        </div>
      </motion.div>
    </section>
  );
}

function StatItem({ target, suffix, label, trigger }: { target: number; suffix: string; label: string; trigger: boolean }) {
  const val = useCountUp(target, trigger, 2000);
  return (
    <div className="text-center px-1 md:px-2">
      <p className="font-geist font-black text-teal text-lg md:text-2xl tabular-nums"
        style={{ textShadow: "0 0 20px rgba(10,191,191,0.3)" }}>
        {val}{suffix}
      </p>
      {/* Label hidden on small screens — too cramped at 3-col */}
      <p className="hidden sm:block font-sans text-white/50 text-[9px] md:text-[10px] tracking-wider uppercase mt-0.5 leading-tight">{label}</p>
    </div>
  );
}
