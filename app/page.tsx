import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Credits from "@/components/Credits";
import Statement from "@/components/Statement";
import Work from "@/components/Work";
import AiBandFeature from "@/components/AiBandFeature";
import Services from "@/components/Services";
import About from "@/components/About";
import Engagements from "@/components/Engagements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
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

      {/* Skip to content: keyboard / screen reader navigation */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <main id="main-content" className="bg-ink text-cream min-h-screen">
        <Navbar />
        <Hero />
        <Credits />
        <Statement />
        <Work />
        <AiBandFeature />
        <Services />
        <About />
        <Engagements />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
