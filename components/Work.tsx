"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LetterReveal from "@/components/LetterReveal";
import { setCursorLabel, clearCursorLabel } from "@/hooks/useCursorLabel";

// Rotating gallery — all updated stills from STILLS/1
const filmGallery = [
  "/stills/1/1.jpg",
  "/stills/1/2.jpg",
  "/stills/1/4.jpg",
  "/stills/1/5.jpg",
  "/stills/1/6.jpg",
  "/stills/1/7.jpg",
  "/stills/1/8.jpg",
  "/stills/1/27.jpg",
  "/stills/1/43.jpg",
  "/stills/1/46.jpg",
  "/stills/1/a.jpg",
  "/stills/1/b.jpg",
  "/stills/4/6.jpg",
  "/stills/4/7.jpg",
];

// Music video gallery — 4:5 portrait crops matched to the card's aspect ratio
const musicVideoGallery = [
  "/stills/4/p5.jpg",
  "/stills/4/p2.jpg",
  "/stills/4/p1.jpg",
  "/stills/4/p4.jpg",
];

// Editorial fashion gallery — curated portrait fashion shots
const fashionGallery = [
  "/stills/fashion/6.jpg",
  "/stills/fashion/1.jpg",
  "/stills/fashion/2.jpg",
  "/stills/fashion/12.jpg",
  "/stills/fashion/8.jpg",
  "/stills/fashion/7.jpg",
  "/stills/fashion/3.jpg",
  "/stills/fashion/9.jpg",
];

type Project = {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  alt: string;
  image: string;
  gallery?: string[];
  span: string;
  aspect: string;
  sizes: string;
  metric?: string;
};

