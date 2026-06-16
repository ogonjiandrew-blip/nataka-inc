import Link from "next/link";

const paths = [
  {
    tag: "For Brands",
    title: "Brands & Businesses",
    desc: "Commercials, launch campaigns, social content, product videos, influencer pushes and brand films — built to win attention and move product.",
    services: [
      { label: "Brand Video", href: "/services/brand-video-production-kenya" },
      { label: "Corporate Video", href: "/services/corporate-video-production-kenya" },
      { label: "Social Media", href: "/services/social-media-marketing-kenya" },
      { label: "Product Launch", href: "/services/product-launch-video-kenya" },
    ],
  },
  {
    tag: "For Artists",
    title: "Artists & Musicians",
    desc: "Music videos, visualizers, rollout content, artist branding and social — visuals as ambitious as the sound.",
    services: [
      { label: "Music Videos", href: "/services/music-video-production-nairobi" },
      { label: "Influencer Marketing", href: "/services/influencer-marketing-kenya" },
    ],
  },
  {
    tag: "For Events",
    title: "Events & Activations",
    desc: "Promo videos, multi-camera coverage, highlight films, sponsor clips and social recaps — content that sells this year's event and the next.",
    services: [
      { label: "Event Video", href: "/services/event-video-production-kenya" },
      { label: "Social Media", href: "/services/social-media-marketing-kenya" },
    ],
  },
  {
    tag: "For High-Ticket",
    title: "Automotive & Luxury",
    desc: "Car brands, real estate and premium products: trust-building campaigns, product education, launch films and showroom content that move serious buyers.",
    services: [
      { label: "Automotive Marketing", href: "/services/automotive-marketing-kenya" },
      { label: "Product Launch", href: "/services/product-launch-video-kenya" },
      { label: "Corporate Video", href: "/services/corporate-video-production-kenya" },
    ],
  },
];

export default function BuyerPaths() {
  return (
    <section id="who-its-for" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-sans text-teal text-[10px] tracking-widest2 uppercase font-medium mb-5">Who It&apos;s For</p>
      <h2 className="leading-none mb-12 md:mb-16">
        <span className="font-geist font-black text-[clamp(1.8rem,6vw,5rem)] text-white uppercase block">Find Your</span>
        <span className="font-display font-semibold italic text-[clamp(1.8rem,6vw,5rem)] text-teal block">Starting Point.</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8 border border-white/8">
        {paths.map((p) => (
          <div key={p.tag} className="bg-ink p-8 md:p-10 flex flex-col">
            <span className="font-sans text-[10px] text-teal tracking-widest uppercase mb-4">{p.tag}</span>
            <h3 className="font-geist font-black text-2xl text-white uppercase mb-4">{p.title}</h3>
            <p className="font-sans text-cream/65 text-sm leading-relaxed mb-6 flex-1">{p.desc}</p>
            <div className="flex flex-wrap gap-2 mb-7">
              {p.services.map((s) => (
                <Link key={s.href} href={s.href} className="font-sans text-[10px] text-teal/90 tracking-wider uppercase border border-teal/25 px-3 py-1.5 hover:bg-teal hover:text-ink transition-colors duration-200">
                  {s.label}
                </Link>
              ))}
            </div>
            <Link href="/#contact" className="inline-block font-geist font-black text-xs text-ink bg-teal px-6 py-3.5 uppercase tracking-widest hover:bg-teal-light transition-colors duration-200 self-start">
              Start a Project →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
