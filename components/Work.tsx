"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play } from "@phosphor-icons/react";
import Reveal from "@/components/Reveal";
import VideoModal, { type ModalFilm } from "@/components/VideoModal";

type Project = {
  id: string;
  title: string;
  meta: string;
  poster: string;
  alt: string;
  /** Short muted loop that plays while the pointer is over the tile. */
  preview?: string;
  /** Stills that cycle on hover when there is no motion preview. */
  gallery?: string[];
  /** Full film with sound, opened in the player. */
  film?: string;
  /** Case-study page, when there is one. */
  href?: string;
  cell: string;
  media: string;
  sizes: string;
};

const ROW = "md:aspect-auto md:h-[clamp(360px,38vw,560px)]";

/* Editorial grid: one full-width opener, then two asymmetric pairs. */
const projects: Project[] = [
  {
    id: "za-mabuda",
    title: "Za Mabuda",
    meta: "Vijana Barubaru ft. Scar Mkadinali. Period film, directed by Andrew Ogonji",
    poster: "/videos/za-mabuda-still.jpg",
    alt: "Za Mabuda: two men in flat caps stand in front of an explosion",
    preview: "/videos/previews/za-mabuda.mp4",
    film: "/videos/za-mabuda.mp4",
    cell: "md:col-span-12",
    media: "aspect-[16/9] md:aspect-[21/9]",
    sizes: "100vw",
  },
  {
    id: "sarit",
    title: "Your City",
    meta: "Sarit Centre. Brand commercial",
    poster: "/videos/sarit-poster-clean.jpg",
    alt: "Sarit Centre commercial: friends dancing in a bowling alley",
    preview: "/videos/previews/sarit.mp4",
    film: "/videos/sarit.mp4",
    cell: "md:col-span-7",
    media: `aspect-[16/10] ${ROW}`,
    sizes: "(max-width: 768px) 100vw, 58vw",
  },
  {
    id: "kwanini",
    title: "Kwanini",
    meta: "Ssaru x Fathermoh. Music video",
    poster: "/stills/4/p5.jpg",
    alt: "Still from the Kwanini music video directed by Nataka Inc",
    gallery: ["/stills/4/p5.jpg", "/stills/4/p1.jpg", "/stills/4/p4.jpg"],
    href: "/work/ssaru-fathermoh-kwanini",
    cell: "md:col-span-5",
    media: `aspect-[4/5] ${ROW}`,
    sizes: "(max-width: 768px) 100vw, 42vw",
  },
  {
    id: "teslah",
    title: "Teslah",
    meta: "Studio music video",
    poster: "/stills/teslah/6.jpg",
    alt: "Teslah music video still: the artist in a pale blue studio",
    gallery: ["/stills/teslah/6.jpg", "/stills/teslah/5.jpg", "/stills/teslah/1.jpg", "/stills/teslah/4.jpg"],
    href: "/work/teslah-music-video",
    cell: "md:col-span-5",
    media: `aspect-[4/5] ${ROW}`,
    sizes: "(max-width: 768px) 100vw, 42vw",
  },
  {
    id: "save-her",
    title: "Save Her",
    meta: "Music video. Direction and post",
    poster: "/videos/save-her-poster.jpg",
    alt: "Save Her: extreme close-up of a woman's eyes in warm light",
    preview: "/videos/previews/save-her.mp4",
    film: "/videos/save-her.mp4",
    cell: "md:col-span-7",
    media: `aspect-[16/10] ${ROW}`,
    sizes: "(max-width: 768px) 100vw, 58vw",
  },
  {
    id: "cool-in-school",
    title: "Cool in School",
    meta: "Music video. Direction and post",
    poster: "/videos/cool-in-school-poster.jpg",
    alt: "Cool in School music video: friends laughing in sunglasses",
    preview: "/videos/previews/cool-in-school.mp4",
    film: "/videos/cool-in-school.mp4",
    cell: "md:col-span-7",
    media: `aspect-[16/10] ${ROW}`,
    sizes: "(max-width: 768px) 100vw, 58vw",
  },
];

