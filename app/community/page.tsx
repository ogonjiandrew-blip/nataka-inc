import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Countdown from "@/components/community/Countdown";
import DropLog from "@/components/community/DropLog";
import Wallpapers from "@/components/community/Wallpapers";
import PhotocardMaker from "@/components/community/PhotocardMaker";
import FanWall from "@/components/community/FanWall";
import SceneRadar from "@/components/community/SceneRadar";

const siteUrl = "https://www.natakainc.com";

export const metadata: Metadata = {
  title: { absolute: "Community — Otamatsuri, Anime & K-Pop in Kenya | Nataka Inc" },
  description:
    "Otamatsuri stills and free phone wallpapers, the Kenyan cosplay fan wall, and a running board of Kenya's anime and K-pop events. Built with the community by Nataka Inc, Nairobi.",
  alternates: { canonical: `${siteUrl}/community` },
  openGraph: {
    title: "Community | Nataka Inc — Otamatsuri, Anime & K-Pop in Kenya",
    description:
      "Free Otamatsuri wallpapers, the Kenyan cosplay fan wall, and what's actually happening in Kenya's anime and K-pop scene.",
    url: `${siteUrl}/community`,
    type: "website",
    images: [{ url: `${siteUrl}/stills/otamatsuri/community/19.jpg` }],
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Community", item: `${siteUrl}/community` },
  ],
};

