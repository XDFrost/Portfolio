import Link from "next/link";
import { ViewTransition } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate, readingTime } from "@/lib/format";
import type { Post } from "@/lib/schema";

/** Full-bleed band in the same theme family; gives the page a change of surface. */
export function LatestPosts({
  title,
  posts,
  actionLabel,
}: {
  title: string;
  posts: Post[];
  actionLabel: string;
}) {
  if (posts.length === 0) return null;

  return (
    <section className="border-b border-border bg-surface/70">
      <Container className="py-16 sm:py-24">
        <SectionHeading title={title} action={{ label: actionLabel, href: "/blog" }} />
        <ul className="divide-y divide-border">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <li className="grid gap-2 py-7 sm:grid-cols-[9rem_1fr] sm:gap-x-10">
                <p className="font-mono text-xs text-faint sm:pt-1.5">{formatDate(post.date)}</p>
                <div className="flex flex-col gap-2">
                  <ViewTransition name={`post-title-${post.slug}`} share="auto" default="none">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="link-underline text-balance text-lg font-medium tracking-tight transition-colors duration-300 hover:text-accent sm:text-xl"
                    >
                      {post.title}
                    </Link>
                  </ViewTransition>
                  <p className="max-w-[65ch] text-pretty leading-relaxed text-muted">{post.summary}</p>
                  <p className="font-mono text-xs text-faint">{readingTime(post.body)}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
