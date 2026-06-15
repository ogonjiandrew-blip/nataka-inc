"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  href: string;
  className?: string;
  strength?: number; // 0–1, how strongly it pulls
}

/**
 * A button/link that physically pulls toward the cursor when hovered.
 * The element moves, the content moves slightly more — creating a
 * layered parallax that feels hand-crafted.
 */
export default function MagneticButton({ children, href, className = "", strength = 0.35 }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [innerPos, setInnerPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    setPos({ x: dx * strength, y: dy * strength });
    // Content moves further than the wrapper for depth
    setInnerPos({ x: dx * strength * 0.5, y: dy * strength * 0.5 });
  };

  const handleMouseLeave = () => {
    setActive(false);
    setPos({ x: 0, y: 0 });
    setInnerPos({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.6 }}
    >
      <motion.span
        className="block"
        animate={{ x: innerPos.x, y: innerPos.y }}
        transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.5 }}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}
