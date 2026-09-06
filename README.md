# Portfolio

A personal portfolio site with five tabs (Home, About, Projects, Blog, Resume). Every visible string, link and image on the site comes from the JSON files in `content/`. Edit the JSON, rebuild, and the site updates. No copy lives in components.

Built with Next.js (App Router, static export), Tailwind CSS v4, Motion, Geist and Phosphor icons. Light and dark themes follow the system setting, with a manual toggle in the nav.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes a fully static site to ./out
npm run lint
```

The `out/` folder is plain HTML, CSS and JS. Serve it from any static host.

## Where the content lives

| File | What it controls |
| --- | --- |
| `content/site.json` | Name, role, tagline, email, nav tabs, social links, footer note, page titles and section labels |
| `content/home.json` | Hero copy and image, which projects are featured, how many posts to show, the "Now" block, the contact card |
| `content/about.json` | About heading, photo, bio paragraphs, skill groups, interests, how many jobs to show from the resume |
| `content/projects.json` | Every project. One entry per project, each gets its own page at `/projects/<slug>/` |
| `content/blog.json` | Every post. One entry per post, each gets its own page at `/blog/<slug>/` |
| `content/resume.json` | Basics, experience, education, skills, certifications. The About page reuses the experience list |

The shipped content is **sample data about a fictional person**. Replace it with your own before publishing.

Every file is validated at build time against `src/lib/schema.ts`. If a field is missing or has the wrong type, `npm run build` (and `npm run dev`) stop with a message naming the file and the field, for example:

```
content/projects.json failed validation:
  - 0.cover.alt: Invalid input: expected string, received undefined
```

## Adding things

### A project

Append an object to the array in `content/projects.json`:

```json
{
  "slug": "my-project",
  "title": "My Project",
  "summary": "One or two sentences shown on cards.",
  "year": 2026,
  "role": "Lead engineer",
  "stack": ["TypeScript", "PostgreSQL"],
  "cover": { "src": "/images/my-project.jpg", "alt": "Describe the image" },
  "featured": true,
  "links": { "live": "https://example.com", "repo": "https://github.com/you/my-project" },
  "highlights": ["Short outcome one", "Short outcome two"],
  "body": "## Heading\n\nMarkdown goes here. Lists, links, code blocks and tables all work."
}
```

- `slug` must be lowercase words joined by hyphens and unique. It becomes the URL.
- `featured`, `links` and `highlights` are optional.
- To feature a project on the Home page, add its slug to `featuredProjectSlugs` in `content/home.json` (1 to 4 slugs). The order there is the display order.
- Projects are sorted newest year first on the Projects page. The stack filter is built automatically from every `stack` entry.

### A blog post

Append an object to `content/blog.json`:

```json
{
  "slug": "my-post",
  "title": "My post title",
  "date": "2026-09-06",
  "summary": "One or two sentences shown in lists.",
  "tags": ["Tag one", "Tag two"],
  "body": "Markdown body. Use \\n\\n between paragraphs and ## for headings."
}
```

Posts are sorted by `date` (YYYY-MM-DD), newest first, and grouped by year. Reading time is computed from the body.

### Markdown in JSON

`body` fields are Markdown strings. Inside JSON, newlines are written as `\n`, so a paragraph break is `\n\n`. Code fences work too:

```
"body": "Intro paragraph.\n\n```sql\nSELECT 1;\n```\n\nMore text."
```

Supported: headings (`##`, `###`), paragraphs, bold and italic, links, bulleted and numbered lists, block quotes, inline code, fenced code blocks, tables and horizontal rules.

### Images

Any `src` can be a full URL or a path under `public/`. Put your files in `public/images/` and reference them as `/images/filename.jpg`. The sample content uses `https://picsum.photos/seed/...` placeholders.

Recommended sizes: hero and about portrait 900 x 1100 (4:5), project covers 1600 x 1000 (16:10).

### Resume PDF

Drop a PDF into `public/` (for example `public/resume.pdf`) and set `"pdfPath": "/resume.pdf"` under `basics` in `content/resume.json`. A "Download PDF" button appears on the Resume page. Without `pdfPath`, the button is hidden; the "Print" button always works and uses a print stylesheet that hides the nav and footer.

### Nav tabs, labels and page titles

All in `content/site.json`:

- `nav` is the list of tabs (label and href). Order matters.
- `pages` holds each page's title and optional intro line.
- `labels` holds section headings such as "Selected work" and "Latest writing".
- `socials` supports these `icon` values: `github`, `linkedin`, `x`, `bluesky`, `mastodon`, `youtube`, `dribbble`, `email`, `website`.

## Project layout

```
content/          the JSON you edit
src/lib/schema.ts the content contract (zod schemas and TypeScript types)
src/lib/content.ts loaders that read, validate and sort the JSON
src/app/          one folder per route
src/components/   nav, footer, cards, markdown renderer, motion helpers
public/images/    your images
```

## Design notes

Design tokens (colours, radii, easing) live at the top of `src/app/globals.css`. There is one accent colour, one neutral family and one corner-radius rule: pills for buttons and tags, 16px for cards and images. Motion is limited to entry reveals, the nav indicator and card hovers, and everything respects `prefers-reduced-motion`.
