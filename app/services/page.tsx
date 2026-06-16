import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/services";

const siteUrl = "https://www.natakainc.com";

export const metadata: Metadata = {
  title: "Services — Video, Film & Marketing in Kenya",
  description:
    "Explore Nataka Inc's full range of services — video production, music videos, corporate film, brand strategy, social media, influencer and event marketing across Nairobi and Kenya.",
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: "Services | Nataka Inc — Nairobi Media & Marketing",
    description:
      "Video production, brand films, music videos, corporate video, social, influencer and event marketing across Kenya and East Africa.",
    url: `${siteUrl}/services`,
    type: "website",
  },
};

export default function ServicesIndex() {
  const services = getAllServices();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
    ],
  };

  return (
    <main className="min-h-screen bg-ink text-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero */}
      <section className="px-6 md:px-12 pt-28 md:pt-36 pb-12 md:pb-16 max-w-7xl mx-auto">
        <Link
          href="/"
          className="font-sans text-white/55 text-xs tracking-widest uppercase hover:text-teal transition-colors"
        >
          ← Nataka Inc
        </Link>
        <p className="font-sans text-[10px] text-teal tracking-widest uppercase mt-8 mb-4">
          What We Do · Nairobi, Kenya
        </p>
        <h1 className="leading-none mb-6">
          <span className="font-geist font-black text-[clamp(2.2rem,7vw,5.5rem)] text-white uppercase block">
            Services
          </span>
        </h1>
        <p className="font-sans text-cream/75 text-lg md:text-xl leading-relaxed max-w-2xl">
          Strategy, film and distribution under one roof. Every service below does one thing:
          earn attention and turn it into customers — for brands across Nairobi, Kenya and East Africa.
        </p>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-12 pb-20 md:pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group bg-ink p-8 hover:bg-white/[0.02] transition-colors duration-300 flex flex-col"
            >
              <h2 className="font-geist font-black text-xl text-white uppercase mb-3 group-hover:text-teal transition-colors duration-300">
                {s.label}
              </h2>
              <p className="font-sans text-cream/60 text-sm leading-relaxed flex-1">
                {s.metaDescription}
              </p>
              <span className="inline-block mt-5 font-sans text-[11px] text-teal tracking-widest uppercase border-b border-teal/30 group-hover:border-teal pb-0.5 self-start transition-colors">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <div className="border border-teal/30 bg-teal/[0.04] p-10 md:p-16 text-center">
          <h2 className="font-geist font-black text-[clamp(1.6rem,4vw,3rem)] text-white uppercase leading-tight mb-4">
            Not Sure Where To Start?
          </h2>
          <p className="font-sans text-cream/60 text-base mb-8 max-w-xl mx-auto">
            Tell us your goal. We&apos;ll point you to the right service and an honest plan.
          </p>
          <Link
            href="/#contact"
            className="inline-block font-geist font-black text-sm text-ink bg-teal px-10 py-5 uppercase tracking-widest hover:bg-teal-light transition-colors duration-200"
          >
            Book a Strategy Call
          </Link>
        </div>
      </section>
    </main>
  );
}
