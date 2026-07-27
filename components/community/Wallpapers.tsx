"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { wallpapers } from "@/lib/community";

export default function Wallpapers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="wallpapers" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24" ref={ref}>
      <div className="flex items-center gap-3 mb-6">
        <span className="h-px w-10 bg-otaku" />
        <p className="font-sans text-otaku-light text-[10px] tracking-widest2 uppercase font-medium">
          Free · Take Them
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
        <h2 className="leading-none">
          <span className="font-geist font-black text-[clamp(1.8rem,6vw,4.5rem)] text-white uppercase block">
            Otamatsuri
          </span>
          <span className="font-display font-semibold italic text-[clamp(1.8rem,6vw,4.5rem)] text-otaku block">
            On Your Lock Screen.
          </span>
        </h2>
        <p className="font-sans text-white/65 text-sm leading-relaxed max-w-sm">
          Six frames from the shoot, cut to 1080×1920 for phones. No email, no signup —
          tap, save, use. If someone asks where it&apos;s from, that&apos;s the whole point.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {wallpapers.map((w, i) => (
          <motion.a
            key={w.slug}
            href={w.file}
            download={`otamatsuri-${w.slug}.jpg`}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: Math.min(i * 0.07, 0.4) }}
            className="group relative block overflow-hidden border border-white/10 hover:border-otaku/50 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-otaku"
          >
            <div className="relative aspect-[9/16] bg-ink-50">
              <Image
                src={w.preview}
                alt={`Otamatsuri phone wallpaper — ${w.title}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 50vw, 16vw"
                quality={70}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-80" />

              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="font-geist font-black text-white text-[11px] uppercase tracking-wide leading-tight">
                  {w.title}
                </p>
                <span className="font-sans text-otaku-light text-[9px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Download ↓
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <p className="font-sans text-white/35 text-[11px] mt-6 leading-relaxed max-w-2xl">
        Shot and produced by Nataka Inc for the Otamatsuri festival. Personal use — repost
        them anywhere, just keep the credit on.
      </p>
    </section>
  );
}
