import Link from "next/link";

const packages = [
  {
    name: "Launch Campaign",
    who: "Brands launching a product, store, service, event or campaign.",
    range: "KES 500K – 2M+",
    includes: ["Campaign concept", "Hero video", "Short-form cutdowns", "Photo assets", "Distribution plan", "Optional influencer push"],
  },
  {
    name: "Social Content Engine",
    who: "Brands that need consistent, high-quality monthly content.",
    range: "KES 150K – 700K / month",
    includes: ["Monthly shoot day", "8–20 short videos", "Captions & content direction", "Content calendar", "Performance review"],
  },
  {
    name: "Premium Brand Film",
    who: "Companies that need credibility, trust and a polished public image.",
    range: "KES 300K – 1.5M+",
    includes: ["Concept development", "Cinematic production", "Interviews / story structure", "Brand messaging", "Master film + cutdowns"],
  },
  {
    name: "Music Video / Artist Campaign",
    who: "Artists who need high-quality visuals and rollout content.",
    range: "KES 150K – 1M+",
    includes: ["Concept & direction", "Production", "Music video", "Teaser edits", "Social rollout assets"],
  },
  {
    name: "Event Content Package",
    who: "Events that need promotion before, during and after.",
    range: "KES 100K – 700K+",
    includes: ["Promo video", "Event coverage", "Highlight film", "Sponsor clips", "Social recap edits"],
  },
];

export default function Packages() {
  return (
    <section id="packages" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-sans text-teal text-[10px] tracking-widest2 uppercase font-medium mb-5">How We Work</p>
      <h2 className="leading-none mb-5">
        <span className="font-geist font-black text-[clamp(1.8rem,6vw,5rem)] text-white uppercase block">Ways To</span>
        <span className="font-display font-semibold italic text-[clamp(1.8rem,6vw,5rem)] text-teal block">Work With Us.</span>
      </h2>
      <p className="font-sans text-cream/60 text-sm md:text-base max-w-2xl mb-12 md:mb-16 leading-relaxed">
        Starting points, not fixed quotes. Every engagement is scoped to your brief, goals and budget — these ranges help you see where you fit before we talk.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 border border-white/8">
        {packages.map((p) => (
          <div key={p.name} className="bg-ink p-8 flex flex-col">
            <h3 className="font-geist font-black text-xl text-white uppercase mb-2 leading-tight">{p.name}</h3>
            <p className="font-sans text-cream/55 text-xs leading-relaxed mb-5">{p.who}</p>
            <p className="font-geist font-black text-teal text-lg mb-6 tabular-nums" style={{ textShadow: "0 0 20px rgba(10,191,191,0.25)" }}>
              {p.range}
            </p>
            <ul className="space-y-2.5 mb-7 flex-1">
              {p.includes.map((item) => (
                <li key={item} className="flex gap-3 items-start font-sans text-cream/70 text-sm">
                  <span className="text-teal text-xs pt-1 flex-shrink-0">◈</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/#contact" className="inline-block font-geist font-black text-xs text-teal border border-teal/40 px-6 py-3.5 uppercase tracking-widest hover:bg-teal hover:text-ink transition-colors duration-200 self-start">
              Request a Proposal →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
