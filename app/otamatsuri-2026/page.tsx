import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Countdown from "@/components/community/Countdown";
import WhatsAppJoin from "@/components/community/WhatsAppJoin";

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

/*
 * VideoObject rich results require a real uploadDate, and lib/community.ts sets
 * the house rule for this whole section: never publish a date we cannot stand
 * behind. We do not have a confirmed publish date for the promo film, so until
 * this holds the true ISO date the VideoObject block is simply not emitted.
 * Set it (e.g. "2026-07-19") and the schema turns itself on.
 */
const FILM_UPLOAD_DATE: string | null = null;

/*
 * ── THE RECAP SWITCH ────────────────────────────────────────────────────────
 * Before the festival this page targets "Otamatsuri 2026 tickets / date / venue"
 * — queries the ticket seller and the organiser already own.
 *
 * Within 48h of the day, fill `winners`, `photos` and `summary`, flip `live` to
 * true, and the same URL re-points at the post-event queries nobody owns:
 * "Otamatsuri 2026 photos", "cosplay winners", "recap". Same URL, so every bit
 * of accrued signal carries over and there is no redirect to lose it.
 *
 * Everything below stays empty until it is real. An empty array renders nothing
 * rather than a placeholder.
 */
const RECAP = {
  live: false,
  /** Competition results. Only ever filled from the organiser's announcement. */
  winners: [] as { category: string; name: string; character?: string }[],
  /** Shot on the day. Name files like the search: otamatsuri-2026-cosplay-<subject>.jpg */
  photos: [] as { src: string; alt: string }[],
  /** Two or three sentences on how the day actually went. Written after, not before. */
  summary: "",
};

/*
 * ── THE THREE PHASES ────────────────────────────────────────────────────────
 * This page has to be correct on a night when Andrew is behind a camera and
 * nobody is at a keyboard, so the middle phase happens by itself.
 *
 *   before : tickets, date, venue. Countdown running.
 *   after  : the festival has ended but the gallery is not built yet. Tickets
 *            disappear and everything points at the channel, because that is
 *            where the footage lands first and it is where the people
 *            searching "otamatsuri photos" on Saturday night should go.
 *   recap  : the gallery is published. Set by filling RECAP and flipping live.
 *
 * "after" is purely a function of the clock. "recap" is the one manual step,
 * because only a human knows when the photos are actually ready.
 */
const EVENT_END = "2026-08-23T08:00:00+03:00"; // matches eventSchema.endDate

const eventIsOver = Date.now() >= Date.parse(EVENT_END);
const PHASE: "before" | "after" | "recap" = RECAP.live
  ? "recap"
  : eventIsOver
    ? "after"
    : "before";

/*
 * CRITICAL: without this the page is statically generated once at build time,
 * Date.now() freezes at whatever the build machine's clock said, and the page
 * would still be selling tickets to a finished festival forever. Five minutes
 * of lag on "the event ended" costs nothing; being permanently wrong costs the
 * whole play.
 */
export const revalidate = 300;

const preMeta = {
  title: "Otamatsuri 2026 — Kenya's Anime Festival | Date, Venue & Tickets",
  description:
    "Otamatsuri 2026 is Kenya's anime and manga convention — Saturday 22 August 2026 at The Carnivore Grounds, Nairobi. Full date, times, venue, ticket prices and what's happening, plus free Otamatsuri wallpapers.",
  ogDescription:
    "Saturday 22 August 2026 at The Carnivore Grounds, Nairobi. Cosplay competitions, Japanese performances, vendors, gaming and an overnight LAN party.",
};

const recapMeta = {
  title: "Otamatsuri 2026 Photos & Recap — Cosplay Winners, Carnivore Grounds Nairobi",
  description:
    "Otamatsuri 2026 in photos — Kenya's anime and manga convention, 22 August 2026 at The Carnivore Grounds, Nairobi. Cosplay competition winners, the performances and the full gallery, shot by Nataka Inc.",
  ogDescription:
    "Kenya's anime festival in photos — cosplay winners, performances and the full gallery from The Carnivore Grounds, shot by Nataka Inc.",
};

/*
 * The "after" title deliberately targets the post-event queries the moment the
 * festival ends, because that is when they spike. It promises the channel, not
 * a gallery that does not exist yet: everything it claims is true at the second
 * it goes live.
 */
