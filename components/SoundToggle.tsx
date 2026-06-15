"use client";

/**
 * Phantom-style sound toggle. OFF by default. When ON, plays subtle
 * synthesized UI ticks on interactive-element hover and a soft click on
 * press — generated with the Web Audio API, so there are no audio files to
 * load. Respects the user's choice across the session.
 */

import { useEffect, useRef, useState } from "react";

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const lastPlayed = useRef(0);

  // Restore preference
  useEffect(() => {
    setOn(sessionStorage.getItem("nataka-sound") === "on");
  }, []);

  const getCtx = () => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  };

  const blip = (freq: number, dur: number, gain: number) => {
    const ctx = getCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(gain, now + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + dur);
  };

  // Attach global hover/click listeners only while ON
  useEffect(() => {
    if (!on) return;

    const isInteractive = (el: EventTarget | null) => {
      const node = el as HTMLElement | null;
      return !!node?.closest?.("a, button, [role='button'], input, .cursor-pointer");
    };

    const onOver = (e: MouseEvent) => {
      if (!isInteractive(e.target)) return;
      const now = performance.now();
      if (now - lastPlayed.current < 60) return; // throttle
      lastPlayed.current = now;
      blip(2100, 0.05, 0.025); // high, quiet tick
    };

    const onDown = (e: MouseEvent) => {
      if (!isInteractive(e.target)) return;
      blip(880, 0.08, 0.04); // softer, lower click
    };

    window.addEventListener("mouseover", onOver, true);
    window.addEventListener("pointerdown", onDown, true);
    return () => {
      window.removeEventListener("mouseover", onOver, true);
      window.removeEventListener("pointerdown", onDown, true);
    };
  }, [on]);

  const toggle = () => {
    const next = !on;
    setOn(next);
    sessionStorage.setItem("nataka-sound", next ? "on" : "off");
    if (next) {
      // confirmation chord so the user hears it engage
      blip(1320, 0.09, 0.04);
      setTimeout(() => blip(1760, 0.12, 0.035), 90);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Turn interface sound off" : "Turn interface sound on"}
      className="fixed bottom-6 left-6 z-[9970] hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-white/45 hover:text-teal transition-colors"
    >
      {/* 4-bar equalizer — animates only when on */}
      <span className="flex items-end gap-[2px] h-3" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-[2px] bg-current"
            style={
              on
                ? { animation: `eq 0.8s ease-in-out ${i * 0.12}s infinite alternate`, height: "40%" }
                : { height: "30%" }
            }
          />
        ))}
      </span>
      Sound [{on ? "On" : "Off"}]
    </button>
  );
}
