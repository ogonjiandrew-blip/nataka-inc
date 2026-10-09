/**
 * Shared state for the site helper: the girl lives in NatakaHelper, but when she
 * falls asleep she turns into a dango that rests on the WhatsApp button, which
 * is a different component. This tiny store lets the two talk without a context
 * provider (both are mounted once, in the root layout).
 */
import { useSyncExternalStore } from "react";

// "landing": she is about to fly to the WhatsApp button, so the dango mounts there
// unseen (and its first paint is done) before she lands and turns into it.
export type HelperMode = "off" | "awake" | "landing" | "asleep";

let mode: HelperMode = "off";
const listeners = new Set<() => void>();
const wakeListeners = new Set<() => void>();

export function setHelperMode(next: HelperMode) {
  if (next === mode) return;
  mode = next;
  listeners.forEach((l) => l());
}

export function getHelperMode() {
  return mode;
}

/** The dango was tapped: ask the girl to come back. */
export function requestWake() {
  wakeListeners.forEach((l) => l());
}

export function onWakeRequest(cb: () => void) {
  wakeListeners.add(cb);
  return () => {
    wakeListeners.delete(cb);
  };
}

/*
 * Mochi lands on the WhatsApp button and squashes down into the dango. The
 * dango reads this flag once so it starts squashed and wobbles into shape,
 * instead of dropping in from above.
 */
let morphAt = 0;
export function markMorph() {
  morphAt = Date.now();
}
// only a fresh landing counts: if the button was off screen, a dango that mounts later plops in
export function takeMorph() {
  const m = Date.now() - morphAt < 1500;
  morphAt = 0;
  return m;
}

/* Something landed on the WhatsApp button: it dips and springs back. */
const bumpListeners = new Set<(strength: number) => void>();
export function bumpPill(strength = 1) {
  bumpListeners.forEach((l) => l(strength));
}
export function onPillBump(cb: (strength: number) => void) {
  bumpListeners.add(cb);
  return () => {
    bumpListeners.delete(cb);
  };
}

export function useHelperMode() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
      };
    },
    () => mode,
    () => "off" as HelperMode,
  );
}
