export type Certification = {
    name: string;
    issuer: string;
    issued: string;
};

export const certifications: Certification[] = [
    { name: "Reinvention with Agentic AI", issuer: "Accenture", issued: "Dec 2025" },
    { name: "Microsoft Certified: Azure AI Fundamentals", issuer: "Microsoft", issued: "Nov 2024" },
    { name: "Technology Architect Associate Certificate", issuer: "Accenture", issued: "Nov 2023" },
    { name: "Kotlin for Java Developers", issuer: "JetBrains", issued: "Oct 2024" },
    { name: "Introduction to Docker", issuer: "LearnQuest", issued: "Oct 2024" },
];
