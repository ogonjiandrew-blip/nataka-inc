import Image from "next/image";
import Link from "next/link";

const SITE = "https://www.natakainc.com";

const videos = [
  { title: "Za Mabuda", cat: "Film · Direction", src: "/videos/za-mabuda.mp4", poster: "/videos/za-mabuda-poster.jpg", desc: "Vijana Barubaru ft. Scar Mkadinali — a cinematic period film directed by Andrew Ogonji.", date: "2026-02-01" },
  { title: "Kwanini", cat: "Music Video · Direction", src: "/videos/kwanini-teaser.mp4", poster: "/videos/kwanini-teaser-poster.jpg", desc: "Ssaru x Fathermoh — the official music video, concept to final cut in Nairobi.", date: "2026-01-15" },
  { title: "Save Her", cat: "Music Video", src: "/videos/save-her.mp4", poster: "/videos/save-her-poster.jpg", desc: "High-energy, cinematic music video production — bold visual storytelling.", date: "2026-01-20" },
  { title: "Cool in School", cat: "Music Video", src: "/videos/cool-in-school.mp4", poster: "/videos/cool-in-school-poster.jpg", desc: "Vibrant, colour-rich music video — Nairobi energy on a vintage film palette.", date: "2026-02-10" },
  { title: "Sarit — Your City", cat: "Brand · Commercial", src: "/videos/sarit.mp4", poster: "/videos/sarit-poster.jpg", desc: "Brand film for Sarit Centre — premium commercial production for a Nairobi landmark.", date: "2026-02-20" },
  { title: "Open Auditions", cat: "Brand Film · Promo", src: "/videos/nataka-promo.mp4", poster: "/videos/nataka-promo-poster.jpg", desc: "A Nataka Inc promo — cinematic brand storytelling that captures who we are.", date: "2026-01-05" },
];

const videoSchema = {
  "@context": "https://schema.org",
  "@graph": videos.map((v) => ({
    "@type": "VideoObject",
    name: `${v.title} — Nataka Inc`,
    description: v.desc,
    thumbnailUrl: `${SITE}${v.poster}`,
    uploadDate: v.date,
    contentUrl: `${SITE}${v.src}`,
    publisher: { "@type": "Organization", name: "Nataka Inc", url: SITE },
  })),
};

const aiStills = Array.from({ length: 31 }, (_, i) => `/stills/ai/1/${i + 1}.jpg`);
const filmStills = ["/stills/1/1.jpg", "/stills/1/2.jpg", "/stills/1/4.jpg", "/stills/1/5.jpg", "/stills/1/6.jpg", "/stills/1/7.jpg", "/stills/1/8.jpg", "/stills/1/27.jpg", "/stills/1/43.jpg", "/stills/1/46.jpg", "/stills/1/a.jpg", "/stills/1/b.jpg"];
const musicStills = ["/stills/4/1.jpg", "/stills/4/2.jpg", "/stills/4/4.jpg", "/stills/4/5.jpg", "/stills/4/6.jpg", "/stills/4/7.jpg", "/stills/4/p1.jpg", "/stills/4/p2.jpg", "/stills/4/p4.jpg", "/stills/4/p5.jpg"];
const ssaruStills = ["/stills/ssaru/1.jpg", "/stills/ssaru/2.jpg"];
const perfStills = ["/stills/2/1.jpg", "/stills/2/2.jpg", "/stills/2/3.jpg"];
const fashionStills = ["/stills/fashion/1.jpg", "/stills/fashion/2.jpg", "/stills/fashion/3.jpg", "/stills/fashion/6.jpg", "/stills/fashion/7.jpg", "/stills/fashion/8.jpg", "/stills/fashion/9.jpg", "/stills/fashion/12.jpg"];

const groups = [
  { heading: "Studio & Visual Stills", alt: "Nataka Inc studio visual still — media and creative production in Nairobi, Kenya", imgs: aiStills },
  { heading: "Film & Campaign", alt: "Nataka Inc film and campaign still — video production company in Nairobi, Kenya", imgs: filmStills },
  { heading: "Music Videos", alt: "Nataka Inc music video still — music video production in Nairobi, Kenya", imgs: musicStills },
  { heading: "Artist Campaigns", alt: "Nataka Inc artist campaign still — Nairobi, Kenya", imgs: ssaruStills },
  { heading: "Performance", alt: "Nataka Inc performance still — Nairobi, Kenya", imgs: perfStills },
  { heading: "Fashion Editorial", alt: "Nataka Inc fashion editorial still — creative agency in Nairobi, Kenya", imgs: fashionStills },
];

export default function GalleryGrid() {
  return (
    <div className="min-h-screen bg-ink text-cream px-6 md:px-12 pt-24 md:pt-28 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />

      <div className="max-w-7xl mx-auto">
        <Link href="/" className="font-sans text-white/55 text-xs tracking-widest uppercase hover:text-teal transition-colors">
          ← Nataka Inc
        </Link>

        <h1 className="leading-none mt-8 mb-5">
          <span className="font-geist font-black text-[clamp(2rem,7vw,5rem)] text-white uppercase block">Work</span>
          <span className="font-display font-semibold italic text-[clamp(2rem,7vw,5rem)] text-teal block">Gallery.</span>
        </h1>
        <p className="font-sans text-cream/65 text-sm md:text-base max-w-2xl mb-14 leading-relaxed">
          Selected film, music video, campaign and studio work by Nataka Inc — a media, marketing and
          creative production company in Nairobi, Kenya.
        </p>

        {/* Videos */}
        <section className="mb-16 md:mb-24">
          <h2 className="font-geist font-black text-lg md:text-xl text-white uppercase mb-6">Films &amp; Music Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {videos.map((v) => (
              <figure key={v.src} className="group">
                <div className="relative aspect-video overflow-hidden bg-ink-50 border border-white/8">
                  <video
                    controls
                    preload="none"
                    poster={v.poster}
                    className="w-full h-full object-cover"
                    aria-label={`${v.title} — ${v.cat} by Nataka Inc, Nairobi Kenya`}
                  >
                    <source src={v.src} type="video/mp4" />
                  </video>
                </div>
                <figcaption className="mt-3">
                  <span className="font-sans text-[10px] text-teal tracking-widest uppercase block mb-1">{v.cat}</span>
                  <h3 className="font-geist font-black text-base text-white uppercase leading-tight">{v.title}</h3>
                  <p className="font-sans text-cream/55 text-sm leading-relaxed mt-1">{v.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {groups.map((g) => (
          <section key={g.heading} className="mb-14 md:mb-20">
            <h2 className="font-geist font-black text-lg md:text-xl text-white uppercase mb-6">{g.heading}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {g.imgs.map((src, i) => (
                <div key={src} className="relative aspect-[4/5] overflow-hidden bg-ink-50 group">
                  <Image
                    src={src}
                    alt={`${g.alt} (${i + 1})`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={80}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="border border-teal/30 bg-teal/[0.04] p-10 md:p-14 text-center mt-4">
          <h2 className="font-geist font-black text-[clamp(1.5rem,4vw,2.6rem)] text-white uppercase leading-tight mb-4">
            Make Something Like This
          </h2>
          <p className="font-sans text-cream/60 text-sm mb-8 max-w-xl mx-auto">
            Tell us about your project and we&apos;ll come back with a clear plan and an honest quote.
          </p>
          <Link href="/#contact" className="inline-block font-geist font-black text-sm text-ink bg-teal px-10 py-5 uppercase tracking-widest hover:bg-teal-light transition-colors duration-200">
            Start a Project →
          </Link>
        </div>
      </div>
    </div>
  );
}
