import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import Services from "@/components/Services";
import Work from "@/components/Work";
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
        <Work />
        <VideoReel />
        <About />
        <Testimonials />
        <FAQ />

        {/* Hidden SEO block — visible to crawlers, invisible to visitors */}
        <section aria-hidden className="sr-only">
          <h2>Media and Marketing Agency in Nairobi, Kenya — Nataka Inc</h2>
          <p>Nataka Inc is a leading media and marketing company based in Nairobi, Kenya. Full-service creative and production agency — brand strategy, digital marketing, video production, photography, motion graphics, public relations, influencer marketing, and campaign management.</p>
          <h3>Video Production Company in Kenya</h3>
          <p>As one of Kenya's top video production companies, Nataka Inc produces high-quality corporate videos, campaign films, TV commercials, music videos, and social media content for brands in Nairobi and across East Africa.</p>
          <h3>Contact Nataka Inc — Marketing Agency Nairobi</h3>
          <p>Email: niajekoki@gmail.com. Phone: +254 725 107 294. Nairobi, Kenya.</p>
        </section>

        <Contact />
        <Footer />
      </main>
    </>
  );
}
