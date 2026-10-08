"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * One entrance for the whole homepage: content rises 24px and fades in the
 * first time it scrolls into view. It exists to set reading order, so it
 * never loops, and it collapses to static under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "figure";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      // Same initial props on server and client (no hydration mismatch); under
      // reduced motion the entrance simply completes instantly.
      transition={reduce ? { duration: 0 } : { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
