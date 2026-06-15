import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCaseStudyBySlug, getAllCaseStudies } from "@/lib/caseStudies";

const siteUrl = "https://www.natakainc.com";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) return {};
  return {
    title: study.metaTitle,
    description: study.metaDescription,
    alternates: { canonical: `${siteUrl}/work/${study.slug}` },
    openGraph: {
      title: study.metaTitle,
      description: study.metaDescription,
      url: `${siteUrl}/work/${study.slug}`,
      images: [{ url: `${siteUrl}${study.heroImage}` }],
      type: "article",
    },
  };
}

export default function CaseStudyPage({ params }: Props) {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) notFound();

  const others = getAllCaseStudies().filter((c) => c.slug !== study.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${study.title} — ${study.client}`,
    description: study.metaDescription,
    creator: { "@type": "Organization", name: "Nataka Inc", "@id": `${siteUrl}/#business` },
    url: `${siteUrl}/work/${study.slug}`,
    image: `${siteUrl}${study.heroImage}`,
    dateCreated: study.year,
  };

  return (
    <main className="min-h-screen bg-ink text-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <div className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <Image
          src={study.heroImage}
          alt={`${study.title} by ${study.client} — directed by Nataka Inc`}
          fill
          className="object-cover"
          sizes="100vw"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />

        <div className="absolute top-8 left-6 md:left-12 z-10">
          <Link
            href="/gallery"
            className="font-sans text-white/55 text-xs tracking-widest uppercase hover:text-teal transition-colors"
          >
            ← Gallery
          </Link>
        </div>

        <div className="absolute bottom-0 inset-x-0 px-6 md:px-12 pb-14 max-w-7xl mx-auto">
          <p className="font-mono text-[11px] text-teal tracking-widest uppercase mb-4">
            {study.category} · {study.year}
          </p>
          <p className="font-sans text-white/60 text-sm tracking-widest uppercase mb-2">{study.client}</p>
          <h1 className="font-geist font-black text-[clamp(2.8rem,10vw,7rem)] text-white uppercase leading-none">
            {study.title}
          </h1>
        </div>
      </div>

      {/* Summary + facts */}
      <div className="px-6 md:px-12 py-16 md:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-12 md:gap-20">
          <p className="font-sans text-cream/85 text-xl md:text-2xl leading-relaxed">
            {study.summary}
          </p>
          <div className="space-y-px self-start">
            {study.facts.map((f) => (
              <div key={f.label} className="flex justify-between py-3 border-b border-white/10">
                <span className="font-mono text-[11px] text-white/40 tracking-widest uppercase">{f.label}</span>
                <span className="font-sans text-sm text-cream/80 text-right">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* First gallery image — full bleed */}
      {study.gallery[0] && (
        <div className="relative aspect-[21/9] mb-16 md:mb-24">
          <Image src={study.gallery[0]} alt={study.title} fill className="object-cover" sizes="100vw" quality={90} />
        </div>
      )}

      {/* Challenge */}
      <div className="px-6 md:px-12 pb-16 md:pb-24 max-w-4xl mx-auto">
        <h2 className="font-mono text-[11px] text-teal tracking-widest uppercase mb-6">01 — The Challenge</h2>
        <p className="font-sans text-cream/75 text-lg leading-relaxed">{study.challenge}</p>
      </div>

      {/* Two gallery images side by side */}
      {study.gallery.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 md:px-12 pb-16 md:pb-24 max-w-7xl mx-auto">
          {study.gallery.slice(1, 3).map((src) => (
            <div key={src} className="relative aspect-[4/5] overflow-hidden">
              <Image src={src} alt={study.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" quality={88} />
            </div>
          ))}
        </div>
      )}

      {/* Approach */}
      <div className="px-6 md:px-12 pb-16 md:pb-24 max-w-4xl mx-auto">
        <h2 className="font-mono text-[11px] text-teal tracking-widest uppercase mb-8">02 — The Approach</h2>
        <ul className="space-y-6">
          {study.approach.map((step, i) => (
            <li key={i} className="flex gap-5 items-start">
              <span className="font-geist font-black text-teal/50 text-sm pt-1 tabular-nums flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-sans text-cream/75 text-lg leading-relaxed">{step}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Remaining gallery images */}
      {study.gallery.length > 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 md:px-12 pb-16 md:pb-24 max-w-7xl mx-auto">
          {study.gallery.slice(3).map((src) => (
            <div key={src} className="relative aspect-video overflow-hidden">
              <Image src={src} alt={study.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" quality={88} />
            </div>
          ))}
        </div>
      )}

      {/* Result */}
      <div className="px-6 md:px-12 pb-16 md:pb-20 max-w-4xl mx-auto">
        <h2 className="font-mono text-[11px] text-teal tracking-widest uppercase mb-6">03 — The Result</h2>
        <p className="font-sans text-cream/85 text-xl leading-relaxed mb-10">{study.result}</p>

        {study.watchUrl && (
          <a
            href={study.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-geist font-black text-sm text-ink bg-teal px-8 py-4 uppercase tracking-widest hover:bg-teal-light transition-colors"
          >
            ▶ {study.watchLabel ?? "Watch the film"}
          </a>
        )}
      </div>

      {/* CTA */}
      <div className="px-6 md:px-12 pb-16 md:pb-24 max-w-7xl mx-auto">
        <div className="border border-teal/30 bg-teal/[0.04] p-10 md:p-16 text-center">
          <h2 className="font-geist font-black text-[clamp(1.6rem,4vw,3rem)] text-white uppercase leading-tight mb-4">
            Have a project like this?
          </h2>
          <p className="font-sans text-cream/60 text-base mb-8 max-w-xl mx-auto">
            Whether you&apos;re an artist, a brand, or somewhere in between — let&apos;s build something worth remembering.
          </p>
          <Link
            href="/#contact"
            className="inline-block font-geist font-black text-sm text-ink bg-teal px-10 py-5 uppercase tracking-widest hover:bg-teal-light transition-colors duration-200"
          >
            Start a Project
          </Link>
        </div>
      </div>

      {/* Other work */}
      <div className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <div className="h-px bg-white/8 mb-10" />
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-mono text-[11px] text-white/40 tracking-widest uppercase">Explore</span>
          <Link href="/gallery" className="font-sans text-xs text-teal tracking-widest uppercase border border-teal/30 px-5 py-3 hover:bg-teal hover:text-ink transition-colors">
            Full Gallery
          </Link>
          {others.map((c) => (
            <Link key={c.slug} href={`/work/${c.slug}`} className="font-sans text-xs text-teal tracking-widest uppercase border border-teal/30 px-5 py-3 hover:bg-teal hover:text-ink transition-colors">
              {c.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
