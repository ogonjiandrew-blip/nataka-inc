"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, X } from "@phosphor-icons/react";
import Reveal from "@/components/Reveal";

type VideoItem =
  | { id: number; title: string; category: string; poster: string; description: string; type: "vimeo"; vimeoId: string }
  | { id: number; title: string; category: string; poster: string; description: string; type: "local"; src: string };

const videos: VideoItem[] = [
  {
    id: 1,
    title: "Za Mabuda",
    category: "Film · Direction",
    poster: "/videos/za-mabuda-still.jpg",
    description: "Vijana Barubaru ft. Scar Mkadinali, a cinematic period film directed by Andrew Ogonji.",
    type: "local",
    src: "/videos/za-mabuda.mp4",
  },
  {
    id: 2,
    title: "Kwanini",
    category: "Music Video · Direction",
    poster: "/videos/kwanini-poster.jpg",
    description: "Ssaru x Fathermoh, the official music video, concept to final cut in Nairobi.",
    type: "local",
    src: "/videos/kwanini-teaser.mp4",
  },
  {
    id: 3,
    title: "Save Her",
    category: "Music Video",
    poster: "/videos/save-her-poster.jpg",
    description: "High-energy, cinematic music video production, bold visual storytelling.",
    type: "local",
    src: "/videos/save-her.mp4",
  },
  {
    id: 4,
    title: "Cool in School",
    category: "Music Video",
    poster: "/videos/cool-in-school-poster.jpg",
    description: "Vibrant, colour-rich music video, Nairobi energy on a vintage film palette.",
    type: "local",
    src: "/videos/cool-in-school.mp4",
  },
  {
    id: 5,
    title: "Sarit: Your City",
    category: "Brand · Commercial",
    poster: "/videos/sarit-poster-clean.jpg",
    description: "Brand film for Sarit Centre, premium commercial production for a Nairobi landmark.",
    type: "local",
    src: "/videos/sarit.mp4",
  },
  {
    id: 6,
    title: "Open Auditions",
    category: "Brand Film · Promo",
    poster: "/videos/nataka-promo-poster.jpg",
    description: "A Nataka Inc promo, cinematic brand storytelling that captures who we are.",
    type: "local",
    src: "/videos/nataka-promo.mp4",
  },
];

export default function VideoReel() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const closeModal = useCallback(() => setActiveVideo(null), []);

  return (
    <>
      <section id="reel" className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
        <Reveal className="mb-12 md:mb-16 max-w-2xl">
          <h2 className="font-heading font-extrabold stretch-semi text-white tracking-[-0.03em] leading-[1.05] text-[clamp(2rem,4.4vw,3.4rem)]">
            Watch the reel
          </h2>
          <p className="mt-4 font-sans text-cream/65 text-base md:text-lg leading-relaxed max-w-[52ch]">
            Films, music videos and brand work, shot and finished in Nairobi.
          </p>
        </Reveal>

        {/* Lead film takes a 2x2 tile, the other five fill around it: six films, six cells */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {videos.map((v, i) => (
            <Reveal key={v.id} delay={Math.min(i, 3) * 0.06} className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}>
              <VideoCard video={v} lead={i === 0} onPlay={() => setActiveVideo(v)} />
            </Reveal>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeVideo && <VideoModal video={activeVideo} onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
}

function VideoCard({ video, lead, onPlay }: { video: VideoItem; lead: boolean; onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className={`group relative block w-full overflow-hidden bg-ink-50 text-left ${lead ? "aspect-video md:aspect-auto md:h-full" : "aspect-video"}`}
      aria-label={`Play ${video.title}`}
    >
      <Image
        src={video.poster}
        alt=""
        fill
        className="object-cover scale-[1.02] transition-transform duration-[900ms] ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
        sizes={lead ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
        quality={85}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex items-end justify-between gap-4">
        <div>
          <h3 className={`font-heading font-bold text-white tracking-tight leading-tight ${lead ? "text-2xl md:text-3xl" : "text-lg"}`}>
            {video.title}
          </h3>
          <p className={`mt-1 font-sans text-cream/70 ${lead ? "text-sm md:text-base max-w-[48ch]" : "text-xs"}`}>
            {lead ? video.description : video.category}
          </p>
        </div>
        <span
          aria-hidden="true"
          className={`shrink-0 flex items-center justify-center bg-accent text-ink transition-transform duration-300 group-hover:scale-105 ${lead ? "w-14 h-14" : "w-10 h-10"}`}
        >
          <Play size={lead ? 22 : 16} weight="fill" />
        </span>
      </div>
    </button>
  );
}

function VideoModal({ video, onClose }: { video: VideoItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] bg-ink/96 backdrop-blur-md flex items-center justify-center px-4 md:px-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}
          className="absolute -top-11 right-0 font-sans text-white/55 text-xs hover:text-accent transition-colors flex items-center gap-2"
          aria-label="Close video">
          <span>Close</span><X size={14} weight="bold" />
        </button>

        <div className="w-full aspect-video bg-black">
          {video.type === "vimeo" ? (
            <iframe
              src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&color=d9dde2`}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={video.title}
            />
          ) : (
            <video src={video.src} controls autoPlay className="w-full h-full" preload="auto" playsInline>
              Your browser does not support this video format.
            </video>
          )}
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-xl text-white tracking-tight">{video.title}</h3>
            <p className="font-mono text-accent text-[11px] mt-1">{video.category}</p>
          </div>
          <p className="font-sans text-cream/55 text-sm max-w-sm text-right hidden md:block leading-relaxed">{video.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
