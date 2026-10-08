"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "@phosphor-icons/react";
import type { Project } from "@/lib/work";

/**
 * One piece of work, framed like a screen: a rounded card whose preview loop
 * (or cycling stills) plays while the card is on screen, lighting the room
 * behind it with its own colours. Films open in the player with sound via
 * `onPlay`; projects with a case study link to it instead.
 */
export default function WorkTile({
  project,
  media,
  sizes,
  onPlay,
}: {
  project: Project;
  /** Aspect / height classes for the image box */
  media: string;
  sizes: string;
  onPlay: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [frame, setFrame] = useState(0);
  const gallery = project.gallery ?? [];
  // Films that live on a creator's own account open their original post
  const external = project.href?.startsWith("http") ?? false;

  // Play only while on screen: saves data, and the page feels alive where you look
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      v.muted = true;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView]);

  useEffect(() => {
    if (!inView || gallery.length < 2) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % gallery.length), 1600);
    return () => window.clearInterval(id);
  }, [inView, gallery.length]);

  const stills = gallery.length ? gallery : [project.poster];

  const card = (
    <div>
      <div
        className={`relative overflow-hidden rounded-[20px] bg-ink-50 ring-1 ring-white/10 transition-[box-shadow] duration-500 group-hover:ring-signal/50 ${media}`}
      >
        {stills.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? project.alt : ""}
            fill
            sizes={sizes}
            quality={85}
            className={`object-cover scale-[1.04] transition-[opacity,transform] duration-[1200ms] ease-out group-hover:scale-[1.07] ${
              i === frame ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {project.preview && (
          <video
            ref={videoRef}
            src={project.preview}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onPlaying={() => setPlaying(true)}
            className={`absolute inset-0 h-full w-full object-cover scale-[1.04] transition-[opacity,transform] duration-700 group-hover:scale-[1.07] ${
              inView && playing ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        {project.film && (
          <span
            aria-hidden="true"
            className="absolute right-4 bottom-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink/40 text-white ring-1 ring-white/25 backdrop-blur-md transition-[transform,background-color,color] duration-300 group-hover:scale-110 group-hover:bg-signal group-hover:text-on-signal group-hover:ring-signal"
          >
            <Play size={16} weight="fill" />
          </span>
        )}
      </div>

      <div className="flex items-start justify-between gap-6 px-1 pt-4">
        <div>
          <h3 className="font-heading font-bold stretch-semi text-lg md:text-xl text-white tracking-tight leading-tight">
            {project.title}
          </h3>
          <p className="mt-1.5 font-sans text-sm text-cream/55">{project.meta}</p>
        </div>
        <span className="mt-1 shrink-0 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-cream/60 group-hover:text-signal transition-colors">
          {project.film ? "Watch" : external ? "Instagram" : "Case study"}
          {!project.film && <ArrowUpRight size={12} weight="bold" />}
        </span>
      </div>
    </div>
  );

  return (
    <div ref={rootRef} className="relative isolate">
      {/* The card's own light, blurred onto the room behind it */}
      <div aria-hidden="true" className="ambient hidden md:block">
        <Image src={project.poster} alt="" fill sizes="320px" quality={40} className="object-cover" />
      </div>
      {project.film ? (
        <button type="button" onClick={onPlay} className="group block w-full text-left" aria-label={`Play ${project.title} with sound`}>
          {card}
        </button>
      ) : external ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
          aria-label={`Watch ${project.title} on Instagram`}
        >
          {card}
        </a>
      ) : (
        <Link href={project.href ?? "/#work"} className="group block" aria-label={`${project.title}: case study`}>
          {card}
        </Link>
      )}
    </div>
  );
}
