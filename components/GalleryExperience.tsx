"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

function Loading() {
  return (
    <div className="min-h-[100dvh] bg-ink flex items-center justify-center">
      <span className="font-mono text-cream/60 text-[11px] tracking-[0.2em] uppercase animate-pulse">Loading gallery</span>
    </div>
  );
}

const SphereGallery = dynamic(() => import("@/components/SphereGallery"), {
  ssr: false,
  loading: () => <Loading />,
});

const STORAGE_KEY = "nataka-gallery-view";

export default function GalleryExperience({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<"3d" | "grid">("3d");
  const [ready, setReady] = useState(false);

  // Restore the visitor's last-chosen view (default 3D for first-timers)
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (saved === "grid" || saved === "3d") setView(saved);
    setReady(true);
  }, []);

  const choose = (v: "3d" | "grid") => {
    setView(v);
    try { window.localStorage.setItem(STORAGE_KEY, v); } catch { /* ignore */ }
  };

  return (
    <div className="relative min-h-[100dvh]">
      {/* View toggle: lower right, above the WhatsApp button. Springy z-pop on load to draw the eye. */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 480, damping: 11, delay: 0.35 }}
        style={{ transformOrigin: "center" }}
        className="fixed bottom-24 right-4 md:bottom-28 md:right-8 z-[9970] flex items-stretch overflow-hidden rounded-full border border-white/15 bg-ink/80 p-1 backdrop-blur-md shadow-2xl shadow-black/60"
      >
        <button
          type="button"
          onClick={() => choose("3d")}
          aria-pressed={view === "3d"}
          className={`rounded-full px-5 py-2.5 font-heading font-bold text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 ${view === "3d" ? "bg-signal text-on-signal" : "text-white/80 hover:text-white"}`}
        >
          3D
        </button>
        <button
          type="button"
          onClick={() => choose("grid")}
          aria-pressed={view === "grid"}
          className={`rounded-full px-5 py-2.5 font-heading font-bold text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 ${view === "grid" ? "bg-signal text-on-signal" : "text-white/80 hover:text-white"}`}
        >
          Grid
        </button>
      </motion.div>

      {/* Until the saved choice is read, show a loader (avoids mounting the 3D bundle if the visitor prefers Grid) */}
      {!ready && <Loading />}
      {ready && view === "3d" && <SphereGallery />}

      {/* Grid / crawl view: always in the DOM so search engines can index it */}
      <div className={ready && view === "grid" ? "block" : "hidden"}>{children}</div>
    </div>
  );
}
