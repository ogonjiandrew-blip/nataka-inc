import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE = "https://www.natakainc.com";

const videos = [
  { title: "Za Mabuda", cat: "Film / Direction", src: "/videos/za-mabuda.mp4", poster: "/videos/za-mabuda-still.jpg", desc: "Vijana Barubaru ft. Scar Mkadinali. A cinematic period film directed by Andrew Ogonji.", date: "2026-02-01" },
  { title: "Kwanini", cat: "Music video / Direction", src: "/videos/kwanini-teaser.mp4", poster: "/videos/kwanini-teaser-poster.jpg", desc: "Ssaru x Fathermoh. The official music video, from concept to final cut in Nairobi.", date: "2026-01-15" },
  { title: "Save Her", cat: "Music video", src: "/videos/save-her.mp4", poster: "/videos/save-her-poster.jpg", desc: "High-energy, cinematic music video production with bold visual storytelling.", date: "2026-01-20" },
  { title: "Cool in School", cat: "Music video", src: "/videos/cool-in-school.mp4", poster: "/videos/cool-in-school-poster.jpg", desc: "A vibrant, colour-rich music video: Nairobi energy on a vintage film palette.", date: "2026-02-10" },
  { title: "Your City", cat: "Brand / Commercial", src: "/videos/sarit.mp4", poster: "/videos/sarit-poster-clean.jpg", desc: "Brand film for Sarit Centre: premium commercial production for a Nairobi landmark.", date: "2026-02-20" },
  { title: "Open Auditions", cat: "Brand film / Promo", src: "/videos/nataka-promo.mp4", poster: "/videos/nataka-promo-poster.jpg", desc: "A Nataka Inc promo: cinematic brand storytelling that captures who we are.", date: "2026-01-05" },
];

const videoSchema = {
  "@context": "https://schema.org",
  "@graph": videos.map((v) => ({
    "@type": "VideoObject",
    name: `${v.title} | Nataka Inc`,
    description: v.desc,
    thumbnailUrl: `${SITE}${v.poster}`,
    uploadDate: v.date,
    contentUrl: `${SITE}${v.src}`,
    publisher: { "@type": "Organization", name: "Nataka Inc", url: SITE },
  })),
};

const aiStills = Array.from({ length: 31 }, (_, i) => `/stills/ai/1/${i + 1}.jpg`);
const filmStills = ["/stills/1/1.jpg", "/stills/1/2.jpg", "/stills/1/4.jpg", "/stills/1/5.jpg", "/stills/1/6.jpg", "/stills/1/7.jpg", "/stills/1/8.jpg", "/stills/1/27.jpg", "/stills/1/43.jpg", "/stills/1/46.jpg", "/stills/1/a.jpg", "/stills/1/b.jpg"];
const ssaruStills = ["/stills/ssaru/1.jpg", "/stills/ssaru/2.jpg"];
const perfStills = ["/stills/2/1.jpg", "/stills/2/2.jpg", "/stills/2/3.jpg"];
const fashionStills = ["/stills/fashion/1.jpg", "/stills/fashion/2.jpg", "/stills/fashion/3.jpg", "/stills/fashion/6.jpg", "/stills/fashion/7.jpg", "/stills/fashion/8.jpg", "/stills/fashion/9.jpg", "/stills/fashion/12.jpg"];
const teslahStills = ["/stills/teslah/web-1.jpg", "/stills/teslah/web-2.jpg", "/stills/teslah/3.jpg", "/stills/teslah/web-4.jpg", "/stills/teslah/web-5.jpg", "/stills/teslah/web-6.jpg", "/stills/teslah/web-7.jpg", "/stills/teslah/web-8.jpg", "/stills/teslah/web-9.jpg"];
const otamatsuriStills = ["/stills/otamatsuri/web-1.jpg", "/stills/otamatsuri/web-2.jpg", "/stills/otamatsuri/web-3.jpg", "/stills/otamatsuri/web-4.jpg", "/stills/otamatsuri/web-5.jpg", "/stills/otamatsuri/web-6.jpg", "/stills/otamatsuri/web-7.jpg", "/stills/otamatsuri/web-8.jpg"];

const groups = [
  { heading: "Teslah", kind: "Music video", href: "/work/teslah-music-video", alt: "Teslah music video still by Nataka Inc, music video production in Nairobi, Kenya", imgs: teslahStills },
  { heading: "Otamatsuri", kind: "Festival promo film", href: "/work/otamatsuri-promo-film", alt: "Otamatsuri cinematic film still by Nataka Inc, film and video production in Nairobi, Kenya", imgs: otamatsuriStills },
  { heading: "Studio", kind: "Visual stills", alt: "Nataka Inc studio visual still, media and creative production in Nairobi, Kenya", imgs: aiStills },
  { heading: "Film and campaign", kind: "Stills", alt: "Nataka Inc film and campaign still, video production company in Nairobi, Kenya", imgs: filmStills },
  { heading: "Artist campaigns", kind: "Ssaru", alt: "Nataka Inc artist campaign still, Nairobi, Kenya", imgs: ssaruStills },
  { heading: "Performance", kind: "Live", alt: "Nataka Inc performance still, Nairobi, Kenya", imgs: perfStills },
  { heading: "Fashion editorial", kind: "Studio", alt: "Nataka Inc fashion editorial still, creative agency in Nairobi, Kenya", imgs: fashionStills },
];

