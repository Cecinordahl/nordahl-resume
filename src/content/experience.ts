import { WorkItemSchema, parseContent, assertUnique, sortByStartDateDesc, type WorkItem } from "./schema.ts";

export type { WorkItem };

const rawWorkExperience = [
    {
        slug: "accenture",
        company: "Accenture",
        location: "Oslo",
        rolePublic: "Senior Fullstack Developer",
        roleOfficial: "Custom Software Engineering Associate Manager",
        dateRange: "Nov 2021 – Present",
        startDate: "2021-11",
        summary:
            "Key contributor on KLP—one of the largest technology initiatives in the Nordics—migrating an on-prem solution to cloud while improving tools for case handlers and members managing pensions.",
        impactBullets: [
            "Fullstack delivery across backend and frontend (Java/Spring + React/TypeScript), implementing new functionality, enhancements, and defect fixes.",
            "Contributed to workflow and event-driven capabilities using Camunda and Kafka.",
            "Assistant Defect Manager (since 2022): led triage and assignment; handled 393 defects (2023) and 210 defects (2024 through Sep).",
            "Subject Matter Expert for a critical payment area; partnered with product owner to prioritize fixes and design stable solutions.",
            "Technical Solution Designer (since early 2023); designed solutions within team and cross-team; earned Technology Architect Associate (TAA).",
        ],
        project: {
            name: "KLP",
            description:
                "Cloud migration and modernization of pension case handling and member-facing experiences across 10+ development teams.",
            bullets: [
                "Developed and maintained APIs and UI features supporting core pension workflows.",
                "Handled complex defect investigation and coordination across teams to ensure steady progress and reliable releases.",
                "Provided solution designs and architectural guidance for team-level and cross-team changes.",
            ],
            tech: ["Java", "Spring", "React", "TypeScript", "Camunda", "Kafka", "API Development"],
        },
    },
    {
        slug: "vinmonopolet",
        company: "Vinmonopolet",
        location: "Oslo",
        rolePublic: "Store Employee",
        dateRange: "Aug 2020 – Dec 2021",
        startDate: "2020-08",
        endDate: "2021-12",
        summary:
            "Customer-facing retail role focused on service quality, accuracy, and dependable day-to-day operations.",
        impactBullets: [
            "Delivered consistent customer service in a high-traffic environment, balancing speed with accuracy and compliance.",
            "Built strong product knowledge and guided customers through clear communication and active listening.",
            "Worked effectively in a team-based setting with rotating responsibilities and peak-hour prioritization.",
            "Maintained structure and quality in daily routines (stock handling, operational checklists, attention to detail).",
        ],
        project: {
            name: "Operational excellence in daily store flow",
            description:
                "Focused on reliable routines and strong customer experience under time constraints.",
            bullets: [
                "Prioritized tasks during peak hours to keep service flow smooth and accurate.",
                "Collaborated with colleagues to maintain consistent standards across shifts.",
            ],
            tech: ["Communication", "Teamwork", "Accuracy", "Prioritization"],
        },
    },
    {
        slug: "sas",
        company: "Scandinavian Airlines",
        location: "Oslo",
        rolePublic: "Cabin Crew",
        dateRange: "May 2016 – Jul 2020",
        startDate: "2016-05",
        endDate: "2020-07",
        summary:
            "Safety-first role requiring calm coordination, structured procedures, and high-quality service under time pressure.",
        impactBullets: [
            "Ensured passenger safety and calm coordination by following strict procedures in dynamic situations.",
            "Delivered high-quality customer experience under time pressure, adapting communication to different needs and cultures.",
            "Collaborated closely with crew to manage service flow, resolve issues efficiently, and support punctual operations.",
            "Developed composure, responsibility, and situational awareness—skills I now bring into technical delivery and incident handling.",
        ],
        project: {
            name: "On-board service & operational coordination",
            description:
                "Daily execution of safety procedures and customer experience in a time-constrained environment.",
            bullets: [
                "Maintained structured service routines while adapting to changing conditions.",
                "Resolved issues quickly through teamwork and clear communication.",
            ],
            tech: ["Safety procedures", "Communication", "Collaboration", "Composure"],
        },
    },
];

const validated = parseContent(WorkItemSchema, rawWorkExperience, "content/experience.ts");
assertUnique(validated.map((w) => w.slug), "slug", "content/experience.ts");

export const workExperience: WorkItem[] = sortByStartDateDesc(validated);

export function getWorkBySlug(slug: string) {
    return workExperience.find((w) => w.slug === slug);
}
