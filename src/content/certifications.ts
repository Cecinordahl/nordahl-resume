import { CertificationSchema, parseContent, type Certification } from "./schema.ts";

export type { Certification };

const rawCertifications = [
    {
        name: "Reinvention with Agentic AI",
        issuer: "Accenture",
        issued: "Dec 2025",
        issuedDate: "2025-12",
        badgeImage: "/images/badges/reinvention-with-agentic-ai.png",
        credentialUrl: "https://www.credly.com/badges/83bbe5cb-85f7-4fd7-9fe2-2e084d55c75b/public_url",
    },
    {
        name: "Microsoft Certified: Azure AI Fundamentals",
        issuer: "Microsoft",
        issued: "Nov 2024",
        issuedDate: "2024-11",
        badgeImage: "/images/badges/microsoft-certified-fundamentals-badge.png",
        credentialUrl: "https://learn.microsoft.com/en-us/users/cecinordahl/credentials/9f5df5727c9d231d",
    },
    {
        name: "Technology Architect Associate Certificate",
        issuer: "Accenture",
        issued: "Nov 2023",
        issuedDate: "2023-11",
        badgeImage: "/images/badges/technology-architect-associate.png",
        credentialUrl: "https://bcert.me/ssfxvrjgx",
    },
    {
        name: "Kotlin for Java Developers",
        issuer: "JetBrains",
        issued: "Oct 2024",
        issuedDate: "2024-10",
        badgeImage: "/images/badges/jetbrains.png",
        credentialUrl: "https://www.coursera.org/account/accomplishments/verify/TEROD5W2PKLP",
    },
    {
        name: "Introduction to Docker",
        issuer: "LearnQuest",
        issued: "Oct 2024",
        issuedDate: "2024-10",
        badgeImage: "/images/badges/learnquest.png",
        credentialUrl: "https://www.coursera.org/account/accomplishments/verify/TOGM989VVA59",
    },
];

const validated = parseContent(CertificationSchema, rawCertifications, "content/certifications.ts");

export const certifications: Certification[] = [...validated].sort((a, b) =>
    a.issuedDate < b.issuedDate ? 1 : a.issuedDate > b.issuedDate ? -1 : 0,
);
