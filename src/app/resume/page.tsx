import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRight, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { PageTransition } from "@/components/motion/PageTransition";
import { Button } from "@/components/ui/Button";
import { PrintButton } from "@/components/resume/PrintButton";
import { getResume, getSite } from "@/lib/content";
import { formatYearMonth } from "@/lib/format";

export function generateMetadata(): Metadata {
  const site = getSite();
  return { title: site.pages.resume.title, description: getResume().basics.summary };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-6 border-t border-border py-12 lg:grid-cols-[12rem_1fr] lg:gap-12 print:py-6">
      <h2 className="text-sm font-medium text-faint lg:sticky lg:top-28 lg:self-start">{title}</h2>
      <div className="flex flex-col gap-10 print:gap-6">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  const site = getSite();
  const resume = getResume();
  const { basics } = resume;

  return (
    <PageTransition>
    <Container className="pb-20 pt-6 sm:pb-28 sm:pt-10 print:pb-0 print:pt-0">
      <header className="pb-12">
        <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
          {basics.name}
        </h1>
        <p className="mt-2 text-lg text-muted">{basics.title}</p>
        <p className="mt-1 flex flex-wrap gap-x-3 font-mono text-xs text-faint">
          <span>{basics.location}</span>
          <a href={`mailto:${basics.email}`} className="hover:text-text">
            {basics.email}
          </a>
          {basics.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </p>
        <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted">{basics.summary}</p>

        <div className="no-print mt-8 flex flex-wrap gap-3">
          {basics.pdfPath ? (
            <Button href={basics.pdfPath} download icon={<DownloadSimple weight="bold" />}>
              Download PDF
            </Button>
          ) : null}
          <PrintButton />
          <Button
            href={`mailto:${basics.email}`}
            variant="ghost"
            size="sm"
            icon={<ArrowUpRight weight="bold" />}
          >
            Email me
          </Button>
        </div>
      </header>

      {resume.experience.length ? (
        <Section title={site.labels.experience}>
          {resume.experience.map((job) => (
            <article key={`${job.company}-${job.start}`} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-lg font-medium tracking-tight">
                  {job.title} <span className="text-muted">at {job.company}</span>
                </h3>
                <p className="font-mono text-xs text-faint">
                  {formatYearMonth(job.start)} to {formatYearMonth(job.end)}
                  {job.location ? `, ${job.location}` : ""}
                </p>
              </div>
              {job.summary ? (
                <p className="mt-2 max-w-[65ch] leading-relaxed text-muted">{job.summary}</p>
              ) : null}
              {job.bullets.length ? (
                <ul className="mt-3 flex max-w-[70ch] list-disc flex-col gap-1.5 pl-5 text-muted marker:text-faint">
                  {job.bullets.map((b) => (
                    <li key={b} className="leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </Section>
      ) : null}

      {resume.education.length ? (
        <Section title={site.labels.education}>
          {resume.education.map((e) => (
            <article key={`${e.school}-${e.start}`} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-lg font-medium tracking-tight">
                  {e.degree} <span className="text-muted">at {e.school}</span>
                </h3>
                <p className="font-mono text-xs text-faint">
                  {formatYearMonth(e.start)} to {formatYearMonth(e.end)}
                </p>
              </div>
              {e.note ? <p className="mt-2 leading-relaxed text-muted">{e.note}</p> : null}
            </article>
          ))}
        </Section>
      ) : null}

      {resume.skills.length ? (
        <Section title={site.labels.skills}>
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {resume.skills.map((group) => (
              <div key={group.group} className="break-inside-avoid">
                <dt className="text-sm font-medium">{group.group}</dt>
                <dd className="mt-1 leading-relaxed text-muted">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}

      {resume.certifications.length ? (
        <Section title={site.labels.certifications}>
          <ul className="flex flex-col gap-4">
            {resume.certifications.map((c) => (
              <li
                key={`${c.name}-${c.year}`}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
              >
                <span>
                  {c.name} <span className="text-muted">by {c.issuer}</span>
                </span>
                <span className="font-mono text-xs text-faint">{c.year}</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </Container>
    </PageTransition>
  );
}
