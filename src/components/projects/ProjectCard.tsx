import Link from "next/link";
import { ViewTransition } from "react";
import clsx from "clsx";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Img } from "@/components/ui/Img";
import { Tag } from "@/components/ui/Tag";
import { SpotlightFrame } from "@/components/ui/SpotlightFrame";
import type { Project } from "@/lib/schema";

/**
 * The cover and title carry shared view-transition names, so navigating to
 * the project page morphs them into the page's own cover and heading.
 */
export function ProjectCard({
  project,
  large = false,
  className,
}: {
  project: Project;
  /** Fills a tall grid cell: the cover stretches to the available height. */
  large?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={clsx("group flex h-full flex-col gap-4", className)}
    >
      <ViewTransition name={`project-cover-${project.slug}`} share="auto" default="none">
        <SpotlightFrame className={clsx(large && "min-h-[18rem] flex-1")}>
          <Img
            src={project.cover.src}
            alt={project.cover.alt}
            className={clsx(
              "w-full object-cover saturate-[0.85] transition duration-700 ease-out-expo group-hover:scale-[1.04] group-hover:saturate-100 dark:brightness-90",
              large ? "aspect-[4/5] h-full md:aspect-auto" : "aspect-[16/10]",
            )}
          />
        </SpotlightFrame>
      </ViewTransition>
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <ViewTransition name={`project-title-${project.slug}`} share="auto" default="none">
            <h3 className="flex items-center gap-1.5 text-lg font-medium tracking-tight transition-colors duration-300 group-hover:text-accent">
              {project.title}
              <ArrowUpRight
                size={16}
                weight="light"
                className="-translate-x-1 opacity-0 transition duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
              />
            </h3>
          </ViewTransition>
          <span className="font-mono text-xs text-faint">{project.year}</span>
        </div>
        <p className="text-pretty text-sm leading-relaxed text-muted">{project.summary}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.slice(0, 3).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
          {project.stack.length > 3 ? <Tag>+{project.stack.length - 3}</Tag> : null}
        </div>
      </div>
    </Link>
  );
}
