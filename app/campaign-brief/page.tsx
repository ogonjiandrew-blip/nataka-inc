import type { Metadata } from "next";
import Link from "next/link";
import CampaignBrief from "@/components/CampaignBrief";
import Footer from "@/components/Footer";
import { waLink } from "@/lib/whatsapp";

const url = "https://www.natakainc.com/campaign-brief";
const title = "Free Marketing Campaign Brief Builder | Nataka Inc Kenya";
const description = "Plan a brand campaign, product launch, social content or corporate film. Build a clear brief with a checklist, budget and timing, then share it with Nataka on WhatsApp.";

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website", images: [{ url: "https://www.natakainc.com/videos/sarit-poster.jpg" }] },
  twitter: { card: "summary_large_image", title, description, images: ["https://www.natakainc.com/videos/sarit-poster.jpg"] },
};

export default function CampaignBriefPage() {
  return (
    <main className="min-h-screen bg-ink text-cream font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebPage", "@id": `${url}#page`, url,
        name: title, description, inLanguage: "en-KE", publisher: { "@id": "https://www.natakainc.com/#org" },
        breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.natakainc.com" },
          { "@type": "ListItem", position: 2, name: "Campaign brief", item: url },
        ] },
      }) }} />
      <header className="max-w-7xl mx-auto px-6 md:px-12 pt-10 flex justify-between gap-6 items-center">
        <Link href="/" className="font-nataka font-black text-lg text-white">NATAKA<span className="text-signal">.</span>INC</Link>
        <Link href="/services" className="text-sm text-cream/70 hover:text-accent">Explore services →</Link>
      </header>
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-5">Campaign planning / Kenya</p>
        <h1 className="font-heading font-black text-[clamp(2.5rem,6vw,5.5rem)] text-white leading-[1.05] max-w-4xl mb-7">Turn your idea into <span className="text-accent">a clear brief.</span></h1>
        <p className="max-w-2xl text-lg text-cream/80 leading-relaxed">Planning a launch, brand campaign or a new run of content? Use this free tool to organise what you need, see what to prepare and give your team a useful starting point.</p>
        <p className="mt-5 text-sm text-cream/65">Already have a brief? <a href={waLink("Hi Nataka, I have a campaign brief I'd like to discuss. I found you through the campaign brief page.")} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">Talk to Andrew on WhatsApp.</a></p>
      </section>
      <CampaignBrief />
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20 grid md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
        <div>
          <h2 className="font-heading font-bold text-2xl text-white mb-5">What makes a useful campaign brief?</h2>
          <p className="text-cream/75 leading-relaxed mb-4">A useful brief names the business goal, the people you want to reach and the action you want them to take. Add the target date, a working budget, available brand assets and the person who approves the work.</p>
          <p className="text-cream/75 leading-relaxed">Keep production and distribution separate. A film budget covers making the work; media placement, creator fees and usage rights need to be discussed in the scope. That gives everyone a clearer basis for a quote.</p>
        </div>
        <div>
          <h2 className="font-heading font-bold text-2xl text-white mb-5">What happens when you contact Nataka?</h2>
          <p className="text-cream/75 leading-relaxed mb-4">We review your goal and discuss the scope with you. The proposal should make the deliverables, timeline, approvals, revision rounds and costs clear before production starts.</p>
          <p className="text-cream/75 leading-relaxed mb-5">We work from Nairobi on brand promotion, video production and social campaigns for businesses in Kenya. Take a look at the work before deciding whether we are the right fit.</p>
          <Link href="/#reel" className="text-accent underline underline-offset-4">Watch our films and brand work →</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
