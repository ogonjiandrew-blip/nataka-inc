"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { sceneEvents, eventStatusLabel, type EventStatus } from "@/lib/community";

const WHATSAPP_NUMBER = "254725107294";

const tipMessage = [
  "Scene Radar tip",
  "",
  "Event name:",
  "Date:",
  "Venue:",
  "Organiser / link:",
].join("\n");

const tipUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(tipMessage)}`;

const statusStyle: Record<EventStatus, string> = {
  confirmed: "text-kpop-light border-kpop/60 bg-kpop/15",
  recurring: "text-white/75 border-white/25 bg-white/5",
  tba:       "text-white/45 border-white/15 bg-transparent",
};

type Filter = "all" | "anime" | "kpop";

const filters: { id: Filter; label: string }[] = [
  { id: "all",   label: "Everything" },
  { id: "anime", label: "Anime & Cosplay" },
  { id: "kpop",  label: "K-Pop" },
];

export default function SceneRadar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState<Filter>("all");

  const shown = sceneEvents.filter((e) => filter === "all" || e.kind === filter);

  return (
    <section id="scene-radar" className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden scroll-mt-24" ref={ref}>
      {/* Pink glow — this is the K-Wave half of the community world */}
      <div
        aria-hidden
        className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,61,127,0.13) 0%, rgba(255,61,127,0) 65%)" }}
      />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-kpop/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-kpop" />
          <p className="font-sans text-kpop-light text-[10px] tracking-widest2 uppercase font-medium">
            Scene Radar · Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-10 md:mb-14">
          <h2 className="leading-none">
            <span className="font-geist font-black text-[clamp(1.8rem,6vw,4.5rem)] text-white uppercase block">
              What&apos;s Actually
            </span>
            <span className="font-display font-semibold italic text-[clamp(1.8rem,6vw,4.5rem)] text-kpop block">
              Happening Here.
            </span>
          </h2>
          <p className="font-sans text-white/70 text-sm leading-relaxed max-w-md">
            Kenya&apos;s anime and K-pop scene is real, and it&apos;s scattered across group
            chats. This is our running board of it. We only post dates once an organiser has
            actually confirmed them — everything else says so plainly.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`font-sans text-xs px-5 py-2.5 border transition-colors duration-200 ${
                filter === f.id
                  ? "bg-kpop text-white border-kpop font-semibold"
                  : "text-white/65 border-white/15 hover:border-kpop/60 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Board */}
        <div className="space-y-3">
          {shown.map((e, i) => (
            <motion.div
              key={e.name}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: Math.min(i * 0.08, 0.35) }}
              className="border border-white/10 border-l-2 border-l-kpop/70 bg-white/[0.02] hover:bg-white/[0.04] hover:border-l-kpop transition-colors duration-300 p-6 md:p-7"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                <h3 className="font-geist font-black text-lg md:text-xl text-white uppercase leading-tight">
                  {e.name}
                </h3>
                <span className={`font-sans text-[9px] tracking-widest uppercase border px-2.5 py-1 ${statusStyle[e.status]}`}>
                  {e.date ?? eventStatusLabel[e.status]}
                </span>
                <span className="font-sans text-kpop-light/70 text-[9px] tracking-widest uppercase">
                  {e.kind === "kpop" ? "K-Pop" : "Anime"}
                </span>
                <span className="font-sans text-white/40 text-[10px] tracking-wide ml-auto">
                  {e.venue}
                </span>
              </div>

              <p className="font-sans text-white/65 text-sm leading-relaxed max-w-3xl">{e.note}</p>

              {e.nataka && (
                <p className="font-sans text-kpop-light text-[11px] tracking-wide mt-3">
                  ◈ {e.nataka}
                </p>
              )}

              {e.link && (
                <a
                  href={e.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 font-geist font-black text-[11px] text-white border border-white/25 px-5 py-2.5 uppercase tracking-widest hover:border-kpop hover:text-kpop-light transition-colors duration-200"
                >
                  {e.link.label} →
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Community submission */}
        <div className="mt-10 border border-dashed border-kpop/30 bg-kpop/[0.03] p-7 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h3 className="font-geist font-black text-white text-base uppercase mb-1.5">
              Running something we&apos;ve missed?
            </h3>
            <p className="font-sans text-white/60 text-sm leading-relaxed max-w-lg">
              Send it over and we&apos;ll add it to the board. Free — you don&apos;t have to
              be working with us for your event to be listed here.
            </p>
          </div>
          <a
            href={tipUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-geist font-black text-xs text-white bg-kpop px-7 py-4 uppercase tracking-widest hover:bg-kpop-mid transition-colors duration-200 whitespace-nowrap self-start md:self-auto"
          >
            Add An Event →
          </a>
        </div>
      </div>
    </section>
  );
}
