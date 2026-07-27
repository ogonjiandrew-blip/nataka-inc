import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Countdown from "@/components/community/Countdown";

/*
 * Dedicated landing page targeting "Otamatsuri 2026".
 *
 * Nataka does NOT organise this festival — Movie Jabber does. Everything here
 * credits them and links to official ticketing. Our claim is narrow and true:
 * we directed and produced the promo film, so we have the imagery no one else has.
 */

const siteUrl = "https://www.natakainc.com";
const TICKETS = "https://events.gig.co.ke/event/gev_1171/ticket";
const ORGANISER = "https://moviejabber.world/otamatsuri-2026-tickets-event-details/";
// The promo film, released by the organisers on their own channel.
const FILM = "https://www.instagram.com/p/DbGb8UVum-c/";

export const metadata: Metadata = {
  title: { absolute: "Otamatsuri 2026 — Kenya's Anime Festival | Date, Venue & Tickets" },
  description:
    "Otamatsuri 2026 is Kenya's anime and manga convention — Saturday 22 August 2026 at The Carnivore Grounds, Nairobi. Full date, times, venue, ticket prices and what's happening, plus free Otamatsuri wallpapers.",
  keywords: [
    "Otamatsuri 2026",
    "Otamatsuri",
    "Otamatsuri Kenya",
    "Otamatsuri tickets",
    "anime festival Kenya",
    "anime convention Nairobi",
    "cosplay Kenya",
    "The Carnivore Grounds",
  ],
  alternates: { canonical: `${siteUrl}/otamatsuri-2026` },
  openGraph: {
    title: "Otamatsuri 2026 — Kenya's Anime Festival | Date, Venue & Tickets",
    description:
      "Saturday 22 August 2026 at The Carnivore Grounds, Nairobi. Cosplay competitions, Japanese performances, vendors, gaming and an overnight LAN party.",
    url: `${siteUrl}/otamatsuri-2026`,
    type: "website",
    images: [{ url: `${siteUrl}/stills/otamatsuri/community/1.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Otamatsuri 2026 — Kenya's Anime Festival",
    description: "Sat 22 Aug 2026 · The Carnivore Grounds, Nairobi. Date, tickets and what to expect.",
    images: [`${siteUrl}/stills/otamatsuri/community/1.jpg`],
  },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Otamatsuri 2026",
  alternateName: "Otamatsuri 2026 — Anime & Manga Convention",
  startDate: "2026-08-22T10:00:00+03:00",
  endDate: "2026-08-23T08:00:00+03:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  description:
    "Otamatsuri 2026 is Kenya's anime and manga convention, held fully outdoors at The Carnivore Grounds in Langata, Nairobi. The day features Japanese musical performances, cosplay and webtoon competitions, anime merchandise vendors, Japanese cuisine, gaming stations, an overnight LAN party and an 18+ after-party.",
  image: [
    `${siteUrl}/stills/otamatsuri/community/1.jpg`,
    `${siteUrl}/stills/otamatsuri/community/19.jpg`,
    `${siteUrl}/stills/otamatsuri/community/17.jpg`,
  ],
  location: {
    "@type": "Place",
    name: "The Carnivore Grounds",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Langata Road",
      addressLocality: "Langata",
      addressRegion: "Nairobi",
      addressCountry: "KE",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Movie Jabber",
    url: ORGANISER,
    sameAs: ["https://moviejabber.world/"],
  },
  // Deliberately no price in the markup. Ticket prices move in phases and the
  // live checkout has already diverged from the organiser's published schedule
  // — publishing a stale price for someone else's event is worse than omitting
  // it. The offer points at the official seller, which is the source of truth.
  offers: {
    "@type": "Offer",
    url: TICKETS,
    availability: "https://schema.org/InStock",
    priceCurrency: "KES",
  },
  isAccessibleForFree: false,
  inLanguage: "en",
};

const faqs = [
  {
    q: "When is Otamatsuri 2026?",
    a: "Otamatsuri 2026 runs from Saturday 22 August 2026 at 10:00am through to Sunday 23 August at 8:00am. The main convention day runs until about 7pm, with an 18+ after-party and an overnight LAN party continuing into Sunday morning.",
  },
  {
    q: "Where is Otamatsuri 2026 held?",
    a: "At The Carnivore Grounds in Langata, Nairobi. This is the first year the convention is fully outdoor.",
  },
  {
    q: "How much are Otamatsuri 2026 tickets?",
    a: "Tickets are sold in phases and the price rises the closer you get to the day, so earlier is cheaper. Movie Jabber sets and sells them — check the official ticket page for the current price rather than relying on figures quoted elsewhere.",
  },
  {
    q: "What happens at Otamatsuri?",
    a: "Japanese musical performances, cosplay and webtoon competitions, anime merchandise vendors, Japanese cuisine, gaming stations, an overnight LAN party, fan performances, kids' activities and a parents' lounge, plus an 18+ after-party in the evening.",
  },
  {
    q: "Who organises Otamatsuri?",
    a: "Otamatsuri is organised by Movie Jabber. Nataka Inc directed and produced the festival's cinematic promo film — we are the studio behind the visuals, not the event organiser.",
  },
  {
    q: "Is Otamatsuri family friendly?",
    a: "The daytime convention includes kids' activities such as jumping castles and face painting, along with a parents' lounge. The after-party from the evening onwards is 18+ only.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Community", item: `${siteUrl}/community` },
    { "@type": "ListItem", position: 3, name: "Otamatsuri 2026", item: `${siteUrl}/otamatsuri-2026` },
  ],
};

const facts = [
  { label: "Date", value: "Saturday 22 August 2026" },
  { label: "Time", value: "10:00am – 7:00pm, then after-party until 8:00am Sunday" },
  { label: "Venue", value: "The Carnivore Grounds, Langata, Nairobi" },
  { label: "Tickets", value: "Sold by Movie Jabber — see the official ticket page for current pricing" },
  { label: "Organiser", value: "Movie Jabber" },
  { label: "Promo film", value: "Directed & produced by Nataka Inc" },
];

const happening = [
  { jp: "音楽", title: "Japanese Music Performances", desc: "Live sets on an outdoor stage." },
  { jp: "変身", title: "Cosplay & Webtoon Competitions", desc: "The main event for Kenya's cosplay scene." },
  { jp: "屋台", title: "Vendors & Japanese Food", desc: "Anime merch stalls and Japanese cuisine." },
  { jp: "遊戯", title: "Gaming & Overnight LAN Party", desc: "Gaming stations running through the night." },
  { jp: "家族", title: "Kids' Zone & Parents' Lounge", desc: "Jumping castles, face painting, somewhere to sit." },
  { jp: "夜", title: "18+ After-Party", desc: "Runs from the evening into Sunday morning." },
];

export default function Otamatsuri2026Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <a href="#otamatsuri-main" className="skip-to-content">Skip to content</a>

      <main id="otamatsuri-main" className="bg-ink text-cream min-h-screen">
        <Navbar />

        {/* Hero */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
          <Image
            src="/stills/otamatsuri/community/1.jpg"
            alt="Otamatsuri 2026 — cosplayer in full armour raising a sword, from the festival promo film shot in Kenya by Nataka Inc"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/40" />

          <span aria-hidden className="absolute right-2 top-24 md:top-28 font-geist font-black text-[clamp(4rem,15vw,12rem)] leading-none text-white/[0.05] select-none pointer-events-none">
            オタ祭
          </span>

          <div className="relative w-full px-6 md:px-12 max-w-7xl mx-auto pb-14 md:pb-20">
            <Link href="/community" className="inline-block font-sans text-white/55 text-xs tracking-widest uppercase hover:text-otaku-light transition-colors mb-8">
              ← The Community
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-otaku" />
              <p className="font-sans text-otaku-light text-[10px] tracking-widest2 uppercase font-medium">
                Sat 22 Aug 2026 · The Carnivore Grounds, Nairobi
              </p>
            </div>

            {/* Deference above the fold: this is not the official event site. */}
            <p className="font-sans text-white/60 text-[11px] md:text-xs leading-relaxed mb-6 max-w-2xl">
              Organised by{" "}
              <a href={ORGANISER} target="_blank" rel="noopener noreferrer" className="text-white underline decoration-otaku decoration-2 underline-offset-4 hover:text-otaku-light transition-colors">
                Movie Jabber
              </a>
              . This is a fan guide by Nataka Inc, the studio that made the promo film — not the
              official Otamatsuri site. Tickets and announcements come from the organisers.
            </p>

            <h1 className="leading-none mb-6">
              <span className="font-geist font-black text-[clamp(2.4rem,10vw,8rem)] text-white uppercase block">
                Otamatsuri
              </span>
              <span className="font-display font-semibold italic text-[clamp(2.4rem,10vw,8rem)] text-otaku block">
                2026.
              </span>
            </h1>

            <p className="font-sans text-white/80 text-sm md:text-lg leading-relaxed max-w-2xl">
              Kenya&apos;s anime and manga convention goes fully outdoor this year — cosplay
              competitions, Japanese performances, vendors, gaming and an overnight LAN
              party at The Carnivore Grounds. Nataka Inc directed and produced the
              festival&apos;s promo film.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <a href={TICKETS} target="_blank" rel="noopener noreferrer"
                className="font-geist font-black text-xs text-ink bg-otaku px-7 py-4 uppercase tracking-widest hover:bg-otaku-light transition-colors duration-200">
                Get Tickets →
              </a>
              <a href={FILM} target="_blank" rel="noopener noreferrer"
                className="font-geist font-black text-xs text-white border border-white/25 px-7 py-4 uppercase tracking-widest hover:border-otaku hover:text-otaku-light transition-colors duration-200">
                Watch the Promo Film
              </a>
            </div>
          </div>
        </section>

        <Countdown />

        {/* Facts */}
        <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <h2 className="leading-none mb-10 md:mb-14">
            <span className="font-geist font-black text-[clamp(1.6rem,5vw,3.5rem)] text-white uppercase block">Everything You</span>
            <span className="font-display font-semibold italic text-[clamp(1.6rem,5vw,3.5rem)] text-otaku block">Need to Know.</span>
          </h2>

          <dl className="border-t border-white/10">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col sm:flex-row gap-1 sm:gap-8 py-5 border-b border-white/10">
                <dt className="font-sans text-[10px] text-otaku-light tracking-widest uppercase sm:w-44 shrink-0 pt-1 font-medium">{f.label}</dt>
                <dd className="font-sans text-white/85 text-sm md:text-base">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 border border-otaku/30 bg-otaku/[0.05] p-6">
            <p className="font-sans text-white/80 text-sm leading-relaxed">
              <span className="font-geist font-black text-otaku-light uppercase text-xs tracking-widest">Heads up · </span>
              Ticket prices rise in phases as the day gets closer, so going early is the cheapest it will be.
              Prices are set by the organisers —{" "}
              <a href={TICKETS} target="_blank" rel="noopener noreferrer" className="text-otaku-light underline underline-offset-2 hover:text-white transition-colors">
                check the official ticket page
              </a>{" "}
              for what it costs today.
            </p>
          </div>
        </section>

        {/* What's happening */}
        <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-otaku" />
            <p className="font-sans text-otaku-light text-[10px] tracking-widest2 uppercase font-medium">On the day</p>
          </div>
          <h2 className="leading-none mb-12 md:mb-16">
            <span className="font-geist font-black text-[clamp(1.6rem,5vw,3.5rem)] text-white uppercase block">What&apos;s</span>
            <span className="font-display font-semibold italic text-[clamp(1.6rem,5vw,3.5rem)] text-otaku block">Happening.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {happening.map((h) => (
              <div key={h.title} className="border border-white/8 bg-white/[0.02] hover:border-otaku/30 transition-colors duration-300 p-6 md:p-7 group">
                <span aria-hidden className="font-geist font-black text-otaku/70 text-base block mb-4 group-hover:text-otaku-light transition-colors duration-300">{h.jp}</span>
                <h3 className="font-geist font-black text-white text-sm uppercase mb-2 leading-tight">{h.title}</h3>
                <p className="font-sans text-white/60 text-xs leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The film + free stuff */}
        <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-video overflow-hidden border border-white/10">
              <Image
                src="/stills/otamatsuri/community/19.jpg"
                alt="Still from the Otamatsuri promo film — two cosplayers silhouetted against a Kenyan sunset, directed by Nataka Inc"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={80}
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-otaku" />
                <p className="font-sans text-otaku-light text-[10px] tracking-widest2 uppercase font-medium">The Promo Film</p>
              </div>
              <h2 className="font-geist font-black text-[clamp(1.5rem,4.5vw,3rem)] text-white uppercase leading-none mb-5">
                We shot it.<br /><span className="font-display font-semibold italic normal-case text-otaku">See the frames.</span>
              </h2>
              <p className="font-sans text-white/70 text-sm md:text-base leading-relaxed mb-7">
                Nataka Inc directed and produced Otamatsuri&apos;s cinematic promo film in Kenya,
                with Kenyan cosplayers and prop-makers. It&apos;s out now on Movie Jabber&apos;s
                channel — watch it there, then take the frames.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={FILM} target="_blank" rel="noopener noreferrer" className="font-geist font-black text-xs text-ink bg-otaku px-7 py-4 uppercase tracking-widest hover:bg-otaku-light transition-colors duration-200">
                  Watch the Film →
                </a>
                <Link href="/community#wallpapers" className="font-geist font-black text-xs text-white border border-white/25 px-7 py-4 uppercase tracking-widest hover:border-otaku hover:text-otaku-light transition-colors duration-200">
                  Free Wallpapers ↓
                </Link>
                <Link href="/community#photocard" className="font-geist font-black text-xs text-white border border-white/25 px-7 py-4 uppercase tracking-widest hover:border-otaku hover:text-otaku-light transition-colors duration-200">
                  Make a Photocard
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <h2 className="leading-none mb-12 md:mb-16">
            <span className="font-geist font-black text-[clamp(1.6rem,5vw,3.5rem)] text-white uppercase block">Otamatsuri 2026</span>
            <span className="font-display font-semibold italic text-[clamp(1.6rem,5vw,3.5rem)] text-otaku block">Questions.</span>
          </h2>

          <div className="border-t border-white/10">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-white/10 py-5">
                <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                  <h3 className="font-geist font-black text-white text-sm md:text-base uppercase leading-tight group-hover:text-otaku-light transition-colors">
                    {f.q}
                  </h3>
                  <span aria-hidden className="text-otaku text-xl leading-none shrink-0 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="font-sans text-white/70 text-sm leading-relaxed mt-4 max-w-3xl">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 md:px-12 pb-24 md:pb-32 max-w-7xl mx-auto">
          <div className="border border-otaku/25 p-8 md:p-14" style={{ background: "linear-gradient(135deg, rgba(232,68,46,0.12) 0%, rgba(232,68,46,0.02) 60%, rgba(232,68,46,0) 100%)" }}>
            <h2 className="font-geist font-black text-[clamp(1.5rem,5vw,3.4rem)] text-white uppercase leading-none mb-5">
              See you at <span className="text-otaku">The Carnivore.</span>
            </h2>
            <p className="font-sans text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
              Otamatsuri is organised and ticketed by{" "}
              <a href={ORGANISER} target="_blank" rel="noopener noreferrer" className="text-white underline decoration-otaku decoration-2 underline-offset-4 hover:text-otaku-light transition-colors">
                Movie Jabber
              </a>
              {" "}— head to their page for the full line-up and official announcements. If
              you&apos;re cosplaying, send us your shots afterwards; the fan wall is open and
              Kenyan cosplayers get the credit.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={TICKETS} target="_blank" rel="noopener noreferrer" className="font-geist font-black text-xs text-ink bg-otaku px-8 py-4 uppercase tracking-widest hover:bg-otaku-light transition-colors duration-200">
                Get Tickets →
              </a>
              <Link href="/community#fan-wall" className="font-geist font-black text-xs text-white border border-white/25 px-8 py-4 uppercase tracking-widest hover:border-otaku hover:text-otaku-light transition-colors duration-200">
                Get On the Fan Wall
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
