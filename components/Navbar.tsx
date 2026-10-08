"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const navLinks = [
  { label: "Work",     href: "/#work"     },
  { label: "Services", href: "/#services" },
  { label: "AI video", href: "/services/ai-video-production-kenya" },
  { label: "About",    href: "/#about"    },
  { label: "Pricing",  href: "/work-with-us" },
  { label: "Insights", href: "/blog"      },
];

// The full-screen mobile menu has room for the secondary pages; the desktop bar does not.
const mobileNavLinks = [...navLinks, { label: "Gallery", href: "/gallery" }, { label: "Community", href: "/community" }];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/natakainc/" },
  { label: "TikTok",    href: "https://www.tiktok.com/@natakainc"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Only flips state when the 60px threshold is crossed, not on every frame
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const past = y > 60;
    if (past !== scrolled) setScrolled(past);
  });

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 md:h-[72px] transition-colors duration-500 ${
          scrolled ? "bg-ink/55 backdrop-blur-xl border-b border-white/[0.07]" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="/" className="group" aria-label="Nataka Inc home">
          <span className="font-nataka font-black text-xl text-white tracking-tight transition-opacity duration-300 group-hover:opacity-80">
            NATAKA<span className="text-signal">.</span>INC
          </span>
        </a>

        {/* Desktop nav — shared sliding underline via layoutId */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-8"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.label)}
              className="relative font-sans text-sm font-medium py-1 transition-colors duration-200"
              style={{ color: hoveredLink === link.label ? "#F5F6F8" : "rgba(231,233,236,0.62)" }}
            >
              {link.label}
              {hoveredLink === link.label && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}

          <a
            href="/#contact"
            className="btn-primary !px-5 !py-2.5 !text-[11px]"
          >
            Start a project
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}   className="block w-6 h-px bg-white origin-center" />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}                          className="block w-4 h-px bg-white" />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="block w-6 h-px bg-white origin-center" />
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-ink flex flex-col items-center justify-center gap-5 py-24 overflow-y-auto lg:hidden"
          >
            {mobileNavLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.1 }}
                onClick={() => setMenuOpen(false)}
                className="font-heading font-extrabold stretch-semi text-[2rem] sm:text-4xl tracking-tight text-white hover:text-accent-dark transition-colors shrink-0"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="/#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => setMenuOpen(false)}
              className="mt-2 btn-primary"
            >
              Start a project
            </motion.a>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-6"
            >
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="font-sans text-sm text-cream/55 hover:text-accent transition-colors">
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
