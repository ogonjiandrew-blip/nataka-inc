import Image from "next/image";
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
      className="border-y border-white/8 bg-gradient-to-b from-white/[0.02] to-transparent py-16 md:py-24 mb-16 md:mb-24"
    >
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <p className="font-sans text-[10px] text-accent tracking-widest uppercase mb-4">{study.eyebrow}</p>
        <h2 id="case-study-title" className="leading-[0.95] mb-6">
          <span className="font-heading font-black text-[clamp(1.9rem,5vw,4rem)] text-white uppercase block">
            {study.title}
          </span>
          <span className="font-heading font-black text-[clamp(1.9rem,5vw,4rem)] text-accent uppercase block">
            {study.titleAccent}
          </span>
        </h2>
        <p className="font-sans text-cream/75 text-base md:text-lg leading-relaxed max-w-3xl mb-12">{study.lede}</p>

        {/* Loop + numbers */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 md:mb-20">
          <figure className="lg:col-span-8">
            <div className="relative aspect-[4/3] bg-black overflow-hidden">
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
              <span className="absolute top-4 left-4 font-sans text-[10px] tracking-widest uppercase text-white/85 bg-ink/60 px-3 py-1.5">
                {study.loop.tag}
              </span>
            </div>
            <figcaption className="font-sans text-xs text-cream/45 mt-3">{study.loop.caption}</figcaption>
          </figure>

          <dl className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-8 lg:pt-2">
            {study.stats.map((s) => (
              <div key={s.label} className="border-t border-white/10 pt-5">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="font-heading font-black text-[clamp(2.2rem,4.5vw,3.4rem)] text-white leading-none block tabular-nums">
                    {s.value}
                  </span>
                  <span className="font-sans text-xs text-cream/55 uppercase tracking-widest mt-2 block">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Contact sheet: monochrome until you look at a frame */}
        <h3 className="font-heading font-black text-[clamp(1.2rem,2.6vw,1.9rem)] text-white uppercase mb-6">
          The <span className="text-accent">contact sheet</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-16 md:mb-20">
          {study.stills.map((s, i) => (
            <figure
              key={s.src}
              className={`group relative overflow-hidden bg-black ${
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
                <span className="font-sans text-[10px] text-accent tabular-nums tracking-widest">FR {String(i + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Vertical cut-downs */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 md:mb-20">
          <div className="lg:col-span-5">
            <h3 className="font-heading font-black text-[clamp(1.2rem,2.6vw,1.9rem)] text-white uppercase mb-4">
              Cut for <span className="text-accent">every feed</span>
            </h3>
            <p className="font-sans text-cream/70 text-base leading-relaxed mb-6">{study.verticalsText}</p>
            <ul className="space-y-4">
              {study.forYou.map((point, i) => (
                <li key={point} className="flex gap-4 items-start">
                  <span className="font-heading font-black text-accent/60 text-sm pt-0.5 tabular-nums flex-shrink-0">
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
                  className="w-full aspect-[9/16] bg-black object-cover"
                  aria-label={v.title}
                >
                  <source src={v.src} type="video/mp4" />
                  <a href={v.src}>Watch {v.title}</a>
                </video>
                <figcaption className="mt-3">
                  <span className="font-heading font-bold text-sm text-white block">{v.title}</span>
                  <span className="font-sans text-[10px] text-accent uppercase tracking-widest">{v.meta}</span>
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
            className="inline-block bg-accent text-ink font-heading font-black uppercase text-xs tracking-widest px-8 py-5 hover:bg-accent-light transition-colors"
          >
            {study.cta.button} →
          </a>
          <a
            href={study.cta.watchHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm text-accent underline underline-offset-4"
          >
            {study.cta.watchLabel}
          </a>
        </div>
        <p className="font-sans text-xs text-cream/40 mt-6 max-w-2xl">{study.disclosure}</p>
      </div>
    </section>
  );
}
