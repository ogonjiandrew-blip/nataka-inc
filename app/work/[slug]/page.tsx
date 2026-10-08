import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Play } from "@phosphor-icons/react/dist/ssr";
import { getCaseStudyBySlug, getAllCaseStudies } from "@/lib/caseStudies";
import { waLink, PHONE_DISPLAY, PHONE_HREF } from "@/lib/whatsapp";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Statement from "@/components/Statement";
import FilmEmbed from "@/components/FilmEmbed";

const siteUrl = "https://www.natakainc.com";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) return {};
  return {
    title: { absolute: study.metaTitle },
    description: study.metaDescription,
    alternates: { canonical: `${siteUrl}/work/${study.slug}` },
    openGraph: {
      title: study.metaTitle,
      description: study.metaDescription,
      url: `${siteUrl}/work/${study.slug}`,
      images: [{ url: `${siteUrl}${study.heroImage}` }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: study.metaTitle,
      description: study.metaDescription,
      images: [`${siteUrl}${study.heroImage}`],
    },
  };
}

/** Extract a YouTube video id from a watch/share URL, if present. */
function youTubeId(url?: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:v=|youtu\.be\/|\/embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export default function CaseStudyPage({ params }: Props) {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) notFound();

  const others = getAllCaseStudies().filter((c) => c.slug !== study.slug);

  const ytId = youTubeId(study.watchUrl);
  const workName = study.title === study.client ? study.title : `${study.title} by ${study.client}`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "CreativeWork",
      "@id": `${siteUrl}/work/${study.slug}#work`,
      name: workName,
      description: study.metaDescription,
      // references the single site-wide org entity from app/layout.tsx
      creator: { "@id": `${siteUrl}/#org` },
      url: `${siteUrl}/work/${study.slug}`,
      image: `${siteUrl}${study.heroImage}`,
      dateCreated: study.year,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Gallery", item: `${siteUrl}/gallery` },
        { "@type": "ListItem", position: 3, name: study.title, item: `${siteUrl}/work/${study.slug}` },
      ],
    },
  ];

  // Register the film with Google Video search when it's on YouTube.
  if (ytId) {
    graph.push({
      "@type": "VideoObject",
      name: `${workName} (Official Music Video)`,
      description: study.metaDescription,
      thumbnailUrl: [
        `${siteUrl}${study.heroImage}`,
        `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg`,
      ],
      uploadDate: `${study.year}-01-01T00:00:00+03:00`,
      embedUrl: `https://www.youtube.com/embed/${ytId}`,
      contentUrl: study.watchUrl,
      publisher: {
        "@type": "Organization",
        name: "Nataka Inc",
        logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
      },
      author: { "@id": `${siteUrl}/#org` },
    });
  }

  const schema = { "@context": "https://schema.org", "@graph": graph };

  // The film itself leads when it is on YouTube; otherwise the first still does
  const feature = ytId ? null : study.gallery[0];
  const stills = ytId ? study.gallery : study.gallery.slice(1);
  const pair = stills.slice(0, 2);
  const more = stills.slice(2);
  const lastWide = more.length % 2 === 1;
  const enquiry = waLink(
    `Source: natakainc.com/work/${study.slug}\nHi Nataka, I saw ${study.title} and I'd like something similar. My company, the goal and our target date: `,
  );

  return (
    <main id="main-content" className="min-h-screen text-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />

      {/* Hero: the key frame in a rounded screen, lit from behind */}
      <section className="relative isolate px-2.5 pt-2.5 md:px-4 md:pt-4">
        <div aria-hidden="true" className="pointer-events-none absolute -inset-x-[10%] -top-[10%] -bottom-[30%] -z-10 bg-[radial-gradient(55%_45%_at_50%_62%,rgb(var(--c-ember)/0.62),rgb(var(--c-ember)/0.18)_45%,transparent_72%)]" />
        <div className="relative isolate flex min-h-[86vh] md:min-h-[92vh] flex-col justify-end overflow-hidden rounded-[22px] md:rounded-[32px] ring-1 ring-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
          <Image
            src={study.heroImage}
            alt={`${study.title} by ${study.client}, directed by Nataka Inc`}
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-ink/15" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink via-ink/60 to-transparent" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />
          <div aria-hidden="true" className="halftone absolute inset-0 opacity-[0.14] [mask-image:radial-gradient(70%_80%_at_0%_100%,black,transparent_70%)]" />

          <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-14 md:pb-20">
            <nav
              aria-label="Breadcrumb"
              className="hero-rise mb-6 md:mb-8 flex flex-wrap items-center font-sans font-medium text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-cream/70"
            >
              <Link href="/#work" className="hover:text-white transition-colors">
                Work
              </Link>
              <span aria-hidden="true" className="mx-3 text-cream/35">
                /
              </span>
              <span>{study.client}</span>
            </nav>

            <h1
              className="hero-wipe font-heading font-extrabold uppercase stretch-wide leading-[0.92] tracking-[-0.03em] text-white text-[clamp(2.6rem,10vw,9rem)]"
              style={{ animationDelay: "120ms" }}
            >
              {study.title}
              <span className="text-signal">.</span>
            </h1>

            <div
              className="hero-rise mt-7 md:mt-9 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
              style={{ animationDelay: "600ms" }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-cream/70">
                {study.category}
                <span aria-hidden="true" className="mx-3 text-signal">
                  /
                </span>
                {study.year}
              </p>
              {ytId && (
                <a href="#film" className="btn-ghost self-start">
                  <Play size={13} weight="fill" />
                  Watch the film
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Summary, lit word by word */}
      <Statement text={study.summary} size="md" label={`About ${study.title}`} />

      {/* Credits */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <dl className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8 border-t border-white/10 pt-8">
          {study.facts.map((f) => (
            <div key={f.label}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-cream/45">{f.label}</dt>
              <dd className="mt-2 font-sans text-sm md:text-base text-white leading-snug">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* The film, or the frame that sums it up */}
      <section id="film" className="scroll-mt-28 px-6 md:px-12 pt-20 md:pt-28 max-w-7xl mx-auto">
        <Reveal>
          {ytId ? (
            <FilmEmbed youTubeId={ytId} poster={study.heroImage} title={`${study.title} by ${study.client}`} />
          ) : (
            feature && (
              <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[22px] md:rounded-[28px] ring-1 ring-white/10">
                <Image
                  src={feature}
                  alt={`${study.title}, still from the film`}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  quality={88}
                  className="object-cover"
                />
              </div>
            )
          )}
        </Reveal>
      </section>

      {/* The brief */}
      <section className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-16">
        <Reveal className="lg:col-span-4">
          <span className="font-mono text-xs text-cream/50 tabular-nums">01</span>
          <h2 className={H2}>
            The brief<span className="text-signal">.</span>
          </h2>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={0.06}>
          <p className="font-sans text-cream/80 text-lg md:text-xl leading-relaxed max-w-[60ch]">{study.challenge}</p>
        </Reveal>
      </section>

      {pair.length === 2 && (
        <section className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {pair.map((src, i) => (
            <Reveal key={src} delay={i * 0.06}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] ring-1 ring-white/10">
                <Image
                  src={src}
                  alt={`${study.title}, still from the film`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={86}
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </section>
      )}

      {/* The approach */}
      <section className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
        <Reveal className="mb-12 md:mb-16">
          <span className="font-mono text-xs text-cream/50 tabular-nums">02</span>
          <h2 className={H2}>
            The approach<span className="text-signal">.</span>
          </h2>
        </Reveal>
        <ol className="border-t border-white/10">
          {study.approach.map((step, i) => (
            <li key={i} className="grid grid-cols-12 gap-x-6 gap-y-3 py-7 md:py-9 border-b border-white/10">
              <span className="col-span-12 md:col-span-1 font-mono text-xs text-cream/50 md:pt-1.5 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="col-span-12 md:col-span-10 md:col-start-3 font-sans text-cream/80 text-base md:text-lg leading-relaxed">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {more.length > 0 && (
        <section className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {more.map((src, i) => {
            const wide = lastWide && i === more.length - 1;
            return (
              <Reveal key={src} delay={(i % 2) * 0.06} className={wide ? "md:col-span-2" : undefined}>
                <div
                  className={`relative overflow-hidden rounded-[20px] ring-1 ring-white/10 ${
                    wide ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-video"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${study.title}, still from the film`}
                    fill
                    sizes={wide ? "(max-width: 1280px) 100vw, 1200px" : "(max-width: 768px) 100vw, 50vw"}
                    quality={86}
                    className="object-cover"
                  />
                </div>
              </Reveal>
            );
          })}
        </section>
      )}

      {/* The result */}
      <section className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-16">
        <Reveal className="lg:col-span-4">
          <span className="font-mono text-xs text-cream/50 tabular-nums">03</span>
          <h2 className={H2}>
            The result<span className="text-signal">.</span>
          </h2>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={0.06}>
          <p className="font-sans text-white text-lg md:text-2xl leading-relaxed max-w-[56ch]">{study.result}</p>
          {study.watchUrl && (
            <a
              href={study.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 inline-flex items-center gap-2 font-heading font-bold text-[11px] uppercase tracking-[0.16em] text-white"
            >
              {study.watchLabel ?? "Watch the film"}
              <ArrowUpRight
                size={14}
                weight="bold"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          )}
        </Reveal>
      </section>

      {/* Closing call to action, in the lit room */}
      <section className="relative isolate overflow-hidden border-t border-white/8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_15%_100%,rgb(var(--c-ember)/0.5),rgb(var(--c-ember)/0.12)_50%,transparent_75%)]" />
        <div aria-hidden="true" className="halftone absolute inset-0 -z-10 opacity-[0.09] [mask-image:radial-gradient(60%_80%_at_100%_0%,black,transparent_75%)]" />
        <div className="px-6 md:px-12 py-24 md:py-36 max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.96] text-[clamp(2.1rem,5.6vw,5.2rem)] max-w-[16ch] [text-wrap:balance]">
              Want a film <span className="text-accent-dark">like this</span>
              <span className="text-signal">.</span>
            </h2>
            <p className="mt-6 font-sans text-cream/70 text-base md:text-lg leading-relaxed max-w-[52ch]">
              Tell us what you have in mind, who it is for and when you need it. We reply with the scope that fits.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <a href={enquiry} target="_blank" rel="noopener noreferrer" className="group btn-primary">
                Start a project
                <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href={PHONE_HREF} className="font-sans text-sm text-cream/60 hover:text-white transition-colors tabular-nums">
                {PHONE_DISPLAY}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* More work */}
      <section className="border-t border-white/8">
        <div className="px-6 md:px-12 py-24 md:py-28 max-w-7xl mx-auto">
          <Reveal className="mb-10 md:mb-12 flex items-end justify-between gap-6">
            <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.02em] leading-[1] text-[clamp(1.5rem,3vw,2.4rem)]">
              More work
            </h2>
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 font-heading font-bold text-[11px] uppercase tracking-[0.16em] text-white"
            >
              All work
              <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
            {others.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.06}>
                <Link href={`/work/${c.slug}`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] ring-1 ring-white/10 bg-ink-50 transition-[box-shadow] duration-500 group-hover:ring-signal/50">
                    <Image
                      src={c.heroImage}
                      alt={`${c.title} by ${c.client}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={82}
                      className="object-cover scale-[1.02] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-6 px-1 pt-4">
                    <div>
                      <h3 className="font-heading font-bold stretch-semi text-lg md:text-xl text-white tracking-tight leading-tight">
                        {c.title}
                      </h3>
                      <p className="mt-1.5 font-sans text-sm text-cream/55">{c.category}</p>
                    </div>
                    <span className="mt-1 shrink-0 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-cream/60 group-hover:text-signal transition-colors">
                      Case study
                      <ArrowUpRight size={12} weight="bold" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/** Section titles: the same extended uppercase cut as the rest of the site. */
const H2 =
  "mt-3 font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.95] text-[clamp(1.85rem,4.4vw,3.8rem)]";
