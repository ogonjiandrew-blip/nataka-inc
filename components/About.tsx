"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-ink-50" />
      <div className="absolute top-0 inset-x-0 h-px hr-teal opacity-20" />
      <div className="absolute bottom-0 inset-x-0 h-px hr-teal opacity-20" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="font-sans text-teal text-[10px] tracking-widest2 uppercase mb-6 font-medium"
            >
              About Nataka
            </motion.p>

            <div className="overflow-hidden mb-8">
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 1, delay: 0.1, ease: [0.77, 0, 0.175, 1] }}
              >
                <h2 className="leading-tight">
                  <span className="font-geist font-black text-[clamp(1.5rem,5vw,4.5rem)] text-white uppercase block">
                    Rooted in
                  </span>
                  <span className="font-display font-semibold italic text-[clamp(1.5rem,5vw,4.5rem)] text-teal block">
                    Nairobi.
                  </span>
                  <span className="font-geist font-black text-[clamp(1.5rem,5vw,4.5rem)] text-white uppercase block">
                    Built for
                  </span>
                  <span className="font-display font-semibold italic text-[clamp(1.5rem,5vw,4.5rem)] text-white/60 block">
                    the World.
                  </span>
                </h2>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-sans text-white/80 text-base leading-relaxed mb-5"
            >
              Nataka means{" "}
              <span className="text-teal font-semibold">"I want"</span>{" "}
              in Swahili — and we want everything for our clients. We are a collective of
              strategists, creatives, and storytellers who believe African brands deserve
              world-class marketing.
            </motion.p>

            {/* Hidden on small screens — heading + first paragraph is enough */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="hidden sm:block font-sans text-white/65 text-base leading-relaxed"
            >
              From startup to enterprise, we partner with brands at every stage —
              injecting strategy, soul, and cinematic quality into everything we touch.
            </motion.p>
          </div>

          {/* Right: values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              { icon: "◈", title: "Bold Ideas", desc: "We don't do safe. Every campaign starts with a brave insight." },
              { icon: "◉", title: "African Lens", desc: "Local culture intelligence applied to every strategy we build." },
              { icon: "◇", title: "Cinematic Quality", desc: "Production values that rival any global agency." },
              { icon: "◎", title: "Real Impact", desc: "Beautiful work that moves product, not just pixels." },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.1 }}
                className="p-5 md:p-6 border border-white/8 bg-ink hover:border-teal/25 transition-colors duration-300 group"
              >
                <span className="text-teal text-lg mb-4 block">{value.icon}</span>
                <h4 className="font-geist font-black text-white text-sm uppercase mb-2 group-hover:text-teal transition-colors duration-300">{value.title}</h4>
                <p className="font-sans text-white/60 text-xs leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
