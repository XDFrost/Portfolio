import clsx from "clsx";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/lib/schema";

/**
 * Exactly as many cells as featured projects (1 to 4).
 * Three projects: one tall cell on the left, two stacked on the right.
 */
export function FeaturedProjects({
  title,
  projects,
  actionLabel,
}: {
  title: string;
  projects: Project[];
  actionLabel: string;
}) {
  if (projects.length === 0) return null;
  const n = projects.length;

  return (
    <section className="py-16 sm:py-24">
      <SectionHeading title={title} action={{ label: actionLabel, href: "/projects" }} />
      <div
        className={clsx(
          "grid gap-6 sm:gap-8",
          n === 1 && "grid-cols-1",
          n === 2 && "md:grid-cols-2",
          n === 3 && "md:grid-cols-2 md:grid-rows-2",
          n === 4 && "md:grid-cols-2",
        )}
      >
        {projects.map((project, i) => {
          const tall = n === 3 && i === 0;
          return (
            <Reveal
              key={project.slug}
              delay={i * 0.08}
              className={clsx("flex", tall && "md:row-span-2")}
            >
              <ProjectCard project={project} large={tall} className="w-full" />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
