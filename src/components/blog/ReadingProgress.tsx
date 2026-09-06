"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";

/** Thin accent line across the top that fills as the reader scrolls. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="no-print fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
    />
  );
}
