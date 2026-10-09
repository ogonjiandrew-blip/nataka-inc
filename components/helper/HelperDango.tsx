"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useSpring, useTransform, useVelocity, type MotionValue } from "framer-motion";
import { bumpPill, takeMorph } from "@/lib/helperStore";
import { FALL, RISE, clamp, jellyX, jellyY, kick } from "@/components/helper/softBody";

const LINE = "#E6A1B6";
// Softer and wobblier than Mochi: a few visible jiggles before it settles, like the Clannad dango
const JELLY = { stiffness: 320, damping: 9 };
const wait = (ms: number) => new Promise((r) => window.setTimeout(r, ms));

/**
 * The helper asleep: a pastel dango napping on top of the WhatsApp button.
 * It keeps its volume however it moves: it lands squashed and wobbles into
 * shape, breathes with a sleep bubble that swells on every breath, jolts tall
 * when the bubble pops, snuggles into the button now and then, peeks when the
 * pointer comes close, hops (crouch, stretch, hang, splat) when someone touches
 * the button, and springs up tall into Mochi when it is tapped.
 */
export default function HelperDango({
  onWake,
  jostle,
  dip,
  standby = false,
}: {
  onWake: () => void;
  jostle: number;
  dip: MotionValue<number>;
  // mounted unseen while Mochi flies over, so its first paint never stalls her landing
  standby?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const [startled, setStartled] = useState(false);
  const [waking, setWaking] = useState(false);
  const [bubbleKey, setBubbleKey] = useState(0);
  const [heartKey, setHeartKey] = useState(0);
  // what it is busy doing; a hop on the button may cut a snuggle short, a tap cuts anything short
  const busy = useRef<string | null>(null);
  const claim = (who: string, over: string[] = []) => {
    if (busy.current && !over.includes(busy.current)) return false;
    busy.current = who;
    return true;
  };
  const release = (who: string) => {
    if (busy.current === who) busy.current = null;
  };
  const alive = useRef(true);
  const hoverRef = useRef(false);

  /* ---------- the jelly ---------- */
  const j = useMotionValue(0); // + squash, - stretch
  const breath = useMotionValue(0.022);
  const hopY = useMotionValue(0);
  const lean = useSpring(0, { stiffness: 90, damping: 8 });
  const vHop = useVelocity(hopY);
  // squash or stretch, plus the breath, plus a stretch from its own speed while it is in the air
  const jt = useTransform([j, breath, vHop], ([a, b, v]) =>
    clamp((a as number) + (b as number) - Math.min(0.16, Math.abs(v as number) / 2200), -0.45, 0.5),
  );
  const sx = useTransform(jt, jellyX);
  const sy = useTransform(jt, jellyY);
  // the face slides a beat behind the body, like a soft filling
  const faceY = useSpring(useTransform(jt, (v) => v * 10), { stiffness: 260, damping: 12 });
  const dipY = useTransform(dip, (v) => v * 48);
  // the sleep bubble swells as it breathes out, the mouth opens a little with it
  const bubbleScale = useTransform(breath, [-0.022, 0.022], [0.55, 1.3]);
  const mouthOpen = useTransform(breath, [-0.022, 0.022], [1, 1.7]);

  const jiggle = (v: number) => kick(j, v, JELLY);

  const hop = async (h: number) => {
    if (!claim("hop", ["snuggle"])) return;
    lean.set(0);
    await animate(j, 0.2, { duration: 0.12, ease: [0.3, 0, 0.6, 1] }); // crouch
    if (!alive.current || busy.current !== "hop") return;
    jiggle(-7); // the crouch springs into a stretch
    await animate(hopY, -h, { duration: 0.26, ease: RISE }); // fast launch, hang at the top
    await animate(hopY, 0, { duration: 0.2, ease: FALL }); // fast fall
    if (!alive.current || busy.current !== "hop") return;
    jiggle(7.5); // splat, then wobble back into shape
    bumpPill(0.5);
    await wait(380);
    release("hop");
  };

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  // Arrival: squashed if Mochi just curled up into it, otherwise it plops down from above
  const entered = useRef(false);
  useEffect(() => {
    if (standby || entered.current) return;
    entered.current = true;
    const breathing = animate(breath, [0.022, -0.022], { duration: 1.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" });
    if (takeMorph()) {
      j.set(0.34);
      jiggle(0);
    } else {
      claim("plop");
      hopY.set(-30);
      j.set(-0.2);
      animate(hopY, 0, { duration: 0.28, ease: FALL }).then(() => {
        if (!alive.current) return;
        jiggle(8);
        bumpPill(0.6);
        release("plop");
      });
    }
    return () => breathing.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [standby]);

  // Every few breaths the sleep bubble pops: it jolts tall, lands, and dozes off again
  useEffect(() => {
    if (standby) return;
    const id = window.setInterval(async () => {
      if (hoverRef.current || !claim("startle", ["snuggle"])) return;
      lean.set(0);
      setBubbleKey((k) => k + 1);
      setStartled(true);
      jiggle(-5.5);
      await animate(hopY, -8, { duration: 0.13, ease: RISE });
      await animate(hopY, 0, { duration: 0.12, ease: FALL });
      if (!alive.current) return;
      jiggle(6);
      bumpPill(0.3);
      await wait(520);
      setStartled(false);
      release("startle");
    }, 9600);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [standby]);

  // A small dream heart drifts up now and then
  useEffect(() => {
    if (standby) return;
    const id = window.setInterval(() => setHeartKey((k) => k + 1), 13000);
    return () => window.clearInterval(id);
  }, [standby]);

  // Now and then it snuggles into the button: a slow lean, a soft wobble, back to centre
  useEffect(() => {
    if (standby) return;
    let t: number;
    const loop = () => {
      t = window.setTimeout(async () => {
        if (!hoverRef.current && claim("snuggle")) {
          lean.set(Math.random() < 0.5 ? -5 : 5);
          jiggle(1.8);
          await wait(1100);
          if (busy.current === "snuggle") {
            lean.set(0);
            jiggle(2.2);
            await wait(500);
          }
          release("snuggle");
        }
        loop();
      }, 9000 + Math.random() * 6000);
    };
    loop();
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [standby]);

  // Someone touched the WhatsApp button underneath: a sleepy hop
  useEffect(() => {
    if (jostle > 0 && !standby) hop(14);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jostle]);

  const enter = () => {
    hoverRef.current = true;
    setHover(true);
    if (busy.current === "snuggle") release("snuggle");
    if (!busy.current) {
      jiggle(2.6);
      lean.set(3);
    }
  };
  const leave = () => {
    hoverRef.current = false;
    setHover(false);
    lean.set(0);
  };

  // Tapped: it crouches, springs up tall, and Mochi pops out of the stretch
  const wakeUp = async () => {
    if (waking) return;
    setWaking(true);
    busy.current = "wake";
    lean.set(0);
    await animate(j, 0.26, { duration: 0.13, ease: [0.3, 0, 0.6, 1] });
    jiggle(-9);
    animate(hopY, -12, { duration: 0.16, ease: RISE });
    await wait(80);
    onWake();
  };

  const eyes = waking ? "awake" : startled ? "startled" : hover ? "peek" : "sleep";

  return (
    <motion.button
      type="button"
      onClick={wakeUp}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      aria-label="Wake the Nataka helper"
      aria-hidden={standby || undefined}
      tabIndex={standby ? -1 : undefined}
      title="Need a hand? Tap to wake me"
      // never fully transparent while standing by, so the browser really paints it ahead of time
      initial={{ opacity: 0.01 }}
      animate={{ opacity: standby ? 0.01 : 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      transition={{ duration: 0.12 }}
      style={{ y: dipY }}
      className={`absolute bottom-[calc(100%-9px)] right-4 z-10 h-[50px] w-[72px] cursor-pointer focus-visible:outline-none ${standby ? "pointer-events-none" : ""}`}
    >
      {/* Zzz drifting up while it sleeps */}
      {!hover && !startled && !waking && (
        <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-5 h-10 w-10">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 left-0 font-heading font-extrabold text-[#9FDBE8]"
              style={{ fontSize: 10 + i * 2 }}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 1, 0], x: [0, 9, 4, 16], y: [0, -10, -20, -30], scale: [0.6, 1, 1.1, 1.2], rotate: [0, -10, 8, -6] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
            >
              z
            </motion.span>
          ))}
        </span>
      )}

      {/* Dream heart */}
      <AnimatePresence>
        {heartKey > 0 && (
          <motion.svg
            key={heartKey}
            viewBox="0 0 20 18"
            aria-hidden="true"
            className="pointer-events-none absolute left-2 -top-3 h-3.5 w-4"
            initial={{ opacity: 0, y: 0, scale: 0.4 }}
            animate={{ opacity: [0, 1, 0], y: -26, scale: 1, rotate: [0, -12, 8] }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          >
            <path d="M10 17 C 3 12, 0 8, 2 4 C 4 0, 9 1, 10 5 C 11 1, 16 0, 18 4 C 20 8, 17 12, 10 17 Z" fill="#F5A9B8" stroke="#E08A9E" strokeWidth="1.4" />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* The body: hops, leans and squashes from its base */}
      <motion.div className="h-full w-full" style={{ y: hopY, rotate: lean, scaleX: sx, scaleY: sy, originX: 0.5, originY: 1 }}>
        <svg viewBox="0 0 160 110" className="h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="hd-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FDE4EC" />
              <stop offset="1" stopColor="#F7C7D6" />
            </linearGradient>
            <filter id="hd-paint" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="wob" />
              <feGaussianBlur in="SourceAlpha" stdDeviation="4.5" result="halo" />
              <feFlood floodColor="#FFFFFF" floodOpacity="0.5" />
              <feComposite in2="halo" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="wob" />
              </feMerge>
            </filter>
            <filter id="hd-b3" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          <g filter="url(#hd-paint)" stroke={LINE} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
            <path d="M14 98 C 12 58, 44 28, 80 28 C 116 28, 148 58, 146 98 C 120 102, 40 102, 14 98 Z" fill="url(#hd-body)" />
            <path d="M26 92 C 50 98, 110 98, 134 92" fill="none" stroke="#EFAFC4" strokeWidth="9" filter="url(#hd-b3)" opacity=".7" />
            <motion.g
              style={{ originX: 0.2, originY: 1 }}
              animate={{ rotate: waking ? [0, -18, 12, 0] : hover ? [0, 14, 0] : [-6, 10, -6] }}
              transition={{ duration: waking || hover ? 0.5 : 3.6, repeat: waking || hover ? 0 : Infinity, ease: "easeInOut" }}
            >
              <path d="M78 30 C 74 18, 80 10, 90 12 C 84 16, 82 22, 84 30" fill="url(#hd-body)" />
            </motion.g>
            <path d="M36 52 C 44 42, 56 36, 68 34" fill="none" stroke="#FFFFFF" strokeWidth="4" filter="url(#hd-b3)" />

            {/* the face, lagging a touch behind the body */}
            <motion.g style={{ y: faceY }}>
              {eyes === "sleep" && (
                <g fill="none" stroke="#A86C86" strokeWidth="3">
                  <path d="M52 66 C 56 71, 64 71, 68 66" />
                  <path d="M92 66 C 96 71, 104 71, 108 66" />
                </g>
              )}
              {eyes === "peek" && (
                <g>
                  <path d="M52 66 C 56 71, 64 71, 68 66" fill="none" stroke="#A86C86" strokeWidth="3" />
                  <ellipse cx="100" cy="66" rx="6" ry="7" fill="#5C3A4C" stroke="#A86C86" strokeWidth="2" />
                  <circle cx="98" cy="63.5" r="2" fill="#FFFFFF" stroke="none" />
                </g>
              )}
              {(eyes === "startled" || eyes === "awake") && (
                <g stroke="#A86C86" strokeWidth="2">
                  <circle cx="60" cy="66" r={eyes === "awake" ? 6.5 : 5.5} fill="#5C3A4C" />
                  <circle cx="100" cy="66" r={eyes === "awake" ? 6.5 : 5.5} fill="#5C3A4C" />
                  <circle cx="58.5" cy="64" r="1.8" fill="#FFFFFF" stroke="none" />
                  <circle cx="98.5" cy="64" r="1.8" fill="#FFFFFF" stroke="none" />
                </g>
              )}
              {eyes === "awake" && (
                <g stroke="#FFA7BC" strokeWidth="2.4" fill="none">
                  <path d="M118 40 L 124 30 M 128 48 L 138 42" />
                </g>
              )}

              <motion.g stroke="none" fill="#FFB3C7" filter="url(#hd-b3)" animate={{ opacity: hover || waking ? 1 : 0.8 }}>
                <ellipse cx="46" cy="78" rx="9" ry="5.5" />
                <ellipse cx="114" cy="78" rx="9" ry="5.5" />
              </motion.g>

              {startled || waking ? (
                <ellipse cx="80" cy="80" rx="3" ry="3.6" fill="#F4A0B4" stroke="#D88AA0" strokeWidth="2" />
              ) : (
                <motion.path
                  d="M76 78 C 78 81, 82 81, 84 78"
                  fill="none"
                  stroke="#D88AA0"
                  strokeWidth="2.2"
                  style={{ scaleY: mouthOpen, originX: 0.5, originY: 0 }}
                />
              )}

              {/* sleep bubble: swells with every breath, pops every so often */}
              <AnimatePresence>
                {!startled && !hover && !waking && (
                  <motion.g
                    key={bubbleKey}
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.9, transition: { duration: 0.16 } }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ originX: 0.5, originY: 0.5 }}
                  >
                    <motion.circle
                      cx="96"
                      cy="82"
                      r="7"
                      fill="#E6F7FF"
                      fillOpacity=".7"
                      stroke="#A9D7EC"
                      strokeWidth="1.6"
                      style={{ scale: bubbleScale, originX: 0.5, originY: 0.5 }}
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* little burst lines when the bubble pops */}
              <AnimatePresence>
                {startled && (
                  <motion.g
                    key={`pop-${bubbleKey}`}
                    stroke="#A9D7EC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ opacity: 1, scale: 0.6 }}
                    animate={{ opacity: 0, scale: 1.3 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                  >
                    <path d="M96 70 L 96 66 M 106 74 L 110 71 M 108 84 L 112 85 M 86 74 L 82 71" />
                  </motion.g>
                )}
              </AnimatePresence>
            </motion.g>
          </g>
        </svg>
      </motion.div>
    </motion.button>
  );
}

/**
 * The dango's painted look on its own, drawn once unseen just after the page
 * loads so the browser has its filters ready before the first real dango.
 */
export function DangoWarmup() {
  return (
    <svg viewBox="0 0 160 110" className="h-[50px] w-[72px]" aria-hidden="true">
      <defs>
        <filter id="hdw-paint" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="wob" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="4.5" result="halo" />
          <feFlood floodColor="#FFFFFF" floodOpacity="0.5" />
          <feComposite in2="halo" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="wob" />
          </feMerge>
        </filter>
        <filter id="hdw-b3" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <g filter="url(#hdw-paint)" stroke={LINE} strokeWidth="2">
        <path d="M14 98 C 12 58, 44 28, 80 28 C 116 28, 148 58, 146 98 C 120 102, 40 102, 14 98 Z" fill="#F7C7D6" />
        <path d="M26 92 C 50 98, 110 98, 134 92" fill="none" stroke="#EFAFC4" strokeWidth="9" filter="url(#hdw-b3)" />
      </g>
    </svg>
  );
}
