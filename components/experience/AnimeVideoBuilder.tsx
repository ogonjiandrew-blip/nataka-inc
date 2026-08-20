"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  animeWorlds,
  buildMotionPrompt,
  buildPrompt,
  episodeNumber,
  type AnimeWorld,
  type Format,
  type Power,
  type Variant,
} from "@/lib/otamatsuriExperience";

type Phase = "building" | "submitting" | "waiting" | "generating" | "ready" | "rejected" | "error";

const KAWAII_PINK = "#F45C9E";

/**
 * The claim ticket for an order, persisted on the customer's phone.
 *
 * This page originally kept the job in React state only, so that closing the
 * tab ended the session. A real customer then tapped her finished video, went
 * fullscreen, pressed BACK — and the reload threw away her paid order. That is
 * the worst possible failure: she paid, it worked, and the UI lost it.
 *
 * Persisting the ticket does not weaken the payment gate. Generating still
 * requires the crew pressing Approve on that one job; restoring a ticket only
 * lets the phone find the job it already owns. What actually guards the
 * machine is approval-per-order, not amnesia.
 *
 * 24 hours, then it expires — festival phones get shared, and tomorrow's
 * borrower should not open yesterday's order.
 */
const TICKET_KEY = "otamatsuri-order";
const TICKET_TTL = 24 * 60 * 60 * 1000;

interface Ticket {
  id: string;
  token: string;
  name: string;
  worldId: string;
  powerId: string;
  variant: Variant;
  format: Format;
  savedAt: number;
}

function saveTicket(t: Ticket) {
  try {
    localStorage.setItem(TICKET_KEY, JSON.stringify(t));
  } catch {
    /* storage full or blocked — the order still works for this tab */
  }
}

function loadTicket(): Ticket | null {
  try {
    const raw = localStorage.getItem(TICKET_KEY);
    if (!raw) return null;
    const t = JSON.parse(raw) as Ticket;
    if (!t.id || !t.token || Date.now() - t.savedAt > TICKET_TTL) {
      localStorage.removeItem(TICKET_KEY);
      return null;
    }
    return t;
  } catch {
    return null;
  }
}

