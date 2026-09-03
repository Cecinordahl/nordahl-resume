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
            "Before moving into a tech lead role, regularly took part in architectural decision-making — URL endpoint patterns and Camunda delegates and their connections to Java application services.",
            "Assistant Defect Manager (since 2022): led triage and assignment; handled 393 defects (2023) and 210 defects (2024 through Sep).",
            "Subject Matter Expert for a critical payment area; partnered with product owner to prioritize fixes and design stable solutions.",
            "Technical Solution Designer (since early 2023); designed solutions within team and cross-team; earned [Technology Architect Associate (TAA)](https://bcert.me/ssfxvrjgx).",
            "Regularly volunteered for production releases — present for go-lives, helping investigate and resolve issues as they came up, including late nights to keep releases smooth.",
        ],
        project: {
            name: "KLP",
            description:
                "KLP's pension case-handling platform, spanning three phases of the same long-running engagement: the initial Endringsprogrammet build-out, the Videreføring av Pensjonsplattformen transition, and the ongoing IT Oppgjør team.",
            phases: [
                {
                    name: "Endringsprogrammet",
                    dateRange: "2019 – 2025 (joined Jan 2022)",
                    description:
                        "A six-year partnership between KLP and Accenture that replaced a 43-year-old COBOL core system with a cloud-based, microservices architecture on Azure — one of the largest technology and organizational transformations in the Nordics, later awarded Konsulentprisen: Årets store oppdrag. I joined in January 2022, about two years after the program began, and stayed through its completion in 2025.",
                    bullets: [
                        "Developed and maintained APIs and UI features supporting core pension workflows.",
                        "Integrated with Norsk Pensjon's external API to provide pension prognoses for both active and deferred members of KLP and Asker Pensjonskasse — KLP and Asker were the first providers to expose this particular service through Norsk Pensjon, so the integration was built to accommodate other insurance providers joining later.",
                        "Worked closely with the rules engine and rule patterns behind the system's complex pension calculations, a core part of the case-handling platform.",
                        "Developed an Income Register application that notifies the platform of expected-income changes via Kafka events, and established the database backing it as the master source for income-related functions.",
                        "Implemented new and modified existing Camunda processes used across all case-handling workflows — a central part of how the platform processes cases.",
                        "Handled complex defect investigation and coordination across teams to ensure steady progress and reliable releases.",
                        "Provided solution designs and architectural guidance for team-level and cross-team changes.",
                        "Program-wide, the six-year initiative delivered 100+ cloud applications and 1.5 million lines of code across 20 major releases, cutting pension-application processing time from weeks to seconds.",
                    ],
                    sourceUrl:
                        "https://www.konsulentguiden.no/konsulentprisen/norges-storste-digitale-transformasjon-klps-endringsprogram-setter-ny-standard-for-offentlig-pensjon/",
                    sourceLabel: "Read more about the project",
                },
                {
                    name: "Videreføring av Pensjonsplattformen (VAPP)",
                    dateRange: "2025 – Spring 2026",
                    description:
                        "The transitional phase immediately following Endringsprogrammet's completion, carrying the new platform from program delivery into steady-state operation.",
                },
                {
                    name: "IT Oppgjør",
                    dateRange: "Nov 2025 – Present",
                    description:
                        "The team structure now in place as most Accenture consultants rolled off KLP, overlapping with VAPP — this is now the ongoing, default project for the platform going forward.",
                    bullets: [
                        "Implementing functionality for tidligpensjon, særalder, and other new Norwegian pension reforms.",
                        "Adjusting integrations with external systems like NAV, which is undergoing a major API modernization from SOAP to REST.",
                    ],
                },
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
            techLabel: "Skills",
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
            techLabel: "Skills",
        },
    },
];

const validated = parseContent(WorkItemSchema, rawWorkExperience, "content/experience.ts");
assertUnique(validated.map((w) => w.slug), "slug", "content/experience.ts");

export const workExperience: WorkItem[] = sortByStartDateDesc(validated);

export function getWorkBySlug(slug: string) {
    return workExperience.find((w) => w.slug === slug);
}
