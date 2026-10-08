"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import Reveal from "@/components/Reveal";

export type ServiceItem = { title: string; line: string; href: string; image: string; alt: string };

/**
 * Typographic index of services. On large screens a preview pane beside the
 * list swaps to the hovered service's image; on smaller screens the list
 * stands alone, since the work grid above already carries the imagery.
 */
export default function ServiceIndex({
  items,
  title,
  note,
  id,
  as: Heading = "h2",
  className = "py-24 md:py-36",
}: {
  items: ServiceItem[];
  title: string;
  note?: string;
  id?: string;
  as?: "h1" | "h2";
  /** Vertical padding; a page that opens on this list needs room for the nav */
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  return (
    <section id={id} className={`px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
      <Reveal className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <Heading className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.95] text-[clamp(1.85rem,6vw,5.2rem)]">
          {title}
        </Heading>
        {note && <p className="font-sans text-cream/60 text-base leading-relaxed max-w-[34ch]">{note}</p>}
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <ul className="lg:col-span-7 border-t border-white/10" onMouseLeave={() => setHovering(false)}>
          {items.map((s, i) => (
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
          <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] ring-1 ring-white/10 bg-ink-50 shadow-[0_30px_90px_-30px_rgb(var(--c-ember)/0.55)]">
            {items.map((s, i) => (
              <Image
                key={s.href}
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
            {items[active].title}
          </p>
        </div>
      </div>
    </section>
  );
}
