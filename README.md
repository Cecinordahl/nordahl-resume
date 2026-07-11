# nordahl-resume

Personal site for Cecilie Nordahl — resume, portfolio, and a running log of technical
notes. Built with React, TypeScript, and Vite, deployed on Vercel.

Live at: (add URL once the Vercel project is connected)

## Structure

- `src/pages/` — one component per route (Home, Work, Portfolio, Notes, Education,
  Certifications, Contact)
- `src/content/` — resume data as typed TS modules (`experience.ts`, `education.ts`,
  `certifications.ts`, `projects.ts`)
- `src/content/notes/` — technical notes as markdown files with frontmatter
  (`title`, `date`, `tags`)
- `src/lib/notes.ts` — loads and parses the markdown notes at build time

## Updating content

**Resume data** — edit the relevant array in `src/content/*.ts` directly; each entry
is a typed object so TypeScript will flag missing fields.

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

## Local development

```bash
npm install
npm run dev       # start dev server
npm run build     # regenerate RSS + typecheck + production build
npm run rss        # regenerate public/rss.xml on its own
npm run lint       # eslint
npm run preview    # preview the production build locally
```

## Deployment

The site deploys to Vercel on push to `main` (via Vercel's GitHub integration —
no CI file needed). `vercel.json` adds a rewrite so client-side routes (e.g.
`/notes/some-slug`) resolve correctly on refresh/direct load.
