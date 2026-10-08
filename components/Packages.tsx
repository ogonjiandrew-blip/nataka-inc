import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { waLink } from "@/lib/whatsapp";
import Reveal from "@/components/Reveal";
import { packages, standard } from "@/lib/packages";

function QuoteLink({ message, label }: { message: string; label: string }) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group inline-flex items-center gap-2 font-heading font-semibold text-sm text-accent"
    >
      Get a quote
      <ArrowRight size={15} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

export default function Packages() {
  const [lead, ...rest] = packages;
  return (
    <section id="packages" className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
      <Reveal className="mb-12 md:mb-16 max-w-2xl">
        <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.95] text-[clamp(2.2rem,5vw,4.4rem)]">
          Packages
        </h2>
        <p className="mt-4 font-sans text-cream/65 text-base md:text-lg leading-relaxed max-w-[56ch]">
          Starting ranges, not fixed quotes. Every job is scoped to your brief and budget before we shoot.
        </p>
      </Reveal>

      {/* Lead package: the full campaign, shown first and widest */}
      <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 rounded-[22px] bg-white/[0.035] ring-1 ring-white/15 p-8 md:p-12 shadow-[0_30px_90px_-40px_rgb(var(--c-ember)/0.6)]">
        <div className="lg:col-span-7">
          <h3 className="font-heading font-bold text-2xl md:text-4xl text-white tracking-tight leading-tight">{lead.name}</h3>
          <p className="mt-3 font-sans text-cream/70 text-base leading-relaxed max-w-[48ch]">{lead.who}</p>
          <p className="mt-6 font-heading font-bold stretch-semi text-2xl md:text-3xl text-white tabular-nums">{lead.range}</p>
        </div>
        <div className="lg:col-span-5 flex flex-col justify-between gap-8">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {lead.includes.map((item) => (
              <li key={item} className="font-sans text-sm text-cream/80 leading-snug pl-3 border-l border-white/25">{item}</li>
            ))}
          </ul>
          <QuoteLink message={lead.wa} label={`Get a quote for the ${lead.name}`} />
        </div>
      </Reveal>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        {rest.map((p, i) => (
          <Reveal key={p.name} delay={(i % 2) * 0.06} className="rounded-[22px] bg-white/[0.025] ring-1 ring-white/[0.07] p-8 md:p-10 flex flex-col">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="font-heading font-bold text-xl text-white tracking-tight">{p.name}</h3>
              <p className="font-heading font-bold text-base text-accent tabular-nums">{p.range}</p>
            </div>
            <p className="mt-2 font-sans text-sm text-cream/60 leading-relaxed">{p.who}</p>
            <p className="mt-5 font-sans text-sm text-cream/80 leading-relaxed flex-1">{p.includes.join(", ")}.</p>
            <div className="mt-6">
              <QuoteLink message={p.wa} label={`Get a quote for the ${p.name}`} />
            </div>
          </Reveal>
        ))}
      </div>

      {/* What every engagement starts with */}
      <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-white/10 pt-10">
        {standard.map((s) => (
          <div key={s.title}>
            <h3 className="font-heading font-bold text-base text-white">{s.title}</h3>
            <p className="mt-2 font-sans text-sm text-cream/60 leading-relaxed max-w-[40ch]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
