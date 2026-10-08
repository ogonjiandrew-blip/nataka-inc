"use client";

import { useState } from "react";
import { waLink } from "@/lib/whatsapp";
import { ArrowRight } from "@phosphor-icons/react";
import Reveal from "@/components/Reveal";

const goals = [
  { id: "customers", goal: "I need more customers", recommend: "Social Content Engine or Launch Campaign", deliverables: "Short-form videos, offer-focused content, campaign messaging, content calendar, optional creator distribution.", budget: "KES 150K-700K / month, or KES 500K-2M+ for a campaign launch", timeline: "2-6 weeks depending on scope", cta: "Build My Campaign", wa: "Hi Nataka! I need more customers, the finder recommended the Social Content Engine / a Launch Campaign. My business is: " },
  { id: "launch", goal: "I need to launch a product", recommend: "Launch Campaign Package", deliverables: "Hero video, short-form cutdowns, product photos, launch messaging, rollout plan, optional influencer push.", budget: "KES 500K-2M+", timeline: "2-6 weeks depending on scope", cta: "Start My Launch Brief", wa: "Hi Nataka! I'm launching a product and want the Launch Campaign Package. What I'm launching: " },
  { id: "social", goal: "I need social media content", recommend: "Social Content Engine", deliverables: "Monthly shoot day, 8-20 short videos, captions & content direction, content calendar, performance review.", budget: "KES 150K-700K / month", timeline: "Monthly retainer, or 1-2 week batch production", cta: "Build My Content Engine", wa: "Hi Nataka! I need consistent social content, interested in the Social Content Engine. My brand is: " },
  { id: "music", goal: "I need a music video", recommend: "Music Video / Artist Campaign", deliverables: "Concept, shoot, music video, teaser edits, vertical clips, rollout assets.", budget: "KES 150K-1M+", timeline: "1-4 weeks depending on scope", cta: "Plan My Music Video", wa: "Hi Nataka! I want to plan a music video. My artist name and the track: " },
  { id: "trust", goal: "I need to build trust for a new brand", recommend: "Premium Brand Film / Brand Trust Campaign", deliverables: "Brand film, founder story, product or service explainer, testimonials, social cutdowns, trust messaging.", budget: "KES 300K-1.5M+", timeline: "2-6 weeks depending on scope", cta: "Build Brand Trust", wa: "Hi Nataka! I'm building trust for a new brand, interested in a brand film / trust campaign. My brand is: " },
  { id: "event", goal: "I need event coverage", recommend: "Event Content Package", deliverables: "Promo video, event coverage, highlight film, sponsor clips, social recap edits.", budget: "KES 100K-700K+", timeline: "1-3 weeks across pre- and post-event", cta: "Promote My Event", wa: "Hi Nataka! I need event coverage, promo, coverage and recaps. The event and date: " },
  { id: "creator", goal: "I need influencer or creator distribution", recommend: "Creator Distribution Campaign", deliverables: "Campaign strategy, creator concept, video assets, creator posting plan, performance reporting.", budget: "KES 300K-2M+", timeline: "2-6 weeks depending on creator availability", cta: "Plan Creator Campaign", wa: "Hi Nataka! I want influencer / creator distribution for a campaign. The product or brand: " },
  { id: "film", goal: "I need a premium brand film", recommend: "Premium Brand Film", deliverables: "Concept development, cinematic production, interviews or narrative structure, master film, short cutdowns.", budget: "KES 300K-1.5M+", timeline: "2-5 weeks depending on production complexity", cta: "Create My Brand Film", wa: "Hi Nataka! I want a premium brand film. My company is: " },
];

export default function ServiceFinder() {
  const [active, setActive] = useState<string>(goals[0].id);
  const sel = goals.find((g) => g.id === active) ?? goals[0];

  return (
    <section id="find-service" className="border-y border-white/8 bg-ink-100">
      <div className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <Reveal className="lg:col-span-5">
          <h2 className="font-heading font-extrabold stretch-semi text-white tracking-[-0.03em] leading-[1.05] text-[clamp(2rem,4.4vw,3.4rem)]">
            Not sure where to start?
          </h2>
          <p className="mt-4 font-sans text-cream/65 text-base md:text-lg leading-relaxed max-w-[44ch]">
            Pick the goal closest to yours. You get the service, what is included, a typical budget and a timeline.
          </p>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Your main goal">
            {goals.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActive(g.id)}
                aria-pressed={active === g.id}
                className={`text-left font-sans text-sm px-4 py-2.5 border transition-colors duration-200 active:translate-y-px ${
                  active === g.id
                    ? "bg-white text-ink border-white font-semibold"
                    : "text-cream/75 border-white/15 hover:border-accent/60 hover:text-white"
                }`}
              >
                {g.goal.replace(/^I need (to )?/, "").replace(/^./, (c) => c.toUpperCase())}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:sticky lg:top-28" aria-live="polite">
          <div key={sel.id} className="bg-ink border border-white/10 p-8 md:p-10">
            <p className="font-mono text-[11px] text-accent">We recommend</p>
            <h3 className="mt-3 font-heading font-bold text-2xl md:text-3xl text-white tracking-tight leading-tight [text-wrap:balance]">
              {sel.recommend}
            </h3>
            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="sm:col-span-2">
                <dt className="font-mono text-xs text-cream/60">Included</dt>
                <dd className="mt-1.5 font-sans text-sm text-cream/80 leading-relaxed">{sel.deliverables}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-cream/60">Typical budget</dt>
                <dd className="mt-1.5 font-heading font-bold text-lg text-white tabular-nums">{sel.budget}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-cream/60">Timeline</dt>
                <dd className="mt-1.5 font-sans text-sm text-cream/80 leading-relaxed">{sel.timeline}</dd>
              </div>
            </dl>
            <a
              href={waLink(sel.wa)}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 inline-flex items-center gap-3 bg-white text-ink font-heading font-bold text-xs uppercase tracking-[0.16em] px-8 py-[1.1rem] hover:bg-accent active:translate-y-px transition-colors"
            >
              Get a quote
              <ArrowRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <p className="mt-4 font-sans text-xs text-cream/45">Opens WhatsApp with this goal already written in.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
