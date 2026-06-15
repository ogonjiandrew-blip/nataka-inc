"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Returns a scrambled version of `text` that resolves character-by-character
 * once `trigger` is true. Each character cycles through random letters before
 * locking into place — left to right.
 */
export function useTextScramble(text: string, trigger: boolean, delay = 0) {
  // Initialise with the real text so server and client first-render match
  // exactly (no hydration mismatch, real headline in the SSR HTML for SEO).
  // The scramble-in effect runs after mount, client-side only.
  const [output, setOutput] = useState<string>(text);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    // Each character resolves after (index * SPEED) frames
    const SPEED = 2.2;
    const TOTAL = Math.ceil(text.length * SPEED) + 10;

    const tick = () => {
      setOutput(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration / SPEED) return char; // resolved
            return CHARS[Math.floor(Math.random() * CHARS.length)]; // scrambling
          })
          .join("")
      );
      iteration++;
      if (iteration <= TOTAL) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setOutput(text); // guarantee final state
      }
    };

    timeoutRef.current = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, text, delay]);

  return output;
}
