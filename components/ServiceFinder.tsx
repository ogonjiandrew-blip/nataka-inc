"use client";

import { useState } from "react";
import Link from "next/link";

const goals = [
  { id: "customers", goal: "I need more customers", recommend: "Social Content Engine or Launch Campaign", deliverables: "Short-form videos, offer-focused content, campaign messaging, content calendar, optional creator distribution.", budget: "KES 150K – 700K / month, or KES 500K – 2M+ for a campaign launch", timeline: "2–6 weeks depending on scope", cta: "Build My Campaign" },
  { id: "launch", goal: "I need to launch a product", recommend: "Launch Campaign Package", deliverables: "Hero video, short-form cutdowns, product photos, launch messaging, rollout plan, optional influencer push.", budget: "KES 500K – 2M+", timeline: "2–6 weeks depending on scope", cta: "Start My Launch Brief" },
  { id: "social", goal: "I need social media content", recommend: "Social Content Engine", deliverables: "Monthly shoot day, 8–20 short videos, captions & content direction, content calendar, performance review.", budget: "KES 150K – 700K / month", timeline: "Monthly retainer, or 1–2 week batch production", cta: "Build My Content Engine" },
  { id: "music", goal: "I need a music video", recommend: "Music Video / Artist Campaign", deliverables: "Concept, shoot, music video, teaser edits, vertical clips, rollout assets.", budget: "KES 150K – 1M+", timeline: "1–4 weeks depending on scope", cta: "Plan My Music Video" },
  { id: "trust", goal: "I need to build trust for a new brand", recommend: "Premium Brand Film / Brand Trust Campaign", deliverables: "Brand film, founder story, product or service explainer, testimonials, social cutdowns, trust messaging.", budget: "KES 300K – 1.5M+", timeline: "2–6 weeks depending on scope", cta: "Build Brand Trust" },
  { id: "event", goal: "I need event coverage", recommend: "Event Content Package", deliverables: "Promo video, event coverage, highlight film, sponsor clips, social recap edits.", budget: "KES 100K – 700K+", timeline: "1–3 weeks across pre- and post-event", cta: "Promote My Event" },
  { id: "creator", goal: "I need influencer or creator distribution", recommend: "Creator Distribution Campaign", deliverables: "Campaign strategy, creator concept, video assets, creator posting plan, performance reporting.", budget: "KES 300K – 2M+", timeline: "2–6 weeks depending on creator availability", cta: "Plan Creator Campaign" },
  { id: "film", goal: "I need a premium brand film", recommend: "Premium Brand Film", deliverables: "Concept development, cinematic production, interviews or narrative structure, master film, short cutdowns.", budget: "KES 300K – 1.5M+", timeline: "2–5 weeks depending on production complexity", cta: "Create My Brand Film" },
];

export default function ServiceFinder() {
  const [active, setActive] = useState<string | null>(null);
  const sel = goals.find((g) => g.id === active);

  return (
    <section id="find-service" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-sans text-teal text-[10px] tracking-widest2 uppercase font-medium mb-5">Find Your Service</p>
      <h2 className="leading-none mb-12 md:mb-16">
        <span className="font-geist font-black text-[clamp(1.8rem,6vw,5rem)] text-white uppercase block">Find the Right</span>
        <span className="font-display font-semibold italic text-[clamp(1.8rem,6vw,5rem)] text-teal block">Nataka Service.</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div>
          <p className="font-sans text-cream/60 text-sm mb-6">What do you need most right now?</p>
          <div className="flex flex-col gap-3">
            {goals.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActive(g.id)}
                aria-pressed={active === g.id}
                className={`text-left font-sans text-sm md:text-base px-5 py-4 border transition-colors duration-200 ${
                  active === g.id
                    ? "bg-teal text-ink border-teal font-semibold"
                    : "text-white/75 border-white/15 hover:border-teal/60 hover:text-white"
                }`}
              >
                {g.goal}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-28">
          {sel ? (
            <div className="border border-teal/30 bg-teal/[0.04] p-8 md:p-10">
              <p className="font-sans text-[10px] text-teal tracking-widest uppercase mb-3">Recommended</p>
              <h3 className="font-geist font-black text-2xl md:text-3xl text-white uppercase mb-6 leading-tight">{sel.recommend}</h3>
              <div className="space-y-5">
                <Row label="Deliverables" value={sel.deliverables} />
                <Row label="Budget range" value={sel.budget} accent />
                <Row label="Timeline" value={sel.timeline} />
              </div>
              <Link href="/#contact" className="inline-block mt-8 font-geist font-black text-sm text-ink bg-teal px-8 py-4 uppercase tracking-widest hover:bg-teal-light transition-colors duration-200">
                {sel.cta} →
              </Link>
            </div>
          ) : (
            <div className="border border-white/10 bg-white/[0.015] p-8 md:p-10 min-h-[260px] flex items-center justify-center text-center">
              <p className="font-sans text-cream/45 text-sm max-w-xs leading-relaxed">
                Pick a goal and we&apos;ll recommend the right package, deliverables, budget range and timeline — then send it straight to us.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="border-t border-white/8 pt-4">
      <p className="font-sans text-[10px] text-teal tracking-widest uppercase mb-1.5">{label}</p>
      <p className={`font-sans text-sm leading-relaxed ${accent ? "text-teal font-semibold" : "text-cream/75"}`}>{value}</p>
    </div>
  );
}
