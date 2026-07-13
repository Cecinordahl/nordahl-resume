import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { SITE_URL } from "./site.mjs";
import { workExperience } from "../src/content/experience.ts";

const NOTES_DIR = join(import.meta.dirname, "..", "src", "content", "notes");
const SITEMAP_FILE = join(import.meta.dirname, "..", "public", "sitemap.xml");
const ROBOTS_FILE = join(import.meta.dirname, "..", "public", "robots.txt");

function parseFrontmatter(raw) {
    const match = raw.match(/^---\s*([\s\S]*?)\s*---\s*/);
    if (!match) return {};

    const fm = {};
    for (const line of match[1].split("\n")) {
        const idx = line.indexOf(":");
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        const val = line.slice(idx + 1).trim();
        fm[key] = val.replace(/^"|"$/g, "");
    }
    return fm;
}

const noteSlugs = readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
        const fm = parseFrontmatter(readFileSync(join(NOTES_DIR, file), "utf-8"));
        return { slug: file.replace(".md", ""), draft: fm.draft === "true" };
    })
    .filter((n) => !n.draft)
    .map((n) => n.slug);

const paths = [
    "/",
    "/work",
    "/portfolio",
    "/notes",
    "/education",
    "/certifications",
    "/contact",
    ...workExperience.map((w) => `/work/${w.slug}`),
    ...noteSlugs.map((slug) => `/notes/${slug}`),
];

const urls = paths.map((p) => `
  <url>
    <loc>${SITE_URL}${p}</loc>
  </url>`).join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>
`;

writeFileSync(SITEMAP_FILE, sitemap);
console.log(`Wrote ${paths.length} URLs to ${SITEMAP_FILE}`);

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(ROBOTS_FILE, robots);
console.log(`Wrote ${ROBOTS_FILE}`);
