"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { ProjectCard } from "./ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { EASE } from "@/components/motion/Reveal";
import type { Project } from "@/lib/schema";

/**
 * Stack filter plus the project grid. Motion motivation: the layout animation
 * shows which cards stayed and which left when a filter changes.
 */
export function ProjectFilter({
  projects,
  stacks,
  allLabel = "All",
}: {
  projects: Project[];
  stacks: string[];
  allLabel?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const visible = active ? projects.filter((p) => p.stack.includes(active)) : projects;

  const pill = (label: string, value: string | null) => {
    const selected = active === value;
    return (
      <button
        key={value ?? "__all"}
        type="button"
        onClick={() => setActive(value)}
        aria-pressed={selected}
        className={clsx(
          "relative isolate whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300 active:scale-[0.97]",
          selected
            ? "text-bg"
            : "bg-surface text-muted ring-1 ring-border hover:text-text hover:ring-faint",
        )}
      >
        {selected ? (
          <motion.span
            layoutId="filter-active"
            className="absolute inset-0 -z-10 rounded-full bg-text"
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
          />
        ) : null}
        {label}
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-10">
      {stacks.length > 1 ? (
        <div
          role="group"
          aria-label="Filter projects by technology"
          className="flex flex-wrap gap-2"
        >
          {pill(allLabel, null)}
          {stacks.map((s) => pill(s, s))}
        </div>
      ) : null}

      {visible.length === 0 ? (
        <EmptyState
          title="Nothing matches that filter"
          body="Pick a different technology or clear the filter to see every project."
        />
      ) : (
        <motion.ul layout className="grid gap-8 sm:gap-10 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.li
                key={project.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
