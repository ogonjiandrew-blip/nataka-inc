"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import Reveal from "@/components/Reveal";

type Service = { title: string; line: string; href: string; image: string; alt: string };

const services: Service[] = [
  {
    title: "AI video",
    line: "AI commercials, music videos and brand characters, directed shot by shot.",
    href: "/services/ai-video-production-kenya",
    image: "/ai/aanother/frontman.jpg",
    alt: "AANOTHER frontman on stage, an AI band made by Nataka Inc",
  },
  {
    title: "Film & commercials",
    line: "Brand films, TV and online commercials, shot by our own crew.",
    href: "/services/video-production-nairobi",
    image: "/stills/1/46.jpg",
    alt: "Film still by Nataka Inc: a man in a hat against a bright sky",
  },
  {
    title: "Music videos",
    line: "Concept, shoot and edit for artists, plus the cut-downs for release week.",
    href: "/services/music-video-production-nairobi",
    image: "/stills/4/p5.jpg",
    alt: "Still from the Kwanini music video directed by Nataka Inc",
  },
  {
    title: "Launch campaigns",
    line: "The idea, the hero film, the social cutdowns and the rollout plan.",
    href: "/services/brand-promotion-kenya",
    image: "/videos/sarit-poster-clean.jpg",
    alt: "Frame from the Sarit Centre commercial by Nataka Inc",
  },
  {
    title: "Digital marketing",
    line: "Paid social, search and content plans built around enquiries, not likes.",
    href: "/services/digital-marketing-nairobi",
    image: "/stills/teslah/2.jpg",
    alt: "Studio portrait from a Nataka Inc music video shoot",
  },
  {
    title: "Brand strategy",
    line: "Positioning, identity and messaging, so every ad says the same thing.",
    href: "/services/brand-strategy-kenya",
    image: "/stills/fashion/6.jpg",
    alt: "Fashion editorial portrait by Nataka Inc",
  },
];

/**
 * Typographic index of services. On large screens a preview pane beside the
 * list swaps to the hovered service's image; on smaller screens the list
 * stands alone, since the work grid above already carries the imagery.
 */
export default function Services() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  return (
    <section id="services" className="px-6 md:px-12 py-24 md:py-36 max-w-7xl mx-auto">
      <Reveal className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.95] text-[clamp(1.85rem,6vw,5.2rem)]">
          What we make
        </h2>
        <p className="font-sans text-cream/60 text-base leading-relaxed max-w-[34ch]">
          Six services, one team. Most clients start with one and add the rest once it works.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <ul className="lg:col-span-7 border-t border-white/10" onMouseLeave={() => setHovering(false)}>
          {services.map((s, i) => (
            <li
              key={s.href}
              onMouseEnter={() => {
                setActive(i);
                setHovering(true);
              }}
            >
              <Link
                href={s.href}
                onFocus={() => setActive(i)}
                className={`group flex items-start justify-between gap-6 py-6 md:py-7 border-b border-white/10 transition-opacity duration-300 ${
                  hovering && active !== i ? "lg:opacity-40" : ""
                }`}
              >
                <span className="min-w-0">
                  <span className="block font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.02em] leading-[1] text-[clamp(1.45rem,3.1vw,2.6rem)] transition-transform duration-500 ease-out lg:group-hover:translate-x-2">
                    {s.title}
                  </span>
                  <span className="mt-2.5 block font-sans text-sm md:text-[0.95rem] text-cream/60 leading-relaxed max-w-[52ch]">
                    {s.line}
                  </span>
                </span>
                <ArrowUpRight
                  size={22}
                  weight="bold"
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-cream/50 transition-[color,transform] duration-300 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Preview pane (large screens): every image stays mounted and cross-fades */}
        <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink-50">
            {services.map((s, i) => (
              <Image
                key={s.image}
                src={s.image}
                alt={i === active ? s.alt : ""}
                fill
                sizes="40vw"
                quality={82}
                className={`object-cover transition-[opacity,transform] duration-700 ease-out ${
                  i === active ? "opacity-100 scale-[1.04]" : "opacity-0 scale-[1.1]"
                }`}
              />
            ))}
          </div>
          <p className="mt-4 font-mono text-xs text-cream/60" aria-live="polite">
            {services[active].title}
          </p>
        </div>
      </div>
    </section>
  );
}
