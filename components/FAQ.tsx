"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Nataka Inc do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nataka Inc is a full-service media and marketing agency based in Nairobi, Kenya. We specialise in video production, music videos, brand strategy, digital marketing, film production, and PR for brands and artists across Kenya and East Africa.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Nataka Inc located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nataka Inc is located in Westlands, Nairobi, Kenya. We work with clients across Kenya and the wider East Africa region.",
      },
    },
    {
      "@type": "Question",
      name: "Does Nataka Inc produce music videos in Nairobi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Nataka Inc is one of Nairobi's leading music video production companies. We have directed music videos for Kenyan artists including Ssaru, Fathermoh, and others. We handle everything from creative direction to filming and post-production.",
      },
    },
    {
      "@type": "Question",
      name: "How do I hire Nataka Inc for a video production project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can get in touch with Nataka Inc by emailing niajekoki@gmail.com or calling +254 725 107 294. We'll discuss your project, provide a tailored quote, and walk you through our production process.",
      },
    },
  ],
};

const faqs = [
  {
    question: "What does Nataka Inc do?",
    answer:
      "Nataka Inc is a full-service media and marketing agency based in Nairobi, Kenya. We specialise in video production, music videos, brand strategy, digital marketing, film production, and PR for brands and artists across Kenya and East Africa.",
  },
  {
    question: "Where is Nataka Inc located?",
    answer:
      "Nataka Inc is located in Westlands, Nairobi, Kenya. We work with clients across Kenya and the wider East Africa region.",
  },
  {
    question: "Does Nataka Inc produce music videos in Nairobi?",
    answer:
      "Yes. Nataka Inc is one of Nairobi's leading music video production companies. We have directed music videos for Kenyan artists including Ssaru, Fathermoh, and others. We handle everything from creative direction to filming and post-production.",
  },
  {
    question: "How do I hire Nataka Inc for a video production project?",
    answer:
      "You can get in touch with Nataka Inc by emailing niajekoki@gmail.com or calling +254 725 107 294. We'll discuss your project, provide a tailored quote, and walk you through our production process.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
    <section id="faq" className="bg-ink border-t border-white/8 px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <p className="font-sans text-[10px] text-teal tracking-widest uppercase mb-4">
          Common Questions
        </p>
        <h2 className="font-geist font-black text-[clamp(1.8rem,4vw,3rem)] text-white uppercase leading-tight mb-12">
          What You Need<br />
          <span className="text-teal">To Know</span>
        </h2>

        {/* Accordion */}
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-t border-white/10 last:border-b">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
                aria-expanded={open === i}
              >
                <span className="font-geist font-bold text-base md:text-lg text-white group-hover:text-teal transition-colors duration-200 pr-8">
                  {faq.question}
                </span>
                <span
                  className="flex-shrink-0 w-8 h-8 border border-white/20 flex items-center justify-center transition-colors duration-200 group-hover:border-teal"
                  aria-hidden
                >
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="text-teal font-light text-xl leading-none"
                  >
                    +
                  </motion.span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-cream/60 text-base leading-relaxed pb-6 pr-12">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 pt-12 border-t border-white/8">
          <p className="font-sans text-cream/60 text-sm mb-4">
            Have a different question?
          </p>
          <a
            href="/#contact"
            className="inline-block font-geist font-black text-xs text-ink bg-teal px-8 py-4 uppercase tracking-widest hover:bg-teal-light transition-colors duration-200"
          >
            Get in Touch
          </a>
        </div>

      </div>
    </section>
    </>
  );
}
