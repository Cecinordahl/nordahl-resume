import { describe, expect, it } from "vitest";
import { getAllNotes, getNoteBySlug } from "./notes.ts";

describe("getAllNotes", () => {
    it("returns published notes sorted newest first", () => {
        const notes = getAllNotes();
        expect(notes.length).toBeGreaterThanOrEqual(2);
        const dates = notes.map((n) => n.date);
        expect(dates).toEqual([...dates].sort().reverse());
    });

    it("excludes drafts by default", () => {
        expect(getAllNotes().every((n) => !n.draft)).toBe(true);
    });

    it("derives slug from filename and parses frontmatter", () => {
        const camunda = getAllNotes().find((n) => n.slug === "camunda-workflows-in-practice");
        expect(camunda).toBeDefined();
        expect(camunda?.title).toBe("Camunda workflows in practice");
        expect(camunda?.tags).toContain("Camunda");
    });
});

describe("getNoteBySlug", () => {
    it("returns null for an unknown slug", () => {
        expect(getNoteBySlug("does-not-exist")).toBeNull();
    });

    it("returns metadata and body for a known slug", () => {
        const note = getNoteBySlug("defect-triage-at-scale");
        expect(note).not.toBeNull();
        expect(note?.meta.title).toBe("Defect triage at scale");
        expect(note?.content).toContain("coordination problem");
    });
});
