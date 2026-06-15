"use client";

import { motion } from "framer-motion";

interface Props {
  text: string;
  inView: boolean;
  delay?: number;
  className?: string;
  /** Per-character stagger in seconds */
  stagger?: number;
}

/**
 * Reveals text letter-by-letter with a slight upward slide.
 * Use for section labels ("WHAT WE DO", "SELECTED WORK") — far more
 * intentional than a plain fade-in.
 */
export default function LetterReveal({ text, inView, delay = 0, className = "", stagger = 0.04 }: Props) {
  return (
    <span className={`inline-block overflow-hidden ${className}`} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: 0.35,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}
