"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import Reveal from "@/components/Reveal";
import WorkTile from "@/components/WorkTile";
import VideoModal, { type ModalFilm } from "@/components/VideoModal";
import { getProjects } from "@/lib/work";

const ROW = "md:aspect-auto md:h-[clamp(340px,36vw,520px)]";
const cells = [
  { cell: "md:col-span-7", media: `aspect-[16/10] ${ROW}`, sizes: "(max-width: 768px) 100vw, 58vw" },
  { cell: "md:col-span-5", media: `aspect-[4/5] ${ROW}`, sizes: "(max-width: 768px) 100vw, 42vw" },
];

/** Two pieces of real work picked for the service, as proof before the pitch. */
export default function WorkStrip({ ids }: { ids: string[] }) {
  const [film, setFilm] = useState<ModalFilm | null>(null);
  const close = useCallback(() => setFilm(null), []);
  const work = getProjects(ids).slice(0, 2);
  if (!work.length) return null;

  return (
    <section id="work" className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
      <Reveal className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.95] text-[clamp(1.85rem,5vw,4.4rem)]">
          The work
        </h2>
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 font-heading font-bold text-[11px] uppercase tracking-[0.16em] text-white"
        >
          See all work
          <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-12">
        {work.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08} className={cells[i].cell}>
            <WorkTile
              project={p}
              media={cells[i].media}
              sizes={cells[i].sizes}
              onPlay={() => p.film && setFilm({ title: p.title, meta: p.meta, src: p.film, poster: p.poster })}
            />
          </Reveal>
        ))}
      </div>

      <AnimatePresence>{film && <VideoModal film={film} onClose={close} />}</AnimatePresence>
    </section>
  );
}