const afterMeta = {
  title: "Otamatsuri 2026 Photos & Footage — The Carnivore Grounds, Nairobi",
  description:
    "Otamatsuri 2026 has wrapped at The Carnivore Grounds, Nairobi. Photos and footage shot by Nataka Inc drop in the NATAKA WAVE channel first, at full resolution, before the full gallery is published here.",
  ogDescription:
    "Kenya's anime festival has wrapped. Photos and footage from The Carnivore Grounds land in the NATAKA WAVE channel first, shot by Nataka Inc.",
};

const activeMeta =
  PHASE === "recap" ? recapMeta : PHASE === "after" ? afterMeta : preMeta;

const heroImage = RECAP.photos.length
  ? `${siteUrl}${RECAP.photos[0].src}`
  : `${siteUrl}/stills/otamatsuri/community/1.jpg`;

export const metadata: Metadata = {
  title: { absolute: activeMeta.title },
  description: activeMeta.description,
  keywords: PHASE !== "before"
    ? [
        "Otamatsuri 2026 photos",
        "Otamatsuri 2026 footage",
        "Otamatsuri 2026 recap",
        "Otamatsuri cosplay winners",
        "Otamatsuri 2026",
        "Otamatsuri Kenya",
        "cosplay Kenya",
        "anime convention Nairobi",
        "The Carnivore Grounds",
      ]
    : [
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
    title: activeMeta.title,
    description: activeMeta.ogDescription,
    url: `${siteUrl}/otamatsuri-2026`,
    type: "website",
    images: [{ url: heroImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: activeMeta.title,
    description: activeMeta.ogDescription,
    images: [heroImage],
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
    // Once the recap is live these lead, because they are the images the
    // post-event searches are actually looking for.
    ...RECAP.photos.slice(0, 6).map((p) => `${siteUrl}${p.src}`),
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
  // Once the day has passed the offer is dropped entirely: advertising InStock
  // tickets to a finished event is a false signal to both Google and readers.
  // Driven by the clock, not by a human remembering to flip something.
  ...(PHASE !== "before"
    ? {}
    : {
        offers: {
          "@type": "Offer",
          url: TICKETS,
          availability: "https://schema.org/InStock",
          priceCurrency: "KES",
        },
      }),
  isAccessibleForFree: false,
  inLanguage: "en",
};

/*
 * The promo film. Gated on a confirmed upload date — see FILM_UPLOAD_DATE.
 * Instagram is a walled garden that Google indexes poorly, so this is how the
 * film becomes findable from the open web at all.
 */
const videoSchema = FILM_UPLOAD_DATE
  ? {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Otamatsuri 2026 — Official Promo Film",
      description:
        "The cinematic promo film for Otamatsuri 2026, Kenya's anime and manga convention. Directed and produced by Nataka Inc with Kenyan cosplayers and prop-makers, shot on location in Kenya.",
      thumbnailUrl: [`${siteUrl}/stills/otamatsuri/community/19.jpg`],
      uploadDate: FILM_UPLOAD_DATE,
      contentUrl: FILM,
      embedUrl: FILM,
      creator: {
        "@type": "Organization",
        name: "Nataka Inc",
        url: siteUrl,
      },
      inLanguage: "en",
    }
  : null;

/*
 * The recap gallery, as an ImageGallery of ImageObjects. This is the play for
 * image search on "Otamatsuri cosplay" — a query with photos all over Instagram
 * and nothing indexable on the open web.
 */
const gallerySchema =
  RECAP.live && RECAP.photos.length
    ? {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        name: "Otamatsuri 2026 — Photo Gallery",
        description:
          "Photographs from Otamatsuri 2026, Kenya's anime and manga convention at The Carnivore Grounds, Nairobi, shot by Nataka Inc.",
        url: `${siteUrl}/otamatsuri-2026#recap`,
        image: RECAP.photos.map((p) => ({
          "@type": "ImageObject",
          contentUrl: `${siteUrl}${p.src}`,
          description: p.alt,
          creditText: "Nataka Inc",
          creator: { "@type": "Organization", name: "Nataka Inc", url: siteUrl },
          copyrightNotice: "© Nataka Inc",
          contentLocation: {
            "@type": "Place",
            name: "The Carnivore Grounds, Langata, Nairobi",
          },
        })),
      }
    : null;

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
  /*
   * Long-tail block. These are questions real attendees type and that nobody
   * has written a page for — the ticket sellers only answer "how much" and
   * "where". Every answer here is either an established fact, something safely
   * knowable (an outdoor venue in Nairobi in August), or an honest hand-off to
   * the organiser. Nothing about policy is invented.
   */
  {
    q: "What should I wear to Otamatsuri 2026?",
    a: "This is the first fully outdoor Otamatsuri, and August is Nairobi's coldest, greyest month — overcast days and genuinely cold nights. Dress for sun and wind during the day and bring a real layer for after dark, especially if you are staying for the after-party or the overnight LAN. If you are cosplaying, factor in that you will be outside on grass all day: consider how your shoes handle uneven ground, how your wig and makeup handle wind, and whether your build can take a light drizzle.",
  },
  {
    q: "How do I get to The Carnivore Grounds?",
    a: "The Carnivore is on Langata Road in Langata, southwest of the Nairobi CBD and close to Wilson Airport. It is a long-established venue on a major road, so ride-hailing apps recognise it by name and Langata Road public transport runs past it. Search for \"Carnivore Nairobi\" to drop an accurate pin rather than navigating to Langata generally.",
  },
  {
    q: "Is there parking at Otamatsuri 2026?",
    a: "The Carnivore Grounds is a long-running large-events venue with substantial on-site parking, which is part of why the convention moved there for its first fully outdoor year. Event-day parking arrangements and any charges are set by the organisers and the venue, so confirm the specifics with Movie Jabber before the day.",
  },
  {
    q: "Can I bring cosplay props and prop weapons to Otamatsuri?",
    a: "Prop and prop-weapon rules are set by the organisers and venue security, not by us, and they are worth checking before you build rather than at the gate. If your cosplay involves anything blade-shaped, oversized, or that could read as a weapon from a distance, ask Movie Jabber directly what is allowed and how it needs to be peace-bonded or transported.",
  },
  {
    q: "What is the overnight LAN party at Otamatsuri?",
    a: "Gaming stations run through the night after the main convention day ends, continuing until around 8:00am on Sunday 23 August. It runs alongside the 18+ after-party, so it is the option if you want to stay the night without being in the party itself.",
  },
  {
    q: "What time does Otamatsuri 2026 start and when should I arrive?",
    a: "Doors are from 10:00am on Saturday 22 August, with the main convention day running until about 7:00pm. Cosplay competitions and stage performances are the things people travel for, and their running order comes from the organisers closer to the day — check Movie Jabber's channels for the schedule if you are timing your arrival around a specific competition.",
  },
  {
    q: "Can I take photos at Otamatsuri, and can I photograph cosplayers?",
    a: "Yes, and it is a big part of the day. The one rule that matters: ask a cosplayer before you photograph them, and ask again before you post. People have spent months and real money on those builds and almost everyone says yes when asked. If you shoot someone, credit them. Kenyan cosplayers get very little of it.",
  },
  {
    q: "How is Otamatsuri 2026 different from previous years?",
    a: "This is the first fully outdoor edition. Previous years were held indoors; moving to The Carnivore Grounds means more space, more room for vendors and activities across the grounds, and a day that runs on outdoor rather than hall logistics — which changes what you wear, what you carry and how long you can comfortably stay.",
  },
  {
    q: "Is Otamatsuri worth going to if I'm not deep into anime?",
    a: "It is the largest gathering of Kenya's cosplay, gaming and Japanese-culture scene in the year, and most of what makes it good — the craft on the costumes, the live performances, the food, the people-watching — does not require you to recognise the characters. If you are going with someone who is deep into it, you will not be bored.",
  },
];

/*
 * Post-event questions. These only appear once the recap is live, and the
 * winners question only appears once there are actually winners to name.
 * "Who won the cosplay competition at Otamatsuri" is the single highest-intent
 * post-event query and currently has no answer anywhere on the open web.
 */
const recapFaqs = RECAP.live
  ? [
      ...(RECAP.winners.length
        ? [
            {
              q: "Who won the cosplay competition at Otamatsuri 2026?",
              a: `${RECAP.winners
                .map((w) => `${w.category}: ${w.name}${w.character ? ` as ${w.character}` : ""}`)
                .join(". ")}. Results as announced by the organisers on the day at The Carnivore Grounds.`,
            },
          ]
        : []),
      ...(RECAP.summary
        ? [{ q: "How was Otamatsuri 2026?", a: RECAP.summary }]
        : []),
      ...(RECAP.photos.length
        ? [
            {
              q: "Where can I see photos from Otamatsuri 2026?",
              a: "Nataka Inc shot the festival at The Carnivore Grounds and the full gallery is on this page. The photographs are free to look at and free to share with credit. If you are in one of them and want the full-resolution file, get in touch and we will send it.",
            },
          ]
        : []),
    ]
  : [];

const allFaqs = [...recapFaqs, ...faqs];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((f) => ({
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
      {videoSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
      )}
      {gallerySchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }} />
      )}

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

            {/*
              The {" "} is load-bearing. Both spans are block-level, so without an
              explicit text node between them the H1's text content extracts as
              "Otamatsuri2026." — one token, which is not the keyword.
            */}
            <h1 className="leading-none mb-6">
              <span className="font-geist font-black text-[clamp(2.4rem,10vw,8rem)] text-white uppercase block">
                Otamatsuri
              </span>
              {" "}
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
              {PHASE === "recap" && (
                <a href="#recap"
                  className="font-geist font-black text-xs text-ink bg-otaku px-7 py-4 uppercase tracking-widest hover:bg-otaku-light transition-colors duration-200">
                  See the Photos →
                </a>
              )}
              {/* Sends them to the pitch, not straight out to WhatsApp. They
                  should read why the room exists before they walk into it. */}
              {PHASE === "after" && (
                <a href="#whatsapp"
                  className="font-geist font-black text-xs text-ink bg-otaku px-7 py-4 uppercase tracking-widest hover:bg-otaku-light transition-colors duration-200">
                  Get the Footage →
                </a>
              )}
              {PHASE === "before" && (
                <a href={TICKETS} target="_blank" rel="noopener noreferrer"
                  className="font-geist font-black text-xs text-ink bg-otaku px-7 py-4 uppercase tracking-widest hover:bg-otaku-light transition-colors duration-200">
                  Get Tickets →
                </a>
              )}
              <a href={FILM} target="_blank" rel="noopener noreferrer"
                className="font-geist font-black text-xs text-white border border-white/25 px-7 py-4 uppercase tracking-widest hover:border-otaku hover:text-otaku-light transition-colors duration-200">
                Watch the Promo Film
              </a>
            </div>
          </div>
        </section>

        {/* A countdown to a day that has already happened is just a broken clock. */}
        {PHASE === "before" && <Countdown />}

        {/*
          Takes the countdown's place the moment the festival ends. This is the
          band that catches everyone searching "otamatsuri photos" on Saturday
          night, before any gallery exists to show them.
        */}
        {PHASE === "after" && (
          <section className="px-6 md:px-12 max-w-7xl mx-auto pt-14 md:pt-20">
            <div className="border border-otaku/25 p-8 md:p-12" style={{ background: "linear-gradient(135deg, rgba(232,68,46,0.12) 0%, rgba(232,68,46,0.02) 60%, rgba(232,68,46,0) 100%)" }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-otaku" />
                <p className="font-sans text-otaku-light text-[10px] tracking-widest2 uppercase font-medium">
                  22 August 2026 · That&apos;s a wrap
                </p>
              </div>
              <h2 className="font-geist font-black text-[clamp(1.5rem,4.5vw,3rem)] text-white uppercase leading-none mb-5">
                It&apos;s done.{" "}
                <span className="font-display font-semibold italic normal-case text-otaku block">
                  We got all of it.
                </span>
              </h2>
              <p className="font-sans text-white/75 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
                Every frame from The Carnivore Grounds is being cut and graded right
                now. The footage and the photos land in the channel first, at full
                resolution, before any of it goes public here. If you cosplayed, we
                probably shot you.
              </p>
              <a
                href="#whatsapp"
                className="inline-block font-geist font-black text-xs text-ink bg-otaku px-8 py-4 uppercase tracking-widest hover:bg-otaku-light transition-colors duration-200"
              >
                Get the Footage →
              </a>
            </div>
          </section>
        )}

        {/*
          ── THE RECAP ────────────────────────────────────────────────────────
          Renders only once RECAP.live is flipped. This is the block that goes
          after "Otamatsuri 2026 photos", "cosplay winners" and "recap" — the
          queries the ticket sellers cannot answer and the organiser has never
          published a page for. Ship it within 48h of the day.
        */}
        {RECAP.live && (
          <section id="recap" className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-otaku" />
              <p className="font-sans text-otaku-light text-[10px] tracking-widest2 uppercase font-medium">
                22 August 2026 · The Carnivore Grounds
              </p>
            </div>

            <h2 className="leading-none mb-8 md:mb-10">
              <span className="font-geist font-black text-[clamp(1.6rem,5vw,3.5rem)] text-white uppercase block">
                Otamatsuri 2026
              </span>
              {" "}
              <span className="font-display font-semibold italic text-[clamp(1.6rem,5vw,3.5rem)] text-otaku block">
                In Photos.
              </span>
            </h2>

            {RECAP.summary && (
              <p className="font-sans text-white/75 text-sm md:text-base leading-relaxed max-w-3xl mb-12">
                {RECAP.summary}
              </p>
            )}

            {RECAP.winners.length > 0 && (
              <div className="mb-14">
                <h3 className="font-geist font-black text-white text-sm uppercase tracking-widest mb-6">
                  Competition Winners
                </h3>
                <dl className="border-t border-white/10">
                  {RECAP.winners.map((w) => (
                    <div
                      key={`${w.category}-${w.name}`}
                      className="flex flex-col sm:flex-row gap-1 sm:gap-8 py-5 border-b border-white/10"
                    >
                      <dt className="font-sans text-[10px] text-otaku-light tracking-widest uppercase sm:w-52 shrink-0 pt-1 font-medium">
                        {w.category}
                      </dt>
                      <dd className="font-sans text-white/85 text-sm md:text-base">
                        {w.name}
                        {w.character && (
                          <span className="text-white/55"> as {w.character}</span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="font-sans text-white/45 text-xs leading-relaxed mt-4">
                  Results as announced by the organisers on the day.
                </p>
              </div>
            )}

            {RECAP.photos.length > 0 && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                  {RECAP.photos.map((p, i) => (
                    <figure key={p.src} className="relative aspect-[4/5] overflow-hidden border border-white/8 bg-white/[0.02]">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                        quality={80}
                        loading={i < 6 ? "eager" : "lazy"}
                      />
                    </figure>
                  ))}
                </div>
                <p className="font-sans text-white/45 text-xs leading-relaxed mt-6 max-w-2xl">
                  Shot at Otamatsuri 2026 by Nataka Inc. Free to share with credit. If you
                  are in one of these and want the full-resolution file, get in touch and
                  we will send it over.
                </p>
              </>
            )}
          </section>
        )}

        {/*
          Sits directly under the gallery, which is exactly where someone who
          has just spotted themselves in a photo is looking. Renders nothing
          until WHATSAPP_INVITE is a real link.
        */}
        <WhatsAppJoin />

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

          {PHASE === "before" && (
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
          )}
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

          <p className="font-sans text-white/60 text-sm leading-relaxed mb-10 max-w-2xl">
            Want the long version — what happens hour by hour, cosplay tips for a fully
            outdoor venue, and why this festival matters?{" "}
            <Link href="/blog/otamatsuri-2026-guide-kenya-anime-festival" className="text-otaku-light underline underline-offset-2 hover:text-white transition-colors">
              Read the complete Otamatsuri 2026 guide
            </Link>
            .
          </p>

          <div className="border-t border-white/10">
            {allFaqs.map((f) => (
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
              {PHASE === "before" && (
                <a href={TICKETS} target="_blank" rel="noopener noreferrer" className="font-geist font-black text-xs text-ink bg-otaku px-8 py-4 uppercase tracking-widest hover:bg-otaku-light transition-colors duration-200">
                  Get Tickets →
                </a>
              )}
              <Link href="/community#fan-wall" className={`font-geist font-black text-xs px-8 py-4 uppercase tracking-widest transition-colors duration-200 ${PHASE !== "before" ? "text-ink bg-otaku hover:bg-otaku-light" : "text-white border border-white/25 hover:border-otaku hover:text-otaku-light"}`}>
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
