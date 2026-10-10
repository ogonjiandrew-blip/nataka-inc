"use client";

import { memo, useEffect, useState } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";

export type Eyes = "open" | "happy" | "wink" | "surprised" | "sleepy" | "sparkle";
export type Mouth = "cat" | "smile" | "grin" | "o" | "yawn" | "pout";

const LID = "#6E3E4E";
const LINE = "#B06C81";

/*
 * Her artwork is Andrew's pick from four Higgsfield (Nano Banana Pro) options, cut out
 * with the eyes and mouth painted out of the skin (public/helper/mochi-*.webp, 1336 x 1785
 * at full size). The face is drawn live on top so she can blink, look around, talk and
 * change expression. Face coordinates are in the original 2048px artwork, so the overlay
 * is shifted by the crop offset (359, 132).
 */
const ART = { w: 1336, h: 1785, x: 359, y: 132 };

type EyeGeo = {
  iris: [number, number, number, number];
  white: [number, number, number, number];
  shine: [number, number, number, number];
  lights: [number, number, number][];
  lid: string;
  crease: string;
  closed: string;
  happy: string;
  flick: string;
  half: [number, number, number, number];
};

const EYE: Record<"L" | "R", EyeGeo> = {
  L: {
    iris: [804, 1108, 86, 96],
    white: [790, 1124, 102, 88],
    shine: [805, 1166, 52, 27],
    lights: [
      [829, 1060, 26],
      [791, 1081, 9],
      [744, 1133, 12],
    ],
    lid: "M657 1066 C 688 1022 738 990 800 986 C 845 984 872 1000 886 1032 C 866 1024 842 1018 800 1019 C 752 1021 712 1044 692 1072 C 684 1086 690 1110 700 1129 C 688 1134 672 1121 668 1100 C 665 1086 662 1076 657 1066 Z",
    crease: "M803 972 Q 828 964 852 980",
    closed: "M676 1110 Q 786 1160 893 1103",
    happy: "M681 1130 Q 788 1040 891 1121",
    flick: "M676 1110 L 655 1097",
    half: [676, 1112, 893, 1108],
  },
  R: {
    iris: [1214, 1133, 94, 97],
    white: [1230, 1146, 98, 88],
    shine: [1200, 1192, 50, 27],
    lights: [
      [1184, 1082, 26],
      [1221, 1106, 9],
      [1262, 1164, 12],
    ],
    lid: "M1143 1054 C 1140 1030 1162 1016 1202 1013 C 1262 1010 1312 1040 1340 1082 C 1349 1093 1356 1100 1357 1110 C 1350 1117 1342 1113 1337 1109 C 1341 1130 1343 1150 1337 1169 C 1326 1173 1318 1160 1318 1140 C 1314 1112 1296 1076 1256 1057 C 1222 1043 1182 1046 1160 1068 Z",
    crease: "M1167 996 Q 1192 987 1216 997",
    closed: "M1122 1128 Q 1236 1181 1350 1121",
    happy: "M1125 1141 Q 1236 1062 1346 1141",
    flick: "M1350 1121 L 1371 1109",
    half: [1122, 1136, 1350, 1132],
  },
};

/**
 * Mochi: her painted artwork plus a live face. The whole figure breathes, tilts toward
 * where she looks, leans with `sway` like soft jelly (follow-through from her real speed)
 * and wiggles while she waves. Memoised, so the typewriter in the speech bubble does not
 * redraw her on every letter.
 */
