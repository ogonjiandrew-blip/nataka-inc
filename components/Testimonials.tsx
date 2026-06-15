"use client";

// TODO: Replace placeholder quotes with real approved client testimonials before launch.
// Client names and companies are real; quotes are representative placeholders.

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// TODO: Replace placeholder quotes with real approved client testimonials before launch.
const testimonials = [
  {
    quote:
      "Nataka gets youth culture. They didn't just produce content — they captured our energy and gave it a visual language that our audience immediately connected with.",
    name: "Creative Lead",
    role: "Brand Director",
    company: "Vijana Baru Baru",
    initials: "VB",
  },
  {
    quote:
      "The Kwanini video captured exactly who I am as an artist. They didn't just shoot a video — they built a whole visual world that made the song feel bigger than itself.",
    name: "Ssaru",
    role: "Recording Artist",
    company: "Independent",
    initials: "SR",
  },
  {
    quote:
      "Working with Nataka was seamless from day one. They understand how to make content that doesn't just look good — it actually makes people laugh and share.",
    name: "Mulamwah",
    role: "Content Creator & Comedian",
    company: "Independent",
    initials: "ML",
  },
  {
    quote:
      "Every deliverable was crafted with intent. Nataka brought the kind of strategic thinking and cinematic quality I'd expect from a top-tier global agency.",
    name: "Marketing Team",
    role: "Director",
    company: "Maxus Properties",
    initials: "MP",
  },
  {
    quote:
      "Nataka helped us tell our story in a way that felt fresh and premium. The campaign cut through the noise and drove real footfall — exactly what a retail brand needs.",
    name: "Marketing Manager",
    role: "Head of Marketing",
    company: "Sarit Centre",
    initials: "SC",
  },
  {
    quote:
      "The production quality and attention to detail was outstanding. Nataka elevated our brand presence across all channels and gave us content we're still using a year later.",
    name: "Brand Team",
    role: "Marketing Director",
    company: "Village Market Mall",
    initials: "VM",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-ink-50" />
      <div className="absolute top-0 inset-x-0 h-px hr-teal opacity-20" />

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="font-sans text-teal text-[10px] tracking-widest2 uppercase mb-5 font-medium"
          >
            Client Voices
          </motion.p>
          <div className="overflow-hidden">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.77, 0, 0.175, 1] }}
            >
              <h2 className="leading-none">
                <span className="font-geist font-black text-[clamp(1.8rem,6vw,5rem)] text-white uppercase block">
                  What Our
                </span>
                <span className="font-display font-semibold italic text-[clamp(1.8rem,6vw,5rem)] text-teal block">
                  Clients Say.
                </span>
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.company}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 md:p-8 border border-white/8 bg-ink hover:border-teal/20 transition-colors duration-300 flex flex-col"
            >
              {/* Open quote mark */}
              <span
                className="font-display text-6xl text-teal/25 leading-none mb-3 -ml-1 block"
                aria-hidden="true"
              >
                "
              </span>

              <p className="font-sans text-white/80 text-sm leading-relaxed flex-1 mb-6">
                {t.quote}
              </p>

              <div className="h-px bg-white/8 mb-5" />

              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full bg-teal/12 border border-teal/25 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <span className="font-geist font-black text-[10px] text-teal tracking-tight">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="font-geist font-black text-white text-xs uppercase tracking-wide leading-none mb-0.5">
                    {t.name}
                  </p>
                  <p className="font-sans text-white/45 text-[10px] tracking-wide">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-10 md:mt-12 text-center"
        >
          <a
            href="#contact"
            className="font-sans text-white/45 text-xs tracking-widest uppercase hover:text-teal transition-colors border-b border-white/15 hover:border-teal pb-1"
          >
            Join 80+ brands we&apos;ve elevated →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