export default function GalleryGrid() {
  return (
    <div className="min-h-screen text-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
      <Navbar />

      <div className="px-6 md:px-12 pt-36 md:pt-48 pb-24 md:pb-32 max-w-7xl mx-auto">
        <p className="font-sans font-medium text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-cream/70 mb-6">Gallery</p>
        <h1 className="font-heading font-extrabold uppercase stretch-wide tracking-[-0.025em] leading-[0.95] text-[clamp(2.3rem,6.4vw,5.8rem)]">
          <span className="text-white">Every frame </span>
          <span className="text-accent-dark">we made</span>
          <span className="text-signal">.</span>
        </h1>
        <p className="mt-7 font-sans text-cream/70 text-base md:text-lg leading-relaxed max-w-[58ch]">
          Selected film, music video, campaign and studio work by Nataka Inc, a media, marketing and creative production
          company in Nairobi, Kenya.
        </p>

        {/* Films */}
        <section className="mt-20 md:mt-28">
          <h2 className={H2}>Films and music videos</h2>
          <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
            {videos.map((v) => (
              <figure key={v.src}>
                <div className="relative aspect-video overflow-hidden rounded-[20px] bg-ink-50 ring-1 ring-white/10">
                  <video
                    controls
                    preload="none"
                    poster={v.poster}
                    className="h-full w-full object-cover"
                    aria-label={`${v.title}, ${v.cat} by Nataka Inc, Nairobi, Kenya`}
                  >
                    <source src={v.src} type="video/mp4" />
                  </video>
                </div>
                <figcaption className="px-1 pt-4">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-signal">{v.cat}</span>
                  <h3 className="mt-2 font-heading font-bold stretch-semi text-lg md:text-xl text-white tracking-tight leading-tight">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 font-sans text-sm text-cream/60 leading-relaxed">{v.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {groups.map((g) => (
          <section key={g.heading} className="mt-20 md:mt-28">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
              <h2 className={H2}>
                {g.heading}
                <span className="ml-4 align-middle font-mono text-[11px] font-normal normal-case tracking-[0.14em] text-cream/50 [font-stretch:100%]">
                  {g.kind}
                </span>
              </h2>
              {g.href && (
                <Link
                  href={g.href}
                  className="group inline-flex items-center gap-2 font-heading font-bold text-[11px] uppercase tracking-[0.16em] text-white"
                >
                  Case study
                  <ArrowUpRight size={14} weight="bold" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {g.imgs.map((src, i) => (
                <div key={src} className="group relative aspect-[4/5] overflow-hidden rounded-[16px] bg-ink-50 ring-1 ring-white/10">
                  <Image
                    src={src}
                    alt={`${g.alt} (${i + 1})`}
                    fill
                    className="object-cover scale-[1.04] transition-transform duration-700 group-hover:scale-[1.08]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={80}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Closing call to action, in the lit room */}
        <section className="relative isolate mt-24 md:mt-32 overflow-hidden rounded-[24px] md:rounded-[28px] ring-1 ring-white/10 bg-white/[0.02] px-6 py-16 md:px-14 md:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_15%_100%,rgb(var(--c-ember)/0.55),rgb(var(--c-ember)/0.12)_50%,transparent_78%)]" />
          <div aria-hidden="true" className="halftone absolute inset-0 -z-10 opacity-[0.09] [mask-image:radial-gradient(60%_80%_at_100%_0%,black,transparent_75%)]" />
          <h2 className="font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.025em] leading-[0.96] text-[clamp(1.9rem,4.6vw,4rem)] max-w-[16ch] [text-wrap:balance]">
            Make something <span className="text-accent-dark">like this</span>
            <span className="text-signal">.</span>
          </h2>
          <p className="mt-6 font-sans text-cream/70 text-base md:text-lg leading-relaxed max-w-[50ch]">
            Tell us about your project and we&apos;ll come back with a clear plan and an honest quote.
          </p>
          <Link href="/#contact" className="group btn-primary mt-9">
            Start a project
            <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </section>
      </div>

      <Footer />
    </div>
  );
}

const H2 =
  "font-heading font-extrabold uppercase stretch-wide text-white tracking-[-0.02em] leading-[1] text-[clamp(1.5rem,3vw,2.4rem)]";
