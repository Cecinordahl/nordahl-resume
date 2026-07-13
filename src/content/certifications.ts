import { CertificationSchema, parseContent, type Certification } from "./schema.ts";

export type { Certification };

const rawCertifications = [
    { name: "Reinvention with Agentic AI", issuer: "Accenture", issued: "Dec 2025", issuedDate: "2025-12" },
    { name: "Microsoft Certified: Azure AI Fundamentals", issuer: "Microsoft", issued: "Nov 2024", issuedDate: "2024-11" },
    { name: "Technology Architect Associate Certificate", issuer: "Accenture", issued: "Nov 2023", issuedDate: "2023-11" },
    { name: "Kotlin for Java Developers", issuer: "JetBrains", issued: "Oct 2024", issuedDate: "2024-10" },
    { name: "Introduction to Docker", issuer: "LearnQuest", issued: "Oct 2024", issuedDate: "2024-10" },
];

const validated = parseContent(CertificationSchema, rawCertifications, "content/certifications.ts");

export const certifications: Certification[] = [...validated].sort((a, b) =>
    a.issuedDate < b.issuedDate ? 1 : a.issuedDate > b.issuedDate ? -1 : 0,
);
