"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const TEXT =
  "Nataka is a Nairobi production house for brands that want to be noticed. We write the campaign, shoot the film, cut it for every feed, and make what cameras can't with AI.";

/**
 * Manifesto line under the hero. Each word lifts from silver to white as the
 * paragraph scrolls through the viewport, so the sentence is read at the pace
 * it is revealed. Under reduced motion a CSS rule (globals.css, .statement-words)
 * lights every word, so the server and client markup stay identical.
 */
export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = TEXT.split(" ");

  return (
    <section aria-label="About Nataka" className="px-6 md:px-12 py-28 md:py-44 max-w-7xl mx-auto">
      <p
        ref={ref}
        className="statement-words font-heading font-semibold stretch-semi tracking-[-0.02em] leading-[1.18] text-[clamp(1.6rem,3.5vw,3.1rem)] max-w-5xl"
      >
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </p>
    </section>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="text-white">
      {children}{" "}
    </motion.span>
  );
}
