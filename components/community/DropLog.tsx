"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { drops, dropStatusLabel, type DropStatus } from "@/lib/community";

const statusStyle: Record<DropStatus, string> = {
  live: "text-otaku-light border-otaku/50 bg-otaku/10",
  soon: "text-white/80 border-white/25 bg-white/5",
  tba:  "text-white/40 border-white/12 bg-transparent",
};

export default function DropLog() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="drops" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24" ref={ref}>
      <div className="flex items-center gap-3 mb-6">
        <span className="h-px w-10 bg-otaku" />
        <p className="font-sans text-otaku-light text-[10px] tracking-widest2 uppercase font-medium">
          The Drop Log
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
        <h2 className="leading-none">
          <span className="font-geist font-black text-[clamp(1.8rem,6vw,4.5rem)] text-white uppercase block">
            One Chapter
          </span>
          <span className="font-display font-semibold italic text-[clamp(1.8rem,6vw,4.5rem)] text-otaku block">
            At a Time.
          </span>
        </h2>
        <p className="font-sans text-white/65 text-sm leading-relaxed max-w-sm">
          We release Otamatsuri in chapters instead of dumping everything at once. Each one
          gets announced here first. When a chapter says locked, it means locked — we
          don&apos;t post fake countdowns.
        </p>
      </div>

      <div className="border-t border-white/10">
        {drops.map((d, i) => {
          const Row = (
            <>
              <span className="font-geist font-black text-2xl md:text-4xl text-white/15 group-hover:text-otaku/70 transition-colors duration-300 tabular-nums w-16 md:w-24 shrink-0">
                {d.chapter}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2">
                  <h3 className={`font-geist font-black text-lg md:text-2xl uppercase leading-tight ${d.status === "tba" ? "text-white/40" : "text-white"}`}>
                    {d.title}
                  </h3>
                  <span className={`font-sans text-[9px] tracking-widest uppercase border px-2.5 py-1 ${statusStyle[d.status]}`}>
                    {dropStatusLabel[d.status]}
                  </span>
                  <span className="font-sans text-white/35 text-[10px] tracking-widest uppercase">{d.kind}</span>
                </div>
                <p className={`font-sans text-sm leading-relaxed max-w-2xl ${d.status === "tba" ? "text-white/35" : "text-white/65"}`}>
                  {d.blurb}
                </p>

                {d.video && (
                  <div className="mt-6">
                    <div className="relative inline-block">
                      {/* Sound stays in the visitor's hands — poster + controls, no forced audio */}
                      <video
                        src={d.video.src}
                        poster={d.video.poster}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-48 md:w-60 aspect-[9/16] object-cover rounded-xl border border-otaku/40 bg-ink-50 shadow-lg shadow-black/50"
                      />
                      <span className="absolute top-2 left-2 font-sans text-[8px] tracking-widest2 uppercase text-white/90 bg-ink/75 backdrop-blur-sm px-2 py-1 rounded border-l-2 border-otaku pointer-events-none">
                        {d.video.label}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {d.href && (
                <span className="hidden md:inline font-sans text-white/50 text-[10px] tracking-widest uppercase self-center group-hover:text-otaku-light transition-colors shrink-0">
                  Open →
                </span>
              )}
            </>
          );

          const cls =
            "group flex gap-4 md:gap-8 items-start py-7 md:py-8 border-b border-white/10 transition-colors duration-300" +
            (d.href ? " hover:bg-white/[0.02] cursor-pointer" : "");

          return (
            <motion.div
              key={d.chapter}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: Math.min(i * 0.09, 0.4) }}
            >
              {d.href ? (
                d.external ? (
                  <a href={d.href} target="_blank" rel="noopener noreferrer" className={cls}>{Row}</a>
                ) : d.href.startsWith("#") ? (
                  <a href={d.href} className={cls}>{Row}</a>
                ) : (
                  <Link href={d.href} className={cls}>{Row}</Link>
                )
              ) : (
                <div className={cls}>{Row}</div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
