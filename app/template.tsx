"use client";

/**
 * Route transition — runs on every navigation (template remounts per route).
 * A teal-edged ink curtain sweeps up off the incoming page while the
 * content rises into place, so route changes feel continuous.
 */

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* curtain — covers the screen, then sweeps up */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        style={{ transformOrigin: "top" }}
        className="fixed inset-0 z-[9990] bg-ink pointer-events-none border-b-2 border-teal"
        aria-hidden
      />

      {/* incoming content fades in — opacity only, so fixed-position
          children (navbar, gallery) keep the viewport as their anchor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
