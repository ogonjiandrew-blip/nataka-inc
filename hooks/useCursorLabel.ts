"use client";

/**
 * Tiny pub/sub for cursor label context.
 * Elements fire these events; the Cursor component listens.
 */
export function setCursorLabel(label: string) {
  document.dispatchEvent(new CustomEvent("cursorlabel", { detail: label }));
}

export function clearCursorLabel() {
  document.dispatchEvent(new CustomEvent("cursorlabel", { detail: "" }));
}
