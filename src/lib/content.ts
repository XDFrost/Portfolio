import fs from "node:fs";
import path from "node:path";
import type { z } from "zod";
import {
  aboutSchema,
  homeSchema,
  postsSchema,
  projectsSchema,
  resumeSchema,
  siteSchema,
  type Home,
  type Post,
  type Project,
} from "./schema";

/**
 * Content loaders. All pages are statically generated, so these run at build
 * time (and on each request in `next dev`). They read /content/*.json, validate
 * it, and fail loudly with the file name and offending field if the JSON is
 * malformed or does not match the schema.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

const cache = new Map<string, unknown>();

function load<S extends z.ZodTypeAny>(file: string, schema: S): z.output<S> {
  if (process.env.NODE_ENV === "production" && cache.has(file)) {
    return cache.get(file) as z.output<S>;
  }

  const fullPath = path.join(CONTENT_DIR, file);
  let raw: string;
  try {
    raw = fs.readFileSync(fullPath, "utf8");
  } catch {
    throw new Error(`content/${file}: file not found. Expected it at ${fullPath}`);
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`content/${file}: invalid JSON. ${message}`);
  }

  const result = schema.safeParse(json);
  if (!result.success) {
    const lines = result.error.issues.map((issue) => {
      const where = issue.path.length ? issue.path.join(".") : "(root)";
      return `  - ${where}: ${issue.message}`;
    });
    throw new Error(`content/${file} failed validation:\n${lines.join("\n")}`);
  }

  cache.set(file, result.data);
  return result.data;
}

export function getSite() {
  return load("site.json", siteSchema);
}

export function getHome(): Home {
  return load("home.json", homeSchema);
}

export function getAbout() {
  return load("about.json", aboutSchema);
}

export function getResume() {
  return load("resume.json", resumeSchema);
}

/** Projects, newest first. Slugs must be unique. */
export function getProjects(): Project[] {
  const projects = load("projects.json", projectsSchema);
  assertUniqueSlugs("projects.json", projects);
  return [...projects].sort((a, b) => b.year - a.year);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

/** Featured projects in the order listed in home.json. */
export function getFeaturedProjects(): Project[] {
  const { featuredProjectSlugs } = getHome();
  const all = getProjects();
  return featuredProjectSlugs.map((slug) => {
    const project = all.find((p) => p.slug === slug);
    if (!project) {
      throw new Error(
        `content/home.json: featuredProjectSlugs contains "${slug}" but no project with that slug exists in content/projects.json`,
      );
    }
    return project;
  });
}

/** The project before and after the given one, in display order. */
export function getAdjacentProjects(slug: string): {
  previous?: Project;
  next?: Project;
} {
  const all = getProjects();
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return {
    previous: all[index - 1],
    next: all[index + 1],
  };
}

/** Posts, newest first. Slugs must be unique. */
export function getPosts(): Post[] {
  const posts = load("blog.json", postsSchema);
  assertUniqueSlugs("blog.json", posts);
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function getLatestPosts(): Post[] {
  const { latestPostCount } = getHome();
  return getPosts().slice(0, latestPostCount);
}

/** Every distinct stack entry across all projects, alphabetically. */
export function getAllStacks(): string[] {
  const set = new Set<string>();
  for (const p of getProjects()) for (const s of p.stack) set.add(s);
  return [...set].sort((a, b) => a.localeCompare(b));
}

function assertUniqueSlugs(file: string, items: { slug: string }[]) {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.slug)) {
      throw new Error(`content/${file}: duplicate slug "${item.slug}"`);
    }
    seen.add(item.slug);
  }
}
