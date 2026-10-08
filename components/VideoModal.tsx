"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "@phosphor-icons/react";

export type ModalFilm = { title: string; meta: string; src: string; poster: string };

/** Full-screen player for a film, with sound. Escape, the close button or the backdrop dismiss it. */
export default function VideoModal({ film, onClose }: { film: ModalFilm; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={film.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9985] bg-ink/95 backdrop-blur-md flex items-center justify-center px-4 md:px-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 12, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-end justify-between gap-6">
          <div>
            <p className="font-heading font-bold stretch-semi text-lg md:text-2xl text-white tracking-tight">{film.title}</p>
            <p className="mt-1 font-sans text-sm text-cream/60">{film.meta}</p>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="shrink-0 inline-flex items-center gap-2 font-heading font-bold text-[11px] uppercase tracking-[0.16em] text-cream/75 hover:text-white transition-colors"
            aria-label="Close video"
          >
            Close <X size={14} weight="bold" />
          </button>
        </div>
        <div className="w-full aspect-video bg-ink-200">
          <video src={film.src} poster={film.poster} controls autoPlay playsInline preload="auto" className="w-full h-full">
            Your browser does not support this video format.
          </video>
        </div>
      </motion.div>
    </motion.div>
  );
}
