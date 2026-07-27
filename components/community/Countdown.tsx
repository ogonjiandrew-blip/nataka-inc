"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { countdowns, type CountdownTarget } from "@/lib/community";

/*
 * Countdown board. Rule inherited from lib/community.ts: a timer only ever
 * ticks toward a genuinely announced date. No date -> honest waiting card.
 */

const themeCls = {
  otaku: {
    accent: "text-otaku-light",
    bar: "bg-otaku",
    border: "border-otaku/30 hover:border-otaku/60",
    btn: "bg-otaku hover:bg-otaku-light text-ink",
    num: "text-white",
    glow: "rgba(232,68,46,0.12)",
  },
  kpop: {
    accent: "text-kpop-light",
    bar: "bg-kpop",
    border: "border-kpop/30 hover:border-kpop/60",
    btn: "bg-kpop hover:bg-kpop-mid text-white",
    num: "text-white",
    glow: "rgba(255,61,127,0.12)",
  },
};

type Parts = { d: number; h: number; m: number; s: number } | "live" | null;

function partsFor(target: string | null, now: number): Parts {
  if (!target) return null;
  const diff = new Date(target).getTime() - now;
  if (diff <= 0) return "live";
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor(diff / 3_600_000) % 24,
    m: Math.floor(diff / 60_000) % 60,
    s: Math.floor(diff / 1_000) % 60,
  };
}

function Unit({ value, label, numCls }: { value: number; label: string; numCls: string }) {
  return (
    <div className="text-center">
      <p className={`font-geist font-black text-4xl md:text-6xl tabular-nums leading-none ${numCls}`}>
        {String(value).padStart(2, "0")}
      </p>
      <p className="font-sans text-white/45 text-[9px] md:text-[10px] tracking-widest uppercase mt-2">{label}</p>
    </div>
  );
}

function CountdownCard({ c, now }: { c: CountdownTarget; now: number | null }) {
  const t = themeCls[c.theme];
  // Render "--" placeholders until mounted so the server and client HTML agree
  const parts = now === null ? null : partsFor(c.target, now);

  return (
    <div
      className={`relative border ${t.border} bg-white/[0.02] transition-colors duration-300 p-7 md:p-9 overflow-hidden`}
      style={{ background: `radial-gradient(circle at 85% 0%, ${t.glow} 0%, rgba(0,0,0,0) 55%)` }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className={`h-px w-8 ${t.bar}`} />
        <p className={`font-sans ${t.accent} text-[10px] tracking-widest2 uppercase font-medium`}>
          {c.target ? "Confirmed" : "Date not announced yet"}
        </p>
      </div>

      <h3 className="font-geist font-black text-2xl md:text-3xl text-white uppercase leading-tight mb-1.5">
        {c.title}
      </h3>
      <p className="font-sans text-white/55 text-xs md:text-sm mb-7">{c.subtitle}</p>

      {c.target ? (
        parts === "live" ? (
          <p className={`font-geist font-black text-3xl md:text-5xl uppercase ${t.accent} mb-7`}>
            It&apos;s happening.
          </p>
        ) : (
          <div className="flex gap-5 md:gap-8 mb-7" aria-label={`Countdown to ${c.title}`}>
            {parts ? (
              <>
                <Unit value={parts.d} label="Days" numCls={t.num} />
                <Unit value={parts.h} label="Hours" numCls={t.num} />
                <Unit value={parts.m} label="Min" numCls={t.num} />
                <Unit value={parts.s} label="Sec" numCls={t.num} />
              </>
            ) : (
              ["Days", "Hours", "Min", "Sec"].map((l) => (
                <div key={l} className="text-center">
                  <p className="font-geist font-black text-4xl md:text-6xl leading-none text-white/25">--</p>
                  <p className="font-sans text-white/45 text-[9px] md:text-[10px] tracking-widest uppercase mt-2">{l}</p>
                </div>
              ))
            )}
          </div>
        )
      ) : (
        <div className="flex gap-5 md:gap-8 mb-7" aria-hidden>
          {["Days", "Hours", "Min", "Sec"].map((l) => (
            <div key={l} className="text-center">
              <p className="font-geist font-black text-4xl md:text-6xl leading-none text-white/15">??</p>
              <p className="font-sans text-white/35 text-[9px] md:text-[10px] tracking-widest uppercase mt-2">{l}</p>
            </div>
          ))}
        </div>
      )}

      <p className="font-sans text-white/60 text-sm leading-relaxed max-w-md mb-7">{c.detail}</p>

      {c.cta && (
        <a
          href={c.cta.href}
          target={c.cta.external ? "_blank" : undefined}
          rel={c.cta.external ? "noopener noreferrer" : undefined}
          className={`inline-block font-geist font-black text-xs px-7 py-4 uppercase tracking-widest transition-colors duration-200 ${t.btn}`}
        >
          {c.cta.label} →
        </a>
      )}
    </div>
  );
}

export default function Countdown() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24" ref={ref}>
      <div className="flex items-center gap-3 mb-6">
        <span className="h-px w-10 bg-otaku" />
        <p className="font-sans text-otaku-light text-[10px] tracking-widest2 uppercase font-medium">
          Mark the Calendar
        </p>
      </div>

      <h2 className="leading-none mb-12 md:mb-16">
        <span className="font-geist font-black text-[clamp(1.8rem,6vw,4.5rem)] text-white uppercase block">
          The Next
        </span>
        <span className="font-display font-semibold italic text-[clamp(1.8rem,6vw,4.5rem)] text-otaku block">
          Big Days.
        </span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
        {countdowns.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.12 }}
          >
            <CountdownCard c={c} now={now} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
