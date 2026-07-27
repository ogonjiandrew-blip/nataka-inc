"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const WHATSAPP_NUMBER = "254725107294";

const submitMessage = [
  "Fan Wall submission",
  "",
  "Name / cosplay name:",
  "Instagram or TikTok handle:",
  "Character & series:",
  "(attach your photo below)",
].join("\n");

const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(submitMessage)}`;

// Real frames from the Otamatsuri shoot — the wall opens with the people who
// actually showed up, then leaves the rest of the slots for the community.
// These are frames from our own shoot, not fan submissions — labelled as such so
// nobody reads them as cosplayers who opted in. Credits go on as we confirm names.
const seeded = [
  { src: "/stills/otamatsuri/community/1.jpg",  label: "Otamatsuri shoot · credit pending" },
  { src: "/stills/otamatsuri/community/19.jpg", label: "Otamatsuri shoot · credit pending" },
  { src: "/stills/otamatsuri/community/5.jpg",  label: "Otamatsuri shoot · credit pending" },
  { src: "/stills/otamatsuri/community/17.jpg", label: "Otamatsuri shoot · credit pending" },
];

const OPEN_SLOTS = 4;

export default function FanWall() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="fan-wall" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24" ref={ref}>
      <div className="flex items-center gap-3 mb-6">
        <span className="h-px w-10 bg-otaku" />
        <p className="font-sans text-otaku-light text-[10px] tracking-widest2 uppercase font-medium">
          The Fan Wall
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-12 md:mb-16">
        <h2 className="leading-none">
          <span className="font-geist font-black text-[clamp(1.8rem,6vw,4.5rem)] text-white uppercase block">
            Cosplayed?
          </span>
          <span className="font-display font-semibold italic text-[clamp(1.8rem,6vw,4.5rem)] text-otaku block">
            Get On The Wall.
          </span>
        </h2>

        <div>
          <p className="font-sans text-white/70 text-sm leading-relaxed mb-6">
            Send us your cosplay and we&apos;ll put it on the wall with your handle on it —
            Kenyan cosplayers, prop-makers, dancers, artists. You keep the rights to your
            photo. We just want the scene to have somewhere to be seen.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-geist font-black text-xs text-ink bg-otaku px-7 py-4 uppercase tracking-widest hover:bg-otaku-light transition-colors duration-200"
            >
              Send Your Cosplay →
            </a>
            <a
              href="https://www.instagram.com/natakainc/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-geist font-black text-xs text-white border border-white/25 px-7 py-4 uppercase tracking-widest hover:border-otaku hover:text-otaku-light transition-colors duration-200"
            >
              Tag Us On Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {seeded.map((s, i) => (
          <motion.div
            key={s.src}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-ink-50 group"
          >
            <Image
              src={s.src}
              alt="Still from the Otamatsuri promo film shoot in Kenya, produced by Nataka Inc"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 50vw, 25vw"
              quality={70}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-85" />
            <span className="absolute bottom-3 left-3 right-3 font-sans text-[9px] tracking-widest uppercase text-white/75">
              {s.label}
            </span>
          </motion.div>
        ))}

        {Array.from({ length: OPEN_SLOTS }).map((_, i) => (
          <motion.a
            key={`open-${i}`}
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.28 + i * 0.07 }}
            className="relative aspect-[4/5] border border-dashed border-white/15 hover:border-otaku/60 bg-white/[0.015] hover:bg-otaku/[0.04] transition-colors duration-300 flex flex-col items-center justify-center gap-3 group"
          >
            <span className="text-white/25 group-hover:text-otaku text-3xl transition-colors duration-300 leading-none">+</span>
            <span className="font-sans text-white/40 group-hover:text-white/70 text-[10px] tracking-widest uppercase text-center px-4 transition-colors duration-300">
              Your cosplay here
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
