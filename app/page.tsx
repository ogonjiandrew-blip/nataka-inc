import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import Services from "@/components/Services";
import BuyerPaths from "@/components/BuyerPaths";
import ServiceFinder from "@/components/ServiceFinder";
import Work from "@/components/Work";
import Packages from "@/components/Packages";
import VideoReel from "@/components/VideoReel";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import SEOStructuredData from "@/components/SEOStructuredData";
import type { Metadata } from "next";

const siteUrl = "https://www.natakainc.com";

// The homepage is the only page that should canonicalise to the site root.
// (Root layout no longer sets a canonical — see the note there.)
export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
    languages: { "en-KE": siteUrl },
  },
};

export default function Home() {
  return (
    <>
      <SEOStructuredData />

      {/* Skip to content — keyboard / screen reader navigation */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <main id="main-content" className="bg-ink text-cream min-h-screen">
        <Cursor />
        <Navbar />
        <Hero />
        <MarqueeBanner />
        <Services />
        <BuyerPaths />
        <ServiceFinder />
        <Work />
        <Packages />
        <VideoReel />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
