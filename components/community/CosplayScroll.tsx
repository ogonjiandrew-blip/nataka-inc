"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MotionConfig, motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { CosplayFrame } from "@/lib/otamatsuriCosplay";
import { cosplayFrames, kanjiNumeral, watermarkKanji } from "@/lib/otamatsuriCosplay";

/*
 * A scroll: mounted frames read top to bottom like a
 * kakejiku. Every panel carries a hanko seal (第◯), a vertical kanji title
 * and the English description underneath. Clicking a frame opens it full size.
 *
 * The mount strip alternates sides so the eye zig-zags down the scroll instead
 * of running down one rail.
 */

function Seal({ n }: { n: number }) {
  return (
    <span
      className="hanko font-jp font-bold w-11 h-14 md:w-12 md:h-16 text-[13px] md:text-[15px] leading-tight shrink-0"
      aria-hidden
    >
      <span className="tate">第{kanjiNumeral(n)}</span>
    </span>
  );
}

export default function CosplayScroll({
  frames = cosplayFrames,
  /** Shown on the reading cord only for the first scroll on the page */
  showCord = true,
}: {
  frames?: CosplayFrame[];
  showCord?: boolean;
} = {}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start center", "end end"],
  });
  const beadY = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const beadTop = useTransform(beadY, [0, 1], ["0%", "100%"]);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: number) => {
      setOpenIndex((i) =>
        i === null ? null : (i + dir + frames.length) % frames.length
      );
    },
    [frames.length]
  );

  // Keyboard control + scroll lock while the lightbox is open
  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, step]);

  const open = openIndex === null ? null : frames[openIndex];

  // MotionConfig reducedMotion="user" drops the travel and keeps the fade for
  // anyone who asks the OS for less motion. It also keeps `initial` constant
  // between server and client, which a useReducedMotion() gate would not.
  return (
    <MotionConfig reducedMotion="user">
      {/* 巻緒 — the reading cord, with a bead that slides as the scroll unrolls.
          Only the first scroll on a page draws it, otherwise two beads fight
          over the same rail. Purely decorative, so it is hidden from a11y. */}
      {showCord && (
        <div
          aria-hidden
          className="pointer-events-none fixed right-5 top-1/4 bottom-1/4 hidden xl:block z-30"
        >
          <div className="emaki-cord w-px h-full mx-auto" />
          <motion.span
            style={{ top: beadTop }}
            className="absolute left-0 -ml-[5px] -mt-[5px] w-2.5 h-2.5 rounded-full bg-kin-light shadow-[0_0_14px_rgba(214,183,127,0.7)]"
          />
        </div>
      )}

      <div ref={railRef} className="space-y-20 md:space-y-32">
        {frames.map((frame, i) => {
          const n = i + 1;
          const flip = n % 2 === 0;

          return (
            <article
              key={frame.slug}
              id={frame.slug}
              className="relative scroll-mt-28"
            >
              {/* Faint kanji watermark, one every third panel */}
              {n % 3 === 1 && (
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -top-10 ${
                    flip ? "left-0" : "right-0"
                  } font-jp font-bold text-[clamp(6rem,18vw,15rem)] leading-none text-white/[0.028] select-none`}
                >
                  {watermarkKanji[Math.floor(i / 3) % watermarkKanji.length]}
                </span>
              )}

              <motion.div
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col gap-5 md:gap-8 ${
                  flip ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* ── Mount strip: seal, vertical kanji title, cord ── */}
                <div className="flex md:flex-col items-center md:items-center gap-4 md:gap-5 md:w-16 shrink-0">
                  <Seal n={n} />

                  <span className="tate font-jp font-bold text-shu-light text-lg md:text-2xl leading-none">
                    {frame.jp}
                  </span>

                  <span className="hidden md:block emaki-cord flex-1 w-px min-h-[40px]" />

                  <span className="tate-romaji font-sans text-white/45 text-[9px] uppercase">
                    {frame.romaji}
                  </span>
                </div>

                {/* ── The mounted frame + its description ── */}
                <div className="flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-kin"
                    aria-label={`Open frame ${n} of ${frames.length}, ${frame.title}, full size`}
                  >
                    <div className="emaki-mount">
                      <div className="relative aspect-video overflow-hidden bg-black">
                        <Image
                          src={frame.src}
                          alt={frame.alt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 85vw, 1000px"
                          quality={80}
                          priority={showCord && i === 0}
                        />
                        {/* 撮影 corner mark, revealed on hover. Decorative, and
                            the button already announces the frame, so it stays
                            out of the accessibility tree. */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute top-3 right-3 font-jp text-[10px] tracking-[0.3em] text-kin-light/0 group-hover:text-kin-light/90 transition-colors duration-300"
                        >
                          撮影 NATAKA
                        </span>
                      </div>
                    </div>
                  </button>

                  <div className="mt-6 md:mt-7">
                    <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                      <span className="font-geist font-black text-kin text-xs tracking-widest">
                        {String(n).padStart(2, "0")}
                        <span className="text-white/35"> / {frames.length}</span>
                      </span>
                      <h3 className="font-geist font-black text-white uppercase text-lg md:text-2xl leading-none">
                        {frame.title}
                      </h3>
                      <span className="font-jp font-medium text-white/35 text-sm">
                        {frame.jp}
                      </span>
                    </div>

                    <div className="brush-rule max-w-md mb-4 opacity-70" aria-hidden />

                    <p className="font-sans text-white/70 text-sm md:text-[15px] leading-relaxed max-w-3xl">
                      {frame.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </article>
          );
        })}
      </div>

      {/* ── Lightbox ── */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${open.title}. Frame ${(openIndex ?? 0) + 1} of ${frames.length}`}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col"
          onClick={close}
        >
          <div
            className="flex items-center justify-between px-5 md:px-8 py-4 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-baseline gap-3 min-w-0">
              <span className="font-jp font-bold text-shu-light text-base md:text-xl shrink-0">
                {open.jp}
              </span>
              <span className="font-geist font-black text-white uppercase text-sm md:text-lg truncate">
                {open.title}
              </span>
              <span className="font-geist font-black text-kin text-[11px] tracking-widest shrink-0">
                {String((openIndex ?? 0) + 1).padStart(2, "0")} / {frames.length}
              </span>
            </div>

            <button
              type="button"
              autoFocus
              onClick={close}
              className="font-geist font-black text-white/60 hover:text-shu-light text-xs tracking-widest uppercase px-3 py-2 shrink-0"
            >
              <span className="font-jp font-medium">閉じる</span> Close ✕
            </button>
          </div>

          <div
            className="relative flex-1 min-h-0 mx-3 md:mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={open.src}
              alt={open.alt}
              fill
              className="object-contain"
              sizes="100vw"
              quality={85}
            />
          </div>

          <div
            className="shrink-0 px-5 md:px-8 py-4 flex items-center gap-4 justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              className="font-geist font-black text-white/60 hover:text-kin-light text-xs tracking-widest uppercase py-2"
              aria-label="Previous frame"
            >
              ← <span className="font-jp font-medium">前</span>
            </button>

            <p className="font-sans text-white/55 text-xs md:text-sm leading-relaxed max-w-2xl text-center hidden sm:block">
              {open.description}
            </p>

            <button
              type="button"
              onClick={() => step(1)}
              className="font-geist font-black text-white/60 hover:text-kin-light text-xs tracking-widest uppercase py-2"
              aria-label="Next frame"
            >
              <span className="font-jp font-medium">次</span> →
            </button>
          </div>
        </div>
      )}
    </MotionConfig>
  );
}
