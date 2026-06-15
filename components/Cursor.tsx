"use client";

import { useEffect, useRef, useState } from "react";

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

    let mx = 0, my = 0, rx = 0, ry = 0;

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
      requestAnimationFrame(raf);
    };

    const onHoverIn  = () => setHovered(true);
    const onHoverOut = () => setHovered(false);

    const onLabel = (e: Event) => {
      const val = (e as CustomEvent).detail as string;
      label.textContent  = val;
      label.style.opacity = val ? "1" : "0";
      setHovered(!!val);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("cursorlabel", onLabel);
    requestAnimationFrame(raf);

    const els = document.querySelectorAll("a, button, [data-cursor-hover]");
    els.forEach(el => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("cursorlabel", onLabel);
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
