import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { SITE_URL } from "./site.mjs";

const NOTES_DIR = join(import.meta.dirname, "..", "src", "content", "notes");
const OUT_FILE = join(import.meta.dirname, "..", "public", "rss.xml");

function parseFrontmatter(raw) {
    const match = raw.match(/^---\s*([\s\S]*?)\s*---\s*/);
    if (!match) return { fm: {}, body: raw };

    const body = raw.slice(match[0].length);
    const fm = {};
    for (const line of match[1].split("\n")) {
        const idx = line.indexOf(":");
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        let val = line.slice(idx + 1).trim();

        if (val.startsWith("[")) {
            try { fm[key] = JSON.parse(val); } catch { fm[key] = val; }
        } else {
            fm[key] = val.replace(/^"|"$/g, "");
        }
    }

    return { fm, body };
}

function escapeXml(s) {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

const notes = readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
        const raw = readFileSync(join(NOTES_DIR, file), "utf-8");
        const { fm, body } = parseFrontmatter(raw);
        return {
            slug: file.replace(".md", ""),
            title: fm.title ?? file,
            date: fm.date ?? "1970-01-01",
            draft: fm.draft === "true" || fm.draft === true,
            body: body.trim(),
        };
    })
    .filter((n) => !n.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

const items = notes.map((n) => `
    <item>
      <title>${escapeXml(n.title)}</title>
      <link>${SITE_URL}/notes/${n.slug}</link>
      <guid>${SITE_URL}/notes/${n.slug}</guid>
      <pubDate>${new Date(n.date).toUTCString()}</pubDate>
      <description>${escapeXml(n.body.slice(0, 500))}</description>
    </item>`).join("");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Cecilie Nordahl — Notes</title>
    <link>${SITE_URL}/notes</link>
    <description>Technical notes from Cecilie Nordahl</description>${items}
  </channel>
</rss>
`;

writeFileSync(OUT_FILE, rss);
console.log(`Wrote ${notes.length} notes to ${OUT_FILE}`);
