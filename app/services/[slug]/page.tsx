import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getServiceBySlug, getAllServices, type ServicePage as Service } from "@/lib/services";
import { getPostBySlug } from "@/lib/posts";
import { waLink, PHONE_DISPLAY, PHONE_HREF } from "@/lib/whatsapp";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoopVideo from "@/components/LoopVideo";
import Reveal from "@/components/Reveal";
import Statement from "@/components/Statement";
import AiCaseStudy from "@/components/services/AiCaseStudy";
import WorkStrip from "@/components/services/WorkStrip";

const siteUrl = "https://www.natakainc.com";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    // absolute bypasses the root title template; metaTitle already ends in "| Nataka Inc"
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `${siteUrl}/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${siteUrl}/services/${service.slug}`,
      images: [{ url: `${siteUrl}${service.heroImage}` }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [`${siteUrl}${service.heroImage}`],
    },
  };
}

/** Section titles: the same extended uppercase cut as the homepage. */
const H2 =
  "font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.95] text-[clamp(1.85rem,5vw,4.4rem)]";

/** Ends a headline on the signal-red full stop when it has one. */
function Stop({ text }: { text: string }) {
  if (!text.endsWith(".")) return <>{text}</>;
  return (
    <>
      {text.slice(0, -1)}
      <span className="text-signal">.</span>
    </>
  );
}

