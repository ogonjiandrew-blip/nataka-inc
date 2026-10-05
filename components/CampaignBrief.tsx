"use client";

import { useState } from "react";
import Link from "next/link";
import { buildCampaignBrief, campaignGoals, getCampaignGoal, type BriefInput } from "@/lib/campaignBrief";
import { waLink } from "@/lib/whatsapp";

const fieldClass = "mt-2 w-full rounded-none border border-white/25 bg-ink px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal";
const secondaryClass = "border border-white/30 px-5 py-3 text-sm text-white hover:border-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal";

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
    <section id="brief-builder" aria-labelledby="builder-title" className="px-6 md:px-12 max-w-7xl mx-auto pb-20">
      <div className="border-t border-white/15 pt-10 grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <p className="font-mono text-xs text-teal uppercase tracking-widest mb-4">01 / Your project</p>
          <h2 id="builder-title" className="font-geist font-bold text-3xl text-white mb-3">A few details. A clearer brief.</h2>
          <p className="text-cream/70 text-sm leading-relaxed mb-8">Fill in what you know. It is fine to leave the rest for a conversation.</p>
          <div className="space-y-6">
            <label className="block text-sm text-white" htmlFor="brief-company">Company or brand
              <input id="brief-company" name="organization" autoComplete="organization" maxLength={100} className={fieldClass} value={input.company} onChange={(e) => update("company", e.target.value)} placeholder="Your company name" />
            </label>
            <label className="block text-sm text-white" htmlFor="brief-goal">What do you want to do?
              <select id="brief-goal" className={fieldClass} value={input.goal} onChange={(e) => update("goal", e.target.value)}>
                {campaignGoals.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
              </select>
            </label>
            <label className="block text-sm text-white" htmlFor="brief-audience">Who are you trying to reach?
              <input id="brief-audience" maxLength={180} className={fieldClass} value={input.audience} onChange={(e) => update("audience", e.target.value)} placeholder="For example, hotel managers in Nairobi" />
            </label>
            <div className="grid sm:grid-cols-2 gap-6">
              <label className="block text-sm text-white" htmlFor="brief-timing">Target date
                <input id="brief-timing" maxLength={100} className={fieldClass} value={input.timing} onChange={(e) => update("timing", e.target.value)} placeholder="A date, month or still flexible" />
              </label>
              <label className="block text-sm text-white" htmlFor="brief-budget">Working budget
                <input id="brief-budget" maxLength={100} className={fieldClass} value={input.budget} onChange={(e) => update("budget", e.target.value)} placeholder="KES range, or help me scope it" aria-describedby="budget-help" />
              </label>
            </div>
            <p id="budget-help" className="text-xs text-cream/60 -mt-2">If you have a budget, say whether it includes media spend. This helps us scope the work and is not a quote.</p>
            <label className="block text-sm text-white" htmlFor="brief-notes">Anything else we should know?
              <textarea id="brief-notes" rows={4} maxLength={600} className={fieldClass} value={input.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Your main challenge, a reference you like or the assets you already have" />
            </label>
          </div>
        </div>
        <div className="min-w-0">
          <p className="font-mono text-xs text-teal uppercase tracking-widest mb-4">02 / Your starting plan</p>
          <h2 className="font-geist font-bold text-3xl text-white mb-4">{goal.label}</h2>
          <p className="text-cream/80 leading-relaxed mb-7">{goal.focus}</p>
          <ul className="space-y-5 mb-7">
            {goal.checklist.map((item, index) => <li key={item} className="flex gap-4 text-sm leading-relaxed text-cream/80"><span className="font-mono text-teal" aria-hidden="true">0{index + 1}</span><span>{item}</span></li>)}
          </ul>
          <p className="border-l-2 border-teal pl-5 text-sm text-cream/75 leading-relaxed mb-7">{goal.measure}</p>
          <Link href={`/services/${goal.service}`} className="inline-block text-sm text-teal underline underline-offset-4 mb-8">Explore this service →</Link>
          <details className="border-y border-white/15 py-5 mb-7">
            <summary className="cursor-pointer text-sm text-white focus-visible:outline focus-visible:outline-teal">Preview your full brief</summary>
            <pre className="mt-5 whitespace-pre-wrap break-words font-sans text-sm text-cream/75 leading-relaxed">{brief}</pre>
          </details>
          <a href={waLink(brief)} target="_blank" rel="noopener noreferrer" className="block text-center bg-teal px-6 py-4 text-ink font-geist font-bold text-sm hover:bg-teal-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal">Discuss this brief on WhatsApp →</a>
          <div className="flex flex-wrap gap-3 mt-3">
            <button type="button" onClick={copyBrief} className={secondaryClass}>Copy brief</button>
            <button type="button" onClick={downloadBrief} className={secondaryClass}>Download brief</button>
          </div>
          <p className="text-xs text-cream/65 leading-relaxed mt-5">Your answers stay on this page until you choose to share them. WhatsApp opens a draft for you to review and send. No sign-up needed.</p>
          <p role="status" className="text-sm text-teal mt-3 min-h-6">{status}</p>
        </div>
      </div>
    </section>
  );
}
