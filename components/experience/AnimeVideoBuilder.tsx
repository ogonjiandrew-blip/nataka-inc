"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  animeWorlds,
  buildWhatsAppUrl,
  episodeNumber,
  type AnimeWorld,
  type Power,
  type Variant,
} from "@/lib/otamatsuriExperience";

const KAWAII_PINK = "#F45C9E";

/**
 * The booth questionnaire, ordered for a phone held in a queue.
 *
 * Design decisions that matter here:
 *  - The world picker is images of REAL renders, not a text list. People choose
 *    what they can see, and it doubles as proof of the product.
 *  - The name is asked LAST. Playing costs nothing; a form field first is a
 *    toll booth in front of the fun.
 *  - The payoff is an episode title card, not a summary. It is the thing worth
 *    screenshotting, which is free marketing standing in the queue.
 */
export default function AnimeVideoBuilder() {
  const [name, setName] = useState("");
  const [world, setWorld] = useState<AnimeWorld | null>(null);
  const [power, setPower] = useState<Power | null>(null);
  const [variant, setVariant] = useState<Variant>("epic");
  const [sent, setSent] = useState(false);

  const powerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  const nameOk = name.trim().length >= 2;
  const ready = nameOk && world !== null && power !== null;

  // Kawaii repaints the whole page pink, so the choice is felt before a single
  // render exists.
  const accent = variant === "kawaii" ? KAWAII_PINK : world?.accent ?? "#E8442E";

  const waUrl = useMemo(
    () => (ready && world && power ? buildWhatsAppUrl(name, world, power, variant) : undefined),
    [ready, name, world, power, variant]
  );

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 130);
  };

  const pickWorld = (w: AnimeWorld) => {
    setWorld(w);
    setPower(null);
    scrollTo(powerRef);
  };

  const pickPower = (p: Power) => {
    setPower(p);
    scrollTo(nameRef);
  };

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Style switch. Sits above everything because it changes the look of
          every card below it, and because a girl arriving at a wall of shonen
          action needs to see the pink option before she scrolls past. */}
      <section aria-labelledby="step-style">
        <StepLabel n="00" jp="姿" text="Choose your style" id="step-style" accent={accent} />
        <div className="grid grid-cols-2 gap-2.5">
          {([
            { id: "epic" as Variant, label: "Epic", jp: "豪", sub: "Dark, cinematic, powerful", color: "#E8442E" },
            { id: "kawaii" as Variant, label: "Kawaii", jp: "可愛", sub: "Soft, pastel, cute", color: KAWAII_PINK },
          ]).map((v) => {
            const active = variant === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariant(v.id)}
                aria-pressed={active}
                className="relative text-left p-4 pl-5 border transition-all duration-200 active:scale-[0.98] overflow-hidden"
                style={{
                  borderColor: active ? v.color : "rgba(255,255,255,0.14)",
                  background: active ? `${v.color}18` : "transparent",
                }}
              >
                <span
                  className="absolute left-0 top-0 bottom-0 w-1 transition-opacity duration-200"
                  style={{ background: v.color, opacity: active ? 1 : 0.25 }}
                />
                <span
                  aria-hidden
                  className="absolute right-2 top-1 font-jp text-3xl select-none leading-none"
                  style={{ color: v.color, opacity: active ? 0.45 : 0.15 }}
                >
                  {v.jp}
                </span>
                <span className="font-geist font-black text-base text-white uppercase tracking-wide block pr-10">
                  {v.label}
                </span>
                <span className="font-sans text-white/55 text-xs block mt-1 pr-10 leading-relaxed">
                  {v.sub}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 01 — World, chosen from real frames */}
      <section aria-labelledby="step-world">
        <StepLabel n="01" jp="界" text="Choose your world" id="step-world" accent={accent} />
        <div className="grid grid-cols-2 gap-2.5">
          {animeWorlds.map((w) => {
            const active = world?.id === w.id;
            const wAccent = variant === "kawaii" ? KAWAII_PINK : w.accent;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => pickWorld(w)}
                aria-pressed={active}
                className="group relative overflow-hidden text-left transition-transform duration-200 active:scale-[0.97] aspect-[3/4]"
              >
                <Image
                  src={w.poster}
                  alt={`${w.label} — a real frame from the Otamatsuri anime video booth`}
                  fill
                  sizes="(max-width: 768px) 50vw, 280px"
                  className={`object-cover transition-all duration-500 ${
                    active ? "scale-105" : "grayscale-[0.55] group-hover:grayscale-0"
                  }`}
                />
                <span
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: active
                      ? `linear-gradient(to top, ${wAccent}dd 0%, ${wAccent}22 45%, transparent 75%)`
                      : "linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.35) 50%, rgba(8,8,8,0.15) 100%)",
                  }}
                />
                <span
                  className="absolute inset-0 border-2 transition-colors duration-200"
                  style={{ borderColor: active ? wAccent : "transparent" }}
                />

                <span className="absolute left-3 right-3 bottom-3">
                  <span
                    className="font-jp text-lg block leading-none mb-1"
                    style={{ color: active ? "#0A0A0A" : wAccent }}
                  >
                    {w.jp}
                  </span>
                  <span
                    className={`font-geist font-black text-sm uppercase tracking-wide block leading-tight ${
                      active ? "text-ink" : "text-white"
                    }`}
                  >
                    {w.label}
                  </span>
                </span>

                {active && (
                  <span className="absolute top-2.5 right-2.5 w-6 h-6 flex items-center justify-center bg-ink">
                    <span className="text-white text-sm leading-none">✓</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 02 — Power */}
      <div ref={powerRef} className="scroll-mt-6">
        <AnimatePresence mode="wait">
          {world && (
            <motion.section
              key={world.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32 }}
              aria-labelledby="step-power"
            >
              <StepLabel n="02" jp="力" text="Choose your power" id="step-power" accent={accent} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {world.powers.map((p) => {
                  const active = power?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => pickPower(p)}
                      aria-pressed={active}
                      className="relative text-left p-4 pl-5 border transition-all duration-200 active:scale-[0.98] overflow-hidden"
                      style={{
                        borderColor: active ? accent : "rgba(255,255,255,0.14)",
                        background: active ? `${accent}16` : "transparent",
                      }}
                    >
                      <span
                        className="absolute left-0 top-0 bottom-0 w-1 transition-opacity duration-200"
                        style={{ background: accent, opacity: active ? 1 : 0.28 }}
                      />
                      <span
                        aria-hidden
                        className="absolute right-2 top-1 font-jp text-3xl select-none leading-none"
                        style={{ color: accent, opacity: active ? 0.42 : 0.15 }}
                      >
                        {p.jp}
                      </span>
                      <span className="font-geist font-black text-base text-white uppercase tracking-wide block pr-9">
                        {p.label}
                      </span>
                      <span className="font-sans text-white/55 text-xs block mt-1 pr-9 leading-relaxed">
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

      {/* 03 — Name, asked last */}
      <div ref={nameRef} className="scroll-mt-6">
        <AnimatePresence>
          {world && power && (
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32 }}
              aria-labelledby="step-name"
            >
              <StepLabel n="03" jp="名" text="Your name" id="step-name" accent={accent} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First name"
                autoComplete="given-name"
                maxLength={24}
                enterKeyHint="done"
                className="w-full bg-transparent border-b-2 border-white/20 focus:border-white outline-none font-geist font-black text-3xl md:text-4xl text-white placeholder:text-white/20 uppercase tracking-wide py-3 transition-colors"
                style={{ caretColor: accent }}
              />
              <p className="font-sans text-white/45 text-xs mt-3">
                Goes on your episode card, and helps the crew match your photo to your video.
              </p>

              {/* The episode card — the payoff, and the thing worth screenshotting */}
              <AnimatePresence>
                {nameOk && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mt-10 overflow-hidden"
                  >
                    <div className="relative aspect-[4/5] sm:aspect-[16/10]">
                      <Image
                        src={world.poster}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 640px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/25" />
                      <div
                        className="absolute inset-0 border-2"
                        style={{ borderColor: accent }}
                      />

                      <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-end">
                        <p
                          className="font-sans text-[10px] tracking-widest2 uppercase mb-3"
                          style={{ color: accent }}
                        >
                          第{episodeNumber(world, power)}話 · Episode {episodeNumber(world, power)}
                        </p>

                        <p className="font-jp text-3xl sm:text-4xl text-white leading-none mb-2">
                          {world.title.jp}
                        </p>
                        <p
                          className="font-display italic font-semibold text-xl sm:text-2xl leading-none mb-5"
                          style={{ color: accent }}
                        >
                          {world.title.en}
                        </p>

                        <div className="flex items-end justify-between gap-4 border-t border-white/20 pt-4">
                          <div>
                            <p className="font-sans text-white/45 text-[9px] tracking-widest uppercase mb-1">
                              Starring
                            </p>
                            <p className="font-geist font-black text-xl sm:text-2xl text-white uppercase leading-none">
                              {name.trim()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-sans text-white/45 text-[9px] tracking-widest uppercase mb-1">
                              Power
                            </p>
                            <p className="font-geist font-black text-sm sm:text-base text-white uppercase leading-none">
                              {power.label}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky send bar — always in thumb reach once a pick exists */}
      <AnimatePresence>
        {world && power && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 inset-x-0 z-40 px-4 pb-4 pt-8 pointer-events-none"
            style={{
              background: "linear-gradient(to top, #080808 55%, rgba(8,8,8,0.85) 80%, transparent)",
            }}
          >
            <div className="max-w-lg mx-auto pointer-events-auto">
              {ready && waUrl ? (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSent(true)}
                  className="flex items-center justify-center gap-2.5 w-full text-center font-geist font-black text-sm text-ink px-6 py-5 uppercase tracking-widest active:scale-[0.985] transition-transform"
                  style={{ background: accent }}
                >
                  <WhatsAppMark />
                  Send my summon
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full text-center font-geist font-black text-sm text-white/35 border border-white/15 bg-ink px-6 py-5 uppercase tracking-widest cursor-not-allowed"
                >
                  {power ? "Add your name ↑" : "Choose your power ↑"}
                </button>
              )}

              <p className="font-sans text-white/45 text-[10px] text-center mt-2.5 leading-relaxed">
                {sent
                  ? "Sent. Come back to the booth for your photo — the video lands in that chat."
                  : "Opens WhatsApp with everything typed. Just press send."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so the sticky bar never covers the last card */}
      {world && power && <div aria-hidden className="h-24" />}
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
    <div className="flex items-center gap-3 mb-5">
      <span className="font-geist font-black text-[11px]" style={{ color: accent }}>
        {n}
      </span>
      <span className="h-px w-7" style={{ background: accent }} />
      <h2
        id={id}
        className="font-sans text-white/85 text-xs md:text-sm tracking-widest2 uppercase font-medium"
      >
        <span className="font-jp mr-2" style={{ color: accent }}>
          {jp}
        </span>
        {text}
      </h2>
    </div>
  );
}

function WhatsAppMark() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.18 4.22-9.4 9.41-9.4a9.35 9.35 0 0 1 9.4 9.41c0 5.19-4.22 9.41-9.4 9.41M20.5 3.49A11.76 11.76 0 0 0 12.04 0C5.5 0 .19 5.31.19 11.84c0 2.09.55 4.13 1.59 5.93L.09 24l6.36-1.67a11.8 11.8 0 0 0 5.59 1.42h.01c6.53 0 11.85-5.31 11.85-11.84 0-3.17-1.23-6.14-3.47-8.38" />
    </svg>
  );
}
