import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CosplayScroll from "@/components/community/CosplayScroll";
import { cosplayFrames, vol001Frames } from "@/lib/otamatsuriCosplay";
import { waLink } from "@/lib/whatsapp";

/*
 * /community/otamatsuri-cosplay-nairobi
 *
 * The Otamatsuri cosplay gallery, built as a Japanese hanging scroll on the
 * site's own dark palette. Target query: "otamatsuri cosplay in nairobi".
 *
 * Two boundaries this page must never cross:
 *  1. Otamatsuri is organised by Movie Jabber. Nataka directed and produced
 *     the promo film, nothing more. Never word it as Nataka's festival.
 *  2. These are film frames shot on location, NOT convention floor photos.
 *     The page says so out loud, in the copy and in the FAQ.
 * House rule on all Otamatsuri copy: no em dashes.
 */

const siteUrl = "https://www.natakainc.com";
const pageUrl = `${siteUrl}/community/otamatsuri-cosplay-nairobi`;
const heroImage = "/stills/otamatsuri/community/16.jpg";

export const metadata: Metadata = {
  title: {
    absolute: "Otamatsuri Cosplay in Nairobi | Photos from Kenya's Anime Festival Film",
  },
  description:
    "Twenty nine cinematic Otamatsuri cosplay photos shot in Nairobi, Kenya by Nataka Inc. Kenyan cosplayers, handmade armour and props, and the story behind every single frame.",
  keywords: [
    "Otamatsuri cosplay",
    "Otamatsuri cosplay Nairobi",
    "cosplay in Nairobi",
    "cosplay Kenya",
    "anime festival Kenya",
    "Kenyan cosplayers",
    "cosplay photography Nairobi",
    "Otamatsuri 2026",
    "anime convention Nairobi",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Otamatsuri Cosplay in Nairobi | Nataka Inc",
    description:
      "Twenty nine cinematic frames of Otamatsuri cosplay, shot in Nairobi with Kenyan cosplayers. Read it like a scroll.",
    url: pageUrl,
    type: "article",
    images: [{ url: `${siteUrl}${heroImage}`, width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Otamatsuri Cosplay in Nairobi | Nataka Inc",
    description:
      "Twenty nine cinematic frames of Otamatsuri cosplay, shot in Nairobi with Kenyan cosplayers.",
    images: [`${siteUrl}${heroImage}`],
  },
};

const faqs = [
  {
    q: "Where can I see Otamatsuri cosplay from Nairobi?",
    a: "Right here. This page holds the cosplay frames from the two Otamatsuri films Nataka Inc directed and produced in and around Nairobi. Otamatsuri itself is Kenya's anime and manga festival, organised by Movie Jabber, and the 2026 edition runs on Saturday 22 August 2026 at The Carnivore Grounds in Nairobi.",
  },
  {
    q: "Were these photos taken at the Otamatsuri convention?",
    a: "No, and that is worth saying. These are frames from the films, shot on location around Nairobi with Kenyan cosplayers rather than on the convention floor. That is why the light, the framing and the depth of field read the way they do. The festival floor is its own kind of brilliant, and this simply is not it.",
  },
  {
    q: "Who made the costumes and the props?",
    a: "The cosplayers did. The armour, the horned headdress, the greatsword and the ODM gear in these frames were all cut, layered, painted and fitted by hand by Kenyan cosplayers and prop makers from the local anime community.",
  },
  {
    q: "Can I repost these Otamatsuri cosplay pictures?",
    a: "Yes, for personal use. Repost them anywhere you like, just keep the credit to Nataka Inc on them. Six frames from the first shoot are also cut to 1080 by 1920 as free phone wallpapers on the community page.",
  },
  {
    q: "Can Nataka shoot my cosplay in Nairobi?",
    a: "Yes. We shoot cosplay, conventions and fan films in Nairobi and across Kenya, on the same cameras and the same grade you are looking at. Message us on WhatsApp with the character and the date you have in mind.",
  },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Community", item: `${siteUrl}/community` },
    { "@type": "ListItem", position: 3, name: "Otamatsuri Cosplay in Nairobi", item: pageUrl },
  ],
};

const gallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "@id": `${pageUrl}#gallery`,
  name: "Otamatsuri Cosplay in Nairobi",
  description:
    "Twenty nine cinematic frames of Otamatsuri cosplay, shot on location in and around Nairobi, Kenya with Kenyan cosplayers for the Otamatsuri films.",
  url: pageUrl,
  inLanguage: "en-KE",
  isPartOf: { "@id": `${siteUrl}/#website` },
  publisher: { "@id": `${siteUrl}/#org` },
  about: { "@type": "Event", name: "Otamatsuri", location: { "@type": "Place", name: "Nairobi, Kenya" } },
  associatedMedia: [...cosplayFrames, ...vol001Frames].map((frame) => ({
    "@type": "ImageObject",
    contentUrl: `${siteUrl}${frame.src}`,
    url: `${pageUrl}#${frame.slug}`,
    name: `${frame.title} (${frame.jp})`,
    caption: frame.alt,
    description: frame.description,
    width: 1920,
    height: 1080,
    creditText: "Nataka Inc",
    creator: { "@id": `${siteUrl}/#org` },
    copyrightNotice: "Nataka Inc",
    contentLocation: { "@type": "Place", name: "Nairobi, Kenya" },
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function OtamatsuriCosplayPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <a href="#scroll-main" className="skip-to-content">Skip to content</a>

      <main id="scroll-main" className="emaki min-h-screen text-cream overflow-hidden">
        {/* Paper ground, stacked: wash, pour clouds, plant fibre, laid lines
            and pulp speckle, then the edge burn. */}
        <div className="emaki-paper" aria-hidden />
        <div className="emaki-cloud" aria-hidden />
        <div className="emaki-fibre" aria-hidden />
        <div className="emaki-grain" aria-hidden />
        <div className="emaki-edge l" aria-hidden />
        <div className="emaki-edge r" aria-hidden />
        <div className="emaki-burn" aria-hidden />

        <div className="relative z-10">
          <Navbar />

          {/* ══ 軸 the head roller ══ */}
          <div className="pt-[72px] md:pt-[80px]" aria-hidden>
            <div className="emaki-rod">
              <i className="cap l" />
              <i className="cap r" />
            </div>
            <div className="emaki-silk" />
          </div>

          {/* ══════════ HERO ══════════ */}
          <section className="relative min-h-[74vh] md:min-h-[82vh] flex items-end overflow-hidden">
            <Image
              src={heroImage}
              alt="Otamatsuri cosplay in Nairobi: a Kenyan cosplayer in handmade armour backlit by the sunset, holding a scratch built blade"
              fill
              priority
              className="object-cover opacity-60"
              sizes="100vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0907] via-[#0B0907]/70 to-[#0B0907]/40" />

            {/* Huge 祭 watermark */}
            <span
              aria-hidden
              className="absolute -right-2 top-6 md:top-10 font-jp font-bold text-[clamp(9rem,30vw,26rem)] leading-none text-white/[0.05] select-none pointer-events-none"
            >
              祭
            </span>

            {/* Vertical title column, right edge */}
            <span
              aria-hidden
              className="hidden md:block absolute right-10 top-24 tate font-jp font-medium text-sm tracking-[0.32em] text-kin-light/50 select-none"
            >
              オタ祭コスプレ絵巻
            </span>

            <div className="relative w-full px-6 md:px-14 max-w-7xl mx-auto pb-14 md:pb-20">
              <Link
                href="/community"
                className="inline-block font-sans text-white/55 text-xs tracking-widest uppercase hover:text-shu-light transition-colors mb-8"
              >
                ← Community
              </Link>

              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-shu" />
                <p className="font-sans text-shu-light text-[10px] tracking-widest2 uppercase font-medium">
                  Cosplay · Nairobi · Kenya
                </p>
              </div>

              <h1 className="leading-none mb-5">
                <span className="font-geist font-black text-[clamp(2rem,8vw,6.6rem)] text-white uppercase block">
                  Otamatsuri Cosplay
                </span>
                <span className="font-display font-semibold italic text-[clamp(1.5rem,5vw,4rem)] text-shu-light block mt-2">
                  in Nairobi.
                </span>
              </h1>

              <p className="font-jp font-medium text-kin-light/80 text-base md:text-xl tracking-[0.18em] mb-1">
                オタ祭コスプレ絵巻
              </p>
              <p className="font-sans text-white/45 text-[10px] tracking-widest2 uppercase mb-7">
                Otamatsuri Kosupure Emaki · The Cosplay Picture Scroll
              </p>

              <p className="font-sans text-white/75 text-sm md:text-base leading-relaxed max-w-2xl">
                Twenty nine frames of Otamatsuri cosplay, shot in and around Nairobi by
                Nataka Inc across two Otamatsuri films. Kenyan cosplayers, armour and blades
                built by hand, real Kenyan locations, lit and graded like a film.
                Read it top to bottom like a scroll. Every frame has its name in kanji
                and the story of how it was made written underneath it.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href="#the-scroll"
                  className="font-geist font-black text-xs text-[#0B0907] bg-shu-light px-7 py-4 uppercase tracking-widest hover:bg-shu transition-colors duration-200"
                >
                  Unroll the scroll ↓
                </a>
                <Link
                  href="/otamatsuri-2026"
                  className="font-geist font-black text-xs text-white border border-white/25 px-7 py-4 uppercase tracking-widest hover:border-kin hover:text-kin-light transition-colors duration-200"
                >
                  Otamatsuri 2026 →
                </Link>
              </div>
            </div>
          </section>

          {/* ══════════ INTRO PLATE ══════════ */}
          <section className="px-6 md:px-14 max-w-7xl mx-auto pt-16 md:pt-24">
            <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10">
              <div className="hidden md:flex flex-col items-center gap-4 w-16 shrink-0">
                <span className="hanko font-jp font-bold w-12 h-16 text-[15px] leading-tight">
                  <span className="tate">序文</span>
                </span>
                <span className="emaki-cord flex-1 w-px min-h-[60px]" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-jp font-bold text-kin text-lg">序</span>
                  <span className="font-sans text-white/40 text-[10px] tracking-widest2 uppercase">
                    Jo · The opening
                  </span>
                </div>

                <h2 className="font-geist font-black text-white uppercase text-[clamp(1.3rem,4vw,2.6rem)] leading-none mb-5">
                  Kenya&apos;s cosplay scene showed up.
                  <br />
                  <span className="text-shu-light">So we brought the cinema glass.</span>
                </h2>

                <div className="brush-rule shu max-w-lg mb-6" aria-hidden />

                <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-4xl">
                  <p className="font-sans text-white/70 text-sm md:text-[15px] leading-relaxed">
                    Look at what this scene builds. Plate armour shaped from scratch, a
                    greatsword layered and painted by hand, a headdress built rib by rib,
                    ODM gear rigged to be worn for a whole day. People here put months
                    into one costume, and work like that has earned a camera that can
                    keep up with it.
                  </p>
                  <p className="font-sans text-white/70 text-sm md:text-[15px] leading-relaxed">
                    Nataka Inc directed and produced the promo film for Otamatsuri, the
                    anime and manga festival organised by Movie Jabber. We took Kenyan
                    cosplayers out of the hall, onto real locations, and shot them on
                    cinema glass. These frames are what came back.
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-3 mt-8 pt-6 border-t border-white/10">
                  {[
                    { jp: "廿九", label: "Frames in the scroll" },
                    { jp: "ナイロビ", label: "Shot around Nairobi" },
                    { jp: "手作り", label: "Every prop handmade" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-baseline gap-3">
                      <span className="font-jp font-bold text-shu-light text-xl">{stat.jp}</span>
                      <span className="font-sans text-white/45 text-[10px] tracking-widest2 uppercase">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════ THE SCROLL ══════════ */}
          <section id="the-scroll" className="px-6 md:px-14 max-w-7xl mx-auto py-16 md:py-24 scroll-mt-20">
            <div className="flex items-center gap-4 mb-12 md:mb-20">
              <span className="font-jp font-bold text-kin text-2xl md:text-3xl shrink-0">巻の一</span>
              <span className="brush-rule flex-1" aria-hidden />
              <span className="font-sans text-white/45 text-[10px] tracking-widest2 uppercase shrink-0">
                Maki no Ichi · Scroll one
              </span>
            </div>

            <CosplayScroll />
          </section>

          {/* ══════════ SCROLL TWO — the newer film ══════════ */}
          <section id="scroll-two" className="px-6 md:px-14 max-w-7xl mx-auto pb-16 md:pb-24 scroll-mt-20">
            <div className="flex items-center gap-4 mb-10 md:mb-14">
              <span className="font-jp font-bold text-kin text-2xl md:text-3xl shrink-0">巻の二</span>
              <span className="brush-rule flex-1" aria-hidden />
              <span className="font-sans text-white/45 text-[10px] tracking-widest2 uppercase shrink-0">
                Maki no Ni · Scroll two
              </span>
            </div>

            <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 mb-14 md:mb-20">
              <div className="hidden md:flex flex-col items-center gap-4 w-16 shrink-0">
                <span className="hanko font-jp font-bold w-12 h-16 text-[15px] leading-tight">
                  <span className="tate">新作</span>
                </span>
                <span className="emaki-cord flex-1 w-px min-h-[40px]" />
              </div>

              <div>
                <h2 className="font-geist font-black text-white uppercase text-[clamp(1.3rem,4vw,2.6rem)] leading-none mb-5">
                  A second film.
                  <br />
                  <span className="text-shu-light">New night, new cosplayers.</span>
                </h2>

                <div className="brush-rule shu max-w-lg mb-6" aria-hidden />

                <p className="font-sans text-white/70 text-sm md:text-[15px] leading-relaxed max-w-3xl">
                  These ten frames come from the newer Otamatsuri film, shot around
                  Nairobi with a different group of cosplayers. A shopping centre
                  staircase standing in for a city street, a rooftop in daylight, and
                  builds that range from a full Survey Corps rig to a horned helmet and
                  a hand painted axe. Each one carries the festival date in the corner,
                  because that is what they were cut for.
                </p>
              </div>
            </div>

            <CosplayScroll frames={vol001Frames} showCord={false} />
          </section>

          {/* ══════════ ABOUT OTAMATSURI ══════════ */}
          <section className="px-6 md:px-14 max-w-7xl mx-auto pb-16 md:pb-24">
            <div className="relative border border-kin/25 p-8 md:p-14 overflow-hidden">
              <span
                aria-hidden
                className="absolute -right-4 -top-8 font-jp font-bold text-[clamp(6rem,16vw,13rem)] leading-none text-white/[0.03] select-none pointer-events-none"
              >
                祭典
              </span>

              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-10 bg-kin" />
                  <p className="font-sans text-kin-light text-[10px] tracking-widest2 uppercase font-medium">
                    祭 · The festival
                  </p>
                </div>

                <h2 className="font-geist font-black text-white uppercase text-[clamp(1.3rem,4vw,2.6rem)] leading-none mb-6">
                  What Otamatsuri actually is
                </h2>

                <div className="grid md:grid-cols-2 gap-6 md:gap-12 max-w-4xl">
                  <p className="font-sans text-white/70 text-sm md:text-[15px] leading-relaxed">
                    Otamatsuri is Kenya&apos;s anime and manga festival, organised by Movie
                    Jabber. The 2026 edition goes fully outdoor on Saturday 22 August 2026
                    at The Carnivore Grounds in Nairobi, with cosplay competitions, anime
                    vendors, community meetups and an afterparty from 7PM.
                  </p>
                  <p className="font-sans text-white/70 text-sm md:text-[15px] leading-relaxed">
                    Nataka Inc directed and produced the promo film. The festival is theirs,
                    the film is ours, and the cosplay in both belongs to the people who spent
                    their own nights building it. If you are going, the date, the venue and
                    the tickets are on the event page.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-9">
                  <Link
                    href="/otamatsuri-2026"
                    className="font-geist font-black text-xs text-[#0B0907] bg-kin px-7 py-4 uppercase tracking-widest hover:bg-kin-light transition-colors duration-200"
                  >
                    Otamatsuri 2026 details →
                  </Link>
                  <Link
                    href="/work/otamatsuri-promo-film"
                    className="font-geist font-black text-xs text-white border border-white/25 px-7 py-4 uppercase tracking-widest hover:border-shu hover:text-shu-light transition-colors duration-200"
                  >
                    How the film was made →
                  </Link>
                  <Link
                    href="/community#wallpapers"
                    className="font-geist font-black text-xs text-white border border-white/25 px-7 py-4 uppercase tracking-widest hover:border-shu hover:text-shu-light transition-colors duration-200"
                  >
                    Free wallpapers ↓
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════ FAQ ══════════ */}
          <section className="px-6 md:px-14 max-w-7xl mx-auto pb-16 md:pb-24">
            <div className="flex items-center gap-4 mb-10 md:mb-14">
              <span className="font-jp font-bold text-kin text-2xl md:text-3xl shrink-0">問</span>
              <span className="brush-rule flex-1" aria-hidden />
              <span className="font-sans text-white/45 text-[10px] tracking-widest2 uppercase shrink-0">
                Mon · Questions
              </span>
            </div>

            <div className="max-w-4xl divide-y divide-white/10 border-y border-white/10">
              {faqs.map((f, i) => (
                <div key={f.q} className="py-7 md:py-8 grid md:grid-cols-[auto_1fr] gap-4 md:gap-8">
                  <span className="font-jp font-bold text-shu-light text-lg md:text-xl md:w-10 shrink-0">
                    {["一", "二", "三", "四", "五"][i]}
                  </span>
                  <div>
                    <h3 className="font-geist font-black text-white uppercase text-sm md:text-base leading-snug mb-3">
                      {f.q}
                    </h3>
                    <p className="font-sans text-white/65 text-sm leading-relaxed">{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════ CTA ══════════ */}
          <section className="px-6 md:px-14 max-w-7xl mx-auto pb-20 md:pb-28">
            <div
              className="relative overflow-hidden border border-shu/30 p-8 md:p-14"
              style={{
                background:
                  "linear-gradient(135deg, rgba(193,39,45,0.15) 0%, rgba(193,39,45,0.04) 55%, rgba(193,39,45,0) 100%)",
              }}
            >
              <span
                aria-hidden
                className="absolute right-6 -bottom-8 font-jp font-bold text-[clamp(5rem,14vw,11rem)] leading-none text-white/[0.035] select-none pointer-events-none"
              >
                撮影
              </span>

              <div className="relative">
                <p className="font-sans text-shu-light text-[10px] tracking-widest2 uppercase font-medium mb-5">
                  撮影 · Get yours shot
                </p>

                <h2 className="leading-none mb-5">
                  <span className="font-geist font-black text-[clamp(1.4rem,5vw,3.6rem)] text-white uppercase block">
                    You built it for months.
                  </span>
                  <span className="font-display font-semibold italic text-[clamp(1.4rem,5vw,3.6rem)] text-shu-light block">
                    Shoot it like this.
                  </span>
                </h2>

                <p className="font-sans text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
                  Nataka Inc shoots cosplay, conventions and fan films in Nairobi and across
                  Kenya, on the same cameras and the same grade you just scrolled through.
                  Tell us the character and the date and we will tell you what it takes.
                </p>

                <a
                  href={waLink(
                    "I want a cosplay shoot in Nairobi like the Otamatsuri scroll page.\n\nCharacter:\nDate I have in mind:\nWhere I am based:"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-geist font-black text-xs text-[#0B0907] bg-shu-light px-8 py-4 uppercase tracking-widest hover:bg-shu transition-colors duration-200"
                >
                  WhatsApp us →
                </a>
              </div>
            </div>
          </section>

          {/* ══ 軸 the foot roller ══ */}
          <div aria-hidden>
            <div className="emaki-silk" />
            <div className="emaki-rod">
              <i className="cap l" />
              <i className="cap r" />
            </div>
          </div>

          <Footer />
        </div>
      </main>
    </>
  );
}
