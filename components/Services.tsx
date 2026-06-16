"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import LetterReveal from "@/components/LetterReveal";
import { useTextScramble } from "@/hooks/useTextScramble";

const services = [
  {
    number: "01",
    title: "Brand Strategy",
    description: "We decode what makes your brand irreplaceable — then build the systems, voice, and positioning to prove it. Identity design, brand architecture, messaging frameworks.",
    tags: ["Brand Identity", "Positioning", "Messaging"],
    href: "/services/brand-strategy-kenya",
  },
  {
    number: "02",
    title: "Digital Marketing",
    description: "Data-driven campaigns that cut through noise. Social media, SEO, paid media, content strategy — we engineer growth with precision and creativity.",
    tags: ["Social Media", "Paid Ads", "SEO", "Content"],
    href: "/services/digital-marketing-nairobi",
  },
  {
    number: "03",
    title: "Creative Production",
    description: "Cinematic video, editorial photography, motion graphics. We produce content that stops the scroll and earns attention in a world that has none to spare.",
    tags: ["Video", "Photography", "Motion Graphics"],
    href: "/services/video-production-nairobi",
  },
  {
    number: "04",
    title: "PR & Communications",
    description: "Strategic visibility through media relations, influencer partnerships, and event campaigns. We put your brand in rooms it needs to be in.",
    tags: ["Media Relations", "Influencer", "Events"],
    href: "",
  },
  {
    number: "05",
    title: "Music Videos",
    description: "Artist-driven music video production — concept, direction, and post for Kenya's boldest sounds. We directed Ssaru x Fathermoh's 'Kwanini'.",
    tags: ["Direction", "Production", "Post"],
    href: "/services/music-video-production-nairobi",
  },
];

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto" ref={ref}>

      <div className="mb-16 md:mb-20">
        {/* Character-stagger label */}
        <div className="mb-5">
          <LetterReveal text="What We Do" inView={inView} delay={0} stagger={0.045}
            className="font-sans text-teal text-[10px] tracking-widest2 uppercase font-medium" />
        </div>

        <div className="overflow-hidden">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.77, 0, 0.175, 1] }}
          >
            <h2 className="leading-none">
              <span className="font-geist font-black text-[clamp(1.8rem,7vw,6rem)] text-white uppercase block">Full-Service</span>
              <span className="font-display font-semibold italic text-[clamp(1.8rem,7vw,6rem)] text-teal block">Excellence.</span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Animated HR */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
        style={{ transformOrigin: "left" }}
        className="hr-teal opacity-30 mb-16 md:mb-20"
      />

      {/* Desktop rows */}
      <div className="hidden md:block divide-y divide-white/8">
        {services.map((s, i) => <DesktopRow key={s.number} service={s} index={i} inView={inView} />)}
      </div>

      {/* Mobile accordion */}
      <div className="md:hidden divide-y divide-white/8">
        {services.map((s, i) => (
          <MobileAccordion key={s.number} service={s} index={i}
            isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} inView={inView} />
        ))}
      </div>

      {/* View all services */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-14 md:mt-20"
      >
        <a
          href="/services"
          className="inline-flex items-center justify-center gap-2 font-geist font-black text-xs text-ink bg-teal px-8 py-4 uppercase tracking-widest hover:bg-teal-light transition-colors duration-300"
        >
          View All Services →
        </a>
      </motion.div>
    </section>
  );
}

/* ── Desktop row — number scrambles on hover ── */
function DesktopRow({ service, index, inView }: { service: (typeof services)[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const scrambled = useTextScramble(service.number, hovered, 0);

  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
      animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.4 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group grid grid-cols-[64px_1fr_1.2fr_auto] gap-6 py-9 hover:bg-white/[0.018] transition-colors duration-500 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Number — scrambles on hover */}
      <span className="font-geist font-black text-sm text-teal/50 pt-1 group-hover:text-teal transition-colors duration-200 tabular-nums">
        {scrambled}
      </span>

      <h3 className="font-geist font-black text-2xl text-white uppercase group-hover:text-teal transition-colors duration-300 self-start pt-0.5">
        {service.title}
      </h3>

      <div>
        <p className="font-sans text-white/75 text-sm leading-relaxed">{service.description}</p>
        {service.href && (
          <a href={service.href} className="inline-block mt-3 font-sans text-[11px] text-teal tracking-widest uppercase border-b border-teal/30 hover:border-teal pb-0.5 transition-colors">
            Learn More →
          </a>
        )}
      </div>

      <div className="flex flex-col gap-2 items-end self-start pt-1">
        {service.tags.map((tag) => (
          <span key={tag} className="font-sans text-[10px] text-teal tracking-wider uppercase border border-teal/25 px-3 py-1 font-medium whitespace-nowrap group-hover:border-teal/50 transition-colors duration-300">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Mobile accordion ── */
function MobileAccordion({ service, index, isOpen, onToggle, inView }: {
  service: (typeof services)[0]; index: number; isOpen: boolean; onToggle: () => void; inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
    >
      <button onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left min-h-[56px]"
        aria-expanded={isOpen}>
        <div className="flex items-center gap-4">
          <span className="font-geist font-black text-[10px] text-teal/50">{service.number}</span>
          <h3 className="font-geist font-black text-xl text-white uppercase">{service.title}</h3>
        </div>
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }}
          className="text-teal text-2xl leading-none flex-shrink-0 ml-4" aria-hidden>+</motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-1 space-y-4">
              <p className="font-sans text-white/75 text-sm leading-relaxed">{service.description}</p>
              {service.href && (
                <a href={service.href} className="inline-block font-sans text-[11px] text-teal tracking-widest uppercase border-b border-teal/30 pb-0.5">
                  Learn More →
                </a>
              )}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="font-sans text-[10px] text-teal tracking-wider uppercase border border-teal/25 px-3 py-1.5 font-medium">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
