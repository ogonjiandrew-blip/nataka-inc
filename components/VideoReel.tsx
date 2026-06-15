"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LetterReveal from "@/components/LetterReveal";
import { setCursorLabel, clearCursorLabel } from "@/hooks/useCursorLabel";

type VideoItem =
  | { id: number; title: string; category: string; poster: string; description: string; type: "vimeo"; vimeoId: string }
  | { id: number; title: string; category: string; poster: string; description: string; type: "local"; src: string };

const videos: VideoItem[] = [
  {
    id: 1,
    title: "Za Mabuda",
    category: "Film · Direction",
    poster: "/videos/za-mabuda-poster.jpg",
    description: "Vijana Barubaru ft. Scar Mkadinali — a cinematic period film directed by Andrew Ogonji.",
    type: "local",
    src: "/videos/za-mabuda.mp4",
  },
  {
    id: 2,
    title: "Kwanini",
    category: "Music Video · Direction",
    poster: "/videos/kwanini-teaser-poster.jpg",
    description: "Ssaru x Fathermoh — the official music video, concept to final cut in Nairobi.",
    type: "local",
    src: "/videos/kwanini-teaser.mp4",
  },
  {
    id: 3,
    title: "Save Her",
    category: "Music Video",
    poster: "/videos/save-her-poster.jpg",
    description: "High-energy, cinematic music video production — bold visual storytelling.",
    type: "local",
    src: "/videos/save-her.mp4",
  },
  {
    id: 4,
    title: "Cool in School",
    category: "Music Video",
    poster: "/videos/cool-in-school-poster.jpg",
    description: "Vibrant, colour-rich music video — Nairobi energy on a vintage film palette.",
    type: "local",
    src: "/videos/cool-in-school.mp4",
  },
  {
    id: 5,
    title: "Sarit — Your City",
    category: "Brand · Commercial",
    poster: "/videos/sarit-poster.jpg",
    description: "Brand film for Sarit Centre — premium commercial production for a Nairobi landmark.",
    type: "local",
    src: "/videos/sarit.mp4",
  },
  {
    id: 6,
    title: "Open Auditions",
    category: "Brand Film · Promo",
    poster: "/videos/nataka-promo-poster.jpg",
    description: "A Nataka Inc promo — cinematic brand storytelling that captures who we are.",
    type: "local",
    src: "/videos/nataka-promo.mp4",
  },
];

export default function VideoReel() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const closeModal = useCallback(() => setActiveVideo(null), []);

  return (
    <>
      <section id="reel" className="py-24 md:py-32 px-6 md:px-12 bg-ink-50 relative" ref={ref}>
        <div className="absolute top-0 inset-x-0 h-px hr-teal opacity-20" />
        <div className="absolute bottom-0 inset-x-0 h-px hr-teal opacity-20" />

        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="mb-5">
              <LetterReveal text="Our Reels" inView={inView} delay={0} stagger={0.05}
                className="font-sans text-teal text-[10px] tracking-widest2 uppercase font-medium" />
            </div>
            <div className="flex items-end justify-between flex-wrap gap-6 overflow-hidden">
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 1, delay: 0.1, ease: [0.77, 0, 0.175, 1] }}
              >
                <h2 className="leading-none">
                  <span className="font-geist font-black text-[clamp(1.8rem,7vw,6rem)] text-white uppercase block">Watch Our</span>
                  <span className="font-display font-semibold italic text-[clamp(1.8rem,7vw,6rem)] text-teal block">Work in Motion.</span>
                </h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="font-sans text-cream/65 text-sm max-w-xs leading-relaxed self-end mb-2"
              >
                Films, music videos &amp; brand work — shot, directed and finished in Nairobi. Click any to watch.
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {videos.map((v, i) => (
              <VideoCard key={v.id} video={v} index={i} onPlay={() => setActiveVideo(v)} />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeVideo && <VideoModal video={activeVideo} onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
}

function VideoCard({ video, index, onPlay }: { video: VideoItem; index: number; onPlay: () => void }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-default"
      onMouseEnter={() => { setHovered(true);  setCursorLabel("PLAY"); }}
      onMouseLeave={() => { setHovered(false); clearCursorLabel(); }}
    >
      <button
        onClick={onPlay}
        className="relative w-full aspect-video overflow-hidden block focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
        aria-label={`Play ${video.title}`}
      >
        <Image src={video.poster} alt={`${video.title} — video by Nataka Inc, Nairobi Kenya`} fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          quality={90} />

        <div className="absolute inset-0 bg-ink/50 group-hover:bg-ink/25 transition-colors duration-300" />

        {/* Film sweep */}
        <motion.div
          animate={hovered
            ? { x: ["-100%", "200%"], opacity: [0, 0.1, 0] }
            : { x: "-100%", opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-20deg] pointer-events-none"
        />

        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 inset-x-0 h-0.5 bg-teal origin-left"
        />

        {/* Play ring — shrinks to nothing when cursor shows PLAY label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: hovered ? 0.7 : 1, opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.25 }}
            className="w-14 h-14 rounded-full border border-teal/60 flex items-center justify-center backdrop-blur-sm bg-ink/40"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 ml-0.5" fill="#0ABFBF"><path d="M8 5v14l11-7z"/></svg>
          </motion.div>
        </div>

        <div className="absolute top-4 left-4">
          <span className="font-sans text-[10px] text-teal tracking-widest uppercase border border-teal/40 px-3 py-1 bg-ink/60 backdrop-blur-sm font-medium">
            {video.category}
          </span>
        </div>
      </button>

      <div className="pt-4">
        <h3 className="font-geist font-black text-lg md:text-xl text-white uppercase leading-none mb-1">{video.title}</h3>
        <p className="font-sans text-cream/65 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">{video.description}</p>
      </div>
    </motion.div>
  );
}

function VideoModal({ video, onClose }: { video: VideoItem; onClose: () => void }) {
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
          className="absolute -top-11 right-0 font-sans text-white/55 text-xs tracking-widest uppercase hover:text-teal transition-colors flex items-center gap-2"
          aria-label="Close video">
          <span>Close</span><span className="text-base leading-none">✕</span>
        </button>

        <div className="w-full aspect-video bg-black">
          {video.type === "vimeo" ? (
            <iframe
              src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&color=0abfbf`}
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
            <h3 className="font-geist font-black text-xl text-white uppercase">{video.title}</h3>
            <p className="font-sans text-teal text-xs tracking-widest uppercase mt-1 font-medium">{video.category}</p>
          </div>
          <p className="font-sans text-cream/55 text-sm max-w-sm text-right hidden md:block leading-relaxed">{video.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