const processCols: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const related = service.relatedPosts
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const more: Service[] = (
    service.relatedServices?.length
      ? service.relatedServices.map((slug) => getServiceBySlug(slug))
      : getAllServices().filter((s) => s.slug !== service.slug)
  )
    .filter((s): s is Service => Boolean(s))
    .slice(0, 8);

  const quote = waLink(
    `Source: ${siteUrl}/services/${service.slug}\n${
      service.cta?.whatsappMessage ??
      `Hi Nataka, I'd like a quote for ${service.label.toLowerCase()}. My company, the goal and our target date: `
    }`,
  );
  const workHref = service.caseStudy ? "#case-study" : service.work?.length ? "#work" : "/#work";

  // Service + FAQ structured data, scoped to this page
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteUrl}/services/${service.slug}#service`,
        name: service.label,
        description: service.metaDescription,
        provider: { "@id": `${siteUrl}/#org` },
        areaServed: [
          { "@type": "City", name: "Nairobi" },
          { "@type": "Country", name: "Kenya" },
        ],
        url: `${siteUrl}/services/${service.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      ...(service.caseStudy
        ? [service.caseStudy.loop, ...service.caseStudy.verticals].map((v, i) => ({
            "@type": "VideoObject",
            "@id": `${siteUrl}/services/${service.slug}#video-${i + 1}`,
            name:
              i === 0
                ? `AANOTHER, ${service.caseStudy!.loop.tag.split("·").pop()!.trim()} (AI music video by Nataka)`
                : `AANOTHER: ${(v as { title: string }).title} (AI Short by Nataka)`,
            description: i === 0 ? service.caseStudy!.loop.caption : service.caseStudy!.verticalsText,
            thumbnailUrl: `${siteUrl}${v.poster}`,
            contentUrl: `${siteUrl}${v.src}`,
            uploadDate: service.caseStudy!.published,
            duration: v.duration,
            publisher: { "@id": `${siteUrl}/#org` },
          }))
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
          { "@type": "ListItem", position: 3, name: service.label, item: `${siteUrl}/services/${service.slug}` },
        ],
      },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen text-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />

      {/* Hero */}
      <section className="relative isolate px-2.5 pt-2.5 md:px-4 md:pt-4">
        <div aria-hidden="true" className="pointer-events-none absolute -inset-x-[10%] -top-[10%] -bottom-[30%] -z-10 bg-[radial-gradient(55%_45%_at_50%_62%,rgb(var(--c-ember)/0.62),rgb(var(--c-ember)/0.18)_45%,transparent_72%)]" />
        <div className="relative isolate flex min-h-[86vh] md:min-h-[90vh] flex-col justify-end overflow-hidden rounded-[22px] md:rounded-[32px] ring-1 ring-white/10">
        <Image
          src={service.heroImage}
          alt={`${service.label} by Nataka Inc, Nairobi, Kenya`}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
        {service.heroVideo && (
          <LoopVideo src={service.heroVideo.src} srcMobile={service.heroVideo.srcMobile} poster={service.heroVideo.poster} />
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-ink/25" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-ink via-ink/70 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />

        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16 md:pb-24">
          <nav
            aria-label="Breadcrumb"
            className="hero-rise mb-6 md:mb-8 flex flex-wrap items-center font-sans font-medium text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-cream/70"
          >
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span aria-hidden="true" className="mx-3 text-cream/35">
              /
            </span>
            <span>{service.label}</span>
          </nav>

          <h1 className="font-heading font-extrabold uppercase stretch-wide leading-[0.95] tracking-[-0.025em] text-[clamp(2rem,5.6vw,5.6rem)] max-w-[20ch] [text-wrap:balance]">
            <span className="hero-wipe block text-white" style={{ animationDelay: "120ms" }}>
              {service.headline}
            </span>
            <span className="hero-wipe block text-accent-dark" style={{ animationDelay: "290ms" }}>
              <Stop text={service.headlineAccent} />
            </span>
          </h1>

          {service.heroSummary && (
            <p
              className="hero-rise mt-7 md:mt-9 font-sans text-cream/80 text-base md:text-lg leading-relaxed max-w-[52ch]"
              style={{ animationDelay: "600ms" }}
            >
              {service.heroSummary}
            </p>
          )}

          <div className="hero-rise mt-9 md:mt-10 flex flex-col sm:flex-row gap-3" style={{ animationDelay: "720ms" }}>
            <a
              href={quote}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-primary"
            >
              Get a quote
              <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href={workHref} className="btn-ghost">
              See the work
            </a>
          </div>

          {service.heroVideo?.label && (
            <p className="hero-rise mt-8 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/45" style={{ animationDelay: "900ms" }}>
              {service.heroVideo.label}
            </p>
          )}
        </div>
        </div>
      </section>

      {/* Intro, lit word by word on scroll */}
      <Statement text={service.intro} size="md" label={`About ${service.label}`} />

      {service.caseStudy && <AiCaseStudy study={service.caseStudy} slug={service.slug} />}
      {service.work && <WorkStrip ids={service.work} />}

      {/* What you get */}
      <section className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
        <Reveal className="mb-12 md:mb-16">
          <h2 className={H2}>What you get</h2>
        </Reveal>
        <ol className="border-t border-white/10">
          {service.deliverables.map((d, i) => (
            <Reveal
              as="li"
              key={d.title}
              delay={Math.min(i, 4) * 0.05}
              className="grid grid-cols-12 gap-x-6 gap-y-3 py-7 md:py-9 border-b border-white/10"
            >
              <span className="col-span-12 md:col-span-1 font-mono text-xs text-cream/50 md:pt-2 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="col-span-12 md:col-span-5 font-heading font-bold uppercase stretch-semi text-white tracking-[-0.01em] leading-tight text-[clamp(1.15rem,2vw,1.6rem)]">
                {d.title}
              </h3>
              <p className="col-span-12 md:col-span-6 font-sans text-cream/65 text-base leading-relaxed">{d.description}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Who it's for (only some services carry this) */}
      {service.audience && (
        <section className="border-y border-white/8 bg-white/[0.025]">
          <div className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
            <Reveal className="mb-12 md:mb-16">
              <h2 className={H2}>Who it&apos;s for</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
              {service.audience.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.06} className="border-t border-white/15 pt-6">
                  <h3 className="font-heading font-bold stretch-semi text-xl text-white tracking-tight">{a.title}</h3>
                  <p className="mt-3 font-sans text-cream/65 leading-relaxed">{a.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Nataka */}
      <section className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.95] text-[clamp(1.85rem,4vw,3.4rem)]">
            Why Nataka<span className="text-signal">.</span>
          </h2>
        </Reveal>
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
          {service.whyUs.map((reason, i) => (
            <Reveal key={i} delay={(i % 2) * 0.06} className="border-t border-white/15 pt-6">
              <span className="font-mono text-xs text-cream/50 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-4 font-heading font-medium text-lg md:text-xl text-white leading-snug tracking-[-0.01em]">
                {reason}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-white/8 bg-white/[0.025]">
        <div className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
          <Reveal className="mb-12 md:mb-16">
            <h2 className={H2}>How it works</h2>
          </Reveal>
          <ol className={`grid grid-cols-1 md:grid-cols-2 ${processCols[service.process.length] ?? "lg:grid-cols-4"} gap-x-8 gap-y-12`}>
            {service.process.map((p, i) => (
              <Reveal as="li" key={p.step} delay={i * 0.06} className="border-t border-white/20 pt-6">
                <span className="font-mono text-xs text-cream/50 tabular-nums">{p.step}</span>
                <h3 className="mt-4 font-heading font-bold uppercase stretch-semi text-white text-lg tracking-tight leading-tight">
                  {p.title}
                </h3>
                <p className="mt-3 font-sans text-sm text-cream/65 leading-relaxed">{p.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Questions: answers stay in the HTML for buyers and search engines */}
      <section className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-12">
        <Reveal className="lg:col-span-12">
          <h2 className={H2}>Questions</h2>
        </Reveal>
        <div className="lg:col-span-8 lg:col-start-5 border-t border-white/10">
          {service.faqs.map((f) => (
            <div key={f.question} className="py-7 md:py-8 border-b border-white/10">
              <h3 className="font-heading font-semibold text-lg md:text-xl text-white tracking-tight leading-snug">{f.question}</h3>
              <p className="mt-3 font-sans text-cream/65 leading-relaxed max-w-[64ch]">{f.answer}</p>
              {f.link && (
                <Link
                  href={f.link.href}
                  className="group mt-4 inline-flex items-center gap-2 font-heading font-bold text-[11px] uppercase tracking-[0.16em] text-white"
                >
                  {f.link.label}
                  <ArrowRight size={13} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Closing call to action */}
      <section className="border-t border-white/8">
        <div className="px-6 md:px-12 py-24 md:py-36 max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.96] text-[clamp(2.1rem,5.6vw,5.2rem)] max-w-[18ch] [text-wrap:balance]">
              <Stop text={service.cta?.headline ?? "Tell us what you need."} />
            </h2>
            <p className="mt-6 font-sans text-cream/70 text-base md:text-lg leading-relaxed max-w-[52ch]">
              {service.cta?.text ??
                "Share your company, the goal, a target date and a working budget. We reply with the scope that fits."}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <a
                href={quote}
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-primary"
              >
                {service.cta?.button ?? "Get a quote"}
                <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link
                href="/work-with-us"
                className="font-heading font-semibold text-sm text-cream/80 underline underline-offset-[6px] decoration-white/25 hover:decoration-white hover:text-white"
              >
                See packages and prices
              </Link>
              <a href={PHONE_HREF} className="font-sans text-sm text-cream/60 hover:text-white transition-colors tabular-nums">
                {PHONE_DISPLAY}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related insights */}
      {related.length > 0 && (
        <section className="border-t border-white/8">
          <div className="px-6 md:px-12 py-24 md:py-28 max-w-7xl mx-auto">
            <Reveal className="mb-10 md:mb-12">
              <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.02em] leading-[1] text-[clamp(1.5rem,3vw,2.4rem)]">
                Insights
              </h2>
            </Reveal>
            <div className={`grid grid-cols-1 gap-x-6 gap-y-10 ${related.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <Link href={`/blog/${p.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] ring-1 ring-white/10 bg-ink-50 transition-[box-shadow] duration-500 group-hover:ring-signal/50">
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={80}
                        className="object-cover scale-[1.02] transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                      />
                    </div>
                    <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">{p.category}</p>
                    <h3 className="mt-2 font-heading font-bold text-lg text-white leading-snug tracking-tight group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More services */}
      <section className="border-t border-white/8">
        <div className="px-6 md:px-12 py-24 md:py-28 max-w-7xl mx-auto">
          <Reveal className="mb-10 md:mb-12 flex items-end justify-between gap-6">
            <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.02em] leading-[1] text-[clamp(1.5rem,3vw,2.4rem)]">
              More services
            </h2>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 font-heading font-bold text-[11px] uppercase tracking-[0.16em] text-white"
            >
              All services
              <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-white/10 md:border-t-0">
            {more.map((s) => (
              <li key={s.slug} className="md:first:border-t md:[&:nth-child(2)]:border-t border-white/10">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between gap-6 py-5 border-b border-white/10"
                >
                  <span className="font-heading font-bold uppercase stretch-semi text-white tracking-tight text-base md:text-lg">
                    {s.label}
                  </span>
                  <ArrowUpRight
                    size={18}
                    weight="bold"
                    aria-hidden="true"
                    className="shrink-0 text-cream/50 transition-[color,transform] duration-300 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
