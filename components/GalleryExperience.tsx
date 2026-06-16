"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const SphereGallery = dynamic(() => import("@/components/SphereGallery"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[100dvh] bg-ink flex items-center justify-center">
      <span className="font-sans text-teal text-xs tracking-widest uppercase animate-pulse">Loading gallery…</span>
    </div>
  ),
});

export default function GalleryExperience({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<"3d" | "grid">("3d");

  return (
    <div className="relative bg-ink min-h-[100dvh]">
      {/* View toggle */}
      <div className="fixed top-4 right-4 md:right-6 z-[60] flex border border-white/20 bg-ink/85 backdrop-blur-md font-sans text-[10px] tracking-widest uppercase">
        <button
          type="button"
          onClick={() => setView("3d")}
          aria-pressed={view === "3d"}
          className={`px-4 py-2.5 transition-colors duration-200 ${view === "3d" ? "bg-teal text-ink font-semibold" : "text-white/70 hover:text-white"}`}
        >
          3D
        </button>
        <button
          type="button"
          onClick={() => setView("grid")}
          aria-pressed={view === "grid"}
          className={`px-4 py-2.5 transition-colors duration-200 ${view === "grid" ? "bg-teal text-ink font-semibold" : "text-white/70 hover:text-white"}`}
        >
          Grid
        </button>
      </div>

      {/* 3D view — mounted only when active (frees the Three.js loop when on grid) */}
      {view === "3d" && <SphereGallery />}

      {/* Grid / crawl view — always in the DOM for SEO, shown when active */}
      <div className={view === "grid" ? "block" : "hidden"}>{children}</div>
    </div>
  );
}
