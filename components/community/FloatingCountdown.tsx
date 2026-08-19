"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { countdowns } from "@/lib/community";

/**
 * Site-wide floating countdown to Otamatsuri 2026.
 * Sits above the WhatsApp button (which owns bottom-6/right-6 at z-9980).
 * Dismissable for the session, and disappears on its own once the event ends.
 */

const EVENT = countdowns.find((c) => c.id === "otamatsuri-2026")!;
const DISMISS_KEY = "otamatsuri-countdown-dismissed";

export default function FloatingCountdown() {
  const pathname = usePathname();
  const [now, setNow] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(true); // assume hidden until we've checked storage

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const hide = () => {
    setDismissed(true);
    try { sessionStorage.setItem(DISMISS_KEY, "1"); } catch { /* private mode */ }
  };

  // The dedicated event page has its own hero countdown — don't double up.
  // The booth funnel page is a form customers fill standing at the event;
  // nothing may pull them away from it.
  const onEventPage = pathname === "/otamatsuri-2026" || pathname === "/otamatsuri-experience";

  if (!EVENT.target || dismissed || onEventPage || now === null) return null;

  const diff = new Date(EVENT.target).getTime() - now;
  if (diff <= 0) return null; // event has started; retire quietly

  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor(diff / 3_600_000) % 24;
  const m = Math.floor(diff / 60_000) % 60;
  const s = Math.floor(diff / 1_000) % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        className="fixed bottom-24 right-4 md:bottom-28 md:right-8 z-[9975]"
      >
        <div className="relative">
          <Link
            href="/otamatsuri-2026"
            aria-label={`Otamatsuri 2026 — ${d} days to go. See date, venue and tickets.`}
            className="group flex items-center gap-3 md:gap-4 bg-ink/95 backdrop-blur-md border border-otaku/50 hover:border-otaku rounded-full shadow-lg shadow-black/50 pl-4 pr-5 md:pr-6 py-2.5 md:py-3 transition-colors"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(232,68,46,0.15)" }}
          >
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0" aria-hidden>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-otaku opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-otaku" />
            </span>

            <span className="flex flex-col leading-none">
              <span className="font-sans text-[8px] md:text-[9px] tracking-widest2 uppercase text-otaku-light font-medium mb-1.5">
                Otamatsuri 2026
              </span>
              {/* Days sit apart from the clock — at a glance the day count is
                  the number that matters, and the digits need room to read. */}
              <span className="flex items-baseline gap-4 font-geist font-black text-sm md:text-base tabular-nums">
                <span className="text-white">
                  {d}<span className="text-white/55 ml-px">d</span>
                </span>
                <span className="text-white/75 tracking-wider">
                  {pad(h)}:{pad(m)}<span className="hidden md:inline">:{pad(s)}</span>
                </span>
              </span>
            </span>

            <span className="hidden md:inline font-sans text-[9px] tracking-widest uppercase text-white/45 group-hover:text-otaku-light transition-colors border-l border-white/15 pl-4">
              Details
            </span>
          </Link>

          <button
            type="button"
            onClick={hide}
            aria-label="Hide the Otamatsuri countdown"
            className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-ink border border-white/25 text-white/60 hover:text-white hover:border-white/50 flex items-center justify-center text-xs leading-none transition-colors"
          >
            ×
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
