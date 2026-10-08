import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { waLink } from "@/lib/whatsapp";
import type { CaseStudy } from "@/lib/services";

const siteUrl = "https://www.natakainc.com";

/**
 * Showcase block for a service page: one flagship piece of our own AI work,
 * shown as a loop, a contact sheet of stills, and the vertical cut-downs.
 * Server component; the loop is muted autoplay like the homepage hero.
 */
export default function AiCaseStudy({ study, slug }: { study: CaseStudy; slug: string }) {
  return (
    <section
      id="case-study"
      aria-labelledby="case-study-title"
      className="border-y border-white/8 bg-white/[0.025] py-24 md:py-32"
    >
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <p className="font-sans font-medium text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-cream/70 mb-6">{study.eyebrow}</p>
        <h2
          id="case-study-title"
          className="font-heading font-extrabold uppercase stretch-wide tracking-[-0.025em] leading-[0.95] text-[clamp(1.85rem,5vw,4.4rem)] mb-8"
        >
          <span className="text-white block">
            {study.title}
          </span>
          <span className="text-accent-dark block">
            {study.titleAccent.endsWith(".") ? (
              <>
                {study.titleAccent.slice(0, -1)}
                <span className="text-signal">.</span>
              </>
            ) : (
              study.titleAccent
            )}
          </span>
        </h2>
        <p className="font-sans text-cream/75 text-base md:text-lg leading-relaxed max-w-3xl mb-12">{study.lede}</p>

        {/* Loop + numbers */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 md:mb-20">
          <figure className="lg:col-span-8">
            <div className="relative aspect-[4/3] bg-ink-50 overflow-hidden">
              <video
                src={study.loop.src}
                poster={study.loop.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
                aria-label={study.loop.alt}
              />
                          </div>
            <figcaption className="font-sans text-xs text-cream/60 mt-3">
              <span className="text-cream/85">{study.loop.tag.replace(" · ", ": ")}.</span> {study.loop.caption}
            </figcaption>
          </figure>

          <dl className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-8 lg:pt-2">
            {study.stats.map((s) => (
              <div key={s.label} className="border-t border-white/10 pt-5">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="font-heading font-extrabold stretch-wide text-[clamp(2.2rem,4.5vw,3.4rem)] text-white leading-none block tabular-nums">
                    {s.value}
                  </span>
                  <span className="font-sans text-sm text-cream/60 mt-2 block">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Contact sheet: monochrome until you look at a frame */}
        <h3 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.02em] text-[clamp(1.2rem,2.4vw,1.8rem)] mb-6">
          The contact sheet
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-16 md:mb-20">
          {study.stills.map((s, i) => (
            <figure
              key={s.src}
              className={`group relative overflow-hidden bg-ink-50 ${
                i === 0
                  ? "col-span-2 md:row-span-2 aspect-[16/9] md:aspect-auto"
                  : i === study.stills.length - 1 && study.stills.length % 2 === 0
                    ? "col-span-2 md:col-span-1 aspect-[16/9] md:aspect-[4/3]"
                    : "aspect-[4/3]"
              }`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes={i === 0 ? "(max-width:768px) 100vw, 66vw" : "(max-width:768px) 50vw, 33vw"}
                quality={80}
                className="object-cover grayscale contrast-[1.08] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <figcaption className="absolute bottom-0 inset-x-0 flex justify-between items-end gap-3 p-3 md:p-4 bg-gradient-to-t from-ink/85 to-transparent">
                <span className="font-sans text-[10px] md:text-xs text-white/90 uppercase tracking-widest">{s.caption}</span>
                <span className="font-mono text-[10px] text-cream/60 tabular-nums">FR {String(i + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Vertical cut-downs */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 md:mb-20">
          <div className="lg:col-span-5">
            <h3 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.02em] text-[clamp(1.2rem,2.4vw,1.8rem)] mb-4">
              Cut for every feed
            </h3>
            <p className="font-sans text-cream/70 text-base leading-relaxed mb-6">{study.verticalsText}</p>
            <ul className="space-y-4">
              {study.forYou.map((point, i) => (
                <li key={point} className="flex gap-4 items-start">
                  <span className="font-mono text-xs text-cream/50 pt-1 tabular-nums flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-sans text-cream/75 text-sm leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-6 max-w-xl lg:ml-auto w-full">
            {study.verticals.map((v) => (
              <figure key={v.src}>
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={v.poster}
                  className="w-full aspect-[9/16] bg-ink-50 object-cover"
                  aria-label={v.title}
                >
                  <source src={v.src} type="video/mp4" />
                  <a href={v.src}>Watch {v.title}</a>
                </video>
                <figcaption className="mt-3">
                  <span className="font-heading font-bold text-sm text-white block">{v.title}</span>
                  <span className="font-sans text-xs text-cream/55">{v.meta}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* One action, one alternative */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={waLink(`Source: ${siteUrl}/services/${slug}#case-study\n${study.cta.whatsappMessage}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="group btn-primary"
          >
            {study.cta.button}
            <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href={study.cta.watchHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading font-semibold text-sm text-cream/80 underline underline-offset-[6px] decoration-white/25 hover:decoration-white hover:text-white"
          >
            {study.cta.watchLabel}
          </a>
        </div>
        <p className="font-sans text-xs text-cream/55 mt-6 max-w-2xl">{study.disclosure}</p>
      </div>
    </section>
  );
}
