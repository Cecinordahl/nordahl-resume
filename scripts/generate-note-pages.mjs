// Runs after `vite build`. Link-preview bots (iMessage, Slack, LinkedIn…) don't run
// JavaScript, so they only see the <meta> tags in the HTML file. This writes
// dist/notes/<slug>/index.html for each note: a copy of the built index.html with the
// note's own title and description. Vercel serves these static files before the SPA
// rewrite, and the React app takes over as usual once loaded.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const NOTES_DIR = join(ROOT, "src", "content", "notes");
const DIST = join(ROOT, "dist");

function parseFrontmatter(raw) {
    const match = raw.match(/^---\s*([\s\S]*?)\s*---\s*/);
    if (!match) return { fm: {}, body: raw };

    const body = raw.slice(match[0].length);
    const fm = {};
    for (const line of match[1].split("\n")) {
        const idx = line.indexOf(":");
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        const val = line.slice(idx + 1).trim();

        if (val.startsWith("[")) {
            try { fm[key] = JSON.parse(val); } catch { fm[key] = val; }
        } else {
            fm[key] = val.replace(/^"|"$/g, "");
        }
    }

    return { fm, body };
}

// First prose paragraph, markdown stripped, cut to ~160 chars at a word boundary.
export function excerpt(body, max = 160) {
    const para = body
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .find((p) => p && !/^(#|!\[|```|\||>|[-*] |\d+\. )/.test(p)) ?? "";

    const text = para
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/[*_`]/g, "")
        .replace(/\s+/g, " ")
        .trim();

    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:]$/, "") + "…";
}

function escapeAttr(s) {
    return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function setMeta(html, attr, name, value) {
    const re = new RegExp(`(<meta ${attr}="${name}" content=")[^"]*(")`);
    if (!re.test(html)) throw new Error(`index.html is missing <meta ${attr}="${name}">`);
    return html.replace(re, `$1${escapeAttr(value)}$2`);
}

const template = readFileSync(join(DIST, "index.html"), "utf-8");

const notes = readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
        const { fm, body } = parseFrontmatter(readFileSync(join(NOTES_DIR, file), "utf-8"));
        return {
            slug: file.replace(".md", ""),
            title: fm.title ?? file,
            draft: fm.draft === "true",
            description: excerpt(body),
        };
    })
    .filter((n) => !n.draft);

for (const note of notes) {
    let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(note.title)}</title>`);
    html = setMeta(html, "property", "og:type", "article");
    html = setMeta(html, "property", "og:title", note.title);
    html = setMeta(html, "name", "twitter:title", note.title);
    if (note.description) {
        html = setMeta(html, "name", "description", note.description);
        html = setMeta(html, "property", "og:description", note.description);
        html = setMeta(html, "name", "twitter:description", note.description);
    }

    const dir = join(DIST, "notes", note.slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html);
}

console.log(`Generated share pages for ${notes.length} notes.`);
