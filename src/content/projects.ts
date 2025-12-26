export type Project = {
    name: string;
    tagline: string;
    status: "Planned" | "In progress" | "Live";
    githubUrl?: string;
    tags: string[];
};

export const hobbyProjects: Project[] = [
    {
        name: "EuroBonus Buddy",
        tagline: "Help EuroBonus hunters maximize points and status progress with SAS.",
        status: "Planned",
        tags: ["React", "TypeScript", "Spring"],
    },
    {
        name: "Running Challenge",
        tagline: "Advent-style daily distances that sum to a chosen goal (Dec 1–24).",
        status: "Planned",
        tags: ["React", "TypeScript"],
    },
    {
        name: "Americano",
        tagline: "Generate and score Americano matches for padel/tennis with 3+ players.",
        status: "Planned",
        tags: ["React", "TypeScript"],
    },
    {
        name: "Daily AI Digest",
        tagline: "Email summaries of credible AI news from the last 24 hours.",
        status: "Planned",
        tags: ["Automation", "Email", "AI"],
    },
];
