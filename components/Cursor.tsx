"use client";

import { useEffect, useRef, useState } from "react";

const HOVER_TARGETS = "a, button, [data-cursor-hover]";

export default function Cursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // Only hide the native cursor once we're actually here to replace it,
    // and only for real pointers — touch devices keep their default behaviour.
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) document.documentElement.classList.add("custom-cursor");

    let mx = 0, my = 0, rx = 0, ry = 0, frame = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Dot follows instantly
      dot.style.left = `${mx}px`;
      dot.style.top  = `${my}px`;
      // Label tracks with dot
      label.style.left = `${mx}px`;
      label.style.top  = `${my}px`;
    };

    // Ring lags behind with lerp
    const raf = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = `${rx}px`;
      ring.style.top  = `${ry}px`;
      frame = requestAnimationFrame(raf);
    };

    // Delegated so it keeps working for content rendered after mount — this
    // component now lives in the root layout and survives page navigations.
    const isTarget = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest(HOVER_TARGETS);

    const onOver = (e: MouseEvent) => { if (isTarget(e.target)) setHovered(true); };
    const onOut  = (e: MouseEvent) => { if (isTarget(e.target)) setHovered(false); };

    const onLabel = (e: Event) => {
      const val = (e as CustomEvent).detail as string;
      label.textContent  = val;
      label.style.opacity = val ? "1" : "0";
      setHovered(!!val);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("cursorlabel", onLabel);
    frame = requestAnimationFrame(raf);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("cursorlabel", onLabel);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef}   className="cursor-dot" />
      <div ref={ringRef}  className={`cursor-ring ${hovered ? "hover" : ""}`} />
      {/* Label floats just below the dot — never inside the ring */}
      <div ref={labelRef} className="cursor-label" style={{ opacity: 0 }} />
    </>
  );
}
