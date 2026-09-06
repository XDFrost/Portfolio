"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Fades and lifts children in the first time they enter the viewport.
 * Motivation: sequences sections as the reader scrolls so each one reads as
 * its own moment. Collapses to static under prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
