import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getAllServices } from "@/lib/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ServiceIndex from "@/components/ServiceIndex";

const siteUrl = "https://www.natakainc.com";
const title = "Services: Video, Film, AI Video and Marketing in Kenya | Nataka Inc";
const description =
  "Nataka Inc's services: video production, brand films, commercials, music videos, AI video, brand strategy, digital, social, influencer and event marketing across Nairobi and Kenya.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: { title, description, url: `${siteUrl}/services`, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function ServicesIndex() {
  const items = getAllServices().map((s) => ({
    title: s.label,
    line: s.heroSummary ?? s.metaDescription,
    href: `/services/${s.slug}`,
    image: s.heroImage,
    alt: `${s.label} by Nataka Inc`,
  }));

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen text-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Navbar />

      <ServiceIndex
        as="h1"
        title="Services"
        note="Strategy, film and distribution under one roof. Every engagement is scoped to your brief before we shoot."
        items={items}
        className="pt-36 md:pt-48 pb-24 md:pb-32"
      />

      <section className="border-t border-white/8">
        <div className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.96] text-[clamp(2.1rem,5.6vw,5.2rem)] max-w-[16ch]">
              Not sure where to start?
            </h2>
            <p className="mt-6 font-sans text-cream/70 text-base md:text-lg leading-relaxed max-w-[52ch]">
              Pick your goal and we recommend the package, the deliverables and a typical budget. Or build a free
              campaign brief first and talk it through with us.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <Link
                href="/work-with-us"
                className="group btn-primary"
              >
                Find your package
                <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/campaign-brief"
                className="font-heading font-semibold text-sm text-cream/80 underline underline-offset-[6px] decoration-white/25 hover:decoration-white hover:text-white"
              >
                Build a free campaign brief
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
