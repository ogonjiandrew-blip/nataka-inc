import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneRadar from "@/components/community/SceneRadar";

const siteUrl = "https://www.natakainc.com";
const WHATSAPP_NUMBER = "254725107294";

const first100Url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  ["I want in on the First 100", "", "Name:", "Instagram / TikTok handle:", "Bias group:"].join("\n")
)}`;

const organiserUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  ["K-Wave media partner enquiry", "", "Event:", "Date:", "Venue:", "Your role:"].join("\n")
)}`;

export const metadata: Metadata = {
  title: { absolute: "K-Wave Kenya — Filming Nairobi's K-Pop Scene | Nataka Inc" },
  description:
    "Nairobi's K-pop fandom fills venues and films everything on phones. Nataka Inc wants to build the film archive the scene deserves — fancams, crowd films and recap edits, shot properly.",
  alternates: { canonical: `${siteUrl}/kwave` },
  openGraph: {
    title: "K-Wave Kenya | Nataka Inc",
    description:
      "Building the film archive Kenya's K-pop scene doesn't have yet — fancams, crowd films and recap edits, shot properly.",
    url: `${siteUrl}/kwave`,
    type: "website",
    images: [{ url: `${siteUrl}/kwave/nataka-kwave.png` }],
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "K-Wave Kenya", item: `${siteUrl}/kwave` },
  ],
};

// Every figure here traces to a real event. Nothing projected, nothing rounded up.
const stats = [
  {
    n: "~1,000",
    label: "fans at K-pop Festa",
    detail: "KALRO Garden, hosted by the Kenyan K-pop Fan Club, with prizes presented by the Korean Ambassador.",
  },
  {
    n: "300+",
    label: "at Kenya's first K-Pop Fest KE",
    detail: "Put together in roughly two weeks. Demand ran ahead of the planning.",
  },
  {
    n: "Phones",
    label: "are the scene's whole archive",
    detail: "Years of performances surviving as shaky vertical clips. That's the gap we want to close.",
  },
];

const makes = [
  {
    kr: "직캠",
    title: "Fancams That Last",
    desc: "Full routine, locked take, vertical. The asset fans search for by crew name years later — not a clip that dies in a group chat.",
  },
  {
    kr: "함성",
    title: "The Crowd, Filmed Like a Music Video",
    desc: "Lightsticks, chants, the loudest five seconds in the room. The part every recap forgets to shoot properly.",
  },
  {
    kr: "무대뒤",
    title: "Backstage & Bias Shorts",
    desc: "Ten-second answers to the questions fans actually ask each other. Each one stands on its own.",
  },
  {
    kr: "기록",
    title: "The Recap That Outlives the Night",
    desc: "One edit the organiser can use to sell next year, and the crews can use to prove they were there.",
  },
];

