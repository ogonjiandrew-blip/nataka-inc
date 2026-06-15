"use client";

/**
 * Floating WhatsApp click-to-chat — the highest-converting contact channel
 * for Kenyan clients. Opens a chat with a pre-filled message.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WA_URL =
  "https://wa.me/254725107294?text=" +
  encodeURIComponent("Hi Nataka Inc! I'd like to discuss a project.");

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // appear after the visitor has scrolled a little — not over the hero
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Nataka Inc on WhatsApp"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9980] flex items-center gap-3 bg-[#25D366] rounded-full shadow-lg shadow-black/40 pl-4 pr-4 md:pr-5 py-3.5 hover:shadow-xl hover:shadow-[#25D366]/20 transition-shadow"
        >
          {/* WhatsApp glyph */}
          <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" fill="#fff" aria-hidden>
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
          </svg>

          {/* label expands on hover (always visible on first appearance for 3s) */}
          <span
            className={`font-sans text-sm font-semibold text-white whitespace-nowrap overflow-hidden transition-all duration-300 ${
              hovered ? "max-w-[160px] opacity-100" : "max-w-[160px] md:max-w-[160px] opacity-100"
            }`}
          >
            WhatsApp Us
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
