"use client";

import { memo, useEffect, useState } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";

export type Eyes = "open" | "happy" | "wink" | "surprised" | "sleepy" | "sparkle";
export type Mouth = "cat" | "smile" | "grin" | "o" | "yawn" | "pout";

const LINE = "#E6A1B6";
const LASH = "#B07990";
const SKIN = "#FFF4F6";

/**
 * Mochi, drawn soft: pencil-wobble rose lines, watercolour shading and a white
 * haze instead of a hard outline. Head and body are separate layers so the head
 * can tilt toward the pointer and lag behind the body; hair, clips and the
 * bunny's ears take `sway` (a spring fed by her real speed) for follow-through.
 * `headX`/`headY` carry the head's own inertia: it lags when she speeds up and
 * keeps going for a moment when she lands. Memoised, so the typewriter in the
 * speech bubble does not redraw her on every letter.
 */
function HelperGirl({
  eyes = "open",
  mouth = "cat",
  waving = false,
  flying = false,
  blink = false,
  blush = false,
  talking = false,
  lookX,
  lookY,
  tilt,
  sway,
  headX,
  headY,
  className,
}: {
  eyes?: Eyes;
  mouth?: Mouth;
  waving?: boolean;
  flying?: boolean;
  blink?: boolean;
  blush?: boolean;
  talking?: boolean;
  lookX: MotionValue<number>;
  lookY: MotionValue<number>;
  tilt: MotionValue<number>;
  sway: MotionValue<number>;
  headX?: MotionValue<number>;
  headY?: MotionValue<number>;
  className?: string;
}) {
  // Andrew's standing call (as with the hero reel and BTS popup): the animation always runs,
  // even when the OS asks for reduced motion.
  const reduce = false;
  const px = useTransform(lookX, (v) => v * 3);
  const py = useTransform(lookY, (v) => v * 2.4);
  const hx = useTransform(lookX, (v) => v * 1.5);
  const hy = useTransform(lookY, (v) => v * 1.2);
  // Follow-through: different parts swing by different amounts
  const swayHair = useTransform(sway, (v) => v * 0.7);
  const swayTip = useTransform(sway, (v) => v * 1.3);
  const swayEarL = useTransform(sway, (v) => -v * 1.1);
  const swayEarR = useTransform(sway, (v) => v * 1.1);

  // Mouth flaps while she "speaks" a line
  const [flap, setFlap] = useState(false);
  useEffect(() => {
    if (!talking) return setFlap(false);
    const id = window.setInterval(() => setFlap((f) => !f), 110);
    return () => window.clearInterval(id);
  }, [talking]);

  const loop = (d: number, delay = 0) =>
    reduce ? { duration: 0 } : { duration: d, repeat: Infinity, ease: "easeInOut" as const, delay };

  return (
    <svg viewBox="0 0 220 236" className={className} aria-hidden="true" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="hg-eye" cx=".5" cy=".64" r=".64">
          <stop offset="0" stopColor="#C49AB0" />
          <stop offset=".5" stopColor="#71485E" />
          <stop offset="1" stopColor="#3B2232" />
        </radialGradient>
        <linearGradient id="hg-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDE8EF" />
          <stop offset="1" stopColor="#F5C3D3" />
        </linearGradient>
        <linearGradient id="hg-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E3F3FA" />
          <stop offset="1" stopColor="#CBE7F3" />
        </linearGradient>
        {/* Pencil wobble on every edge, plus a soft white haze around her */}
        <filter id="hg-paint" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="wob" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="halo" />
          <feFlood floodColor="#FFFFFF" floodOpacity="0.5" />
          <feComposite in2="halo" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="wob" />
          </feMerge>
        </filter>
        <filter id="hg-b1" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
        <filter id="hg-b3" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <g filter="url(#hg-paint)" stroke={LINE} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        {/* ---------- body, behind the head ---------- */}
        <motion.g style={{ originX: 0.5, originY: 1 }} animate={reduce ? undefined : { scaleY: [1, 1.035, 1] }} transition={loop(2.8)}>
          {/* feet dangle; they kick back while she flies */}
          <motion.g
            style={{ originX: 0.5, originY: 0 }}
            animate={reduce ? undefined : { rotate: flying ? [10, 22, 10] : [-4, 5, -4] }}
            transition={loop(flying ? 0.42 : 2.2)}
          >
            <path d="M97 204 C 96 211, 95 216, 97 221 C 99 224, 105 224, 106 220 C 107 215, 107 209, 107 204 Z" fill={SKIN} />
            <path d="M114 204 C 114 210, 115 215, 118 219 C 120 223, 126 222, 126 217 C 125 212, 124 208, 123 204 Z" fill={SKIN} />
          </motion.g>
          <path d="M84 208 C 80 190, 90 168, 110 168 C 130 168, 140 190, 136 208 C 126 212, 94 212, 84 208 Z" fill="url(#hg-top)" />
          <path d="M90 196 C 100 204, 120 204, 130 196" fill="none" stroke="#B8DCEB" strokeWidth="5" filter="url(#hg-b3)" opacity=".8" />
          <path d="M99 172 C 103 179, 117 179, 121 172" fill="none" stroke="#B5DDEB" strokeWidth="1.8" />
          {/* arm hugging a mini bunny that wiggles */}
          <path d="M88 180 C 80 184, 78 194, 84 198 C 88 200, 92 196, 92 190 Z" fill="url(#hg-top)" />
          <motion.g style={{ originX: 0.5, originY: 1 }} animate={reduce ? undefined : { rotate: [-6, 6, -6], y: [0, -1.2, 0] }} transition={loop(1.5, 0.2)}>
            <ellipse cx="95" cy="196" rx="9.5" ry="8.5" fill="#FFFFFF" />
            <path d="M89 190 C 86 181, 88 177, 91 178 C 93 180, 93 186, 92 190 M 98 189 C 99 181, 102 178, 104 180 C 105 183, 102 188, 100 191" fill="#FFFFFF" />
            <circle cx="92" cy="196" r="1.2" fill="#8E6A7E" stroke="none" />
            <circle cx="98" cy="196" r="1.2" fill="#8E6A7E" stroke="none" />
            <ellipse cx="95" cy="199.5" rx="2" ry="1.2" fill="#FFC6D4" stroke="none" />
          </motion.g>
          <circle cx="84" cy="199" r="4.6" fill={SKIN} />
        </motion.g>

        {/* ---------- head ---------- */}
        <motion.g style={{ rotate: tilt, x: headX, y: headY, originX: 0.5, originY: 0.92 }}>
          {/* long side locks, swinging with her movement */}
          <motion.g style={{ rotate: swayHair, originX: 0.7, originY: 0 }}>
            <motion.g style={{ originX: 0.7, originY: 0 }} animate={reduce ? undefined : { rotate: [-3, 4, -3] }} transition={loop(2.3)}>
              <path d="M46 128 C 40 150, 34 176, 22 208 C 36 204, 48 190, 56 172 C 60 158, 60 142, 58 132 Z" fill="url(#hg-hair)" />
            </motion.g>
          </motion.g>
          <motion.g style={{ rotate: swayHair, originX: 0.3, originY: 0 }}>
            <motion.g style={{ originX: 0.3, originY: 0 }} animate={reduce ? undefined : { rotate: [3, -4, 3] }} transition={loop(2.3, 0.35)}>
              <path d="M174 128 C 180 150, 186 176, 198 208 C 184 204, 172 190, 164 172 C 160 158, 160 142, 162 132 Z" fill="url(#hg-hair)" />
            </motion.g>
          </motion.g>

          {/* hair dome with watercolour shading and soft highlights */}
          <path d="M30 124 C 26 74, 62 30, 110 30 C 158 30, 194 74, 190 124 C 190 138, 186 148, 180 156 L 40 156 C 34 148, 30 138, 30 124 Z" fill="url(#hg-hair)" />
          <path d="M40 128 C 50 146, 80 152, 110 152 C 140 152, 170 146, 180 128" fill="none" stroke="#EFAFC4" strokeWidth="9" filter="url(#hg-b3)" opacity=".7" />
          <path d="M58 66 C 70 52, 86 46, 102 44 M 148 54 C 160 62, 168 74, 172 88" fill="none" stroke="#FFFFFF" strokeWidth="4" filter="url(#hg-b1)" />

          {/* fluffy white clips */}
          <motion.g style={{ rotate: swayTip, originX: 0.5, originY: 0.5 }}>
            <path d="M36 152 C 30 148, 30 140, 36 138 C 36 132, 44 130, 47 135 C 52 132, 58 138, 54 143 C 58 148, 52 154, 47 151 C 44 156, 36 156, 36 152 Z" fill="#FFFFFF" />
          </motion.g>
          <motion.g style={{ rotate: swayTip, originX: 0.5, originY: 0.5 }}>
            <path d="M184 152 C 190 148, 190 140, 184 138 C 184 132, 176 130, 173 135 C 168 132, 162 138, 166 143 C 162 148, 168 154, 173 151 C 176 156, 184 156, 184 152 Z" fill="#FFFFFF" />
          </motion.g>

          {/* face with a soft shadow under the bangs */}
          <ellipse cx="110" cy="126" rx="50" ry="42" fill={SKIN} stroke="none" />
          <path d="M66 116 C 86 124, 134 124, 154 116" fill="none" stroke="#F6CCD9" strokeWidth="10" filter="url(#hg-b3)" opacity=".75" />
          <path d="M60 130 C 64 154, 86 168, 110 168 C 134 168, 156 154, 160 130" fill="none" />

          {/* bangs: fill only, lower edge drawn */}
          <path
            d="M58 124 C 54 84, 78 58, 110 58 C 142 58, 166 84, 162 124 C 158 116, 152 110, 146 108 C 144 114, 140 118, 134 118 C 132 108, 124 102, 116 102 C 114 110, 110 114, 104 114 C 100 106, 92 102, 86 104 C 84 112, 80 116, 74 116 C 72 110, 66 108, 62 110 C 61 114, 59 119, 58 124 Z"
            fill="url(#hg-hair)"
            stroke="none"
          />
          <path d="M58 124 C 59 119, 61 114, 62 110 C 66 108, 72 110, 74 116 C 80 116, 84 112, 86 104 C 92 102, 100 106, 104 114 C 110 114, 114 110, 116 102 C 124 102, 132 108, 134 118 C 140 118, 144 114, 146 108 C 152 110, 158 116, 162 124" fill="none" />
          <path d="M92 72 C 102 66, 118 66, 128 72" fill="none" stroke="#FFFFFF" strokeWidth="3.4" filter="url(#hg-b1)" />

          {/* ahoge: idle sway plus a springy boing from her movement */}
          <motion.g style={{ rotate: swayTip, originX: 0.15, originY: 1 }}>
            <motion.g style={{ originX: 0.15, originY: 1 }} animate={reduce ? undefined : { rotate: [-9, 9, -9] }} transition={loop(1.8)}>
              <path d="M110 32 C 106 18, 114 8, 126 10 C 118 14, 114 22, 116 32" fill="url(#hg-hair)" />
            </motion.g>
          </motion.g>

          {/* bunny plush on her head */}
          <motion.g animate={reduce ? undefined : { y: [0, -1.6, 0] }} transition={loop(2.6, 0.5)}>
            <motion.g style={{ rotate: swayEarL, originX: 0.6, originY: 1 }}>
              <motion.g style={{ originX: 0.6, originY: 1 }} animate={reduce ? undefined : { rotate: [0, 0, -16, 4, 0, 0] }} transition={{ ...loop(3.6), times: [0, 0.66, 0.74, 0.8, 0.86, 1] }}>
                <path d="M50 46 C 41 31, 41 17, 48 14 C 55 14, 59 30, 59 42 Z" fill="#FFFFFF" />
                <path d="M49 21 C 50 28, 52 35, 55 40" fill="none" stroke="#FFD0DC" strokeWidth="3" />
              </motion.g>
            </motion.g>
            <motion.g style={{ rotate: swayEarR, originX: 0.2, originY: 1 }}>
              <motion.g style={{ originX: 0.2, originY: 1 }} animate={reduce ? undefined : { rotate: [0, 0, 14, -4, 0, 0] }} transition={{ ...loop(3.6, 0.1), times: [0, 0.66, 0.74, 0.8, 0.86, 1] }}>
                <path d="M66 42 C 68 29, 75 18, 82 20 C 87 24, 80 37, 73 46 Z" fill="#FFFFFF" />
                <path d="M78 25 C 75 31, 72 37, 69 42" fill="none" stroke="#FFD0DC" strokeWidth="3" />
              </motion.g>
            </motion.g>
            <ellipse cx="62" cy="58" rx="21" ry="17.5" fill="#FFFFFF" />
            <path d="M46 66 C 54 72, 70 72, 78 66" fill="none" stroke="#F1DCE4" strokeWidth="6" filter="url(#hg-b3)" />
            <circle cx="55" cy="57" r="1.9" fill="#8E6A7E" stroke="none" />
            <circle cx="69" cy="57" r="1.9" fill="#8E6A7E" stroke="none" />
            <path d="M60 62 C 61 63.6, 63 63.6, 64 62" fill="none" stroke="#C98AA0" strokeWidth="1.5" />
            <ellipse cx="50" cy="63" rx="4" ry="2.2" fill="#FFC6D4" stroke="none" />
            <ellipse cx="74" cy="63" rx="4" ry="2.2" fill="#FFC6D4" stroke="none" />
          </motion.g>

          {/* eyes */}
          <motion.g
            style={{ originY: 0.5 }}
            animate={{ scaleY: blink && (eyes === "open" || eyes === "sparkle" || eyes === "surprised") ? 0.08 : 1 }}
            transition={{ type: "spring", stiffness: 900, damping: 30 }}
          >
            <EyesLayer eyes={eyes} px={px} py={py} hx={hx} hy={hy} reduce={!!reduce} />
          </motion.g>

          {/* watercolour blush */}
          <motion.g
            stroke="none"
            fill="#FFB3C7"
            filter="url(#hg-b3)"
            animate={{ opacity: blush ? 1 : 0.8, scale: blush ? 1.25 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <ellipse cx="68" cy="152" rx="12" ry="7" />
            <ellipse cx="152" cy="152" rx="12" ry="7" />
          </motion.g>

          <MouthLayer mouth={talking ? (flap ? "o" : "smile") : mouth} />
        </motion.g>

        {/* ---------- waving arm, in front of everything ---------- */}
        <motion.g
          style={{ originX: 0, originY: 1 }}
          animate={waving && !reduce ? { rotate: [0, -28, 10, -28, 10, -4, 0] } : { rotate: 0 }}
          transition={waving && !reduce ? { duration: 1.4, ease: "easeInOut" } : { type: "spring", stiffness: 260, damping: 12 }}
        >
          <path d="M130 180 C 138 176, 146 170, 152 162 C 156 164, 157 169, 154 172 C 148 180, 140 186, 132 188 Z" fill="url(#hg-top)" />
          <motion.g
            style={{ originX: 0.2, originY: 0.9 }}
            animate={waving && !reduce ? { rotate: [0, -14, 12, -14, 12, 0] } : { rotate: 0 }}
            transition={waving && !reduce ? { duration: 1.4, ease: "easeInOut", delay: 0.06 } : { duration: 0.2 }}
          >
            <path d="M151 166 C 147 160, 149 153, 155 152 C 158 148, 164 150, 163 155 C 167 155, 168 161, 164 164 C 162 168, 156 170, 151 166 Z" fill={SKIN} />
          </motion.g>
          {waving && (
            <g stroke="#FFD86E" strokeWidth="2.2" fill="none">
              <path d="M172 144 C 176 148, 177 152, 176 156" />
              <path d="M178 138 C 184 144, 185 152, 183 158" />
            </g>
          )}
        </motion.g>
      </g>
    </svg>
  );
}

export default memo(HelperGirl);

function EyesLayer({
  eyes,
  px,
  py,
  hx,
  hy,
  reduce,
}: {
  eyes: Eyes;
  px: MotionValue<number>;
  py: MotionValue<number>;
  hx: MotionValue<number>;
  hy: MotionValue<number>;
  reduce: boolean;
}) {
  if (eyes === "happy") {
    return (
      <g fill="none" stroke={LASH} strokeWidth="3">
        <path d="M74 140 C 78 128, 94 128, 98 140" />
        <path d="M122 140 C 126 128, 142 128, 146 140" />
      </g>
    );
  }
  if (eyes === "sleepy") {
    return (
      <g>
        <ellipse cx="86" cy="142" rx="12.5" ry="9" fill="url(#hg-eye)" stroke="#C391A7" strokeWidth="1.6" />
        <ellipse cx="134" cy="142" rx="12.5" ry="9" fill="url(#hg-eye)" stroke="#C391A7" strokeWidth="1.6" />
        <path d="M72 138 C 78 134, 94 134, 100 138 M 120 138 C 126 134, 142 134, 148 138" fill="none" stroke={LASH} strokeWidth="3" />
        <circle cx="82" cy="142" r="2.4" fill="#FFFFFF" stroke="none" />
        <circle cx="130" cy="142" r="2.4" fill="#FFFFFF" stroke="none" />
      </g>
    );
  }
  const big = eyes === "surprised";
  const one = (cx: number, closed: boolean) =>
    closed ? (
      <path key={cx} d={`M${cx - 12} 140 C ${cx - 8} 128, ${cx + 8} 128, ${cx + 12} 140`} fill="none" stroke={LASH} strokeWidth="3" />
    ) : (
      <g key={cx}>
        <ellipse cx={cx} cy="136" rx={big ? 15 : 14} ry={big ? 17.5 : 16} fill="url(#hg-eye)" stroke="#C391A7" strokeWidth="1.6" />
        <motion.ellipse cx={cx} cy="139" rx={big ? 4 : 6} ry={big ? 5.5 : 8} fill="#2B1621" stroke="none" opacity=".45" style={{ x: px, y: py }} />
        <motion.g stroke="none" fill="#FFFFFF" style={{ x: hx, y: hy }}>
          {eyes === "sparkle" ? (
            <motion.path
              d={`M${cx - 6} 120 L ${cx - 4} 126 L ${cx + 2} 128 L ${cx - 4} 130 L ${cx - 6} 136 L ${cx - 8} 130 L ${cx - 14} 128 L ${cx - 8} 126 Z`}
              style={{ originX: 0.5, originY: 0.5 }}
              animate={reduce ? undefined : { scale: [1, 1.25, 1], rotate: [0, 20, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          ) : (
            <motion.circle
              cx={cx - 6}
              cy="128"
              r={big ? 6 : 5.4}
              style={{ originX: 0.5, originY: 0.5 }}
              animate={reduce ? undefined : { scale: [1, 1, 1.18, 1] }}
              transition={{ duration: 3.4, repeat: Infinity, times: [0, 0.8, 0.88, 1], delay: cx > 110 ? 0.15 : 0 }}
            />
          )}
          <circle cx={cx + 6} cy="143" r="2.3" />
        </motion.g>
        <ellipse cx={cx} cy="148" rx="8" ry="3" fill="#F2C2D3" stroke="none" opacity=".8" filter="url(#hg-b1)" />
        <path
          d={cx < 110 ? `M${cx - 15} 128 C ${cx - 12} 117, ${cx + 12} 116, ${cx + 15} 126` : `M${cx - 15} 126 C ${cx - 12} 116, ${cx + 12} 117, ${cx + 15} 128`}
          fill="none"
          stroke={LASH}
          strokeWidth="2.8"
        />
      </g>
    );
  return (
    <g>
      {one(86, false)}
      {one(134, eyes === "wink")}
      {big && (
        <g stroke="#FFA7BC" strokeWidth="2.6" fill="none">
          <path d="M168 78 L 172 62 M 178 84 L 188 74" />
        </g>
      )}
    </g>
  );
}

function MouthLayer({ mouth }: { mouth: Mouth }) {
  switch (mouth) {
    case "smile":
      return <path d="M104 156 C 106 161, 114 161, 116 156 Z" fill="#F6A9BA" stroke="#DE93A8" strokeWidth="1.6" />;
    case "grin":
      return (
        <g>
          <path d="M101 155 C 104 164, 116 164, 119 155 Z" fill="#F6A9BA" stroke="#DE93A8" strokeWidth="1.6" />
          <path d="M106 160 C 108 162, 112 162, 114 160" fill="none" stroke="#FFCFDB" strokeWidth="1.8" />
        </g>
      );
    case "o":
      return <ellipse cx="110" cy="158" rx="3" ry="3.8" fill="#F6A9BA" stroke="#DE93A8" strokeWidth="1.6" />;
    case "yawn":
      return <ellipse cx="110" cy="159" rx="5" ry="6.2" fill="#EF96AB" stroke="#DE93A8" strokeWidth="1.6" />;
    case "pout":
      return <path d="M105 160 C 107 156, 113 156, 115 160" fill="none" stroke="#DE93A8" strokeWidth="2" />;
    default:
      return <path d="M103 156 C 105 160, 109 160, 110 156 C 111 160, 115 160, 117 156" fill="none" stroke="#DE93A8" strokeWidth="1.8" />;
  }
}
