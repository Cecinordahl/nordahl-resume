export type NoteMeta = {
    title: string;
    date: string;
    tags: string[];
    slug: string;
    draft: boolean;
};

type LoadedNote = {
    meta: NoteMeta;
    content: string;
};

const noteFiles = import.meta.glob("../content/notes/*.md", {
    as: "raw",
    eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string) {
    const match = raw.match(/^---\s*([\s\S]*?)\s*---\s*/);
    if (!match) return { fm: {}, body: raw };

    const fmBlock = match[1];
    const body = raw.slice(match[0].length);

    const fm: Record<string, string | string[]> = {};
    for (const line of fmBlock.split("\n")) {
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

export function getAllNotes(includeDrafts = false): NoteMeta[] {
    const notes: NoteMeta[] = Object.entries(noteFiles).map(([path, raw]) => {
        const { fm } = parseFrontmatter(raw);
        const slug = path.split("/").pop()!.replace(".md", "");

        return {
            slug,
            title: typeof fm.title === "string" ? fm.title : slug,
            date: typeof fm.date === "string" ? fm.date : "1970-01-01",
            tags: Array.isArray(fm.tags) ? fm.tags : [],
            draft: fm.draft === "true",
        };
    });

    return notes
        .filter((n) => includeDrafts || !n.draft)
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNoteBySlug(slug: string): LoadedNote | null {
    const entry = Object.entries(noteFiles).find(([path]) => path.endsWith(`/${slug}.md`));
    if (!entry) return null;

    const raw = entry[1];
    const { fm, body } = parseFrontmatter(raw);

    return {
        meta: {
            slug,
            title: typeof fm.title === "string" ? fm.title : slug,
            date: typeof fm.date === "string" ? fm.date : "1970-01-01",
            tags: Array.isArray(fm.tags) ? fm.tags : [],
            draft: fm.draft === "true",
        },
        content: body.trim(),
    };
}
