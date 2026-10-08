"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

function Loading() {
  return (
    <div className="min-h-[100dvh] bg-ink flex items-center justify-center">
      <span className="font-mono text-cream/60 text-[11px] tracking-[0.2em] uppercase animate-pulse">Loading gallery</span>
    </div>
  );
}

// The sphere (three.js) is its own bundle and only downloads when someone opens it
const SphereGallery = dynamic(() => import("@/components/SphereGallery"), {
  ssr: false,
  loading: () => <Loading />,
});

/**
 * The grid opens first for everyone: it is fast and every image is indexable.
 * The 3D sphere stays one tap away on the toggle for people who want it.
 */
export default function GalleryExperience({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<"3d" | "grid">("grid");

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
          onClick={() => setView("grid")}
          aria-pressed={view === "grid"}
          className={`rounded-full px-5 py-2.5 font-heading font-bold text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 ${view === "grid" ? "bg-signal text-on-signal" : "text-white/80 hover:text-white"}`}
        >
          Grid
        </button>
        <button
          type="button"
          onClick={() => setView("3d")}
          aria-pressed={view === "3d"}
          className={`rounded-full px-5 py-2.5 font-heading font-bold text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 ${view === "3d" ? "bg-signal text-on-signal" : "text-white/80 hover:text-white"}`}
        >
          3D
        </button>
      </motion.div>

      {view === "3d" && <SphereGallery />}

      {/* Grid / crawl view: always in the DOM so search engines can index it */}
      <div className={view === "grid" ? "block" : "hidden"}>{children}</div>
    </div>
  );
}
