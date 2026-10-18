import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Navbar from "@/components/Navbar";
import { galleryGroups as groups, galleryImages } from "@/lib/galleryImages";
import Footer from "@/components/Footer";
import { videoUploadDates } from "@/lib/videoDates";

const SITE = "https://www.natakainc.com";

const videos = [
  { title: "Za Mabuda", cat: "Film / Direction", src: "/videos/za-mabuda.mp4", poster: "/videos/za-mabuda-still.jpg", desc: "Vijana Barubaru ft. Scar Mkadinali. A cinematic period film directed by Andrew Ogonji.", date: videoUploadDates.zaMabuda },
  { title: "Kwanini", cat: "Music video / Direction", src: "/videos/kwanini-teaser.mp4", poster: "/videos/kwanini-teaser-poster.jpg", desc: "Ssaru x Fathermoh. The official music video, from concept to final cut in Nairobi.", date: videoUploadDates.kwanini },
  { title: "Save Her", cat: "Music video", src: "/videos/save-her.mp4", poster: "/videos/save-her-poster.jpg", desc: "High-energy, cinematic music video production with bold visual storytelling.", date: videoUploadDates.saveHer },
  { title: "Cool in School", cat: "Music video", src: "/videos/cool-in-school.mp4", poster: "/videos/cool-in-school-poster.jpg", desc: "A vibrant, colour-rich music video: Nairobi energy on a vintage film palette.", date: videoUploadDates.coolInSchool },
  { title: "Your City", cat: "Brand / Commercial", src: "/videos/sarit.mp4", poster: "/videos/sarit-poster-clean.jpg", desc: "Brand film for Sarit Centre: premium commercial production for a Nairobi landmark.", date: videoUploadDates.yourCity },
  { title: "Open Auditions", cat: "Brand film / Promo", src: "/videos/nataka-promo.mp4", poster: "/videos/nataka-promo-poster.jpg", desc: "A Nataka Inc promo: cinematic brand storytelling that captures who we are.", date: videoUploadDates.openAuditions },
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

export default function GalleryGrid() {
  const imageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${SITE}/gallery#gallery`,
    name: "Nataka Inc: films, campaign images and studio stills",
    url: `${SITE}/gallery`,
    publisher: { "@id": `${SITE}/#org` },
    inLanguage: "en-KE",
    associatedMedia: galleryImages.map((im) => ({
      "@type": "ImageObject",
      "@id": `${SITE}/gallery#${im.id}`,
      name: im.title,
      caption: im.caption,
      description: im.caption,
      contentUrl: `${SITE}${im.src}`,
      url: `${SITE}/gallery#${im.id}`,
      creditText: `Nataka Inc portfolio — ${im.kind}`,
      isPartOf: { "@id": `${SITE}/gallery#gallery` },
    })),
  };
  return (
    <div className="min-h-screen text-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }} />
      <Navbar />

      <div className="px-6 md:px-12 pt-36 md:pt-48 pb-24 md:pb-32 max-w-7xl mx-auto">
        <p className="font-sans font-medium text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-cream/70 mb-6">Gallery</p>
        <h1 className="font-heading font-extrabold uppercase stretch-wide tracking-[-0.025em] leading-[0.95] text-[clamp(2.3rem,6.4vw,5.8rem)]">
          <span className="text-white">Nataka Inc </span>
          <span className="text-accent-dark">in pictures</span>
          <span className="text-signal">.</span>
        </h1>
        <p className="mt-7 font-sans text-cream/70 text-base md:text-lg leading-relaxed max-w-[58ch]">
          Selected film, music video, campaign and studio work by Nataka Inc, a media, marketing and creative production
          company in Nairobi, Kenya.
        </p>
        <p className="mt-4 font-sans text-cream/60 leading-relaxed max-w-[58ch]">Open a still to see the full image. Project captions identify the work; the AI studio section is labelled separately. For business enquiries, explore our <Link href="/services/social-media-marketing-kenya" className="underline underline-offset-4 text-cream/85">social media marketing</Link> and <Link href="/services/digital-marketing-nairobi" className="underline underline-offset-4 text-cream/85">digital marketing services in Kenya</Link>.</p>

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
              {g.imgs.map((src) => {
                const im = galleryImages.find((item) => item.src === src)!;
                return (
                <figure key={src} id={im.id} className="group scroll-mt-24">
                <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full image: ${im.caption}`} className="relative block aspect-[4/5] overflow-hidden rounded-[16px] bg-ink-50 ring-1 ring-white/10 focus-visible:ring-signal">
                  <Image
                    src={src}
                    alt={im.caption}
                    fill
                    className="object-cover scale-[1.04] transition-transform duration-700 group-hover:scale-[1.08]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={80}
                  />
                </a>
                <figcaption className="pt-3 px-1 font-sans text-xs leading-relaxed text-cream/65">{im.caption}</figcaption>
                </figure>
              );})}
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
