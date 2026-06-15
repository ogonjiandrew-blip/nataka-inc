"use client";

import { motion } from "framer-motion";

// Alternating Helvetica Black + Cormorant Italic for a designed, not templated, ticker
const items = [
  { text: "Brand Strategy",       style: "nataka" },
  { text: "·",                    style: "dot"    },
  { text: "Creative Production",  style: "display"},
  { text: "·",                    style: "dot"    },
  { text: "Digital Marketing",    style: "nataka" },
  { text: "·",                    style: "dot"    },
  { text: "PR & Communications",  style: "display"},
  { text: "·",                    style: "dot"    },
  { text: "Nairobi",              style: "nataka" },
  { text: "·",                    style: "dot"    },
  { text: "East Africa",          style: "display"},
  { text: "·",                    style: "dot"    },
];

export default function MarqueeBanner() {
  return (
    <div className="border-y border-white/6 bg-ink-50 py-4 overflow-hidden" aria-hidden>
      <div className="flex">
        {[0, 1].map((key) => (
          <motion.div
            key={key}
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="flex shrink-0 items-center gap-8 pr-8"
          >
            {items.map((item, i) => (
              item.style === "dot" ? (
                <span key={i} className="text-teal/40 text-base">·</span>
              ) : item.style === "nataka" ? (
                <span key={i} className="font-geist font-black text-[11px] text-white/55 uppercase tracking-wider whitespace-nowrap">
                  {item.text}
                </span>
              ) : (
                <span key={i} className="font-display font-semibold italic text-sm text-white/50 whitespace-nowrap">
                  {item.text}
                </span>
              )
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
