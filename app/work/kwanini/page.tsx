import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const siteUrl = "https://www.natakainc.com";

export const metadata: Metadata = {
  title: "Kwanini — Ssaru x Fathermoh | Case Study | Nataka Inc",
  description:
    "How Nataka Inc directed and produced the official music video for Ssaru x Fathermoh's 'Kwanini' — full case study: brief, approach, production and result. Music video production in Nairobi, Kenya.",
  alternates: { canonical: `${siteUrl}/work/kwanini` },
  openGraph: {
    title: "Kwanini — Ssaru x Fathermoh | A Nataka Inc Production",
    description:
      "Case study: directing the official music video for two of Kenya's most distinctive artists.",
    url: `${siteUrl}/work/kwanini`,
    images: [{ url: `${siteUrl}/stills/4/1.jpg` }],
    type: "article",
  },
};

const credits = [
  { role: "Artists", name: "Ssaru x Fathermoh" },
  { role: "Direction", name: "Nataka Inc" },
  { role: "Production", name: "Nataka Inc" },
  { role: "Edit & Grade", name: "Nataka Inc" },
  { role: "Location", name: "Nairobi, Kenya" },
  { role: "Year", name: "2026" },
];

const stills = [
  "/stills/4/1.jpg",
  "/stills/4/4.jpg",
  "/stills/4/5.jpg",
  "/stills/4/6.jpg",
  "/stills/4/7.jpg",
  "/stills/4/2.jpg",
];

export default function KwaniniCaseStudy() {
  return (
    <main className="min-h-screen bg-ink text-cream">
      {/* Hero */}
      <div className="relative h-[65vh] md:h-[80vh] overflow-hidden">
        <Image
          src="/stills/4/1.jpg"
          alt="Kwanini — Ssaru x Fathermoh, directed by Nataka Inc"
          fill
          className="object-cover"
          sizes="100vw"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/20" />

        <div className="absolute top-8 left-6 md:left-12 z-10">
          <Link
            href="/"
            className="font-sans text-white/55 text-xs tracking-widest uppercase hover:text-teal transition-colors"
          >
            ← Nataka Inc
          </Link>
        </div>

        <div className="absolute bottom-0 inset-x-0 px-6 md:px-12 pb-12 md:pb-16 max-w-7xl mx-auto">
          <p className="font-sans text-[10px] text-teal tracking-widest uppercase mb-4">
            Case Study · Music Video · 2026
          </p>
          <h1 className="leading-none mb-4">
            <span className="font-geist font-black text-[clamp(2.6rem,9vw,7rem)] text-white uppercase block">
              Kwanini
            </span>
            <span className="font-display font-semibold italic text-[clamp(1.4rem,3.5vw,2.6rem)] text-teal block">
              Ssaru x Fathermoh
            </span>
          </h1>
        </div>
      </div>

      {/* The film — embedded */}
      <div className="px-6 md:px-12 py-14 md:py-20 max-w-5xl mx-auto">
        <div className="relative aspect-video overflow-hidden bg-black border border-white/8">
          <iframe
            src="https://www.youtube.com/embed/4oXe4H8vxbI"
            title="Ssaru x Fathermoh — Kwanini (Official Music Video) — directed by Nataka Inc"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <p className="font-mono text-[10px] text-white/35 tracking-widest uppercase mt-4 text-center">
          Official music video — directed &amp; produced by Nataka Inc
        </p>
      </div>

      {/* Brief / Approach / Result */}
      <div className="px-6 md:px-12 pb-16 md:pb-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="font-geist font-black text-xl text-white uppercase mb-4">
            The <span className="text-teal">Brief</span>
          </h2>
          <p className="font-sans text-cream/65 text-sm leading-relaxed">
            Two of Kenya&apos;s most distinctive voices on one track. Ssaru — raw energy and
            undeniable presence. Fathermoh — measured intensity and precision. The brief
            was simple in the hardest way: build a visual world where both artists exist
            fully, without either being diminished, and match the emotional weight of the song.
          </p>
        </div>
        <div>
          <h2 className="font-geist font-black text-xl text-white uppercase mb-4">
            The <span className="text-teal">Approach</span>
          </h2>
          <p className="font-sans text-cream/65 text-sm leading-relaxed">
            Deliberate restraint. Real Nairobi locations with real texture instead of
            manufactured sets. Motivated camera movement only — when the camera moves, it
            follows something. A warm, saturated grade that breaks from the desaturated
            look that dominated Kenyan videos for years. Every shared frame composed as a
            statement about the dynamic between the two artists.
          </p>
        </div>
        <div>
          <h2 className="font-geist font-black text-xl text-white uppercase mb-4">
            The <span className="text-teal">Result</span>
          </h2>
          <p className="font-sans text-cream/65 text-sm leading-relaxed">
            A music video that holds its own against international productions while being
            unmistakably Kenyan — conceived, shot, and finished entirely in Nairobi by a
            Kenyan crew. Proof of what we mean when we say world-class work doesn&apos;t
            have to be imported.
          </p>
        </div>
      </div>

      {/* Stills grid */}
      <div className="px-6 md:px-12 pb-16 md:pb-24 max-w-7xl mx-auto">
        <h2 className="font-geist font-black text-xl text-white uppercase mb-8">
          Frames From <span className="text-teal">The Film</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {stills.map((src, i) => (
            <div key={src} className={`relative overflow-hidden bg-ink-50 ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}>
              <Image
                src={src}
                alt={`Kwanini still ${i + 1} — Nataka Inc production`}
                fill
                className="object-cover hover:scale-[1.03] transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
                quality={80}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Credits */}
      <div className="px-6 md:px-12 pb-16 md:pb-24 max-w-7xl mx-auto">
        <div className="border-t border-white/8 pt-10 grid grid-cols-2 md:grid-cols-6 gap-6">
          {credits.map((c) => (
            <div key={c.role}>
              <p className="font-mono text-[9px] text-teal tracking-widest uppercase mb-1.5">{c.role}</p>
              <p className="font-sans text-sm text-white/80">{c.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <div className="border border-teal/30 bg-teal/[0.04] p-10 md:p-16 text-center">
          <h2 className="font-geist font-black text-[clamp(1.6rem,4vw,3rem)] text-white uppercase leading-tight mb-4">
            Your Sound Deserves This.
          </h2>
          <p className="font-sans text-cream/60 text-base mb-8 max-w-xl mx-auto">
            We direct and produce music videos for artists who want visuals that travel as
            far as the music. Tell us about your release.
          </p>
          <Link
            href="/#contact"
            className="inline-block font-geist font-black text-sm text-ink bg-teal px-10 py-5 uppercase tracking-widest hover:bg-teal-light transition-colors duration-200 mr-3"
          >
            Start a Project
          </Link>
          <Link
            href="/services/music-video-production-nairobi"
            className="inline-block font-sans text-white/50 text-xs tracking-widest uppercase hover:text-teal transition-colors pt-4"
          >
            Music Video Production →
          </Link>
        </div>
      </div>
    </main>
  );
}
