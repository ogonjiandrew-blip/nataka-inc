import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import CampaignBrief from "@/components/CampaignBrief";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { waLink } from "@/lib/whatsapp";

const url = "https://www.natakainc.com/campaign-brief";
const title = "Free Marketing Campaign Brief Builder | Nataka Inc Kenya";
const description = "Plan a brand campaign, product launch, social content or corporate film. Build a clear brief with a checklist, budget and timing, then share it with Nataka on WhatsApp.";

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website", images: [{ url: "https://www.natakainc.com/videos/sarit-poster-clean.jpg" }] },
  twitter: { card: "summary_large_image", title, description, images: ["https://www.natakainc.com/videos/sarit-poster-clean.jpg"] },
};

export default function CampaignBriefPage() {
  return (
    <main id="main-content" className="min-h-screen text-cream font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebPage", "@id": `${url}#page`, url,
        name: title, description, inLanguage: "en-KE", publisher: { "@id": "https://www.natakainc.com/#org" },
        breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.natakainc.com" },
          { "@type": "ListItem", position: 2, name: "Campaign brief", item: url },
        ] },
      }) }} />
      <Navbar />

      <section className="px-6 md:px-12 pt-36 md:pt-48 pb-14 md:pb-20 max-w-7xl mx-auto">
        <p className="font-sans font-medium text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-cream/70 mb-6">
          Campaign brief
        </p>
        <h1 className="font-heading font-extrabold uppercase stretch-wide tracking-[-0.025em] leading-[0.95] text-[clamp(2.2rem,6vw,5.6rem)] max-w-[16ch] [text-wrap:balance]">
          <span className="text-white">Turn your idea into </span>
          <span className="text-accent-dark">a clear brief</span>
          <span className="text-signal">.</span>
        </h1>
        <p className="mt-7 font-sans text-cream/75 text-base md:text-lg leading-relaxed max-w-[56ch]">
          Planning a launch, brand campaign or a new run of content? Use this free tool to organise what you need, see what
          to prepare and give your team a useful starting point.
        </p>
        <p className="mt-5 font-sans text-sm text-cream/60">
          Already have a brief?{" "}
          <a
            href={waLink("Hi Nataka, I have a campaign brief I'd like to discuss. I found you through the campaign brief page.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading font-semibold text-cream/85 underline underline-offset-[6px] decoration-white/25 hover:decoration-white hover:text-white"
          >
            Talk to Andrew on WhatsApp
          </a>
        </p>
      </section>

      <CampaignBrief />

      <section className="border-t border-white/8">
        <div className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className={H2}>
              What makes a useful campaign brief<span className="text-signal">?</span>
            </h2>
            <p className="mt-6 font-sans text-cream/70 leading-relaxed">
              A useful brief names the business goal, the people you want to reach and the action you want them to take. Add
              the target date, a working budget, available brand assets and the person who approves the work.
            </p>
            <p className="mt-4 font-sans text-cream/70 leading-relaxed">
              Keep production and distribution separate. A film budget covers making the work; media placement, creator fees
              and usage rights need to be discussed in the scope. That gives everyone a clearer basis for a quote.
            </p>
          </div>
          <div>
            <h2 className={H2}>
              What happens when you contact Nataka<span className="text-signal">?</span>
            </h2>
            <p className="mt-6 font-sans text-cream/70 leading-relaxed">
              We review your goal and discuss the scope with you. The proposal should make the deliverables, timeline,
              approvals, revision rounds and costs clear before production starts.
            </p>
            <p className="mt-4 font-sans text-cream/70 leading-relaxed">
              We work from Nairobi on brand promotion, video production and social campaigns for businesses in Kenya. Take a
              look at the work before deciding whether we are the right fit.
            </p>
            <Link
              href="/#work"
              className="group mt-7 inline-flex items-center gap-2 font-heading font-bold text-[11px] uppercase tracking-[0.16em] text-white"
            >
              See our work
              <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const H2 =
  "font-heading font-extrabold uppercase stretch-semi text-white tracking-[-0.02em] leading-[1.02] text-[clamp(1.4rem,2.6vw,2.1rem)] max-w-[22ch]";
