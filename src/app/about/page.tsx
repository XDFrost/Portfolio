import type { Metadata } from "next";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Img } from "@/components/ui/Img";
import { Tag } from "@/components/ui/Tag";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Markdown } from "@/components/Markdown";
import { Reveal } from "@/components/motion/Reveal";
import { PageTransition } from "@/components/motion/PageTransition";
import { getAbout, getResume, getSite } from "@/lib/content";
import { formatYearMonth } from "@/lib/format";

export function generateMetadata(): Metadata {
  return { title: getSite().pages.about.title };
}

/* Bento cells rotate through surfaces so the grid is not uniform white-on-white. */
const cellTints = ["bg-accent-soft ring-accent/20", "bg-surface", "bg-surface-2", "bg-surface"];

export default function AboutPage() {
  const site = getSite();
  const about = getAbout();
  const resume = getResume();
  const experience = resume.experience.slice(0, about.experienceCount);

  return (
    <PageTransition>
      <Container>
        {/* Photo and bio */}
        <section className="pb-16 pt-6 sm:pb-24 sm:pt-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Frame>
                <Img
                  src={about.photo.src}
                  alt={about.photo.alt}
                  priority
                  className="aspect-[4/5] w-full object-cover dark:brightness-90"
                />
              </Frame>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col justify-center lg:col-span-7">
              <h1 className="max-w-[20ch] text-balance text-3xl font-semibold leading-[1.1] tracking-tighter sm:text-4xl lg:text-5xl">
                {about.heading}
              </h1>
              <Markdown className="mt-8">{about.bio.join("\n\n")}</Markdown>
            </Reveal>
          </div>
        </section>

        {/* Skills as a bento: exactly one cell per group */}
        <section className="py-16 sm:py-24">
          <SectionHeading title={site.labels.skills} />
          <div className="grid gap-4 sm:grid-cols-2">
            {about.skills.map((group, i) => (
              <Reveal key={group.group} delay={i * 0.06} className="flex">
                <div
                  className={clsx(
                    "w-full rounded-2xl p-6 ring-1 ring-border transition-shadow duration-700 ease-out-expo hover:shadow-soft sm:p-7",
                    cellTints[i % cellTints.length],
                  )}
                >
                  <h3 className="text-lg font-medium tracking-tight">{group.group}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Tag key={item} className="px-3 py-1 text-sm">
                        {item}
                      </Tag>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Experience, from resume.json */}
        {experience.length ? (
          <section className="py-16 sm:py-24">
            <SectionHeading
              title={site.labels.experience}
              action={{ label: `Full ${site.pages.resume.title.toLowerCase()}`, href: "/resume" }}
            />
            <ol className="flex flex-col">
              {experience.map((job, i) => (
                <Reveal key={`${job.company}-${job.start}`} delay={i * 0.06}>
                  <li className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-x-10">
                    <p className="font-mono text-xs text-faint sm:pt-1.5">
                      {formatYearMonth(job.start)} to {formatYearMonth(job.end)}
                    </p>
                    <div className="border-l border-border pb-10 pl-6 last:pb-0">
                      <h3 className="text-balance text-lg font-medium tracking-tight">
                        {job.title} <span className="text-muted">at {job.company}</span>
                      </h3>
                      {job.summary ? (
                        <p className="mt-2 max-w-[65ch] text-pretty leading-relaxed text-muted">{job.summary}</p>
                      ) : null}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>
        ) : null}

        {/* Interests as a scroll-snap pill row */}
        {about.interests.length ? (
          <section className="py-16 sm:py-24">
            <SectionHeading title={site.labels.interests} />
            <Reveal>
              <ul className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {about.interests.map((interest) => (
                  <li
                    key={interest}
                    className="snap-start whitespace-nowrap rounded-full bg-surface-2 px-4 py-2 text-sm text-text ring-1 ring-border transition duration-300 hover:bg-surface hover:ring-faint"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        ) : null}
      </Container>
    </PageTransition>
  );
}
