# nordahl-resume

Personal site for Cecilie Nordahl — resume, portfolio, and a running log of technical
notes. Built with React, TypeScript, and Vite, deployed on Vercel.

Live at: (add URL once the Vercel project is connected)

## Structure

- `src/pages/` — one component per route (Home, Work, Portfolio, Notes, Education,
  Certifications, Contact)
- `src/content/` — resume data as typed TS modules (`experience.ts`, `education.ts`,
  `certifications.ts`, `projects.ts`), validated against Zod schemas in `schema.ts`
- `src/content/notes/` — technical notes as markdown files with frontmatter
  (`title`, `date`, `tags`)
- `src/lib/notes.ts` — loads and parses the markdown notes at build time

## Updating content

**Resume data** — edit the relevant array in `src/content/*.ts` directly. Each entry
is validated at module load against the Zod schema in `src/content/schema.ts`, so a
missing field, empty string, or bad date format throws immediately with a clear error
instead of silently breaking a page. `npm run build` runs this validation as a first
step (`npm run validate-content` to check on its own), so bad content fails the build
rather than shipping.

Work and education entries take a `startDate` (`YYYY-MM`) used to auto-sort the list
newest-first — you don't need to keep the array in date order by hand. Work entries
also need a unique `slug` (used in `/work/:slug` URLs); duplicates fail validation.
Certifications use `issuedDate` (`YYYY-MM`) the same way.

**Notes** — add a new markdown file under `src/content/notes/`:

```md
---
title: "Your note title"
date: 2026-07-11
tags: ["Tag1", "Tag2"]
---

Body in markdown.
```

It shows up automatically on `/notes`, sorted by date (newest first), filterable by
tag, and included in the RSS feed at `/rss.xml`.

Add `draft: true` to frontmatter to commit a note without publishing it — it's
excluded from `/notes`, the tag list, and the RSS feed, but still viewable directly
at its URL for previewing.

Fenced code blocks get syntax highlighting (label the language, e.g. ` ```ts `) for
bash, C#, CSS, Java, JavaScript, JSON, Kotlin, Python, SQL, TypeScript, XML/HTML, and
YAML — see `src/lib/highlightLanguages.ts` to add more. Note pages are lazy-loaded so
the highlighter's weight is only downloaded when someone actually opens a note.

## Local development

```bash
npm install
npm run dev                 # start dev server
npm run build                # validate content + regenerate RSS + typecheck + production build
npm run rss                  # regenerate public/rss.xml on its own
npm run validate-content     # validate resume content on its own
npm run lint                 # eslint
npm run preview              # preview the production build locally
```

## Deployment

The site deploys to Vercel on push to `main` (via Vercel's GitHub integration —
no CI file needed). `vercel.json` adds a rewrite so client-side routes (e.g.
`/notes/some-slug`) resolve correctly on refresh/direct load. `@vercel/analytics` is
wired in via `<Analytics />` in `App.tsx` — it only reports when actually served from
Vercel, so it's a no-op in local dev.
