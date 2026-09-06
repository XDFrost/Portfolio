import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { ViewTransition } from "react";
import { Container } from "@/components/ui/Container";
import { PageTransition } from "@/components/motion/PageTransition";
import { CopyLink } from "@/components/blog/CopyLink";
import { Tag } from "@/components/ui/Tag";
import { Markdown } from "@/components/Markdown";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { getPost, getPosts, getSite } from "@/lib/content";
import { formatDate, readingTime } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: { type: "article", publishedTime: post.date },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const site = getSite();

  return (
    <PageTransition>
    <Container className="pb-20 pt-4 sm:pb-28 sm:pt-6">
      <ReadingProgress />
      <div className="mx-auto max-w-[68ch]">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-300 hover:text-text"
        >
          <ArrowLeft
            size={14}
            weight="light"
            className="transition-transform duration-500 ease-out-expo group-hover:-translate-x-0.5"
          />
          All posts
        </Link>

        <header className="mt-8">
          <ViewTransition name={`post-title-${post.slug}`} share="auto" default="none">
            <h1 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tighter sm:text-4xl lg:text-[2.75rem]">
              {post.title}
            </h1>
          </ViewTransition>
          <p className="mt-5 text-lg leading-relaxed text-muted">{post.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border pb-8">
            <span className="font-mono text-xs text-faint">{formatDate(post.date)}</span>
            <span className="font-mono text-xs text-faint">{readingTime(post.body)}</span>
            {post.tags.length ? (
              <span className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </span>
            ) : null}
          </div>
        </header>

        <article className="mt-10">
          <Markdown>{post.body}</Markdown>
        </article>

        <footer className="mt-16 flex items-center justify-between border-t border-border pt-8 text-sm text-muted">
          <span>
            Written by <span className="text-text">{site.name}</span>
          </span>
          <span className="flex items-center gap-1">
            <CopyLink />
            <Link
              href="/blog"
              className="rounded-full px-3 py-1.5 transition duration-300 hover:bg-surface-2 hover:text-text"
            >
              More posts
            </Link>
          </span>
        </footer>
      </div>
    </Container>
    </PageTransition>
  );
}
