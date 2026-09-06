import type { Metadata } from "next";
import { FolderOpen } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageTransition } from "@/components/motion/PageTransition";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { getAllStacks, getProjects, getSite } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { title, intro } = getSite().pages.projects;
  return { title, description: intro || undefined };
}

function metaLine(years: number[]): string | undefined {
  if (years.length === 0) return undefined;
  const count = `${years.length} ${years.length === 1 ? "project" : "projects"}`;
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? `${count}, ${min}` : `${count}, ${min} to ${max}`;
}

export default function ProjectsPage() {
  const site = getSite();
  const projects = getProjects();
  const stacks = getAllStacks();

  return (
    <PageTransition>
      <Container className="pb-20 pt-6 sm:pb-28 sm:pt-10">
        <PageHeader
          title={site.pages.projects.title}
          intro={site.pages.projects.intro}
          meta={metaLine(projects.map((p) => p.year))}
        />
        {projects.length === 0 ? (
          <EmptyState
            icon={<FolderOpen weight="light" />}
            title="No projects yet"
            body="Add entries to content/projects.json and they will appear here."
          />
        ) : (
          <ProjectFilter projects={projects} stacks={stacks} />
        )}
      </Container>
    </PageTransition>
  );
}
