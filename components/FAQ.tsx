"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "@phosphor-icons/react";

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
        text: "You can get in touch with Nataka Inc by emailing andrew@natakainc.com or calling +254 117 386 206. We'll discuss your project, provide a tailored quote, and walk you through our production process.",
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
      "You can get in touch with Nataka Inc by emailing andrew@natakainc.com or calling +254 117 386 206. We'll discuss your project, provide a tailored quote, and walk you through our production process.",
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
    <section id="faq" className="px-6 md:px-12 pt-4 md:pt-8 pb-24 md:pb-32">
      <div className="max-w-3xl mx-auto">

        <h2 className="font-heading font-extrabold stretch-semi text-white tracking-[-0.03em] leading-[1.05] text-[clamp(2rem,4.4vw,3.4rem)] mb-10 md:mb-12">
          Questions buyers ask
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
                <span className="font-heading font-semibold text-base md:text-lg text-white tracking-tight group-hover:text-accent transition-colors duration-200 pr-8">
                  {faq.question}
                </span>
                <span
                  className="flex-shrink-0 w-8 h-8 border border-white/20 flex items-center justify-center transition-colors duration-200 group-hover:border-accent"
                  aria-hidden
                >
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="text-accent flex"
                  >
                    <Plus size={14} weight="bold" />
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
                    <p className="font-sans text-cream/65 text-base leading-relaxed pb-6 pr-12 max-w-[62ch]">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
    </>
  );
}