export default function KWavePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <a href="#kwave-main" className="skip-to-content">Skip to content</a>

      <main id="kwave-main" className="bg-ink text-cream min-h-screen">
        <Navbar />

        {/* Hero — typographic on purpose: we haven't shot this scene yet, so we
            don't dress the page with photos that would imply otherwise. */}
        <section className="relative pt-32 md:pt-44 pb-16 md:pb-24 px-6 md:px-12 overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-40 -right-32 w-[640px] h-[640px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,61,127,0.18) 0%, rgba(255,61,127,0) 66%)" }}
          />
          <div
            aria-hidden
            className="absolute top-1/3 -left-40 w-[480px] h-[480px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,143,184,0.10) 0%, rgba(255,143,184,0) 68%)" }}
          />

          <div className="relative max-w-7xl mx-auto">
            <Link
              href="/community"
              className="inline-block font-sans text-white/55 text-xs tracking-widest uppercase hover:text-kpop-light transition-colors mb-10"
            >
              ← The Community
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-10 bg-kpop" />
                  <p className="font-sans text-kpop-light text-[10px] tracking-widest2 uppercase font-medium">
                    K-Wave · Nairobi, Kenya
                  </p>
                </div>

                <h1 className="leading-none mb-7">
                  <span className="font-geist font-black text-[clamp(2.4rem,10vw,8rem)] text-white uppercase block">
                    K-Wave
                  </span>
                  <span className="font-display font-semibold italic text-[clamp(2.4rem,10vw,8rem)] text-kpop block">
                    Kenya.
                  </span>
                </h1>

                <p className="font-sans text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                  The fandom is already here. It fills venues, learns full choreography,
                  streams on schedule and films every second of it — on phones. We want to
                  build the film archive this scene deserves, with the people already in it.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={first100Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-geist font-black text-xs text-white bg-kpop px-7 py-4 uppercase tracking-widest hover:bg-kpop-mid transition-colors duration-200"
                  >
                    Join the First 100 →
                  </a>
                  <a
                    href={organiserUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-geist font-black text-xs text-white border border-white/25 px-7 py-4 uppercase tracking-widest hover:border-kpop hover:text-kpop-light transition-colors duration-200"
                  >
                    I&apos;m Running an Event
                  </a>
                </div>
              </div>

              <div className="hidden lg:block shrink-0">
                <Image
                  src="/kwave/nataka-kwave-600.png"
                  alt="Nataka Inc K-Wave Kenya mark"
                  width={300}
                  height={300}
                  className="rounded-full shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Scene stats */}
        <section className="px-6 md:px-12 py-16 md:py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-kpop pl-6">
                <p className="font-geist font-black text-4xl md:text-5xl text-white leading-none mb-3">{s.n}</p>
                <p className="font-sans text-kpop-light text-xs tracking-wide uppercase font-semibold mb-3">{s.label}</p>
                <p className="font-sans text-white/60 text-sm leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What we'd make */}
        <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-kpop" />
            <p className="font-sans text-kpop-light text-[10px] tracking-widest2 uppercase font-medium">
              What We&apos;d Shoot
            </p>
          </div>

          <h2 className="leading-none mb-12 md:mb-16">
            <span className="font-geist font-black text-[clamp(1.8rem,6vw,4.5rem)] text-white uppercase block">
              One Night.
            </span>
            <span className="font-display font-semibold italic text-[clamp(1.8rem,6vw,4.5rem)] text-kpop block">
              Kept Properly.
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {makes.map((m) => (
              <div
                key={m.title}
                className="border border-white/8 bg-white/[0.02] hover:border-kpop/30 transition-colors duration-300 p-7 md:p-8 group"
              >
                <span
                  aria-hidden
                  className="font-geist font-black text-kpop/70 text-base block mb-4 group-hover:text-kpop-light transition-colors duration-300"
                >
                  {m.kr}
                </span>
                <h3 className="font-geist font-black text-white text-base md:text-lg uppercase mb-2.5 leading-tight">
                  {m.title}
                </h3>
                <p className="font-sans text-white/60 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The First 100 */}
        <section className="px-6 md:px-12 py-16 md:py-20 max-w-7xl mx-auto">
          <div
            className="border border-kpop/25 p-8 md:p-14"
            style={{ background: "linear-gradient(135deg, rgba(255,61,127,0.12) 0%, rgba(255,61,127,0.02) 60%, rgba(255,61,127,0) 100%)" }}
          >
            <p className="font-sans text-kpop-light text-[10px] tracking-widest2 uppercase font-medium mb-5">
              The First 100
            </p>
            <h2 className="font-geist font-black text-[clamp(1.5rem,5vw,3.4rem)] text-white uppercase leading-none mb-6">
              See it before <span className="text-kpop">everyone else.</span>
            </h2>
            <p className="font-sans text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
              A small group chat that gets every K-Wave drop two hours before it goes public,
              and gets asked first when we&apos;re picking what to shoot next. No fees, no
              posting quota — turn up if you want to. K-pop fans already run like this;
              we&apos;re just giving it a home in Nairobi.
            </p>
            <a
              href={first100Url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-geist font-black text-xs text-white bg-kpop px-8 py-4 uppercase tracking-widest hover:bg-kpop-mid transition-colors duration-200"
            >
              Get In Early →
            </a>
          </div>
        </section>

        <SceneRadar />

        {/* For organisers */}
        <section className="px-6 md:px-12 pb-24 md:pb-32 max-w-7xl mx-auto">
          <div className="border border-white/10 p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-geist font-black text-white text-xl md:text-2xl uppercase mb-3 leading-tight">
                Organising something? Let&apos;s talk before the day.
              </h2>
              <p className="font-sans text-white/65 text-sm leading-relaxed max-w-xl">
                Media-partner coverage works best when it&apos;s agreed before the doors open —
                stage-side position, a shot list built around your crews, and footage everyone
                can actually use afterwards.
              </p>
            </div>
            <a
              href={organiserUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-geist font-black text-xs text-white bg-kpop px-7 py-4 uppercase tracking-widest hover:bg-kpop-mid transition-colors duration-200 whitespace-nowrap self-start md:self-auto"
            >
              Talk to Nataka →
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
