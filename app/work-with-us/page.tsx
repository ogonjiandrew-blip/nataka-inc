import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ServiceFinder from "@/components/ServiceFinder";
import Packages from "@/components/Packages";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const url = "https://www.natakainc.com/work-with-us";
const title = "Video Production and Marketing Prices in Kenya | Nataka Inc";
const description =
  "What campaigns, brand films, social content, music videos and event coverage typically cost with Nataka Inc in Nairobi, Kenya, what each package includes, and how to start.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function WorkWithUsPage() {
  return (
    <main id="main-content" className="bg-ink text-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${url}#page`,
            url,
            name: title,
            description,
            inLanguage: "en-KE",
            publisher: { "@id": "https://www.natakainc.com/#org" },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.natakainc.com" },
                { "@type": "ListItem", position: 2, name: "Work with us", item: url },
              ],
            },
          }),
        }}
      />
      <Navbar />

      <section className="px-6 md:px-12 pt-36 md:pt-48 pb-6 md:pb-10 max-w-7xl mx-auto">
        <p className="font-sans font-medium text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-cream/70 mb-6">
          Pricing and packages
        </p>
        <h1 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.95] text-[clamp(2.4rem,7vw,6rem)]">
          Work with us<span className="text-signal">.</span>
        </h1>
        <p className="mt-6 font-sans text-cream/75 text-base md:text-lg leading-relaxed max-w-[52ch]">
          Typical budgets for campaigns, brand films, monthly content, music videos and events in Kenya. Pick your goal
          below for a recommendation, or go straight to the packages.
        </p>
      </section>

      <ServiceFinder />
      <Packages />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
