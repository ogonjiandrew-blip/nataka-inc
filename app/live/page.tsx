import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveMirror from "@/components/live/LiveMirror";

const siteUrl = "https://www.natakainc.com";
const WHATSAPP_NUMBER = "254725107294";

const bookUrl = (product: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    [`NATAKA LIVE enquiry — ${product}`, "", "Event / brand:", "Date:", "Venue:", "Audience size:"].join("\n"),
  )}`;

export const metadata: Metadata = {
  title: { absolute: "NATAKA LIVE — Realtime AI Video Mirror | Nataka Inc" },
  description:
    "Step in front of the camera and come out somewhere else — live. Nataka's realtime AI mirror rewrites every frame of a live camera feed: clothes, worlds, weather. Try it in your browser, then book it for your event, live-shopping stream or broadcast.",
  alternates: { canonical: `${siteUrl}/live` },
  openGraph: {
    title: "NATAKA LIVE — Realtime AI Video Mirror",
    description:
      "A live camera feed, rewritten frame by frame by AI. Try it in your browser. Book it for your event.",
    url: `${siteUrl}/live`,
    type: "website",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "NATAKA LIVE", item: `${siteUrl}/live` },
  ],
};

const steps = [
  {
    n: "01",
    title: "Camera in",
    text: "Any camera — your phone right now, or our cinema rig at your event. The feed goes straight into the engine.",
  },
  {
    n: "02",
    title: "Every frame rewritten",
    text: "Instant Looks run on your own device at 60fps. The AI engine goes further — Lucy 2.5 regenerates the whole frame from a text prompt, ~40ms behind reality.",
  },
  {
    n: "03",
    title: "Screen out",
    text: "The transformed feed lands on whatever your audience is watching — a booth screen, a live-shopping stream, a stage wall, a broadcast.",
  },
];

const products = [
  {
    tag: "EVENTS",
    name: "The Live Mirror Booth",
    text: "Guests step up in a t-shirt and see themselves in full costume, in another world, instantly. No queue for renders, no waiting for WhatsApp delivery — the transformation is the screen. Built on what we ran at Otamatsuri.",
    detail: "Screen, camera, operator, custom looks for your theme.",
    cta: "Book the booth",
  },
  {
    tag: "COMMERCE",
    name: "Live-Shopping Wardrobe",
    text: "One host, one stream, every outfit in your catalogue — switched live, mid-sentence, with zero wardrobe downtime. One perfume in hand becomes the whole product line on camera.",
    detail: "Setup, prompt design per SKU, stream operation.",
    cta: "Book a stream test",
  },
  {
    tag: "BROADCAST",
    name: "Stage & Show Graphics",
    text: "Presenters change wardrobe between segments without leaving the desk. Sets change season, weather and city behind a performer — live, on the output feed.",
    detail: "Show integration, redundancy line, rehearsal day included.",
    cta: "Talk to the team",
  },
];

const faqs = [
  {
    q: "Is this a filter?",
    a: "No. Filters stick pictures on top of you. The AI engine regenerates the entire frame — hair moves when you touch it, jackets crease when you pull them, slime drips through your fingers. Instant Looks are real GPU shaders, not stickers.",
  },
  {
    q: "What do you need from our venue?",
    a: "Power, a screen or projector, and a stable internet line for the AI engine. We carry our own camera, rig and a dedicated router — we never trust venue wifi with a live show.",
  },
  {
    q: "Does it work in vertical for TikTok / IG Live?",
    a: "Yes — the engine runs 9:16 natively, which is exactly what live shopping and IG streams need.",
  },
  {
    q: "What does it cost?",
    a: "The browser mirror above is free. Activations are priced by hours live and screens fed — WhatsApp us the event details and we quote the same day.",
  },
];

export default function LivePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <main className="bg-ink text-cream min-h-screen">
        <Navbar />

        {/* ── Hero: headline + the working mirror ── */}
        <section className="pt-28 sm:pt-36 pb-16 px-5 sm:px-10 max-w-6xl mx-auto">
          <div className="font-nataka font-black uppercase tracking-widest2 text-[10px] text-teal mb-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D61F2C] animate-pulse" />
            NATAKA LIVE · REALTIME AI VIDEO
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.05] max-w-4xl">
            Step in front of the camera.
            <br />
            <span className="text-teal">Come out somewhere else.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-cream/60 text-base sm:text-lg leading-relaxed">
            This is a live camera feed rewritten frame by frame — clothes, worlds, weather —
            with nothing to edit and nothing to wait for. Try it right here with your own
            camera, then put it in front of your audience.
          </p>

          <p className="mt-4 font-nataka font-black uppercase tracking-widest2 text-[9px] text-cream/40">
            From the team behind Otamatsuri · 80+ brands filmed in Nairobi
          </p>

          <div className="mt-10">
            <LiveMirror />
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="border-t border-cream/10 px-5 sm:px-10 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-nataka font-black uppercase tracking-widest2 text-[10px] text-teal mb-12">
              How the signal flows
            </h2>
            <div className="grid sm:grid-cols-3 gap-10">
              {steps.map((s) => (
                <div key={s.n}>
                  <div className="font-display text-5xl text-cream/20">{s.n}</div>
                  <h3 className="font-nataka font-black uppercase tracking-widest2 text-xs mt-4 text-cream">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-cream/55 text-sm leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Products / booking ── */}
        <section className="border-t border-cream/10 px-5 sm:px-10 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl sm:text-5xl max-w-2xl leading-tight">
              The demo is free. <span className="text-teal">The room going quiet</span> when
              someone transforms on screen — that&apos;s what you book.
            </h2>

            <div className="mt-14 grid lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div
                  key={p.name}
                  className="border border-cream/10 p-8 flex flex-col hover:border-teal/40 transition-colors"
                >
                  <div className="font-nataka font-black uppercase tracking-widest2 text-[9px] text-teal">
                    {p.tag}
                  </div>
                  <h3 className="font-display text-2xl mt-3">{p.name}</h3>
                  <p className="mt-4 text-cream/55 text-sm leading-relaxed flex-1">{p.text}</p>
                  <p className="mt-4 text-cream/35 text-xs">{p.detail}</p>
                  <a
                    href={bookUrl(p.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block text-center font-nataka font-black uppercase tracking-widest2 text-[10px] border border-teal text-teal px-6 py-4 hover:bg-teal hover:text-ink transition-colors"
                  >
                    {p.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Objections ── */}
        <section className="border-t border-cream/10 px-5 sm:px-10 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-nataka font-black uppercase tracking-widest2 text-[10px] text-teal mb-10">
              Straight answers
            </h2>
            <div className="divide-y divide-cream/10">
              {faqs.map((f) => (
                <div key={f.q} className="py-6 grid sm:grid-cols-[220px_1fr] gap-3">
                  <h3 className="font-nataka font-black uppercase tracking-widest2 text-[11px] text-cream">
                    {f.q}
                  </h3>
                  <p className="text-cream/55 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="border-t border-cream/10 px-5 sm:px-10 py-24 text-center">
          <p className="font-display text-3xl sm:text-5xl max-w-2xl mx-auto leading-tight">
            Put the mirror in front of <span className="text-teal">your crowd.</span>
          </p>
          <a
            href={bookUrl("General")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block font-nataka font-black uppercase tracking-widest2 text-xs bg-teal text-ink px-10 py-5 hover:bg-teal-light transition-colors"
          >
            WhatsApp the team
          </a>
          <p className="mt-4 text-cream/35 text-xs">Same-day quote. Nairobi-based, travels anywhere.</p>
        </section>

        <Footer />
      </main>
    </>
  );
}