// TODO: Replace metric strings with real performance numbers from your analytics
const projects: Project[] = [
  {
    id: 1,
    title: "Campaign Film",
    category: "Creative Production",
    year: "2024",
    description: "Cinematic campaign film — bold, purposeful, made in Nairobi.",
    alt: "Cinematic film production still by Nataka Inc — video production company Nairobi Kenya",
    image: "/stills/1/1.jpg",
    metric: "15M+ combined reach",
    span: "md:col-span-2",
    aspect: "aspect-[16/9]",
    sizes: "(max-width: 768px) 100vw, 66vw",
  },
  {
    id: 2,
    title: "Music Video",
    category: "Music Video · Direction",
    year: "2024",
    description: "From concept to final cut — artist-driven music video production in Nairobi.",
    alt: "Music video production by Nataka Inc — media company Kenya",
    image: "/stills/4/p5.jpg",
    gallery: musicVideoGallery,
    metric: "Kwanini · 500K+ streams first month",
    span: "md:col-span-1",
    aspect: "aspect-[4/5]",
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
  {
    id: 3,
    title: "Ssaru",
    category: "Artist Campaign · PR",
    year: "2024",
    description: "Visual campaign for Kenya's rising music artist — raw, vibrant, undeniable.",
    alt: "Ssaru artist campaign by Nataka Inc — PR and music marketing agency Kenya",
    image: "/stills/ssaru/2.jpg",
    metric: "2M+ views · sold-out shows",
    span: "md:col-span-1",
    aspect: "aspect-[16/9]",
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
  {
    id: 4,
    title: "Studio Sessions",
    category: "Photography",
    year: "2024",
    description: "Studio portrait and editorial photography — intimate, powerful, studio-grade.",
    alt: "Studio photography by Nataka Inc — creative production company Nairobi",
    image: "/stills/ai/studio.png",
    metric: "Editorial · commissioned by 3 labels",
    span: "md:col-span-1",
    aspect: "aspect-[4/5]",
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
  {
    id: 5,
    title: "Editorial Fashion",
    category: "Fashion Editorial",
    year: "2024",
    description: "High-end fashion editorial showcasing African style on a global stage.",
    alt: "Fashion editorial photography by Nataka Inc — creative agency Kenya",
    image: "/stills/fashion/6.jpg",
    gallery: fashionGallery,
    metric: "8 looks · 4 media placements",
    span: "md:col-span-1",
    aspect: "aspect-[4/5]",
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
  {
    id: 6,
    title: "Film & Drama",
    category: "Film Production",
    year: "2023",
    description: "Dramatic film stills from our narrative and commercial work across Kenya.",
    alt: "Film production stills by Nataka Inc — production company Kenya",
    image: "/stills/1/1.jpg",
    gallery: filmGallery,
    metric: "3 award nominations",
    span: "md:col-span-3",
    aspect: "aspect-[21/9]",
    sizes: "(max-width: 768px) 100vw, 1280px",
  },
];

export default function Work() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto" ref={ref}>

      <div className="mb-16 md:mb-20">
        <div className="mb-5">
          <LetterReveal text="Selected Work" inView={inView} delay={0} stagger={0.04}
            className="font-sans text-teal text-[10px] tracking-widest2 uppercase font-medium" />
        </div>

        <div className="flex items-end justify-between flex-wrap gap-6 overflow-hidden">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.77, 0, 0.175, 1] }}
          >
            <h2 className="leading-none">
              <span className="font-geist font-black text-[clamp(1.8rem,7vw,6rem)] text-white uppercase block">Work That</span>
              <span className="font-display font-semibold italic text-[clamp(1.8rem,7vw,6rem)] text-teal block">Moves People.</span>
            </h2>
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            href="#contact"
            className="hidden md:block font-sans text-white/55 text-xs tracking-widest uppercase hover:text-teal transition-colors border-b border-white/15 hover:border-teal pb-1 self-end mb-2"
          >
            Start Your Project →
          </motion.a>
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>

      {/* Mobile stack */}
      <div className="md:hidden space-y-2">
        {projects.map((p, i) => <MobileProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </section>
  );
}

/* ── Desktop card — cursor label + film-light sweep ── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  // Gallery rotation — all frames stay in DOM, only opacity changes (no black flash)
  const gallery = project.gallery ?? [project.image];
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (gallery.length <= 1) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % gallery.length), 3200);
    return () => clearInterval(id);
  }, [gallery.length]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden group cursor-default ${project.span}`}
      onMouseEnter={() => { setHovered(true);  setCursorLabel("VIEW"); }}
      onMouseLeave={() => { setHovered(false); clearCursorLabel(); }}
    >
      <div className={`relative ${project.aspect} overflow-hidden bg-ink-50`}>

        {/* All frames stay in DOM — opacity crossfade + per-frame Ken-Burns drift */}
        {gallery.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            animate={{ opacity: i === slide ? 1 : 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              animate={i === slide
                ? { scale: 1.0, x: 0, y: 0 }
                : { scale: 1.06, x: 0, y: 0 }}
              initial={{ scale: 1.06 }}
              transition={{ duration: 3.8, ease: "easeOut" }}
            >
              <Image
                src={src}
                alt={project.alt}
                fill
                className="object-cover object-center"
                sizes={project.sizes}
                quality={90}
                priority={i === 0}
              />
            </motion.div>
          </motion.div>
        ))}

        {/* Progress bars — bottom right */}
        {gallery.length > 1 && (
          <div className="absolute bottom-4 right-5 flex gap-1.5 z-10 pointer-events-none">
            {gallery.map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: i === slide ? 1 : 0.3, width: i === slide ? 18 : 4 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="h-[2px] bg-white/60 rounded-full"
              />
            ))}
          </div>
        )}

        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

        {/* Hover darkening */}
        <motion.div animate={{ opacity: hovered ? 0.3 : 0 }} transition={{ duration: 0.35 }}
          className="absolute inset-0 bg-ink" />

        {/* Film-light sweep — travels left→right on hover */}
        <motion.div
          initial={false}
          animate={hovered
            ? { x: ["-100%", "200%"], opacity: [0, 0.12, 0] }
            : { x: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-20deg] pointer-events-none"
        />

        {/* Teal bottom line */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 inset-x-0 h-0.5 bg-teal origin-left"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div className="flex items-start justify-between">
            <span className="font-sans text-[10px] text-teal tracking-widest uppercase border border-teal/40 px-3 py-1 bg-ink/60 backdrop-blur-sm font-medium">{project.category}</span>
            <span className="font-sans text-white/60 text-xs font-medium">{project.year}</span>
          </div>
          <div>
            <h3 className="font-geist font-black text-2xl text-white uppercase leading-none mb-1.5 drop-shadow-lg">{project.title}</h3>
            {project.metric && (
              <p className="font-sans text-teal text-[10px] tracking-wider uppercase font-semibold mb-2 drop-shadow">
                {project.metric}
              </p>
            )}
            <motion.p
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
              transition={{ duration: 0.3 }}
              className="font-sans text-white/80 text-sm leading-relaxed"
            >{project.description}</motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Mobile card — full-width image with overlay, designed for phone ── */
function MobileProjectCard({ project, index }: { project: Project; index: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  // First card gets cinematic widescreen; panoramic card gets letterbox; rest get 4:3
  const aspect =
    index === 0 ? "aspect-[16/9]" :
    project.aspect === "aspect-[21/9]" ? "aspect-[16/7]" :
    "aspect-[4/3]";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: Math.min(index * 0.07, 0.28) }}
      className="relative overflow-hidden"
    >
      <div className={`relative ${aspect} overflow-hidden bg-ink`}>
        <Image
          src={project.image}
          alt={project.alt}
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        {/* Gradient: heavy at bottom for text legibility, light at top for category tag */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          {/* Top row: category + year */}
          <div className="flex items-center justify-between">
            <span className="font-sans text-[9px] text-teal tracking-widest uppercase border border-teal/40 px-2.5 py-1 bg-ink/60 font-medium">
              {project.category}
            </span>
            <span className="font-sans text-white/40 text-[9px] tabular-nums">{project.year}</span>
          </div>
          {/* Bottom: title + metric */}
          <div>
            <h3 className="font-geist font-black text-xl text-white uppercase leading-tight mb-0.5 drop-shadow-lg">
              {project.title}
            </h3>
            {project.metric && (
              <p className="font-sans text-teal text-[10px] tracking-wider uppercase font-semibold">
                {project.metric}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
