"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Reveal from "@/components/Reveal";
import WorkTile from "@/components/WorkTile";
import VideoModal, { type ModalFilm } from "@/components/VideoModal";
import { projects } from "@/lib/work";

const TALL = "md:aspect-auto md:h-[clamp(340px,34vw,500px)]";
const SHORT = "md:aspect-auto md:h-[clamp(240px,22vw,330px)]";

/* Screens on a wall: the newest piece beside a wide film, a row of three, then
   two portraits beside the way into everything else. Data lives in lib/work.ts. */
const layout = [
  { id: "gun-vs-sword", cell: "md:col-span-5", media: `aspect-[4/5] ${TALL}`, sizes: "(max-width: 768px) 100vw, 42vw" },
  { id: "za-mabuda", cell: "md:col-span-7", media: `aspect-[16/10] ${TALL}`, sizes: "(max-width: 768px) 100vw, 58vw" },
  { id: "sarit", cell: "md:col-span-4", media: `aspect-[16/10] ${SHORT}`, sizes: "(max-width: 768px) 100vw, 33vw" },
  { id: "save-her", cell: "md:col-span-4", media: `aspect-[16/10] ${SHORT}`, sizes: "(max-width: 768px) 100vw, 33vw" },
  { id: "cool-in-school", cell: "md:col-span-4", media: `aspect-[16/10] ${SHORT}`, sizes: "(max-width: 768px) 100vw, 33vw" },
  { id: "kwanini", cell: "md:col-span-4", media: `aspect-[4/5] ${TALL}`, sizes: "(max-width: 768px) 100vw, 33vw" },
  { id: "teslah", cell: "md:col-span-4", media: `aspect-[4/5] ${TALL}`, sizes: "(max-width: 768px) 100vw, 33vw" },
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
          Films, music videos, commercials and VFX from our studio. Click any screen to watch it.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        {layout.map((l, i) => {
          const p = projects[l.id];
          return (
            <Reveal key={p.id} delay={(i % 2) * 0.08} className={l.cell}>
              <WorkTile
                project={p}
                media={l.media}
                sizes={l.sizes}
                onPlay={() => p.film && setFilm({ title: p.title, meta: p.meta, src: p.film, poster: p.poster })}
              />
            </Reveal>
          );
        })}

        {/* Closing tile: the route to everything else */}
        <Reveal delay={0.08} className="md:col-span-4">
          <Link
            href="/gallery"
            className="group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-[22px] p-8 md:p-10 ring-1 ring-white/[0.07] hover:ring-white/20 transition-[box-shadow] duration-500"
          >
            <Image
              src="/stills/fashion/10.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={75}
              className="object-cover opacity-40 scale-[1.04] transition-[opacity,transform] duration-[900ms] ease-out group-hover:opacity-55 group-hover:scale-[1.08]"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-ink via-ink/60 to-ember/30" />
            <span className="relative font-mono text-[11px] uppercase tracking-[0.12em] text-cream/70">More work</span>
            <span className="relative font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.02em] leading-[1] text-[clamp(1.8rem,3.6vw,3.2rem)]">
              Open the
              <br />
              gallery
              <ArrowUpRight
                size={30}
                weight="bold"
                className="inline-block ml-3 -mt-2 text-signal transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </Reveal>
      </div>

      <AnimatePresence>{film && <VideoModal film={film} onClose={close} />}</AnimatePresence>
    </section>
  );
}
