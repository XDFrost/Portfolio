import type { Metadata } from "next";
import Link from "next/link";
import { Article, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ViewTransition } from "react";
import { Container } from "@/components/ui/Container";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/motion/Reveal";
import { getPosts, getSite } from "@/lib/content";
import { formatDate, groupBy, readingTime, yearOf } from "@/lib/format";

export function generateMetadata(): Metadata {
  const { title, intro } = getSite().pages.blog;
  return { title, description: intro || undefined };
}

export default function BlogPage() {
  const site = getSite();
  const posts = getPosts();
  const byYear = groupBy(posts, (p) => yearOf(p.date));

  return (
    <PageTransition>
    <Container className="pb-20 pt-6 sm:pb-28 sm:pt-10">
      <PageHeader
        title={site.pages.blog.title}
        intro={site.pages.blog.intro}
        meta={posts.length ? `${posts.length} ${posts.length === 1 ? "post" : "posts"}` : undefined}
      />

      {posts.length === 0 ? (
        <EmptyState
          icon={<Article weight="light" />}
          title="No posts yet"
          body="Add entries to content/blog.json and they will appear here, newest first."
        />
      ) : (
        <div className="flex flex-col gap-16">
          {byYear.map(([year, group]) => (
            <section key={year} className="grid gap-6 md:grid-cols-[7rem_1fr] md:gap-x-12">
              <h2 className="font-mono text-2xl text-faint md:pt-6">{year}</h2>
              <ul className="divide-y divide-border">
                {group.map((post, i) => (
                  <Reveal key={post.slug} delay={i * 0.05}>
                    <li className="py-6">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group block"
                      >
                        <ViewTransition name={`post-title-${post.slug}`} share="auto" default="none">
                        <h3 className="text-balance text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                          {post.title}
                          <ArrowUpRight
                            size={18}
                            weight="light"
                            className="ml-2 inline -translate-x-1 opacity-0 transition duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
                          />
                        </h3>
                        </ViewTransition>
                        <p className="mt-2 max-w-[65ch] leading-relaxed text-muted">
                          {post.summary}
                        </p>
                      </Link>
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="font-mono text-xs text-faint">
                          {formatDate(post.date)}
                        </span>
                        <span className="font-mono text-xs text-faint">
                          {readingTime(post.body)}
                        </span>
                        {post.tags.length ? (
                          <span className="flex flex-wrap gap-1.5">
                            {post.tags.map((t) => (
                              <Tag key={t}>{t}</Tag>
                            ))}
                          </span>
                        ) : null}
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </Container>
    </PageTransition>
  );
}
