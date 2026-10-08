/**
 * Shared state for the site helper: the girl lives in NatakaHelper, but when she
 * falls asleep she turns into a dango that rests on the WhatsApp button, which
 * is a different component. This tiny store lets the two talk without a context
 * provider (both are mounted once, in the root layout).
 */
import { useSyncExternalStore } from "react";

export type HelperMode = "off" | "awake" | "asleep";

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
