import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { waLink } from "@/lib/whatsapp";

const url = "https://www.natakainc.com/ai-standard";
const title = "The Nataka AI Standard: Consent, Labels and Human Direction | Nataka Inc";
const description =
  "How Nataka makes AI video brands can put their name on: written consent before any likeness, clear AI labels, a human director on every frame, frame-by-frame checks and no political deepfakes.";
const updated = "8 October 2026";

const rules = [
  {
    n: "01",
    title: "Consent before any likeness",
    body:
      "We never generate a real person's face, body or voice without their signed release. Reference photos and voice samples come from the person, or with their written permission, for the use you agreed. This is what Kenya's Data Protection Act 2019 already requires for using someone's image commercially.",
  },
  {
    n: "02",
    title: "AI is labelled, not hidden",
    body:
      "When an AI video shows people, places or events that could pass as real, it carries an AI label: the platform's own label on YouTube, Meta and TikTok, and a line in the caption or on screen. We follow the Media Council of Kenya's guidance on labelling AI media and the labelling rules proposed in the Artificial Intelligence Bill 2026.",
  },
  {
    n: "03",
    title: "A human directs every frame",
    body:
      "Every piece starts with a brief, a shot list and a storyboard you approve. A director chooses every shot, an editor cuts it and a colourist grades it. We keep a production log of those human decisions and hand it over with the film, so you have a clear record of authorship for your legal team.",
  },
  {
    n: "04",
    title: "No extra hands",
    body:
      "Before you see anything, every frame is checked for the mistakes that give AI away: hands, faces that drift between shots, garbled text and logos, and Kenyan details that come out wrong, like number plates, uniforms and money. If we cannot make a moment pass, we shoot it for real or cut it.",
  },
  {
    n: "05",
    title: "No fake customers or fake engagement",
    body:
      "We do not make AI testimonials from people who never bought, fake reviews, or AI accounts that pretend to be real fans. An AI character is always presented as a character.",
  },
  {
    n: "06",
    title: "No political deepfakes or impersonation",
    body:
      "We do not make AI content that shows a real politician, public figure or private person saying or doing something they did not say or do. This holds through the 2027 election season and after it.",
  },
  {
    n: "07",
    title: "You know what touched your material",
    body:
      "We tell you which AI tools were used on your project and how. The finished work is licensed to you for the agreed use, and your files and reference photos are used for your project only.",
  },
];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article", images: [{ url: "https://www.natakainc.com/ai/aanother/lineup.jpg" }] },
  twitter: { card: "summary_large_image", title, description, images: ["https://www.natakainc.com/ai/aanother/lineup.jpg"] },
};

export default function AiStandardPage() {
  return (
    <main className="min-h-screen bg-ink text-cream font-sans">
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
            dateModified: "2026-10-08",
            inLanguage: "en-KE",
            publisher: { "@id": "https://www.natakainc.com/#org" },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.natakainc.com" },
                { "@type": "ListItem", position: 2, name: "AI Video Production", item: "https://www.natakainc.com/services/ai-video-production-kenya" },
                { "@type": "ListItem", position: 3, name: "The Nataka AI Standard", item: url },
              ],
            },
          }),
        }}
      />
      <header className="max-w-7xl mx-auto px-6 md:px-12 pt-10 flex justify-between gap-6 items-center">
        <Link href="/" className="font-nataka font-black text-lg text-white">NATAKA<span className="text-teal">.</span>INC</Link>
        <Link href="/services/ai-video-production-kenya" className="text-sm text-cream/70 hover:text-teal">AI video production →</Link>
      </header>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16">
        <p className="font-mono text-xs text-teal uppercase tracking-widest mb-5">The Nataka AI Standard · Updated {updated}</p>
        <h1 className="font-geist font-black text-[clamp(2.4rem,6vw,5.2rem)] text-white leading-[1.05] max-w-4xl mb-7">
          AI video your brand can <span className="font-display italic text-teal">put its name on.</span>
        </h1>
        <p className="max-w-2xl text-lg text-cream/80 leading-relaxed">
          Kenya has seen what careless AI does to a brand: extra fingers, borrowed faces, ads that get screenshotted for the
          wrong reasons. These are the seven rules every Nataka AI production follows. Ask for them in your contract.
        </p>
      </section>

      <section aria-label="The seven rules" className="max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
        <ol className="divide-y divide-white/8 border-t border-b border-white/8">
          {rules.map((r) => (
            <li key={r.n} className="grid grid-cols-[48px_1fr] md:grid-cols-[80px_320px_1fr] gap-4 md:gap-10 py-8 md:py-10 items-baseline">
              <span className="font-geist font-black text-sm text-teal/60 tabular-nums">{r.n}</span>
              <h2 className="font-geist font-black text-xl md:text-2xl text-white uppercase leading-tight">{r.title}</h2>
              <p className="col-span-2 md:col-span-1 col-start-2 md:col-start-auto text-cream/70 text-base leading-relaxed max-w-2xl">{r.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-28 grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div>
          <h2 className="font-geist font-black text-[clamp(1.4rem,3vw,2.2rem)] text-white uppercase mb-4">
            Why we <span className="text-teal">publish this</span>
          </h2>
          <p className="text-cream/70 leading-relaxed mb-4">
            Brands are right to be careful. Using someone&apos;s face without consent already costs Kenyan businesses money at
            the Data Protection Commissioner, and the AI Bill 2026 proposes labels and penalties for misleading AI content.
            A studio that waits for the law to force good habits puts its clients at risk.
          </p>
          <p className="text-cream/70 leading-relaxed">
            We built AANOTHER, a whole rock band made with AI, under these rules: fictional characters, labelled on every
            platform, directed shot by shot.{" "}
            <Link href="/services/ai-video-production-kenya#case-study" className="text-teal underline underline-offset-4">See the band →</Link>
          </p>
        </div>
        <div className="border border-teal/30 bg-teal/[0.04] p-8 md:p-10">
          <h2 className="font-geist font-black text-xl text-white uppercase mb-3">Planning an AI campaign?</h2>
          <p className="text-cream/65 text-sm leading-relaxed mb-6">
            Tell us the product and the one feeling the video must leave. We send a written concept and a first AI frame
            within 48 hours, made under this Standard.
          </p>
          <a
            href={waLink(`Source: ${url}\nHi Nataka, I read the AI Standard and I'd like a free AI concept (code: AISTD). The project is `)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-teal text-ink font-geist font-black uppercase text-xs tracking-widest px-7 py-4 hover:bg-teal-light transition-colors"
          >
            Get a free AI concept →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
