"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Contact — deliberately just a way to reach us, not an intake form.
 * The project brief form (project type, budget, timeline) was removed: it read
 * as a sales funnel on a site that is meant to feel community-first.
 */

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/natakainc/" },
  { label: "TikTok", href: "https://www.tiktok.com/@natakainc" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/128374044" },
];

const WHATSAPP_NUMBER = "254725107294";
const EMAIL = "andrew@natakainc.com";

const details = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "Phone", value: "+254 725 107 294", href: "tel:+254725107294" },
  { label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { label: "Location", value: "Westlands, Nairobi, Kenya", href: null },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-16 md:py-32 px-6 md:px-12 relative" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px hr-teal opacity-30" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* Left — the invitation */}
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
              className="font-sans text-cream/75 text-sm leading-relaxed max-w-sm"
            >
              Tell us the basics — your message lands straight on our phone and we reply
              within 24 hours. We&apos;ll work out the details together.
            </motion.p>
          </div>

          {/* Right — how to reach us */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 mb-10 md:mb-12"
            >
              {details.map((item) => (
                <div key={item.label} className="flex gap-6 items-center border-b border-white/10 pb-5">
                  <span className="font-sans text-[10px] text-teal tracking-widest uppercase w-20 shrink-0 font-medium">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="font-sans text-white/80 text-sm hover:text-teal transition-colors font-light"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-sans text-white/80 text-sm font-light">{item.value}</span>
                  )}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="font-sans text-[10px] text-cream/60 tracking-widest uppercase mb-4">Follow Us</p>
              <div className="flex flex-wrap gap-4">
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
        </div>
      </div>
    </section>
  );
}
