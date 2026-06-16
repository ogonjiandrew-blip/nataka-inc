"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Work",     href: "/#work"     },
  { label: "Reel",     href: "/#reel"     },
  { label: "Gallery",  href: "/gallery"   },
  { label: "About",    href: "/#about"    },
  { label: "Insights", href: "/blog"      },
  { label: "Contact",  href: "/#contact"  },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/natakainc/" },
  { label: "TikTok",    href: "https://www.tiktok.com/@natakainc"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-500 backdrop-blur-md ${
          scrolled ? "bg-ink/92 border-b border-white/8" : "bg-gradient-to-b from-ink/85 via-ink/45 to-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#" className="group">
          <span className="font-nataka font-black text-xl text-white tracking-tight group-hover:text-teal transition-colors duration-300">
            NATAKA<span className="text-teal">.</span>INC
          </span>
        </a>

        {/* Desktop nav — shared sliding underline via layoutId */}
        <nav
          className="hidden md:flex items-center gap-8"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.label)}
              className="relative font-sans text-xs tracking-widest uppercase font-medium py-1 transition-colors duration-200"
              style={{ color: hoveredLink === link.label ? "#F0EDE6" : "rgba(240,237,230,0.55)" }}
            >
              {link.label}
              {hoveredLink === link.label && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-teal"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}

          <a
            href="#contact"
            className="relative px-6 py-2.5 border border-teal text-teal text-xs tracking-widest uppercase font-sans font-medium overflow-hidden group"
          >
            {/* Fill sweep on hover */}
            <span className="absolute inset-0 bg-teal translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 group-hover:text-ink transition-colors duration-300">
              Start a Project
            </span>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
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
            className="fixed inset-0 z-40 bg-ink flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.1 }}
                onClick={() => setMenuOpen(false)}
                className="font-geist font-black text-5xl text-white hover:text-teal transition-colors uppercase"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-10 py-3 border border-teal text-teal text-sm tracking-widest uppercase font-sans font-medium"
            >
              Start a Project
            </motion.a>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-6"
            >
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="font-sans text-xs text-white/40 tracking-widest uppercase hover:text-teal transition-colors">
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