function HelperGirl({
  eyes = "open",
  mouth = "cat",
  waving = false,
  blink = false,
  blush = false,
  talking = false,
  lookX,
  lookY,
  tilt,
  sway,
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
  // eyes follow the pointer: irises move more than their highlights (artwork units: ~14 per screen px)
  const px = useTransform(lookX, (v) => v * 22);
  const py = useTransform(lookY, (v) => v * 15);
  const hx = useTransform(lookX, (v) => v * 9);
  const hy = useTransform(lookY, (v) => v * 7);
  const lean = useTransform(tilt, (v) => v * 0.5);
  // soft-body follow-through: the top of her lags behind like jelly
  const skew = useTransform(sway, (v) => Math.max(-3.5, Math.min(3.5, v * 0.12)));

  // the mouth flaps while she "speaks" a line
  const [flap, setFlap] = useState(false);
  useEffect(() => {
    if (!talking) return setFlap(false);
    const id = window.setInterval(() => setFlap((f) => !f), 110);
    return () => window.clearInterval(id);
  }, [talking]);

  const shut = blink && (eyes === "open" || eyes === "sparkle" || eyes === "surprised");
  const left = shut ? "blink" : eyes === "wink" ? "open" : eyes;
  const right = shut ? "blink" : eyes === "wink" ? "happy" : eyes;

  return (
    <motion.div className={`relative ${className ?? ""}`} style={{ rotate: lean, skewX: skew, originX: 0.5, originY: 1 }}>
      <motion.div
        style={{ originX: 0.5, originY: 1 }}
        animate={{ scaleY: [1, 1.018, 1], scaleX: [1, 0.992, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          style={{ originX: 0.5, originY: 0.95 }}
          animate={waving ? { rotate: [0, -5, 4, -4, 3, 0] } : { rotate: 0 }}
          transition={waving ? { duration: 1.4, ease: "easeInOut" } : { type: "spring", stiffness: 260, damping: 14 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/helper/mochi-384.webp"
            srcSet="/helper/mochi-192.webp 192w, /helper/mochi-384.webp 384w"
            sizes="(min-width: 768px) 96px, 76px"
            width={384}
            height={513}
            alt=""
            draggable={false}
            decoding="async"
            className="block h-auto w-full select-none"
          />
          <svg viewBox={`0 0 ${ART.w} ${ART.h}`} className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            <defs>
              <linearGradient id="mg-iris" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#6E3C4B" />
                <stop offset=".55" stopColor="#7E4A5A" />
                <stop offset="1" stopColor="#8F5A6B" />
              </linearGradient>
              <linearGradient id="mg-white" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#DCD2E2" />
                <stop offset=".45" stopColor="#FFFFFF" />
              </linearGradient>
              <radialGradient id="mg-shine" cx=".5" cy=".75" r=".75">
                <stop offset="0" stopColor="#E0BAC6" />
                <stop offset="1" stopColor="#B98597" />
              </radialGradient>
              <radialGradient id="mg-blush" cx=".5" cy=".5" r=".5">
                <stop offset="0" stopColor="#FF9BB4" stopOpacity=".75" />
                <stop offset="1" stopColor="#FF9BB4" stopOpacity="0" />
              </radialGradient>
              <clipPath id="mg-halfL">
                <rect x="600" y="1112" width="330" height="140" />
              </clipPath>
              <clipPath id="mg-halfR">
                <rect x="1080" y="1136" width="320" height="140" />
              </clipPath>
            </defs>
            <g transform={`translate(${-ART.x} ${-ART.y})`}>
              {/* creases above the eyes */}
              <g fill="none" stroke={LINE} strokeWidth="9" strokeLinecap="round">
                <path d={EYE.L.crease} />
                <path d={EYE.R.crease} />
              </g>

              <Eye side="L" state={left} px={px} py={py} hx={hx} hy={hy} />
              <Eye side="R" state={right} px={px} py={py} hx={hx} hy={hy} />

              {/* extra blush when she is tickled or flattered */}
              <motion.g
                initial={false}
                animate={{ opacity: blush ? 1 : 0, scale: blush ? 1 : 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 14 }}
                style={{ originX: 0.5, originY: 0.5 }}
              >
                <ellipse cx="720" cy="1226" rx="78" ry="44" fill="url(#mg-blush)" />
                <ellipse cx="1170" cy="1252" rx="78" ry="44" fill="url(#mg-blush)" />
              </motion.g>

              <MouthShape mouth={talking ? (flap ? "o" : "smile") : mouth} />

              {/* "!" lines when she is surprised */}
              {eyes === "surprised" && (
                <g stroke="#FF9BB4" strokeWidth="11" strokeLinecap="round">
                  <path d="M1560 760 L 1592 704" />
                  <path d="M1600 820 L 1658 790" />
                </g>
              )}

              {/* wave marks beside her raised hand */}
              {waving && (
                <motion.g
                  fill="none"
                  stroke="#FFD86E"
                  strokeWidth="11"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0.6, 1, 0] }}
                  transition={{ duration: 1.4 }}
                >
                  <path d="M1420 1250 Q 1436 1276 1428 1304" />
                  <path d="M1450 1228 Q 1472 1270 1460 1318" />
                </motion.g>
              )}
            </g>
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default memo(HelperGirl);

function Eye({
  side,
  state,
  px,
  py,
  hx,
  hy,
}: {
  side: "L" | "R";
  state: Eyes | "blink";
  px: MotionValue<number>;
  py: MotionValue<number>;
  hx: MotionValue<number>;
  hy: MotionValue<number>;
}) {
  const e = EYE[side];
  if (state === "happy") return <path d={e.happy} fill="none" stroke={LID} strokeWidth="19" strokeLinecap="round" />;
  if (state === "blink")
    return (
      <g fill="none" stroke={LID} strokeLinecap="round">
        <path d={e.closed} strokeWidth="17" />
        <path d={e.flick} strokeWidth="13" />
      </g>
    );
  const big = state === "surprised";
  const [cx, cy, rx, ry] = e.iris;
  const irx = big ? rx * 0.74 : rx;
  const iry = big ? ry * 0.78 : ry;
  const [wx, wy, wrx, wry] = e.white;
  const [sx, sy, srx, sry] = e.shine;
  const [x1, y1, x2, y2] = e.half;
  return (
    <g>
      <g clipPath={state === "sleepy" ? `url(#mg-half${side})` : undefined}>
        <ellipse cx={wx} cy={wy} rx={big ? wrx * 1.04 : wrx} ry={big ? wry * 1.04 : wry} fill="url(#mg-white)" />
        {/* the iris, its shine and highlights move with her gaze */}
        <motion.g style={{ x: px, y: py }}>
          <ellipse cx={cx} cy={cy} rx={irx} ry={iry} fill="url(#mg-iris)" />
          <ellipse cx={sx} cy={big ? cy + iry * 0.55 : sy} rx={big ? srx * 0.75 : srx} ry={big ? sry * 0.75 : sry} fill="url(#mg-shine)" />
        </motion.g>
        <motion.g style={{ x: hx, y: hy }} fill="#FFFFFF">
          {e.lights.map(([lx, ly, r], i) =>
            i === 0 && state === "sparkle" ? (
              <motion.path
                key={i}
                d={star(lx, ly, r * 1.45)}
                style={{ originX: 0.5, originY: 0.5 }}
                animate={{ scale: [1, 1.22, 1], rotate: [0, 18, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            ) : i === 0 ? (
              <motion.circle
                key={i}
                cx={lx}
                cy={ly}
                r={big ? r * 0.8 : r}
                style={{ originX: 0.5, originY: 0.5 }}
                animate={{ scale: [1, 1, 1.16, 1] }}
                transition={{ duration: 3.4, repeat: Infinity, times: [0, 0.8, 0.88, 1], delay: side === "R" ? 0.15 : 0 }}
              />
            ) : (
              <circle key={i} cx={lx} cy={ly} r={big ? r * 0.8 : r} />
            ),
          )}
        </motion.g>
      </g>
      {state === "sleepy" ? (
        <path d={`M${x1} ${y1} Q ${cx} ${y1 - 14} ${x2} ${y2}`} fill="none" stroke={LID} strokeWidth="19" strokeLinecap="round" />
      ) : (
        <path d={e.lid} fill={LID} transform={big ? "translate(0 -10)" : undefined} />
      )}
    </g>
  );
}

function star(x: number, y: number, s: number) {
  const k = s * 0.18;
  return `M${x} ${y - s} Q ${x + k} ${y - k} ${x + s} ${y} Q ${x + k} ${y + k} ${x} ${y + s} Q ${x - k} ${y + k} ${x - s} ${y} Q ${x - k} ${y - k} ${x} ${y - s} Z`;
}

function MouthShape({ mouth }: { mouth: Mouth }) {
  switch (mouth) {
    case "grin":
      return (
        <g>
          <path d="M950 1206 Q 996 1266 1042 1204 Z" fill="#D9677C" stroke={LINE} strokeWidth="8" strokeLinejoin="round" />
          <ellipse cx="996" cy="1240" rx="17" ry="8" fill="#F29AA8" />
        </g>
      );
    case "o":
      return <ellipse cx="996" cy="1226" rx="13" ry="16" fill="#D9677C" stroke={LINE} strokeWidth="7" />;
    case "yawn":
      return (
        <g>
          <ellipse cx="996" cy="1232" rx="21" ry="27" fill="#D9677C" stroke={LINE} strokeWidth="7" />
          <ellipse cx="996" cy="1248" rx="11" ry="7" fill="#F29AA8" />
        </g>
      );
    case "pout":
      return <path d="M970 1232 Q 996 1214 1022 1232" fill="none" stroke={LINE} strokeWidth="9" strokeLinecap="round" />;
    default:
      return <path d="M953 1212 Q 996 1252 1040 1209" fill="none" stroke={LINE} strokeWidth="9" strokeLinecap="round" />;
  }
}
