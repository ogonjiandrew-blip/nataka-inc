import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getServiceBySlug, getAllServices } from "@/lib/services";
import { getPostBySlug } from "@/lib/posts";

const siteUrl = "https://www.natakainc.com";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
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
  };
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const related = service.relatedPosts
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const otherServices = getAllServices().filter((s) => s.slug !== service.slug);

  // Service + FAQ structured data, scoped to this page
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.label,
        description: service.metaDescription,
        provider: {
          "@type": "LocalBusiness",
          name: "Nataka Inc",
          "@id": `${siteUrl}/#business`,
        },
        areaServed: { "@type": "Country", name: "Kenya" },
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
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: service.label, item: `${siteUrl}/services/${service.slug}` },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-ink text-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src={service.heroImage}
          alt={`${service.label} by Nataka Inc — Nairobi, Kenya`}
          fill
          className="object-cover"
          sizes="100vw"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />

        <div className="absolute top-8 left-6 md:left-12 z-10">
          <Link
            href="/"
            className="font-sans text-white/55 text-xs tracking-widest uppercase hover:text-teal transition-colors"
          >
            ← Nataka Inc
          </Link>
        </div>

        <div className="absolute bottom-0 inset-x-0 px-6 md:px-12 pb-14 max-w-7xl mx-auto">
          <p className="font-sans text-[10px] text-teal tracking-widest uppercase mb-4">
            {service.label} · Nairobi, Kenya
          </p>
          <h1 className="leading-none">
            <span className="font-geist font-black text-[clamp(2.2rem,7vw,5.5rem)] text-white uppercase block">
              {service.headline}
            </span>
            <span className="font-display font-semibold italic text-[clamp(2.2rem,7vw,5.5rem)] text-teal block">
              {service.headlineAccent}
            </span>
          </h1>
        </div>
      </div>

      {/* Intro */}
      <div className="px-6 md:px-12 py-16 md:py-20 max-w-4xl mx-auto">
        <p className="font-sans text-cream/80 text-lg md:text-xl leading-relaxed border-l-2 border-teal pl-6">
          {service.intro}
        </p>
      </div>

      {/* Deliverables */}
      <div className="px-6 md:px-12 pb-16 md:pb-24 max-w-7xl mx-auto">
        <h2 className="font-geist font-black text-[clamp(1.5rem,3.5vw,2.5rem)] text-white uppercase mb-10">
          What We <span className="text-teal">Deliver</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8">
          {service.deliverables.map((d) => (
            <div key={d.title} className="bg-ink p-8 hover:bg-white/[0.02] transition-colors duration-300">
              <h3 className="font-geist font-black text-lg text-white uppercase mb-3">
                {d.title}
              </h3>
              <p className="font-sans text-cream/60 text-sm leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Nataka */}
      <div className="px-6 md:px-12 pb-16 md:pb-24 max-w-7xl mx-auto">
        <h2 className="font-geist font-black text-[clamp(1.5rem,3.5vw,2.5rem)] text-white uppercase mb-10">
          Why <span className="text-teal">Nataka</span>
        </h2>
        <ul className="space-y-5 max-w-3xl">
          {service.whyUs.map((reason, i) => (
            <li key={i} className="flex gap-5 items-start">
              <span className="font-geist font-black text-teal/60 text-sm pt-0.5 tabular-nums flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-sans text-cream/75 text-base leading-relaxed">{reason}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Process */}
      <div className="px-6 md:px-12 pb-16 md:pb-24 max-w-7xl mx-auto">
        <h2 className="font-geist font-black text-[clamp(1.5rem,3.5vw,2.5rem)] text-white uppercase mb-10">
          The <span className="text-teal">Process</span>
        </h2>
        <div className="divide-y divide-white/8 border-t border-b border-white/8">
          {service.process.map((p) => (
            <div key={p.step} className="grid grid-cols-[56px_1fr] md:grid-cols-[80px_280px_1fr] gap-4 md:gap-8 py-7 items-baseline">
              <span className="font-geist font-black text-sm text-teal/50 tabular-nums">{p.step}</span>
              <h3 className="font-geist font-black text-xl text-white uppercase">{p.title}</h3>
              <p className="font-sans text-cream/60 text-sm leading-relaxed col-span-2 md:col-span-1 col-start-2 md:col-start-auto">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="px-6 md:px-12 pb-16 md:pb-24 max-w-4xl mx-auto">
        <h2 className="font-geist font-black text-[clamp(1.5rem,3.5vw,2.5rem)] text-white uppercase mb-10">
          Common <span className="text-teal">Questions</span>
        </h2>
        <div className="space-y-10">
          {service.faqs.map((f) => (
            <div key={f.question}>
              <h3 className="font-geist font-bold text-lg text-white mb-3">{f.question}</h3>
              <p className="font-sans text-cream/60 text-base leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 md:px-12 pb-16 md:pb-24 max-w-7xl mx-auto">
        <div className="border border-teal/30 bg-teal/[0.04] p-10 md:p-16 text-center">
          <h2 className="font-geist font-black text-[clamp(1.6rem,4vw,3rem)] text-white uppercase leading-tight mb-4">
            Ready To Start?
          </h2>
          <p className="font-sans text-cream/60 text-base mb-8 max-w-xl mx-auto">
            Tell us about your project. We&apos;ll come back with a clear plan and an honest quote.
          </p>
          <Link
            href="/#contact"
            className="inline-block font-geist font-black text-sm text-ink bg-teal px-10 py-5 uppercase tracking-widest hover:bg-teal-light transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <div className="px-6 md:px-12 pb-16 max-w-7xl mx-auto">
          <h2 className="font-geist font-black text-xl text-white uppercase mb-8">
            From Our <span className="text-teal">Insights</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-50 mb-4">
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/20 transition-colors duration-300" />
                </div>
                <span className="font-sans text-[9px] text-teal tracking-widest uppercase font-medium block mb-1">
                  {p.category}
                </span>
                <h3 className="font-geist font-black text-base text-white uppercase leading-tight group-hover:text-teal transition-colors duration-200">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Other services */}
      <div className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <div className="h-px bg-white/8 mb-10" />
        <h2 className="font-geist font-black text-xl text-white uppercase mb-8">
          More <span className="text-teal">Services</span>
        </h2>
        <div className="flex flex-wrap gap-3">
          {otherServices.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="font-sans text-xs text-teal tracking-widest uppercase border border-teal/30 px-5 py-3 hover:bg-teal hover:text-ink transition-colors duration-200"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
