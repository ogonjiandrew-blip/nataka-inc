/**
 * Soft-body motion for Mochi and her dango, taken from the dango in the Clannad
 * ending (Andrew's reference): bodies keep their volume, stretch along the way
 * they travel, hang at the top of a hop, splat on landing and wobble back like
 * jelly. Paths are walked in one smooth move instead of stopping at waypoints.
 */
import { animate, type MotionValue } from "framer-motion";

export type Pt = { x: number; y: number };
export type Bezier = [number, number, number, number];

/** A hop: fast launch, a long hang at the top, a fast fall (cubic, not a sine). */
export const RISE: Bezier = [0.33, 1, 0.68, 1];
export const FALL: Bezier = [0.32, 0, 0.67, 0];
/** Flying: already moving when it starts, eases off before touchdown but still lands with weight. */
export const CRUISE: Bezier = [0.25, 0.3, 0.55, 0.88];

/** Jelly amount j: positive squashes, negative stretches. The area stays the same. */
export const jellyY = (j: number) => 1 - j;
export const jellyX = (j: number) => 1 / (1 - j);

/** Hit the jelly: it springs from where it is, overshoots and settles. */
export const kick = (j: MotionValue<number>, velocity: number, spring = { stiffness: 420, damping: 13 }) =>
  animate(j, 0, { type: "spring", ...spring, velocity });

/** Long along the direction of travel, thin across it, same area. */
export function stretchAlong(vx: number, vy: number, k: number, max: number) {
  const v = Math.hypot(vx, vy);
  if (v < 2) return "none";
  const s = 1 + Math.min(max, v / k);
  const c = vx / v;
  const n = vy / v;
  const a = c * c * s + (n * n) / s;
  const b = c * n * (s - 1 / s);
  const d = n * n * s + (c * c) / s;
  return `matrix(${a.toFixed(4)}, ${b.toFixed(4)}, ${b.toFixed(4)}, ${d.toFixed(4)}, 0, 0)`;
}

/**
 * A smooth curve through the points (centripetal Catmull-Rom, so uneven gaps
 * never kink it), walked by distance so the speed only changes where the easing
 * says so. `knot(i)` is how far along the curve point i sits, from 0 to 1.
 */
export function smoothPath(points: Pt[]) {
  const n = points.length;
  const ext = (a: Pt, b: Pt): Pt => ({ x: 2 * a.x - b.x, y: 2 * a.y - b.y });
  const pts = [ext(points[0], points[1]), ...points, ext(points[n - 1], points[n - 2])];
  const segs = n - 1;
  const gap = (a: Pt, b: Pt) => Math.max(1e-3, Math.sqrt(Math.hypot(b.x - a.x, b.y - a.y)));
  const lerp = (a: Pt, b: Pt, ta: number, tb: number, t: number): Pt => {
    const w = (t - ta) / (tb - ta);
    return { x: a.x + (b.x - a.x) * w, y: a.y + (b.y - a.y) * w };
  };
  const raw = (p: number): Pt => {
    const f = Math.min(segs - 1e-6, Math.max(0, p * segs));
    const i = Math.floor(f);
    const [p0, p1, p2, p3] = [pts[i], pts[i + 1], pts[i + 2], pts[i + 3]];
    const t0 = 0;
    const t1 = t0 + gap(p0, p1);
    const t2 = t1 + gap(p1, p2);
    const t3 = t2 + gap(p2, p3);
    const t = t1 + (f - i) * (t2 - t1);
    const a1 = lerp(p0, p1, t0, t1, t);
    const a2 = lerp(p1, p2, t1, t2, t);
    const a3 = lerp(p2, p3, t2, t3, t);
    const b1 = lerp(a1, a2, t0, t2, t);
    const b2 = lerp(a2, a3, t1, t3, t);
    return lerp(b1, b2, t1, t2, t);
  };
  const N = 60 * segs;
  const len = [0];
  let prev = raw(0);
  for (let i = 1; i <= N; i++) {
    const q = raw(i / N);
    len.push(len[i - 1] + Math.hypot(q.x - prev.x, q.y - prev.y));
    prev = q;
  }
  const total = len[N] || 1;
  const at = (s: number): Pt => {
    const target = Math.min(1, Math.max(0, s)) * total;
    let lo = 0;
    let hi = N;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (len[mid] < target) lo = mid;
      else hi = mid;
    }
    const seg = len[hi] - len[lo] || 1;
    return raw((lo + (target - len[lo]) / seg) / N);
  };
  const knot = (i: number) => len[Math.round((i / segs) * N)] / total;
  return { total, at, knot };
}

/**
 * Slow down over part of a path, like a roller coaster easing over a loop: the
 * speed dips smoothly to 1/`by` between `from` and `to` (fractions of the path)
 * and comes back up, with no jolt at either end. Returns the remap from even
 * progress to distance, and how much longer the trip takes.
 */
export function slowOver(from: number, to: number, by: number) {
  const N = 400;
  const soft = 0.06;
  const ramp = (s: number) => {
    const up = smooth((s - (from - soft)) / soft);
    const down = 1 - smooth((s - to) / soft);
    return Math.min(up, down);
  };
  const T = [0];
  for (let i = 1; i <= N; i++) {
    const s = (i - 0.5) / N;
    T.push(T[i - 1] + (1 + (by - 1) * ramp(s)) / N);
  }
  const stretchTime = T[N];
  const warp = (u: number) => {
    const target = clamp(u, 0, 1) * stretchTime;
    let lo = 0;
    let hi = N;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (T[mid] < target) lo = mid;
      else hi = mid;
    }
    const seg = T[hi] - T[lo] || 1;
    return (lo + (target - T[lo]) / seg) / N;
  };
  return { warp, stretchTime };
}

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
export const smooth = (t: number) => {
  const u = clamp(t, 0, 1);
  return u * u * (3 - 2 * u);
};