function clearTicket() {
  try {
    localStorage.removeItem(TICKET_KEY);
  } catch {
    /* nothing to do */
  }
}

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
  const [format, setFormat] = useState<Format>("video");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoCode, setPhotoCode] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [phase, setPhase] = useState<Phase>("building");
  const [job, setJob] = useState<{ id: string; token: string } | null>(null);
  const [stillUrl, setStillUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);

  const powerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Restore an order this phone already owns — a back button, a refresh or a
  // closed tab must never lose a paid order again.
  useEffect(() => {
    const t = loadTicket();
    if (!t) return;
    const w = animeWorlds.find((x) => x.id === t.worldId) || null;
    setName(t.name);
    setVariant(t.variant);
    setFormat(t.format);
    setWorld(w);
    setPower(w?.powers.find((p) => p.id === t.powerId) || null);
    setJob({ id: t.id, token: t.token });
    setPhase("waiting"); // the first poll corrects this to the real state
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
  }, []);

  /** Wipe the ticket and hand the phone to the next person. */
  const startNewOrder = () => {
    clearTicket();
    window.location.reload();
  };

  const nameOk = name.trim().length >= 2;
  const ready = nameOk && world !== null && power !== null;

  // Kawaii repaints the whole page pink, so the choice is felt before a single
  // render exists.
  const accent = variant === "kawaii" ? KAWAII_PINK : world?.accent ?? "#E8442E";

  /**
   * Submit for approval. The prompt is built here and posted once — the
   * customer's screen never renders it, so the prompt library stays ours and
   * only Booth Control ever reads it.
   */
  const submit = async () => {
    if (!ready || !world || !power) return;
    setPhase("submitting");
    setNote(null);
    try {
      const res = await fetch("/api/booth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          world: world.label,
          power: power.label,
          variant,
          format,
          photoCode,
          prompt: buildPrompt(world, power, variant),
          motionPrompt: buildMotionPrompt(power),
        }),
      });
      const j = await res.json();
      if (!res.ok || !j.id) {
        setNote(
          j.error === "store-not-configured"
            ? "The booth system isn't switched on yet. Ask the crew."
            : "Could not reach the booth. Try again."
        );
        setPhase("error");
        return;
      }
      setJob({ id: j.id, token: j.token });
      saveTicket({
        id: j.id,
        token: j.token,
        name: name.trim(),
        worldId: world.id,
        powerId: power.id,
        variant,
        format,
        savedAt: Date.now(),
      });
      setPhase("waiting");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 150);
    } catch {
      setNote("No connection. Try again.");
      setPhase("error");
    }
  };

  /** Poll our own job until it is delivered. Stops as soon as it is done. */
  const poll = useCallback(async () => {
    if (!job) return;
    try {
      const res = await fetch(
        `/api/booth?id=${encodeURIComponent(job.id)}&token=${encodeURIComponent(job.token)}`,
        { cache: "no-store" }
      );
      if (!res.ok) return;
      const j = await res.json();
      if (j.stillUrl) setStillUrl(j.stillUrl);
      if (j.videoUrl) setVideoUrl(j.videoUrl);
      if (j.note) setNote(j.note);
      if (j.status === "rejected") setPhase("rejected");
      else if (j.status === "done") setPhase("ready");
      else if (j.status === "approved" || j.status === "working") setPhase("generating");
    } catch {
      /* transient — the next tick retries */
    }
  }, [job]);

  useEffect(() => {
    if (!job) return;
    if (phase === "ready" || phase === "rejected") return;
    const t = setInterval(poll, 2500);
    poll();
    return () => clearInterval(t);
  }, [job, phase, poll]);

  const locked = phase !== "building" && phase !== "error";

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

  /**
   * The customer's photo, taken on their own phone.
   *
   * `capture="user"` opens the native camera directly — no getUserMedia
   * permission dance, works in every mobile browser. The frame is downscaled
   * on a canvas before upload so a 12MP selfie doesn't eat festival data:
   * ~1280px is already more than the generator needs.
   *
   * It uploads straight away, in the background, while they're still typing
   * their name. By the time they reach the send button the code is already in
   * the message, so the send itself is instant. If the upload fails the flow
   * carries on and the message says the booth will take the picture instead —
   * a broken photo store must never block a summon.
   */
  const onPhotoPicked = (file: File | undefined) => {
    if (!file) return;
    const img = document.createElement("img");
    const raw = URL.createObjectURL(file);
    img.onload = () => {
      const MAX = 1280;
      const scale = Math.min(1, MAX / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      c.toBlob(
        async (blob) => {
          URL.revokeObjectURL(raw);
          if (!blob) return;
          setPhotoUrl((old) => {
            if (old) URL.revokeObjectURL(old);
            return URL.createObjectURL(blob);
          });
          setPhotoCode(null);
          setUploading(true);
          try {
            const res = await fetch("/api/booth-photo", {
              method: "POST",
              headers: { "Content-Type": "image/jpeg" },
              body: blob,
            });
            const j = await res.json();
            setPhotoCode(res.ok && j.code ? j.code : null);
          } catch {
            setPhotoCode(null);
          } finally {
            setUploading(false);
          }
        },
        "image/jpeg",
        0.85
      );
    };
    img.src = raw;
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
                  src={variant === "kawaii" ? w.posterKawaii : w.poster}
                  alt={`${w.label} — a real frame from the Otamatsuri anime video booth`}
                  fill
                  sizes="(max-width: 768px) 50vw, 280px"
                  className={`object-cover transition-all duration-500 ${
                    active
                      ? "scale-105"
                      : variant === "kawaii"
                        ? "saturate-[0.9] group-hover:saturate-100"
                        : "grayscale-[0.55] group-hover:grayscale-0"
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

      {/* 03 — Photo or video, then their picture, then the name. All three
          appear together once a power is picked, so it reads as one final
          stretch rather than three more gates. */}
      <div ref={nameRef} className="scroll-mt-6">
        <AnimatePresence>
          {world && power && (
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32 }}
              aria-labelledby="step-format"
            >
              <StepLabel n="03" jp="形" text="Photo or video?" id="step-format" accent={accent} />
              <div className="grid grid-cols-2 gap-2.5 mb-14">
                {([
                  { id: "photo" as Format, label: "Photo", jp: "写", sub: "Your anime frame, ready in about a minute" },
                  { id: "video" as Format, label: "Photo + Video", jp: "映", sub: "The frame, then it comes alive" },
                ]).map((f) => {
                  const active = format === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFormat(f.id)}
                      aria-pressed={active}
                      className="relative text-left p-4 pl-5 border transition-all duration-200 active:scale-[0.98] overflow-hidden"
                      style={{
                        borderColor: active ? accent : "rgba(255,255,255,0.14)",
                        background: active ? `${accent}16` : "transparent",
                      }}
                    >
                      <span
                        className="absolute left-0 top-0 bottom-0 w-1 transition-opacity duration-200"
                        style={{ background: accent, opacity: active ? 1 : 0.25 }}
                      />
                      <span
                        aria-hidden
                        className="absolute right-2 top-1 font-jp text-3xl select-none leading-none"
                        style={{ color: accent, opacity: active ? 0.45 : 0.15 }}
                      >
                        {f.jp}
                      </span>
                      <span className="font-geist font-black text-base text-white uppercase tracking-wide block pr-9">
                        {f.label}
                      </span>
                      <span className="font-sans text-white/55 text-xs block mt-1 pr-9 leading-relaxed">
                        {f.sub}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 04 — their picture, taken on their own phone. Optional: the
                  booth camera covers anyone who skips it. */}
              <StepLabel n="04" jp="撮" text="Take your picture" id="step-photo" accent={accent} />
              <input
                ref={cameraRef}
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                onChange={(e) => onPhotoPicked(e.target.files?.[0])}
              />
              <div className="flex items-start gap-3 mb-14">
                {photoUrl ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element -- blob URL preview */}
                    <img
                      src={photoUrl}
                      alt="Your photo"
                      className="w-28 aspect-[3/4] object-cover border-2"
                      style={{ borderColor: accent }}
                    />
                    <div className="flex-1">
                      <p className="font-sans text-white/70 text-xs leading-relaxed mb-2">
                        This is the face that enters the anime. Happy with it?
                      </p>
                      <p className="font-sans text-[11px] mb-3" style={{ color: accent }}>
                        {uploading
                          ? "Sending to the booth…"
                          : photoCode
                            ? `✓ Sent to the booth · code ${photoCode}`
                            : "Saved — the booth will use this."}
                      </p>
                      <button
                        type="button"
                        onClick={() => cameraRef.current?.click()}
                        className="font-geist font-black text-[11px] text-white border border-white/25 px-4 py-2.5 uppercase tracking-widest active:scale-[0.97] transition-transform"
                      >
                        Retake
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={() => cameraRef.current?.click()}
                      className="w-full font-geist font-black text-sm text-white border-2 px-6 py-5 uppercase tracking-widest active:scale-[0.98] transition-transform"
                      style={{ borderColor: accent }}
                    >
                      📸 Open camera
                    </button>
                    <p className="font-sans text-white/45 text-xs mt-3 leading-relaxed">
                      Face the light, waist-up, face big in the frame. Or skip it — the booth
                      camera will shoot you instead.
                    </p>
                  </div>
                )}
              </div>

              <StepLabel n="05" jp="名" text="Your name" id="step-name" accent={accent} />
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
                        src={variant === "kawaii" ? world.posterKawaii : world.poster}
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

      {/* The run: submitted, waiting on the booth, generating, delivered. It
          survives refreshes and the back button — the ticket in localStorage
          finds the order again. */}
      <div ref={resultRef} className="scroll-mt-6">
        <AnimatePresence>
          {locked && (
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32 }}
            >
              <StepLabel
                n="06"
                jp="現"
                text={phase === "ready" ? "Yours" : "At the booth"}
                id="step-run"
                accent={accent}
              />

              <div className="border p-5 sm:p-7" style={{ borderColor: accent }}>
                {phase === "submitting" && (
                  <p className="font-sans text-white/70 text-sm">Sending to the booth…</p>
                )}

                {phase === "waiting" && job && (
                  <>
                    <p className="font-sans text-white/50 text-[10px] tracking-widest2 uppercase mb-3">
                      Show this at the booth
                    </p>
                    <p
                      className="font-geist font-black text-5xl sm:text-6xl leading-none mb-4 tracking-widest"
                      style={{ color: accent }}
                    >
                      {job.id}
                    </p>
                    <p className="font-sans text-white/75 text-sm leading-relaxed">
                      Pay at the booth and the crew will release it. This screen updates by
                      itself — keep it open.
                    </p>
                    <div className="flex gap-1.5 mt-5" aria-hidden>
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1 flex-1"
                          style={{ background: accent }}
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }}
                        />
                      ))}
                    </div>
                  </>
                )}

                {phase === "generating" && (
                  <>
                    <p className="font-sans text-white/50 text-[10px] tracking-widest2 uppercase mb-2">
                      Approved · generating
                    </p>
                    <p className="font-geist font-black text-2xl text-white uppercase mb-3">
                      {stillUrl ? "Your video is rendering" : "Building your world"}
                    </p>
                    <p className="font-sans text-white/70 text-sm leading-relaxed">
                      {format === "photo"
                        ? "About a minute — and it's safe even if you leave this page."
                        : "Your picture lands first, then the video a few minutes after. Safe to lock your phone — this page finds your order again."}
                    </p>
                    {job && (
                      <p className="font-sans text-white/45 text-xs mt-3">
                        Order <span className="font-mono" style={{ color: accent }}>{job.id}</span> —
                        if anything goes wrong, this code recovers everything at the booth.
                      </p>
                    )}
                    {stillUrl && (
                      /* eslint-disable-next-line @next/next/no-img-element -- blob URL */
                      <img
                        src={stillUrl}
                        alt="Your anime frame"
                        className="w-full mt-5 border"
                        style={{ borderColor: accent }}
                      />
                    )}
                    <div className="flex gap-1.5 mt-5" aria-hidden>
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1 flex-1"
                          style={{ background: accent }}
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </>
                )}

                {phase === "ready" && (
                  <>
                    <p className="font-sans text-[10px] tracking-widest2 uppercase mb-4" style={{ color: accent }}>
                      Done · it&apos;s yours
                    </p>
                    {stillUrl && (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element -- blob URL */}
                        <img
                          src={stillUrl}
                          alt="Your anime frame"
                          className="w-full border mb-3"
                          style={{ borderColor: accent }}
                        />
                        {/* ?download=1 makes Blob answer with Content-Disposition:
                            attachment — the `download` attribute alone is ignored
                            cross-origin, which is why "save" used to just open the
                            file and confuse people. */}
                        <a
                          href={`${stillUrl}?download=1`}
                          className="block text-center font-geist font-black text-xs text-ink px-6 py-4 uppercase tracking-widest mb-6"
                          style={{ background: accent }}
                        >
                          ⬇ Download the picture
                        </a>
                      </>
                    )}
                    {videoUrl && (
                      <>
                        <video
                          src={videoUrl}
                          controls
                          playsInline
                          className="w-full border mb-3"
                          style={{ borderColor: accent }}
                        />
                        <a
                          href={`${videoUrl}?download=1`}
                          className="block text-center font-geist font-black text-xs text-ink px-6 py-4 uppercase tracking-widest"
                          style={{ background: accent }}
                        >
                          ⬇ Download the video
                        </a>
                      </>
                    )}
                    <p className="font-sans text-white/50 text-xs mt-6 leading-relaxed">
                      Relax — this stays linked to your phone for 24 hours, and the booth can
                      always recover it with your order code{job ? " " : ""}
                      {job && (
                        <span className="font-mono" style={{ color: accent }}>
                          {job.id}
                        </span>
                      )}
                      . Post it and tag <span className="text-white/75">@nataka.inc</span> 🎌
                    </p>
                    <button
                      type="button"
                      onClick={startNewOrder}
                      className="w-full mt-6 font-geist font-black text-[11px] text-white/60 border border-white/20 px-4 py-3.5 uppercase tracking-widest active:scale-[0.98] transition-transform"
                    >
                      Done — free this phone for the next person
                    </button>
                  </>
                )}

                {phase === "rejected" && (
                  <>
                    <p className="font-geist font-black text-xl text-white uppercase mb-2">
                      Not released
                    </p>
                    <p className="font-sans text-white/70 text-sm leading-relaxed">
                      {note || "Talk to the crew at the booth."}
                    </p>
                    <button
                      type="button"
                      onClick={startNewOrder}
                      className="w-full mt-5 font-geist font-black text-[11px] text-white/60 border border-white/20 px-4 py-3.5 uppercase tracking-widest active:scale-[0.98] transition-transform"
                    >
                      Start over
                    </button>
                  </>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky submit bar — always in thumb reach once a pick exists */}
      <AnimatePresence>
        {world && power && !locked && (
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
              <button
                type="button"
                disabled={!ready || uploading}
                onClick={submit}
                className="w-full text-center font-geist font-black text-sm px-6 py-5 uppercase tracking-widest active:scale-[0.985] transition-transform disabled:cursor-not-allowed"
                style={
                  ready && !uploading
                    ? { background: accent, color: "#0A0A0A" }
                    : {
                        background: "#080808",
                        color: "rgba(255,255,255,0.35)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }
                }
              >
                {uploading
                  ? "Sending your photo…"
                  : !power
                    ? "Choose your power ↑"
                    : !nameOk
                      ? "Add your name ↑"
                      : "Send to the booth"}
              </button>

              <p className="font-sans text-white/45 text-[10px] text-center mt-2.5 leading-relaxed">
                {note && phase === "error"
                  ? note
                  : "The crew release it once you have paid. Your picture appears right here."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so the sticky bar never covers the last card */}
      {world && power && !locked && <div aria-hidden className="h-24" />}
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
