import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Navbar from "@/components/Navbar";
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
    <main id="main-content" className="min-h-screen text-cream font-sans">
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
      <Navbar />

      <section className="px-6 md:px-12 pt-36 md:pt-48 pb-14 md:pb-20 max-w-7xl mx-auto">
        <p className="font-sans font-medium text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-cream/70 mb-6">
          The Nataka AI Standard
        </p>
        <h1 className="font-heading font-extrabold uppercase stretch-wide tracking-[-0.025em] leading-[0.95] text-[clamp(2.2rem,6vw,5.6rem)] max-w-[17ch] [text-wrap:balance]">
          <span className="text-white">AI video your brand can </span>
          <span className="text-accent-dark">put its name on</span>
          <span className="text-signal">.</span>
        </h1>
        <p className="mt-7 font-sans text-cream/75 text-base md:text-lg leading-relaxed max-w-[58ch]">
          Kenya has seen what careless AI does to a brand: extra fingers, borrowed faces, ads that get screenshotted for the
          wrong reasons. These are the seven rules every Nataka AI production follows. Ask for them in your contract.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/50">Updated {updated}</p>
      </section>

      {/* The band we built under these rules, framed like a screen */}
      <section className="relative isolate px-6 md:px-12 max-w-7xl mx-auto">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-[6%] -inset-y-[20%] -z-10 bg-[radial-gradient(50%_50%_at_50%_55%,rgb(var(--c-ember)/0.5),rgb(var(--c-ember)/0.12)_50%,transparent_75%)]"
        />
        <figure>
          <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[22px] md:rounded-[28px] ring-1 ring-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
            <Image
              src="/ai/aanother/lineup.jpg"
              alt="AANOTHER, a fictional rock band made with AI by Nataka Inc"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              quality={88}
              className="object-cover"
            />
            <div aria-hidden="true" className="halftone absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(70%_80%_at_0%_100%,black,transparent_70%)]" />
          </div>
          <figcaption className="mt-4 px-1 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/50">
            AI image: AANOTHER, a fictional band we made under this Standard
          </figcaption>
        </figure>
      </section>

      <section aria-label="The seven rules" className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
        <h2 className="mb-12 md:mb-16 font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.95] text-[clamp(1.85rem,5vw,4.4rem)]">
          The seven rules<span className="text-signal">.</span>
        </h2>
        <ol className="border-t border-white/10">
          {rules.map((r) => (
            <li key={r.n} className="grid grid-cols-12 gap-x-6 gap-y-3 py-8 md:py-10 border-b border-white/10">
              <span className="col-span-12 md:col-span-1 font-mono text-xs text-cream/50 md:pt-2 tabular-nums">{r.n}</span>
              <h3 className="col-span-12 md:col-span-5 font-heading font-bold uppercase stretch-semi text-white tracking-[-0.01em] leading-tight text-[clamp(1.15rem,2vw,1.6rem)]">
                {r.title}
              </h3>
              <p className="col-span-12 md:col-span-6 font-sans text-cream/70 text-base leading-relaxed">{r.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-6 md:px-12 pb-24 md:pb-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-6">
          <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.95] text-[clamp(1.6rem,3.4vw,2.8rem)]">
            Why we publish this<span className="text-signal">.</span>
          </h2>
          <p className="mt-6 font-sans text-cream/70 leading-relaxed">
            Brands are right to be careful. Using someone&apos;s face without consent already costs Kenyan businesses money at
            the Data Protection Commissioner, and the AI Bill 2026 proposes labels and penalties for misleading AI content.
            A studio that waits for the law to force good habits puts its clients at risk.
          </p>
          <p className="mt-4 font-sans text-cream/70 leading-relaxed">
            We built AANOTHER, a whole rock band made with AI, under these rules: fictional characters, labelled on every
            platform, directed shot by shot.
          </p>
          <Link
            href="/services/ai-video-production-kenya#case-study"
            className="group mt-7 inline-flex items-center gap-2 font-heading font-bold text-[11px] uppercase tracking-[0.16em] text-white"
          >
            See the band
            <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Offer panel, in the lit room */}
        <div className="lg:col-span-6 relative isolate overflow-hidden rounded-[24px] ring-1 ring-white/10 bg-white/[0.02] p-8 md:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_10%_100%,rgb(var(--c-ember)/0.55),rgb(var(--c-ember)/0.12)_55%,transparent_80%)]" />
          <div aria-hidden="true" className="halftone absolute inset-0 -z-10 opacity-[0.1] [mask-image:radial-gradient(60%_80%_at_100%_0%,black,transparent_75%)]" />
          <h2 className="font-heading font-extrabold uppercase stretch-semi text-white tracking-[-0.02em] leading-[1] text-[clamp(1.4rem,2.4vw,2rem)]">
            Planning an AI campaign<span className="text-signal">?</span>
          </h2>
          <p className="mt-4 font-sans text-cream/70 leading-relaxed max-w-[46ch]">
            Tell us the product and the one feeling the video must leave. We send a written concept and a first AI frame
            within 48 hours, made under this Standard.
          </p>
          <a
            href={waLink(`Source: ${url}\nHi Nataka, I read the AI Standard and I'd like a free AI concept (code: AISTD). The project is `)}
            target="_blank"
            rel="noopener noreferrer"
            className="group btn-primary mt-8"
          >
            Get a free AI concept
            <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
