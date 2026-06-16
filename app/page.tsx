import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import Services from "@/components/Services";
import BuyerPaths from "@/components/BuyerPaths";
import Work from "@/components/Work";
import Packages from "@/components/Packages";
import VideoReel from "@/components/VideoReel";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import SEOStructuredData from "@/components/SEOStructuredData";

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
