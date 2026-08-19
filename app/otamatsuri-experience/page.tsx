import type { Metadata } from "next";
import Link from "next/link";
import AnimeVideoBuilder from "@/components/experience/AnimeVideoBuilder";

const siteUrl = "https://www.natakainc.com";

export const metadata: Metadata = {
  title: { absolute: "Anime Video Booth — Otamatsuri Experience | Nataka Inc" },
  description:
    "Pick your anime, pick your power, and the Otamatsuri booth turns your photo into an AI video delivered straight to your WhatsApp. Live at Otamatsuri, Nairobi.",
  alternates: { canonical: `${siteUrl}/otamatsuri-experience` },
  openGraph: {
    title: "Anime Video Booth — Otamatsuri Experience | Nataka Inc",
    description:
      "Pick your anime, pick your power, get an AI video of yourself in that world — delivered on WhatsApp at the Otamatsuri booth.",
    url: `${siteUrl}/otamatsuri-experience`,
    type: "website",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Community", item: `${siteUrl}/community` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Otamatsuri Experience",
      item: `${siteUrl}/otamatsuri-experience`,
    },
  ],
};

const steps = [
  { n: "1", text: "Choose your world and your power." },
  { n: "2", text: "One tap sends it to the booth on WhatsApp." },
  { n: "3", text: "We shoot you. Your video lands in that chat in about 10 minutes." },
];

/**
 * Booth funnel page: deliberately no site Navbar/Footer. A customer standing
 * at the booth scanned a QR to get here — the page has exactly one job.
 *
 * The hero opens on a real render rather than a headline over a colour. At a
 * festival the reader gives this maybe three seconds, and seeing the actual
 * product does more in that time than any sentence can.
 */
export default function OtamatsuriExperiencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <main className="bg-ink text-cream min-h-screen relative">
        {/* Hero — the product, playing, before a single question */}
        <section className="relative min-h-[86svh] flex flex-col overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/otamatsuri-experience/hero-poster.jpg"
            aria-label="Real videos from the Otamatsuri booth: a customer transformed into three different anime worlds"
          >
            <source src="/otamatsuri-experience/hero-reel.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/45" />

          <span
            aria-hidden
            className="absolute right-1 top-14 font-jp text-[clamp(7rem,26vw,16rem)] leading-none text-white/[0.06] select-none pointer-events-none"
          >
            祭
          </span>

          {/* Slim header */}
          <header className="relative flex items-center justify-between px-6 md:px-12 py-5">
            <Link href="/" className="font-nataka font-black text-lg text-white tracking-tight">
              NATAKA<span className="text-teal">.</span>INC
            </Link>
            <span className="font-sans text-white/55 text-[10px] tracking-widest2 uppercase">
              Otamatsuri · Nairobi
            </span>
          </header>

          <div className="relative mt-auto px-6 md:px-12 max-w-3xl mx-auto w-full pb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-9 bg-otaku" />
              <p className="font-sans text-otaku-light text-[10px] tracking-widest2 uppercase font-medium">
                AI Video Booth · Live at Otamatsuri
              </p>
            </div>

            <h1 className="leading-[0.92] mb-4">
              <span className="font-geist font-black text-[clamp(2.6rem,12vw,5.5rem)] text-white uppercase block">
                Enter your
              </span>
              <span className="font-display font-semibold italic text-[clamp(2.4rem,11vw,5rem)] text-otaku block">
                anime.
              </span>
            </h1>

            <p className="font-sans text-white/80 text-sm md:text-base leading-relaxed max-w-lg mb-7">
              This is a real customer. Choose your world and your power, we shoot your
              photo at the booth, and you get a video of yourself inside that anime.
            </p>

            <a
              href="#build"
              className="inline-flex items-center gap-2 font-geist font-black text-xs text-ink bg-otaku px-7 py-4 uppercase tracking-widest active:scale-[0.98] transition-transform"
            >
              Start — it takes 20 seconds
            </a>
          </div>
        </section>

        <div className="relative px-5 md:px-12 max-w-3xl mx-auto pt-12 md:pt-16 pb-20">
          {/* How it works */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-16 md:mb-20">
            {steps.map((s) => (
              <div key={s.n} className="border border-white/12 p-4">
                <span className="font-geist font-black text-otaku text-xs block mb-2">
                  {s.n} —
                </span>
                <p className="font-sans text-white/65 text-xs leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>

          <div id="build" className="scroll-mt-4">
            <AnimeVideoBuilder />
          </div>

          {/* Tiny footer */}
          <p className="font-sans text-white/35 text-[11px] tracking-wider mt-20 pt-6 border-t border-white/8">
            An Otamatsuri booth experience by{" "}
            <Link href="/" className="text-white/55 hover:text-teal transition-colors">
              Nataka Inc
            </Link>{" "}
            ·{" "}
            <Link href="/community" className="text-white/55 hover:text-teal transition-colors">
              Community
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