export default function Work() {
  const [film, setFilm] = useState<ModalFilm | null>(null);
  const close = useCallback(() => setFilm(null), []);

  return (
    <section id="work" className="px-6 md:px-12 py-24 md:py-36 max-w-7xl mx-auto">
      {/* Older links point at /#reel; the reel now lives inside this section */}
      <span id="reel" aria-hidden="true" className="block -translate-y-24" />

      <Reveal className="mb-12 md:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.95] text-[clamp(1.85rem,6vw,5.2rem)] lg:whitespace-nowrap">
          Selected work
        </h2>
        <p className="font-sans text-cream/60 text-base leading-relaxed max-w-[30ch]">
          Films, commercials and music videos we directed and finished. Hover to preview, click to watch with sound.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-12 md:gap-y-16">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.08} className={p.cell}>
            <ProjectTile
              project={p}
              onPlay={() => p.film && setFilm({ title: p.title, meta: p.meta, src: p.film, poster: p.poster })}
            />
          </Reveal>
        ))}

        {/* Closing tile: the route to everything else */}
        <Reveal delay={0.08} className="md:col-span-5">
          <Link
            href="/gallery"
            className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden border border-white/10 p-8 md:p-10 hover:border-white/30 transition-colors"
          >
            <Image
              src="/stills/fashion/10.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              quality={75}
              className="object-cover opacity-35 scale-[1.04] transition-[opacity,transform] duration-[900ms] ease-out group-hover:opacity-50 group-hover:scale-[1.08]"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
            <span className="relative font-mono text-xs text-cream/70">More work</span>
            <span className="relative font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.02em] leading-[1] text-[clamp(1.6rem,3vw,2.6rem)]">
              Open the
              <br />
              gallery
              <ArrowUpRight
                size={28}
                weight="bold"
                className="inline-block ml-3 -mt-2 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </Reveal>
      </div>

      <AnimatePresence>{film && <VideoModal film={film} onClose={close} />}</AnimatePresence>
    </section>
  );
}

function ProjectTile({ project, onPlay }: { project: Project; onPlay: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [frame, setFrame] = useState(0);
  const gallery = project.gallery ?? [];

  // Motion preview: start on enter, rewind on leave
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hover) {
      v.muted = true;
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
      setPlaying(false);
    }
  }, [hover]);

  // Stills preview: step through the frames while hovered
  useEffect(() => {
    if (!hover || gallery.length < 2) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % gallery.length), 900);
    return () => window.clearInterval(id);
  }, [hover, gallery.length]);

  const media = (
    <div className={`relative overflow-hidden bg-ink-50 ${project.media}`}>
      {(gallery.length ? gallery : [project.poster]).map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? project.alt : ""}
          fill
          sizes={project.sizes}
          quality={85}
          className={`object-cover scale-[1.04] transition-[opacity,transform] duration-[900ms] ease-out group-hover:scale-[1.07] ${
            i === (hover ? frame : 0) ? "opacity-100" : "opacity-0"
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
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            hover && playing ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );

  const caption = (
    <div className="mt-5 flex items-start justify-between gap-6">
      <div>
        <h3 className="font-heading font-bold stretch-semi text-xl md:text-2xl text-white tracking-tight leading-tight">
          {project.title}
        </h3>
        <p className="mt-1.5 font-sans text-sm text-cream/55">{project.meta}</p>
      </div>
      <span className="mt-1 shrink-0 inline-flex items-center gap-2 font-heading font-bold text-[11px] uppercase tracking-[0.16em] text-cream/70 group-hover:text-white transition-colors">
        {project.film ? (
          <>
            Play <Play size={13} weight="fill" />
          </>
        ) : (
          <>
            Case study <ArrowUpRight size={13} weight="bold" />
          </>
        )}
      </span>
    </div>
  );

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setFrame(0);
    },
  };

  return project.film ? (
    <button type="button" onClick={onPlay} {...handlers} className="group block w-full text-left" aria-label={`Play ${project.title}`}>
      {media}
      {caption}
    </button>
  ) : (
    <Link href={project.href ?? "#"} {...handlers} className="group block" aria-label={`${project.title}: case study`}>
      {media}
      {caption}
    </Link>
  );
}
