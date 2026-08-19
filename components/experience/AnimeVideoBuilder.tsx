"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  animeWorlds,
  buildWhatsAppUrl,
  type AnimeWorld,
  type Power,
} from "@/lib/otamatsuriExperience";

/**
 * The booth questionnaire. Three picks, one button. Everything happens on the
 * customer's own phone: the button opens WhatsApp with the full premade prompt
 * addressed to the booth, so the reply channel (their video) is the same chat.
 */
export default function AnimeVideoBuilder() {
  const [name, setName] = useState("");
  const [world, setWorld] = useState<AnimeWorld | null>(null);
  const [power, setPower] = useState<Power | null>(null);

  const powerRef = useRef<HTMLDivElement>(null);
  const summonRef = useRef<HTMLDivElement>(null);

  const nameOk = name.trim().length >= 2;
  const ready = nameOk && world !== null && power !== null;

  const waUrl = useMemo(
    () => (ready && world && power ? buildWhatsAppUrl(name, world, power) : undefined),
    [ready, name, world, power]
  );

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    // Give the section a beat to mount before scrolling to it.
    setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  };

  const pickWorld = (w: AnimeWorld) => {
    setWorld(w);
    setPower(null);
    scrollTo(powerRef);
  };

  const pickPower = (p: Power) => {
    setPower(p);
    scrollTo(summonRef);
  };

  return (
    <div className="space-y-14 md:space-y-20">
      {/* 01 — Name */}
      <section aria-labelledby="step-name">
        <StepLabel n="01" jp="名" text="Your name" id="step-name" />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="The name on your video"
          autoComplete="given-name"
          maxLength={30}
          className="w-full bg-transparent border-b-2 border-white/20 focus:border-otaku outline-none font-geist font-black text-2xl md:text-4xl text-white placeholder:text-white/25 uppercase tracking-wide py-3 transition-colors"
        />
        <p className="font-sans text-white/45 text-xs mt-3">
          So the booth crew match your photo to your video. First name is enough.
        </p>
      </section>

      {/* 02 — World */}
      <section aria-labelledby="step-world">
        <StepLabel n="02" jp="界" text="What anime are you transported to?" id="step-world" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {animeWorlds.map((w) => {
            const active = world?.id === w.id;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => pickWorld(w)}
                aria-pressed={active}
                className={`relative text-left border p-5 md:p-6 transition-colors duration-200 group ${
                  active ? "border-transparent" : "border-white/15 hover:border-white/40"
                }`}
                style={active ? { borderColor: w.accent, background: `${w.accent}14` } : undefined}
              >
                <span
                  aria-hidden
                  className="absolute right-3 top-2 font-jp text-4xl md:text-5xl select-none transition-opacity"
                  style={{ color: w.accent, opacity: active ? 0.5 : 0.18 }}
                >
                  {w.jp}
                </span>
                <span className="font-geist font-black text-lg md:text-xl text-white uppercase tracking-wide block">
                  {w.label}
                </span>
                <span className="font-sans text-white/50 text-xs block mt-1.5 pr-10">{w.sub}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 03 — Power (appears once a world is picked) */}
      <div ref={powerRef} className="scroll-mt-24">
        <AnimatePresence mode="wait">
          {world && (
            <motion.section
              key={world.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              aria-labelledby="step-power"
            >
              <StepLabel n="03" jp="力" text="What is your power?" id="step-power" accent={world.accent} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {world.powers.map((p) => {
                  const active = power?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => pickPower(p)}
                      aria-pressed={active}
                      className={`relative text-left border p-5 transition-colors duration-200 ${
                        active ? "border-transparent" : "border-white/15 hover:border-white/40"
                      }`}
                      style={
                        active
                          ? { borderColor: world.accent, background: `${world.accent}14` }
                          : undefined
                      }
                    >
                      <span
                        aria-hidden
                        className="absolute right-3 top-2 font-jp text-3xl select-none"
                        style={{ color: world.accent, opacity: active ? 0.5 : 0.18 }}
                      >
                        {p.jp}
                      </span>
                      <span className="font-geist font-black text-base text-white uppercase tracking-wide block pr-8">
                        {p.label}
                      </span>
                      <span className="font-sans text-white/50 text-xs block mt-1.5 pr-8">
                        {p.tagline}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* 04 — The summon card */}
      <div ref={summonRef} className="scroll-mt-24">
        <AnimatePresence>
          {world && power && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              aria-labelledby="step-send"
            >
              <StepLabel n="04" jp="送" text="Send your summon" id="step-send" accent={world.accent} />

              <div
                className="border p-6 md:p-8 relative overflow-hidden"
                style={{ borderColor: world.accent, background: `${world.accent}0d` }}
              >
                <span
                  aria-hidden
                  className="absolute -right-2 -bottom-6 font-jp text-[7rem] leading-none select-none pointer-events-none"
                  style={{ color: world.accent, opacity: 0.12 }}
                >
                  {world.jp}
                </span>

                <p className="font-sans text-[10px] tracking-widest2 uppercase mb-4" style={{ color: world.accent }}>
                  Otamatsuri Booth · Summon Ticket
                </p>

                <dl className="space-y-2 mb-6 relative">
                  <div className="flex gap-3 items-baseline">
                    <dt className="font-sans text-white/45 text-xs uppercase tracking-widest w-16 shrink-0">Name</dt>
                    <dd className="font-geist font-black text-white text-lg uppercase">
                      {nameOk ? name.trim() : "—"}
                    </dd>
                  </div>
                  <div className="flex gap-3 items-baseline">
                    <dt className="font-sans text-white/45 text-xs uppercase tracking-widest w-16 shrink-0">World</dt>
                    <dd className="font-geist font-black text-white text-lg uppercase">{world.label}</dd>
                  </div>
                  <div className="flex gap-3 items-baseline">
                    <dt className="font-sans text-white/45 text-xs uppercase tracking-widest w-16 shrink-0">Power</dt>
                    <dd className="font-geist font-black text-white text-lg uppercase">{power.label}</dd>
                  </div>
                </dl>

                {ready && waUrl ? (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center font-geist font-black text-sm text-ink px-7 py-5 uppercase tracking-widest transition-colors duration-200"
                    style={{ background: world.accent }}
                  >
                    Send it on WhatsApp →
                  </a>
                ) : (
                  <div>
                    <span className="block w-full text-center font-geist font-black text-sm text-white/35 border border-white/15 px-7 py-5 uppercase tracking-widest cursor-not-allowed">
                      Send it on WhatsApp →
                    </span>
                    <p className="font-sans text-otaku-light text-xs mt-3 text-center">
                      Add your name at the top first ↑
                    </p>
                  </div>
                )}

                <p className="font-sans text-white/40 text-[11px] leading-relaxed mt-4 relative">
                  Opens WhatsApp with your summon pre-typed — just press send. By sending, you
                  agree your booth photo becomes an AI video, delivered back to you in the same
                  chat.
                </p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepLabel({
  n,
  jp,
  text,
  id,
  accent = "#E8442E",
}: {
  n: string;
  jp: string;
  text: string;
  id: string;
  accent?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-geist font-black text-xs" style={{ color: accent }}>
        {n}
      </span>
      <span className="h-px w-8" style={{ background: accent }} />
      <h2 id={id} className="font-sans text-white/85 text-xs md:text-sm tracking-widest2 uppercase font-medium">
        <span className="font-jp mr-2" style={{ color: accent }}>
          {jp}
        </span>
        {text}
      </h2>
    </div>
  );
}
