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
  { n: "1", text: "Pick your world and your power below." },
  { n: "2", text: "One tap sends your summon to the booth on WhatsApp." },
  { n: "3", text: "We shoot your photo — your AI video lands back in that same chat." },
];

/**
 * Booth funnel page: deliberately no site Navbar/Footer. A customer standing
 * at the booth scanned a QR to get here — the page has exactly one job.
 */
export default function OtamatsuriExperiencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <main className="bg-ink text-cream min-h-screen relative overflow-hidden">
        {/* Slim header — keeps the funnel clean */}
        <header className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/8">
          <Link href="/" className="font-nataka font-black text-lg text-white tracking-tight">
            NATAKA<span className="text-teal">.</span>INC
          </Link>
          <span className="font-sans text-white/45 text-[10px] tracking-widest2 uppercase">
            Otamatsuri · Nairobi
          </span>
        </header>

        {/* Watermark */}
        <span
          aria-hidden
          className="absolute right-0 top-16 font-jp text-[clamp(8rem,30vw,20rem)] leading-none text-white/[0.04] select-none pointer-events-none"
        >
          祭
        </span>

        <div className="relative px-6 md:px-12 max-w-3xl mx-auto pt-12 md:pt-20 pb-24">
          {/* Hero */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-otaku" />
              <p className="font-sans text-otaku-light text-[10px] tracking-widest2 uppercase font-medium">
                The Otamatsuri Experience · AI Video Booth
              </p>
            </div>

            <h1 className="leading-none mb-5">
              <span className="font-geist font-black text-[clamp(2.4rem,10vw,5.5rem)] text-white uppercase block">
                Enter your
              </span>
              <span className="font-display font-semibold italic text-[clamp(2.2rem,9vw,5rem)] text-otaku block">
                anime.
              </span>
            </h1>

            <p className="font-sans text-white/75 text-sm md:text-base leading-relaxed max-w-xl">
              Pick the world, pick the power. We shoot your photo at the booth and turn it
              into a video of you inside that anime — delivered to your WhatsApp.
            </p>
          </div>

          {/* How it works */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-14 md:mb-20">
            {steps.map((s) => (
              <div key={s.n} className="border border-white/12 p-4">
                <span className="font-geist font-black text-otaku text-xs block mb-2">
                  {s.n} —
                </span>
                <p className="font-sans text-white/65 text-xs leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>

          <AnimeVideoBuilder />

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
