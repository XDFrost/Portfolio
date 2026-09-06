import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { ViewTransition } from "react";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { PageTransition } from "@/components/motion/PageTransition";
import { Img } from "@/components/ui/Img";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Markdown } from "@/components/Markdown";
import { getAdjacentProjects, getProject, getProjects, getSite } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { images: [{ url: project.cover.src, alt: project.cover.alt }] },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const site = getSite();
  const { previous, next } = getAdjacentProjects(slug);
  const backLabel = `All ${site.pages.projects.title.toLowerCase()}`;

  return (
    <PageTransition>
    <Container className="pb-20 pt-4 sm:pb-28 sm:pt-6">
      <Link
        href="/projects"
        className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-300 hover:text-text"
      >
        <ArrowLeft
          size={14}
          weight="light"
          className="transition-transform duration-500 ease-out-expo group-hover:-translate-x-0.5"
        />
        {backLabel}
      </Link>

      <header className="mt-8">
        <ViewTransition name={`project-title-${project.slug}`} share="auto" default="none">
          <h1 className="max-w-[20ch] text-balance text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>
        </ViewTransition>
        <p className="mt-4 max-w-[55ch] text-lg leading-relaxed text-muted">{project.summary}</p>
      </header>

      <ViewTransition name={`project-cover-${project.slug}`} share="auto" default="none">
        <Frame className="mt-10 sm:mt-14">
          <Img
            src={project.cover.src}
            alt={project.cover.alt}
            priority
            className="aspect-[16/10] w-full object-cover dark:brightness-90 sm:aspect-[2/1]"
          />
        </Frame>
      </ViewTransition>

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Meta rail */}
        <aside className="lg:col-span-4">
          <dl className="flex flex-col gap-6 lg:sticky lg:top-28">
            <div>
              <dt className="text-xs font-medium text-faint">Role</dt>
              <dd className="mt-1">{project.role}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-faint">Year</dt>
              <dd className="mt-1 font-mono text-sm">{project.year}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-faint">Built with</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </dd>
            </div>
            {project.links.live || project.links.repo ? (
              <div>
                <dt className="text-xs font-medium text-faint">Links</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.links.live ? (
                    <Button
                      href={project.links.live}
                      variant="secondary"
                      size="sm"
                      icon={<ArrowUpRight weight="bold" />}
                    >
                      Live site
                    </Button>
                  ) : null}
                  {project.links.repo ? (
                    <Button
                      href={project.links.repo}
                      variant="secondary"
                      size="sm"
                      icon={<GithubLogo weight="regular" />}
                    >
                      Source
                    </Button>
                  ) : null}
                </dd>
              </div>
            ) : null}
          </dl>
        </aside>

        {/* Body */}
        <div className="lg:col-span-8">
          {project.highlights.length ? (
            <ul className="mb-12 grid gap-3 sm:grid-cols-1">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-muted">
                  <Check size={18} weight="bold" className="mt-1 shrink-0 text-accent" />
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <Markdown>{project.body}</Markdown>
        </div>
      </div>

      {/* Previous / next */}
      {previous || next ? (
        <nav
          aria-label="More projects"
          className="mt-20 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="group flex flex-col gap-1 rounded-2xl p-2 transition-colors duration-300 hover:bg-surface-2"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-faint">
                <ArrowLeft size={12} weight="light" /> Newer
              </span>
              <span className="font-medium tracking-tight transition-colors group-hover:text-accent">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col gap-1 rounded-2xl p-2 text-right transition-colors duration-300 hover:bg-surface-2 sm:items-end"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-faint">
                Older <ArrowRight size={12} weight="light" />
              </span>
              <span className="font-medium tracking-tight transition-colors group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          ) : null}
        </nav>
      ) : null}
    </Container>
    </PageTransition>
  );
}
