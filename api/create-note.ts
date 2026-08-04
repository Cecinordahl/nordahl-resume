import type { VercelRequest, VercelResponse } from "@vercel/node";
import { timingSafeEqual } from "node:crypto";
import { slugify } from "./_lib/slugify.js";
import { fileExists, createFile } from "./_lib/github.js";

function passcodeMatches(submitted: string, expected: string): boolean {
    const a = Buffer.from(submitted);
    const b = Buffer.from(expected);
    // Lengths almost always differ for a wrong guess; timingSafeEqual requires
    // equal-length buffers, so compare against a padded copy either way rather
    // than short-circuiting on length (which would leak the real length via timing).
    const length = Math.max(a.length, b.length, 1);
    const aPadded = Buffer.alloc(length);
    const bPadded = Buffer.alloc(length);
    a.copy(aPadded);
    b.copy(bPadded);
    return a.length === b.length && timingSafeEqual(aPadded, bPadded);
}

function buildFrontmatter(title: string, tags: string[], draft: boolean): string {
    const date = new Date().toISOString().slice(0, 10);
    const lines = [
        "---",
        `title: "${title.replace(/"/g, '\\"')}"`,
        `date: ${date}`,
        `tags: ${JSON.stringify(tags)}`,
    ];
    if (draft) lines.push(`draft: "true"`);
    lines.push("---", "");
    return lines.join("\n");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const expectedPasscode = process.env.NOTES_ADMIN_PASSCODE;
    if (!expectedPasscode) {
        res.status(500).json({ error: "Server not configured" });
        return;
    }

    const { passcode, title, tags, body, draft } = req.body ?? {};

    if (typeof passcode !== "string" || !passcodeMatches(passcode, expectedPasscode)) {
        res.status(403).json({ error: "Incorrect passcode" });
        return;
    }

    if (typeof title !== "string" || title.trim().length === 0) {
        res.status(400).json({ error: "Title is required" });
        return;
    }
    if (typeof body !== "string" || body.trim().length === 0) {
        res.status(400).json({ error: "Body is required" });
        return;
    }

    const tagList = Array.isArray(tags)
        ? tags.filter((t): t is string => typeof t === "string" && t.trim().length > 0).map((t) => t.trim())
        : [];

    const slug = slugify(title);
    if (!slug) {
        res.status(400).json({ error: "Title must contain at least one letter or number" });
        return;
    }

    const path = `src/content/notes/${slug}.md`;

    try {
        if (await fileExists(path)) {
            res.status(409).json({ error: `A note with the slug "${slug}" already exists — try a different title.` });
            return;
        }

        const trimmedTitle = title.trim();
        const content = `${buildFrontmatter(trimmedTitle, tagList, draft === true)}${body.trim()}\n`;

        await createFile(path, content, `Add note: ${trimmedTitle}`);

        res.status(200).json({ ok: true, slug });
    } catch (err) {
        console.error("Failed to create note", err);
        res.status(502).json({ error: "Failed to publish note" });
    }
}
