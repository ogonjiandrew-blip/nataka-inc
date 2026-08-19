import Link from "next/link";
import { waLink } from "@/lib/whatsapp";

const paths = [
  {
    tag: "For Brands",
    title: "Brands & Businesses",
    desc: "Commercials, launch campaigns, social content, product videos, influencer pushes and brand films — built to win attention and move product.",
    services: [
      { label: "Brand Campaigns", href: "/services/brand-video-production-kenya" },
      { label: "Commercials", href: "/services/corporate-video-production-kenya" },
      { label: "Social Content", href: "/services/social-media-marketing-kenya" },
      { label: "Product Launch", href: "/services/product-launch-video-kenya" },
    ],
    cta: "Build a Brand Campaign",
    wa: "Hi Nataka! I'm a brand looking to build a campaign — commercial, social content or a launch. My business is: ",
  },
  {
    tag: "For Artists",
    title: "Artists & Musicians",
    desc: "Music videos, visualizers, teasers, artist branding and social rollout content — visuals as ambitious as the sound.",
    services: [
      { label: "Music Videos", href: "/services/music-video-production-nairobi" },
      { label: "Artist Branding", href: "/services/brand-strategy-kenya" },
      { label: "Creator Distribution", href: "/services/influencer-marketing-kenya" },
    ],
    cta: "Create Artist Visuals",
    wa: "Hi Nataka! I'm an artist and I want to talk visuals — music video, teasers or a rollout. My name and track: ",
  },
  {
    tag: "For Events",
    title: "Events & Activations",
    desc: "Promo videos, multi-camera coverage, highlight films, sponsor clips and social recaps — content that sells this year's event and the next.",
    services: [
      { label: "Event Coverage", href: "/services/event-video-production-kenya" },
      { label: "Social Recaps", href: "/services/social-media-marketing-kenya" },
    ],
    cta: "Promote My Event",
    wa: "Hi Nataka! I'm running an event and need promo and coverage. The event and date: ",
  },
  {
    tag: "For High-Ticket",
    title: "Automotive & Luxury",
    desc: "Car brands, real estate and premium products: trust-building campaigns, product education, launch films and showroom content that move serious buyers.",
    services: [
      { label: "Automotive Marketing", href: "/services/automotive-marketing-kenya" },
      { label: "Product Education", href: "/services/product-launch-video-kenya" },
      { label: "Showroom Content", href: "/services/corporate-video-production-kenya" },
    ],
    cta: "Build Trust & Demand",
    wa: "Hi Nataka! I sell high-ticket (automotive / property / luxury) and want content that moves serious buyers. My business is: ",
  },
];

export default function BuyerPaths() {
  return (
    <section id="who-its-for" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-sans text-teal text-[10px] tracking-widest2 uppercase font-medium mb-5">Choose Your Path</p>
      <h2 className="leading-none mb-12 md:mb-16">
        <span className="font-geist font-black text-[clamp(1.8rem,6vw,5rem)] text-white uppercase block">Find Your</span>
        <span className="font-display font-semibold italic text-[clamp(1.8rem,6vw,5rem)] text-teal block">Starting Point.</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {paths.map((p) => (
          <div key={p.tag} className="border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 md:p-10 flex flex-col transition-all duration-300 hover:border-teal/40 hover:from-white/[0.07] hover:-translate-y-1">
            <span className="font-sans text-[10px] text-teal tracking-widest uppercase mb-4">{p.tag}</span>
            <h3 className="font-geist font-black text-2xl text-white uppercase mb-4">{p.title}</h3>
            <p className="font-sans text-cream/65 text-sm leading-relaxed mb-6 flex-1">{p.desc}</p>
            <div className="flex flex-wrap gap-2 mb-7">
              {p.services.map((s) => (
                <Link key={s.label} href={s.href} className="font-sans text-[10px] text-teal/90 tracking-wider uppercase border border-teal/25 px-3 py-1.5 hover:bg-teal hover:text-ink transition-colors duration-200">
                  {s.label}
                </Link>
              ))}
            </div>
            <a
              href={waLink(p.wa)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-geist font-black text-xs text-ink bg-teal px-6 py-3.5 uppercase tracking-widest hover:bg-teal-light transition-colors duration-200 self-start"
            >
              {p.cta} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
