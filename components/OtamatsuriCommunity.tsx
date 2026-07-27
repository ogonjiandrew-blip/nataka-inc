"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/*
 * Otamatsuri — the community section.
 * This is deliberately not a sales section: it exists to show the anime
 * community that Nataka builds things WITH them, not just for clients.
 * Signature elements: festival-red accent, katakana lockup, film-strip marquee.
 */

const BASE = "/stills/otamatsuri/community";

// Row A drifts left, Row B drifts right — frames curated for variety
const stripA = [1, 3, 5, 7, 9, 11, 13, 15, 17].map((n) => `${BASE}/${n}.jpg`);
const stripB = [2, 4, 6, 8, 10, 14, 16, 18, 19].map((n) => `${BASE}/${n}.jpg`);

const pillars = [
  {
    jp: "共に",
    title: "Made With the Community",
    desc: "Kenyan cosplayers, prop-makers and fans — in front of the camera and behind it. Otamatsuri only exists because the community showed up.",
  },
  {
    jp: "映画",
    title: "Shot Like Cinema",
    desc: "No cheap fan-service. Full cinematic production — the characters you grew up with, graded and framed like a feature film, on Kenyan soil.",
  },
  {
    jp: "続く",
    title: "Released in Chapters",
    desc: "Stills and wallpapers are out now; the full film follows on the festival's date. Every chapter is announced to the community before anyone else.",
  },
];

function FilmStrip({ images, direction, duration }: { images: string[]; direction: "left" | "right"; duration: number }) {
  return (
    <div className="overflow-hidden py-1.5">
      <div className="flex">
        {[0, 1].map((key) => (
          <motion.div
            key={key}
            animate={{ x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"] }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
            className="flex shrink-0 gap-3 pr-3"
          >
            {images.map((src) => (
              <div
                key={src}
                className="relative w-[300px] md:w-[420px] aspect-video shrink-0 overflow-hidden bg-ink-50 border border-white/5"
              >
                <Image
                  src={src}
                  alt="Otamatsuri — cinematic cosplay film by Nataka Inc, shot with Kenya's anime community"
                  fill
                  className="object-cover"
                  sizes="420px"
                  quality={60}
                />
                {/* Every frame is unmistakably Otamatsuri */}
                <span className="absolute bottom-2 left-2 font-sans text-[8px] tracking-widest2 uppercase text-white/90 bg-ink/70 backdrop-blur-sm px-2 py-1 border-l-2 border-[#E8442E]">
                  Otamatsuri
                </span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function OtamatsuriCommunity() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="community" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Section runs full-bleed — the strips ignore the page gutter on purpose */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E8442E]/40 to-transparent" />

      {/* Giant katakana watermark — festival poster energy */}
      <span
        aria-hidden
        className="absolute -right-6 top-16 font-geist font-black text-[clamp(5rem,18vw,14rem)] leading-none text-white/[0.03] select-none pointer-events-none"
      >
        オタ祭
      </span>

      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-14 md:mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-[#E8442E]" />
          <p className="font-sans text-[#FF6B54] text-[10px] tracking-widest2 uppercase font-medium">
            The Nataka Community
          </p>
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.77, 0, 0.175, 1] }}
          >
            <h2 className="leading-none">
              <span className="font-geist font-black text-[clamp(2.2rem,8vw,7rem)] text-white uppercase block">
                Otamatsuri<span className="text-[#E8442E]">.</span>
              </span>
              <span className="font-display font-semibold italic text-[clamp(1.4rem,4vw,3rem)] text-white/60 block mt-2">
                Anime, made in Kenya — with the fans, for the fans.
              </span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-sans text-white/75 text-sm md:text-base leading-relaxed max-w-xl"
          >
            Otamatsuri is an anime and otaku festival — and Nataka directed and produced
            its promo film. We shot it in Kenya with Kenyan cosplayers, prop-makers and
            creatives, treating the characters they grew up on like they belong in a
            feature film. The stills and wallpapers are already yours. The film lands when
            the festival says it does.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap gap-3 lg:justify-end"
          >
            <Link
              href="/community"
              className="font-geist font-black text-xs text-ink bg-[#E8442E] px-7 py-4 uppercase tracking-widest hover:bg-[#FF6B54] transition-colors duration-200"
            >
              Enter the Community →
            </Link>
            <Link
              href="/work/otamatsuri-promo-film"
              className="font-geist font-black text-xs text-white border border-white/25 px-7 py-4 uppercase tracking-widest hover:border-[#E8442E] hover:text-[#FF6B54] transition-colors duration-200"
            >
              See the Otamatsuri Film
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Film-strip marquee — full bleed, two rows drifting in opposite directions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <FilmStrip images={stripA} direction="left" duration={70} />
        <FilmStrip images={stripB} direction="right" duration={84} />
      </motion.div>

      {/* Community pillars */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto mt-14 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.5 + i * 0.12 }}
              className="p-6 md:p-7 border border-white/8 bg-white/[0.02] hover:border-[#E8442E]/30 transition-colors duration-300 group"
            >
              <span aria-hidden className="font-geist font-black text-[#E8442E]/70 text-lg block mb-4 group-hover:text-[#FF6B54] transition-colors duration-300">
                {p.jp}
              </span>
              <h4 className="font-geist font-black text-white text-sm uppercase mb-2">{p.title}</h4>
              <p className="font-sans text-white/60 text-xs leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E8442E]/40 to-transparent" />
    </section>
  );
}
