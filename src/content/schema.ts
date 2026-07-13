import { z } from "zod";

const yearMonth = z.string().regex(/^\d{4}-\d{2}$/, "must be formatted YYYY-MM");
const nonEmpty = z.string().min(1, "must not be empty");

export const WorkItemSchema = z.object({
    slug: nonEmpty,
    company: nonEmpty,
    location: nonEmpty,
    rolePublic: nonEmpty,
    roleOfficial: nonEmpty.optional(),
    dateRange: nonEmpty,
    startDate: yearMonth,
    endDate: yearMonth.optional(),
    summary: nonEmpty,
    impactBullets: z.array(nonEmpty).min(1),
    project: z.object({
        name: nonEmpty,
        description: nonEmpty,
        bullets: z.array(nonEmpty).min(1),
        tech: z.array(nonEmpty).min(1),
    }),
});
export type WorkItem = z.infer<typeof WorkItemSchema>;

export const EducationItemSchema = z.object({
    institution: nonEmpty,
    program: nonEmpty,
    dateRange: nonEmpty,
    startDate: yearMonth,
    details: z.array(nonEmpty).optional(),
});
export type EducationItem = z.infer<typeof EducationItemSchema>;

export const CertificationSchema = z.object({
    name: nonEmpty,
    issuer: nonEmpty,
    issued: nonEmpty,
    issuedDate: yearMonth,
});
export type Certification = z.infer<typeof CertificationSchema>;

export const ProjectSchema = z.object({
    name: nonEmpty,
    tagline: nonEmpty,
    status: z.enum(["Planned", "In progress", "Live"]),
    githubUrl: z.string().url().optional(),
    tags: z.array(nonEmpty).min(1),
});
export type Project = z.infer<typeof ProjectSchema>;

export function parseContent<T>(schema: z.ZodType<T>, data: unknown[], sourceLabel: string): T[] {
    const result = z.array(schema).safeParse(data);
    if (!result.success) {
        const details = result.error.issues
            .map((issue) => `  [${issue.path.join(".")}] ${issue.message}`)
            .join("\n");
        throw new Error(`Invalid content in ${sourceLabel}:\n${details}`);
    }
    return result.data;
}

export function assertUnique(values: string[], field: string, sourceLabel: string) {
    const seen = new Set<string>();
    for (const value of values) {
        if (seen.has(value)) {
            throw new Error(`Duplicate ${field} "${value}" in ${sourceLabel}`);
        }
        seen.add(value);
    }
}

export function sortByStartDateDesc<T extends { startDate: string }>(items: T[]): T[] {
    return [...items].sort((a, b) => (a.startDate < b.startDate ? 1 : a.startDate > b.startDate ? -1 : 0));
}
