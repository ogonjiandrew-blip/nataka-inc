"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react";
import { buildCampaignBrief, campaignGoals, getCampaignGoal, type BriefInput } from "@/lib/campaignBrief";
import { waLink } from "@/lib/whatsapp";

const fieldClass = "mt-2 w-full rounded-[12px] border border-white/15 bg-ink/70 px-4 py-3 text-base text-white placeholder:text-white/35 transition-colors focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal";
const secondaryClass = "btn-ghost !px-5 !py-3 !text-[11px]";

export default function CampaignBrief() {
  const [input, setInput] = useState<BriefInput>({ company: "", goal: "promotion", audience: "", timing: "", budget: "", notes: "" });
  const [status, setStatus] = useState("");
  const goal = getCampaignGoal(input.goal);
  const brief = buildCampaignBrief(input);
  function update(key: keyof BriefInput, value: string) {
    setInput((current) => ({ ...current, [key]: value }));
    setStatus("");
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setStatus("Brief copied. You can paste it into a message or document.");
    } catch {
      setStatus("Copy is unavailable in this browser. Use Download brief or select the preview text below.");
    }
  }

  function downloadBrief() {
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "nataka-campaign-brief.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("Brief downloaded. Keep it for your team or share it when you're ready.");
  }

  return (
    <section id="brief-builder" aria-labelledby="builder-title" className="px-4 md:px-12 max-w-7xl mx-auto pb-24 md:pb-32">
      <div className="relative isolate overflow-hidden rounded-[24px] md:rounded-[28px] ring-1 ring-white/10 bg-white/[0.025] px-5 py-10 md:p-14 grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_100%_100%,rgb(var(--c-ember)/0.45),rgb(var(--c-ember)/0.1)_50%,transparent_75%)]" />
        <div aria-hidden="true" className="halftone absolute inset-0 -z-10 opacity-[0.07] [mask-image:radial-gradient(50%_60%_at_0%_0%,black,transparent_75%)]" />
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-cream/55 mb-4"><span className="text-signal">01</span> / Your project</p>
          <h2 id="builder-title" className="font-heading font-extrabold uppercase stretch-semi text-white tracking-[-0.02em] leading-[1] text-[clamp(1.5rem,2.6vw,2.2rem)] mb-4">A few details. A clearer brief<span className="text-signal">.</span></h2>
          <p className="text-cream/70 text-sm leading-relaxed mb-8">Fill in what you know. It is fine to leave the rest for a conversation.</p>
          <div className="space-y-6">
            <label className="block text-sm text-cream/85" htmlFor="brief-company">Company or brand
              <input id="brief-company" name="organization" autoComplete="organization" maxLength={100} className={fieldClass} value={input.company} onChange={(e) => update("company", e.target.value)} placeholder="Your company name" />
            </label>
            <label className="block text-sm text-cream/85" htmlFor="brief-goal">What do you want to do?
              <select id="brief-goal" className={fieldClass} value={input.goal} onChange={(e) => update("goal", e.target.value)}>
                {campaignGoals.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
              </select>
            </label>
            <label className="block text-sm text-cream/85" htmlFor="brief-audience">Who are you trying to reach?
              <input id="brief-audience" maxLength={180} className={fieldClass} value={input.audience} onChange={(e) => update("audience", e.target.value)} placeholder="For example, hotel managers in Nairobi" />
            </label>
            <div className="grid sm:grid-cols-2 gap-6">
              <label className="block text-sm text-cream/85" htmlFor="brief-timing">Target date
                <input id="brief-timing" maxLength={100} className={fieldClass} value={input.timing} onChange={(e) => update("timing", e.target.value)} placeholder="A date, month or still flexible" />
              </label>
              <label className="block text-sm text-cream/85" htmlFor="brief-budget">Working budget
                <input id="brief-budget" maxLength={100} className={fieldClass} value={input.budget} onChange={(e) => update("budget", e.target.value)} placeholder="KES range, or help me scope it" aria-describedby="budget-help" />
              </label>
            </div>
            <p id="budget-help" className="text-xs text-cream/60 -mt-2">If you have a budget, say whether it includes media spend. This helps us scope the work and is not a quote.</p>
            <label className="block text-sm text-cream/85" htmlFor="brief-notes">Anything else we should know?
              <textarea id="brief-notes" rows={4} maxLength={600} className={fieldClass} value={input.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Your main challenge, a reference you like or the assets you already have" />
            </label>
          </div>
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-cream/55 mb-4"><span className="text-signal">02</span> / Your starting plan</p>
          <h2 className="font-heading font-extrabold uppercase stretch-semi text-white tracking-[-0.02em] leading-[1] text-[clamp(1.5rem,2.6vw,2.2rem)] mb-4">{goal.label}</h2>
          <p className="text-cream/80 leading-relaxed mb-7">{goal.focus}</p>
          <ul className="space-y-5 mb-7">
            {goal.checklist.map((item, index) => <li key={item} className="flex gap-4 text-sm leading-relaxed text-cream/80"><span className="font-mono text-xs text-signal pt-0.5" aria-hidden="true">0{index + 1}</span><span>{item}</span></li>)}
          </ul>
          <p className="border-l-2 border-signal pl-5 text-sm text-cream/75 leading-relaxed mb-7">{goal.measure}</p>
          <Link href={`/services/${goal.service}`} className="group mb-8 inline-flex items-center gap-2 font-heading font-bold text-[11px] uppercase tracking-[0.16em] text-white">Explore this service<ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" /></Link>
          <details className="border-y border-white/10 py-5 mb-7">
            <summary className="cursor-pointer text-sm text-white focus-visible:outline focus-visible:outline-signal">Preview your full brief</summary>
            <pre className="mt-5 whitespace-pre-wrap break-words font-sans text-sm text-cream/75 leading-relaxed">{brief}</pre>
          </details>
          <a href={waLink(brief)} target="_blank" rel="noopener noreferrer" className="btn-primary w-full"><WhatsappLogo size={16} weight="fill" />Discuss this brief on WhatsApp</a>
          <div className="flex flex-wrap gap-3 mt-3">
            <button type="button" onClick={copyBrief} className={secondaryClass}>Copy brief</button>
            <button type="button" onClick={downloadBrief} className={secondaryClass}>Download brief</button>
          </div>
          <p className="text-xs text-cream/65 leading-relaxed mt-5">Your answers stay on this page until you choose to share them. WhatsApp opens a draft for you to review and send. No sign-up needed.</p>
          <p role="status" className="text-sm text-signal mt-3 min-h-6">{status}</p>
        </div>
      </div>
    </section>
  );
}
