import { describe, expect, it } from "vitest";
import { CertificationSchema, ProjectSchema, assertUnique, parseContent, sortByStartDateDesc } from "./schema.ts";

describe("parseContent", () => {
    it("returns parsed data when valid", () => {
        const result = parseContent(
            CertificationSchema,
            [{ name: "Foo", issuer: "Bar", issued: "Jan 2024", issuedDate: "2024-01" }],
            "test",
        );
        expect(result).toEqual([{ name: "Foo", issuer: "Bar", issued: "Jan 2024", issuedDate: "2024-01" }]);
    });

    it("throws with a clear message when a field is empty", () => {
        expect(() =>
            parseContent(
                CertificationSchema,
                [{ name: "", issuer: "Bar", issued: "Jan 2024", issuedDate: "2024-01" }],
                "test.ts",
            ),
        ).toThrow(/test\.ts/);
    });

    it("throws when a date isn't formatted YYYY-MM", () => {
        expect(() =>
            parseContent(
                CertificationSchema,
                [{ name: "Foo", issuer: "Bar", issued: "Jan 2024", issuedDate: "January 2024" }],
                "test",
            ),
        ).toThrow();
    });

    it("rejects a project status outside the allowed enum", () => {
        expect(() =>
            parseContent(
                ProjectSchema,
                [{ name: "Foo", tagline: "Bar", status: "Done", tags: ["x"] }],
                "test",
            ),
        ).toThrow();
    });
});

describe("assertUnique", () => {
    it("passes when all values are unique", () => {
        expect(() => assertUnique(["a", "b", "c"], "slug", "test")).not.toThrow();
    });

    it("throws on a duplicate value", () => {
        expect(() => assertUnique(["a", "b", "a"], "slug", "test")).toThrow(/Duplicate slug "a"/);
    });
});

describe("sortByStartDateDesc", () => {
    it("sorts newest first", () => {
        const items = [
            { id: "old", startDate: "2020-01" },
            { id: "new", startDate: "2023-05" },
            { id: "mid", startDate: "2021-09" },
        ];
        expect(sortByStartDateDesc(items).map((i) => i.id)).toEqual(["new", "mid", "old"]);
    });

    it("does not mutate the original array", () => {
        const items = [{ id: "a", startDate: "2020-01" }, { id: "b", startDate: "2023-05" }];
        sortByStartDateDesc(items);
        expect(items.map((i) => i.id)).toEqual(["a", "b"]);
    });
});
