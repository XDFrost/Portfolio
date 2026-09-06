import { z } from "zod";

/**
 * The content contract. Every file in /content is validated against one of
 * these schemas at build time. If a field is missing or has the wrong shape,
 * the build fails with a message naming the file and the field.
 *
 * README.md documents the same shapes in plain language.
 */

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be lowercase words separated by hyphens");

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "must be a date in YYYY-MM-DD format");

const yearMonth = z
  .string()
  .regex(/^\d{4}(?:-\d{2})?$/, "must be YYYY or YYYY-MM");

export const ctaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1, "alt text is required for accessibility"),
});

export const socialIcons = [
  "github",
  "linkedin",
  "x",
  "bluesky",
  "mastodon",
  "youtube",
  "dribbble",
  "email",
  "website",
] as const;

export const siteSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  tagline: z.string().min(1),
  email: z.string().email(),
  url: z.string().url().optional(),
  nav: z.array(ctaSchema).min(1),
  socials: z.array(
    z.object({
      label: z.string().min(1),
      href: z.string().min(1),
      icon: z.enum(socialIcons),
    }),
  ),
  footerNote: z.string().default(""),
  pages: z.object({
    about: z.object({ title: z.string().min(1) }),
    projects: z.object({ title: z.string().min(1), intro: z.string().default("") }),
    blog: z.object({ title: z.string().min(1), intro: z.string().default("") }),
    resume: z.object({ title: z.string().min(1) }),
  }),
  labels: z.object({
    featured: z.string().default("Selected work"),
    latestPosts: z.string().default("Latest writing"),
    skills: z.string().default("Skills"),
    experience: z.string().default("Experience"),
    interests: z.string().default("Interests"),
    education: z.string().default("Education"),
    "certifications and honors": z.string().default("Certifications and Honors"),
  }),
});

export const homeSchema = z.object({
  hero: z.object({
    headline: z.string().min(1),
    subtext: z.string().min(1),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema.optional(),
    image: imageSchema,
  }),
  featuredProjectSlugs: z.array(slug).min(1).max(4),
  latestPostCount: z.number().int().min(1).max(6).default(3),
  now: z
    .object({
      heading: z.string().min(1),
      body: z.string().min(1),
    })
    .optional(),
  contact: z.object({
    heading: z.string().min(1),
    body: z.string().default(""),
    cta: ctaSchema,
  }),
});

export const skillGroupSchema = z.object({
  group: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

export const aboutSchema = z.object({
  heading: z.string().min(1),
  photo: imageSchema,
  bio: z.array(z.string().min(1)).min(1),
  skills: z.array(skillGroupSchema).min(1),
  interests: z.array(z.string().min(1)).default([]),
  experienceCount: z.number().int().min(0).default(3),
});

export const projectSchema = z.object({
  slug,
  title: z.string().min(1),
  summary: z.string().min(1),
  year: z.number().int().min(1990).max(2100),
  role: z.string().min(1),
  stack: z.array(z.string().min(1)).min(1),
  cover: imageSchema,
  featured: z.boolean().default(false),
  links: z
    .object({
      live: z.string().url().optional(),
      repo: z.string().url().optional(),
    })
    .default({}),
  highlights: z.array(z.string().min(1)).default([]),
  body: z.string().min(1),
});

export const projectsSchema = z.array(projectSchema);

export const postSchema = z.object({
  slug,
  title: z.string().min(1),
  date: isoDate,
  summary: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
  body: z.string().min(1),
});

export const postsSchema = z.array(postSchema);

export const resumeSchema = z.object({
  basics: z.object({
    name: z.string().min(1),
    title: z.string().min(1),
    location: z.string().min(1),
    email: z.string().email(),
    summary: z.string().min(1),
    pdfPath: z.string().min(1).optional(),
    links: z.array(ctaSchema).default([]),
  }),
  experience: z.array(
    z.object({
      company: z.string().min(1),
      title: z.string().min(1),
      location: z.string().optional(),
      start: yearMonth,
      end: z.union([yearMonth, z.literal("Present")]),
      summary: z.string().optional(),
      bullets: z.array(z.string().min(1)).default([]),
    }),
  ),
  education: z
    .array(
      z.object({
        school: z.string().min(1),
        degree: z.string().min(1),
        start: yearMonth,
        end: z.union([yearMonth, z.literal("Present")]),
        note: z.string().optional(),
      }),
    )
    .default([]),
  skills: z.array(skillGroupSchema).default([]),
  "certifications and honors": z
    .array(
      z.object({
        name: z.string().min(1),
        issuer: z.string().min(1),
        year: z.number().int(),
      }),
    )
    .default([]),
});

export type Cta = z.infer<typeof ctaSchema>;
export type Image = z.infer<typeof imageSchema>;
export type Site = z.infer<typeof siteSchema>;
export type Home = z.infer<typeof homeSchema>;
export type About = z.infer<typeof aboutSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Post = z.infer<typeof postSchema>;
export type Resume = z.infer<typeof resumeSchema>;
export type SocialIcon = (typeof socialIcons)[number];
