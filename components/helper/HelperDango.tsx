"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINE = "#E6A1B6";

/**
 * The helper asleep: a pastel dango napping on top of the WhatsApp button.
 * It breathes, snores, blows a sleep bubble that sometimes pops and startles it,
 * peeks with one eye when the pointer comes close, and wakes when tapped.
 */
export default function HelperDango({ onWake, jostle }: { onWake: () => void; jostle: number }) {
  // Andrew's standing call (as with the hero reel and BTS popup): the animation always runs,
  // even when the OS asks for reduced motion.
  const reduce = false;
  const [hover, setHover] = useState(false);
  const [startled, setStartled] = useState(false);
  const [bubbleKey, setBubbleKey] = useState(0);
  const [heartKey, setHeartKey] = useState(0);
  const [hop, setHop] = useState(0);

  // Every few breaths the sleep bubble pops, the dango flinches, then dozes off again
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setBubbleKey((k) => k + 1);
      setStartled(true);
      window.setTimeout(() => setStartled(false), 650);
    }, 9600);
    return () => window.clearInterval(id);
  }, [reduce]);

  // A small dream heart drifts up now and then
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setHeartKey((k) => k + 1), 13000);
    return () => window.clearInterval(id);
  }, [reduce]);

  // Someone touched the WhatsApp button underneath: a sleepy hop
  useEffect(() => {
    if (jostle > 0) setHop((h) => h + 1);
  }, [jostle]);

  const eyes = startled ? "startled" : hover ? "peek" : "sleep";

  return (
    <motion.button
      type="button"
      onClick={onWake}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      aria-label="Wake the Nataka helper"
      title="Need a hand? Tap to wake me"
      initial={reduce ? { opacity: 0 } : { opacity: 0, scaleX: 0.6, scaleY: 1.4, y: -40 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: [-40, 0, -6, 0], scaleX: [0.6, 1.38, 0.88, 1.08, 0.97, 1], scaleY: [1.4, 0.62, 1.14, 0.94, 1.02, 1] }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scaleX: 0.5, scaleY: 1.5, y: -14, transition: { duration: 0.22 } }}
      transition={{ duration: 0.85, ease: "easeOut", times: [0, 0.3, 0.5, 0.7, 0.85, 1] }}
      style={{ originY: 1 }}
      className="absolute bottom-[calc(100%-9px)] right-4 z-10 h-[50px] w-[72px] cursor-pointer focus-visible:outline-none"
    >
      {/* Zzz drifting up while it sleeps */}
      {!hover && !startled && !reduce && (
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
        {heartKey > 0 && !reduce && (
          <motion.svg
            key={heartKey}
            viewBox="0 0 20 18"
            aria-hidden="true"
            className="pointer-events-none absolute left-2 -top-3 h-3.5 w-4"
            initial={{ opacity: 0, y: 0, scale: 0.4 }}
            animate={{ opacity: [0, 1, 0], y: -26, scale: 1 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          >
            <path d="M10 17 C 3 12, 0 8, 2 4 C 4 0, 9 1, 10 5 C 11 1, 16 0, 18 4 C 20 8, 17 12, 10 17 Z" fill="#F5A9B8" stroke="#E08A9E" strokeWidth="1.4" />
          </motion.svg>
        )}
      </AnimatePresence>

      <motion.div
        className="h-full w-full"
        key={hop}
        animate={
          reduce
            ? undefined
            : hop > 0
              ? { y: [0, -12, 0, -4, 0], scaleX: [1, 0.9, 1.16, 0.96, 1], scaleY: [1, 1.12, 0.86, 1.04, 1] }
              : hover
                ? { y: -2, scaleX: [1, 1.08, 0.95, 1.02, 1], scaleY: [1, 0.93, 1.05, 0.99, 1] }
                : { y: 0 }
        }
        transition={{ duration: hop > 0 ? 0.65 : 0.5, ease: "easeOut" }}
        style={{ originY: 1 }}
      >
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

          {/* Breathing: squash and stretch from the base */}
          <motion.g
            filter="url(#hd-paint)"
            stroke={LINE}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ originX: 0.5, originY: 1 }}
            animate={reduce ? undefined : { scaleX: [1, 1.04, 1], scaleY: [1, 0.955, 1] }}
            transition={reduce ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M14 98 C 12 58, 44 28, 80 28 C 116 28, 148 58, 146 98 C 120 102, 40 102, 14 98 Z" fill="url(#hd-body)" />
            <path d="M26 92 C 50 98, 110 98, 134 92" fill="none" stroke="#EFAFC4" strokeWidth="9" filter="url(#hd-b3)" opacity=".7" />
            <motion.g
              style={{ originX: 0.2, originY: 1 }}
              animate={reduce ? undefined : { rotate: hover ? [0, 14, 0] : [-6, 10, -6] }}
              transition={reduce ? undefined : { duration: hover ? 0.5 : 3.2, repeat: hover ? 0 : Infinity, ease: "easeInOut" }}
            >
              <path d="M78 30 C 74 18, 80 10, 90 12 C 84 16, 82 22, 84 30" fill="url(#hd-body)" />
            </motion.g>
            <path d="M36 52 C 44 42, 56 36, 68 34" fill="none" stroke="#FFFFFF" strokeWidth="4" filter="url(#hd-b3)" />

            {/* Eyes: asleep, peeking, or startled by the bubble */}
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
            {eyes === "startled" && (
              <g stroke="#A86C86" strokeWidth="2">
                <circle cx="60" cy="66" r="5.5" fill="#5C3A4C" />
                <circle cx="100" cy="66" r="5.5" fill="#5C3A4C" />
                <circle cx="58.5" cy="64" r="1.8" fill="#FFFFFF" stroke="none" />
                <circle cx="98.5" cy="64" r="1.8" fill="#FFFFFF" stroke="none" />
              </g>
            )}

            <motion.g stroke="none" fill="#FFB3C7" filter="url(#hd-b3)" animate={{ opacity: hover ? 1 : 0.8 }}>
              <ellipse cx="46" cy="78" rx="9" ry="5.5" />
              <ellipse cx="114" cy="78" rx="9" ry="5.5" />
            </motion.g>

            {startled ? (
              <ellipse cx="80" cy="80" rx="3" ry="3.6" fill="#F4A0B4" stroke="#D88AA0" strokeWidth="2" />
            ) : (
              <motion.path
                d="M76 78 C 78 81, 82 81, 84 78"
                fill="none"
                stroke="#D88AA0"
                strokeWidth="2.2"
                animate={reduce ? undefined : { scaleY: [1, 1.6, 1] }}
                style={{ originX: 0.5, originY: 0 }}
                transition={reduce ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </motion.g>

          {/* Sleep bubble: grows with each breath, pops every so often */}
          <AnimatePresence mode="popLayout">
            {!startled && !hover && (
              <motion.circle
                key={bubbleKey}
                cx="96"
                cy="82"
                r="7"
                fill="#E6F7FF"
                fillOpacity=".7"
                stroke="#A9D7EC"
                strokeWidth="1.6"
                style={{ originX: 0.5, originY: 0.5 }}
                initial={{ scale: 0.2, opacity: 0 }}
                animate={reduce ? { scale: 1, opacity: 1 } : { scale: [0.55, 1.3, 0.55], opacity: 1 }}
                exit={{ scale: 1.9, opacity: 0, transition: { duration: 0.18 } }}
                transition={reduce ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>

          {/* Little burst lines when the bubble pops */}
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
                style={{ originX: "96px", originY: "82px" }}
              >
                <path d="M96 70 L 96 66 M 106 74 L 110 71 M 108 84 L 112 85 M 86 74 L 82 71" />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </motion.div>
    </motion.button>
  );
}
