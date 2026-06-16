"use client";

import dynamic from "next/dynamic";

// Three.js + GSAP are heavy and client-only — defer them so the route
// isn't blocked by the 3D bundle, with a lightweight placeholder.
const SphereGallery = dynamic(() => import("@/components/SphereGallery"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[100dvh] bg-ink flex items-center justify-center">
      <span className="font-sans text-teal text-xs tracking-widest uppercase animate-pulse">
        Loading gallery…
      </span>
    </div>
  ),
});

export default function GalleryClient() {
  return <SphereGallery />;
}
