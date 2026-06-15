"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/natakainc/" },
  { label: "TikTok", href: "https://www.tiktok.com/@natakainc" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/128374044" },
];

const PROJECT_TYPES = [
  "Music Video",
  "Brand Film / Commercial",
  "Corporate Video",
  "Event Coverage",
  "Brand Strategy",
  "Digital Marketing",
  "PR & Communications",
  "Something Else",
];

const BUDGETS = [
  "Under 100K",
  "100K – 300K",
  "300K – 500K",
  "500K – 1M",
  "1M+",
  "Not sure yet",
];

const TIMELINES = ["ASAP", "Within a month", "1–3 months", "Flexible"];

const WHATSAPP_NUMBER = "254725107294";
const EMAIL = "niajekoki@gmail.com";

function buildBrief(form: {
  name: string; email: string; company: string;
  projectType: string; budget: string; timeline: string; message: string;
}) {
  return [
    "PROJECT BRIEF — via natakainc.com",
    "",
    `Name: ${form.name}`,
    form.company ? `Company/Artist: ${form.company}` : null,
    `Project: ${form.projectType || "Not specified"}`,
    `Budget (KES): ${form.budget || "Not specified"}`,
    `Timeline: ${form.timeline || "Not specified"}`,
    "",
    `Details: ${form.message}`,
    "",
    form.email ? `Reply to: ${form.email}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", company: "",
    projectType: "", budget: "", timeline: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const brief = buildBrief(form);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(brief)}`;
  const mailUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Project Brief — ${form.projectType || "New Enquiry"} — ${form.name}`
  )}&body=${encodeURIComponent(brief)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hand the full brief to WhatsApp — instant delivery, no backend required
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 md:py-32 px-6 md:px-12 relative" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px hr-teal opacity-30" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

          {/* Left — contact info */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="font-sans text-teal text-xs tracking-widest2 uppercase mb-6"
            >
              Start a Project
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-display text-[clamp(1.9rem,6vw,5.5rem)] font-light text-white leading-none mb-6 md:mb-8"
            >
              Ready to Make <br />
              <span className="font-semibold italic">Something Great?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden sm:block font-sans text-cream/75 text-sm leading-relaxed mb-8 md:mb-12 max-w-sm"
            >
              Tell us about your project — your brief lands directly on our phone
              and we reply within 24 hours. No forms disappearing into the void.
            </motion.p>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 mb-8 md:mb-12"
            >
              {[
                { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
                { label: "Phone", value: "+254 725 107 294", href: "tel:+254725107294" },
                { label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${WHATSAPP_NUMBER}` },
                { label: "Location", value: "Westlands, Nairobi, Kenya", href: null },
              ].map((item) => (
                <div key={item.label} className="flex gap-6 items-center border-b border-white/10 pb-5">
                  <span className="font-sans text-[10px] text-teal tracking-widest uppercase w-20 shrink-0 font-medium">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      className="font-sans text-white/80 text-sm hover:text-teal transition-colors font-light">
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-sans text-white/80 text-sm font-light">{item.value}</span>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="font-sans text-[10px] text-cream/60 tracking-widest uppercase mb-4">Follow Us</p>
              <div className="flex gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-xs text-white/70 tracking-widest uppercase hover:text-teal transition-colors border border-white/15 hover:border-teal/50 px-4 py-2"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — qualified brief form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20 px-8 border border-teal/20 bg-ink-50"
                >
                  <span className="text-teal text-5xl mb-6">◈</span>
                  <h3 className="font-geist font-black text-3xl text-white uppercase mb-3">
                    Brief Ready
                  </h3>
                  <p className="font-sans text-cream/70 text-sm max-w-xs mb-8">
                    WhatsApp should have opened with your full brief — just press send.
                    We reply within 24 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-geist font-black text-xs text-ink bg-[#25D366] px-6 py-3.5 uppercase tracking-widest"
                    >
                      Reopen WhatsApp
                    </a>
                    <a
                      href={mailUrl}
                      className="font-geist font-black text-xs text-white border border-white/25 px-6 py-3.5 uppercase tracking-widest hover:border-teal hover:text-teal transition-colors"
                    >
                      Email It Instead
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField label="Full Name" name="name" type="text" value={form.name} onChange={handleChange} required />
                    <FormField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} />
                  </div>
                  <FormField label="Company / Artist Name" name="company" type="text" value={form.company} onChange={handleChange} />

                  {/* Project type chips */}
                  <ChipGroup
                    label="What are we making?"
                    options={PROJECT_TYPES}
                    value={form.projectType}
                    onSelect={(v) => setForm((f) => ({ ...f, projectType: v }))}
                  />

                  {/* Budget chips */}
                  <ChipGroup
                    label="Budget range (KES)"
                    options={BUDGETS}
                    value={form.budget}
                    onSelect={(v) => setForm((f) => ({ ...f, budget: v }))}
                  />

                  {/* Timeline chips */}
                  <ChipGroup
                    label="When do you need it?"
                    options={TIMELINES}
                    value={form.timeline}
                    onSelect={(v) => setForm((f) => ({ ...f, timeline: v }))}
                  />

                  <div>
                    <label className="block font-sans text-[10px] text-teal tracking-widest uppercase mb-2 font-medium">
                      Tell Us About Your Project{" "}
                      <span className="text-white/30 normal-case tracking-normal font-normal">(optional)</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="The idea, the song, the brand — share whatever you have. We'll ask the rest on the call."
                      className="w-full bg-ink border border-white/15 text-white/85 font-sans text-sm px-4 py-3 focus:outline-none focus:border-teal transition-colors resize-none placeholder:text-white/45"
                    />
                  </div>

                  {/* Trust signal above CTA */}
                  <p className="font-sans text-white/40 text-[10px] text-center tracking-wide -mb-2">
                    Trusted by 80+ brands across East Africa
                  </p>

                  <button
                    type="submit"
                    className="w-full py-4 bg-teal text-ink font-geist font-black text-sm tracking-widest uppercase hover:bg-teal-light transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    Send Brief via WhatsApp
                  </button>
                  <div className="flex flex-col items-center gap-2 -mt-2">
                    <p className="font-sans text-white/50 text-[11px] text-center">
                      Opens WhatsApp with your brief pre-written — or{" "}
                      <a href={mailUrl} className="text-teal hover:text-teal-light underline underline-offset-2">
                        send it by email
                      </a>{" "}
                      instead.
                    </p>
                    <p className="font-sans text-white/35 text-[10px] text-center">
                      We reply within 24 hours · Mon – Sat, 8am – 8pm EAT
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ChipGroup({
  label, options, value, onSelect,
}: {
  label: string; options: string[]; value: string; onSelect: (v: string) => void;
}) {
  return (
    <div>
      <label className="block font-sans text-[10px] text-teal tracking-widest uppercase mb-3 font-medium">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(value === opt ? "" : opt)}
            className={`font-sans text-xs px-4 py-2.5 border transition-colors duration-200 ${
              value === opt
                ? "bg-teal text-ink border-teal font-semibold"
                : "text-white/70 border-white/15 hover:border-teal/60 hover:text-white"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function FormField({
  label, name, type, value, onChange, required,
}: {
  label: string; name: string; type: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  return (
    <div>
      <label className="block font-sans text-[10px] text-teal tracking-widest uppercase mb-2 font-medium">{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange} required={required}
        className="w-full bg-ink border border-white/15 text-white/85 font-sans text-sm px-4 py-3.5 md:py-3 focus:outline-none focus:border-teal transition-colors placeholder:text-white/45"
      />
    </div>
  );
}