export default function CommunityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <a href="#community-main" className="skip-to-content">Skip to content</a>

      <main id="community-main" className="bg-ink text-cream min-h-screen">
        <Navbar />

        {/* Hero */}
        <section className="relative min-h-[76vh] md:min-h-[86vh] flex items-end overflow-hidden">
          <Image
            src="/stills/otamatsuri/community/19.jpg"
            alt="Otamatsuri — two cosplayers silhouetted against a sunset, shot in Kenya by Nataka Inc"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/35" />

          <span
            aria-hidden
            className="absolute right-2 top-24 md:top-28 font-geist font-black text-[clamp(4rem,16vw,13rem)] leading-none text-white/[0.05] select-none pointer-events-none"
          >
            オタ祭
          </span>

          <div className="relative w-full px-6 md:px-12 max-w-7xl mx-auto pb-14 md:pb-20">
            <Link
              href="/"
              className="inline-block font-sans text-white/55 text-xs tracking-widest uppercase hover:text-otaku-light transition-colors mb-8"
            >
              ← Nataka Inc
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-otaku" />
              <p className="font-sans text-otaku-light text-[10px] tracking-widest2 uppercase font-medium">
                Anime · Cosplay · K-Pop · Kenya
              </p>
            </div>

            <h1 className="leading-none mb-6">
              <span className="font-geist font-black text-[clamp(2.2rem,9vw,7.5rem)] text-white uppercase block">
                The Community
              </span>
              <span className="font-display font-semibold italic text-[clamp(1.4rem,4.5vw,3.4rem)] text-otaku block mt-2">
                is the whole point.
              </span>
            </h1>

            <p className="font-sans text-white/75 text-sm md:text-base leading-relaxed max-w-2xl">
              Nataka Inc directed and produced the promo film for Otamatsuri, an anime and
              otaku festival — shot in Kenya, with Kenyan cosplayers, prop-makers and
              creatives. This page is everything that came out of it, plus a running board
              of what else is happening in the scene. Take what you want. It&apos;s free.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/community/otamatsuri-cosplay-nairobi"
                className="font-geist font-black text-xs text-ink bg-otaku px-7 py-4 uppercase tracking-widest hover:bg-otaku-light transition-colors duration-200"
              >
                See the Cosplay →
              </Link>
              <a
                href="#wallpapers"
                className="font-geist font-black text-xs text-white border border-white/25 px-7 py-4 uppercase tracking-widest hover:border-otaku hover:text-otaku-light transition-colors duration-200"
              >
                Get the Wallpapers ↓
              </a>
              <a
                href="#scene-radar"
                className="font-geist font-black text-xs text-white border border-white/25 px-7 py-4 uppercase tracking-widest hover:border-kpop hover:text-kpop-light transition-colors duration-200"
              >
                What&apos;s Happening
              </a>
              <Link
                href="/otamatsuri-experience"
                className="font-geist font-black text-xs text-white border border-otaku/50 px-7 py-4 uppercase tracking-widest hover:border-otaku hover:text-otaku-light transition-colors duration-200"
              >
                Anime Video Booth
              </Link>
            </div>
          </div>
        </section>

        <Countdown />
        <DropLog />

        {/* Entry point to the cosplay scroll. It sits above the wallpapers on
            purpose: the gallery is the deepest thing on this page and the one
            people actually come looking for. */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto pt-16 md:pt-24">
          <Link
            href="/community/otamatsuri-cosplay-nairobi"
            className="group relative block overflow-hidden border border-white/12 hover:border-otaku/60 transition-colors duration-300"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[340px] overflow-hidden bg-ink-50">
                <Image
                  src="/stills/otamatsuri/vol001/arrival.jpg"
                  alt="Otamatsuri cosplay in Nairobi: a Kenyan cosplayer in a Survey Corps uniform and handmade ODM gear on a lit staircase at night"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={78}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink md:to-ink" />
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-10 bg-otaku" />
                  <p className="font-sans text-otaku-light text-[10px] tracking-widest2 uppercase font-medium">
                    <span className="font-jp text-xs">絵巻</span> · The cosplay scroll
                  </p>
                </div>

                <h2 className="leading-none mb-5">
                  <span className="font-geist font-black text-[clamp(1.5rem,4.5vw,3rem)] text-white uppercase block">
                    Otamatsuri Cosplay
                  </span>
                  <span className="font-display font-semibold italic text-[clamp(1.5rem,4.5vw,3rem)] text-otaku block">
                    in Nairobi.
                  </span>
                </h2>

                <p className="font-sans text-white/70 text-sm md:text-base leading-relaxed mb-7">
                  Ten frames from the shoot, laid out as a Japanese scroll with the
                  story behind every one of them. Kenyan cosplayers, handmade gear,
                  real locations.
                </p>

                <span className="inline-block self-start font-geist font-black text-xs text-ink bg-otaku px-7 py-4 uppercase tracking-widest group-hover:bg-otaku-light transition-colors duration-200">
                  Open the scroll →
                </span>
              </div>
            </div>
          </Link>
        </section>

        <Wallpapers />
        <PhotocardMaker />
        <FanWall />
        <SceneRadar />

        {/* K-Wave crossover */}
        <section className="px-6 md:px-12 pb-24 md:pb-32 max-w-7xl mx-auto">
          <Link
            href="/kwave"
            className="group block relative overflow-hidden border border-kpop/25 hover:border-kpop/60 transition-colors duration-300"
            style={{ background: "linear-gradient(135deg, rgba(255,61,127,0.13) 0%, rgba(255,61,127,0.03) 55%, rgba(255,61,127,0) 100%)" }}
          >
            <div className="p-8 md:p-14">
              <p className="font-sans text-kpop-light text-[10px] tracking-widest2 uppercase font-medium mb-5">
                Also from Nataka
              </p>
              <h2 className="leading-none mb-5">
                <span className="font-geist font-black text-[clamp(1.6rem,5.5vw,4rem)] text-white uppercase block">
                  K-Wave Kenya
                </span>
                <span className="font-display font-semibold italic text-[clamp(1.6rem,5.5vw,4rem)] text-kpop block">
                  Filmed properly.
                </span>
              </h2>
              <p className="font-sans text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mb-7">
                Nairobi&apos;s K-pop fandom fills venues, learns full choreography and films
                everything — mostly on shaky phones. We think the scene deserves better
                footage than that.
              </p>
              <span className="inline-block font-geist font-black text-xs text-white bg-kpop px-7 py-4 uppercase tracking-widest group-hover:bg-kpop-mid transition-colors duration-200">
                Enter K-Wave →
              </span>
            </div>
          </Link>
        </section>

        <Footer />
      </main>
    </>
  );
}
