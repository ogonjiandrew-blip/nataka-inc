import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import { packages } from "@/lib/packages";
import { waLink } from "@/lib/whatsapp";

/**
 * Homepage pricing, kept to one quiet list: what we make and what it usually
 * costs. Each row opens WhatsApp with the package already named; the full
 * breakdown, the service finder and the FAQ live on /work-with-us.
 */
export default function Engagements() {
  return (
    <section id="engagements" className="px-6 md:px-12 py-24 md:py-36 max-w-7xl mx-auto">
      <Reveal className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.95] text-[clamp(1.85rem,6vw,5.2rem)]">
          Engagements
        </h2>
        <p className="font-sans text-cream/60 text-base leading-relaxed max-w-[36ch]">
          Starting ranges, not fixed quotes. Every project is scoped to your brief and budget before we shoot.
        </p>
      </Reveal>

      <ul className="border-t border-white/10">
        {packages.map((p, i) => (
          <Reveal as="li" key={p.name} delay={Math.min(i, 4) * 0.05}>
            <a
              href={waLink(`Source: natakainc.com (engagements)\n${p.wa}`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Get a quote for the ${p.name} on WhatsApp`}
              className="group grid grid-cols-12 gap-x-4 gap-y-2 items-baseline py-6 md:py-7 border-b border-white/10 hover:bg-white/[0.025] transition-colors"
            >
              <span className="col-span-12 md:col-span-4 font-heading font-bold stretch-semi text-xl md:text-2xl text-white tracking-tight">
                {p.short}
              </span>
              <span className="col-span-12 md:col-span-5 font-sans text-sm text-cream/60 leading-relaxed">{p.who}</span>
              <span className="col-span-10 md:col-span-2 font-heading font-bold text-base text-white tabular-nums md:text-right">
                {p.range}
              </span>
              <ArrowUpRight
                size={20}
                weight="bold"
                aria-hidden="true"
                className="col-span-2 md:col-span-1 justify-self-end text-cream/50 transition-[color,transform] duration-300 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </Reveal>
        ))}
      </ul>

      <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <p className="font-sans text-sm text-cream/60 max-w-[60ch]">
          Every engagement comes with agreed revisions, a delivery date in writing, and the director on your WhatsApp.
        </p>
        <Link
          href="/work-with-us"
          className="group inline-flex items-center gap-2 font-heading font-bold text-[11px] uppercase tracking-[0.16em] text-white"
        >
          Compare packages
          <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
