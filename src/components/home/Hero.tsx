"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { Img } from "@/components/ui/Img";
import { EASE } from "@/components/motion/Reveal";
import type { Home } from "@/lib/schema";

/**
 * Asymmetric split hero: copy left, portrait right.
 * Entry motion: the headline lands word by word, then subtext and CTAs follow.
 * Motivation: hierarchy. The headline is the one thing to read first.
 * The role label is the page's single eyebrow.
 */
export function Hero({ role, hero }: { role: string; hero: Home["hero"] }) {
  const reduce = useReducedMotion();
  const words = hero.headline.split(" ");
  const headlineDone = 0.15 + words.length * 0.06;

  const item = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section className="pb-20 pt-6 sm:pb-28 sm:pt-10">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-7 lg:col-span-7">
          <motion.p {...item(0.05)} className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {role}
          </motion.p>

          <h1 className="max-w-[16ch] text-4xl font-semibold leading-[1.05] tracking-tighter sm:text-5xl lg:text-[3.4rem]">
            {words.map((word, i) => (
              <span key={`${word}-${i}`}>
                {i > 0 ? " " : null}
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={reduce ? false : { opacity: 0, y: "0.7em" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </span>
              </span>
            ))}
          </h1>

          <motion.p {...item(headlineDone)} className="max-w-[52ch] text-pretty text-lg leading-relaxed text-muted">
            {hero.subtext}
          </motion.p>

          <motion.div {...item(headlineDone + 0.1)} className="flex flex-wrap items-center gap-3 pt-1">
            <Button href={hero.primaryCta.href} icon={<ArrowRight weight="bold" />}>
              {hero.primaryCta.label}
            </Button>
            {hero.secondaryCta ? (
              <Button href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </Button>
            ) : null}
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
          className="lg:col-span-5"
        >
          <Frame>
            <Img
              src={hero.image.src}
              alt={hero.image.alt}
              priority
              className="aspect-[4/5] w-full object-cover dark:brightness-90"
            />
          </Frame>
        </motion.div>
      </div>
    </section>
  );
}
