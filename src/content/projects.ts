import {parseContent, type Project, ProjectSchema} from "./schema.ts";

export type {Project};

const rawHobbyProjects = [
    {
        name: "EuroBonus Buddy",
        tagline: "Help EuroBonus hunters maximize points and status progress with SAS.",
        status: "Planned",
        tags: ["React", "TypeScript", "Spring"],
    },
    {
        name: "WorkoutChallenge",
        tagline: "A motivational running challenge app that builds a personalized daily training plan and tracks completion, streaks, and points with automatic Strava sync.",
        status: "Live",
        tags: ["React", "TypeScript", "Firebase", "Vercel"]
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
    {
        name: "Trivia Arena",
        tagline:
            "A Jeopardy-style multiplayer trivia game with a live host-controlled board, team steals, and a countdown timer, powered by a Spring Boot WebSocket backend and a React frontend.",
        status: "In progress",
        tags: ["React", "TypeScript", "Spring Boot", "Java"],
    },
    {
        name: "Casa 360",
        tagline: "Landing page for house rental",
        status: "Planned",
        tags: ["InsertTag1Here", "InsertTag2Here", "InsertTag2Here"],
    },
    {
        name: "TanPlan",
        tagline: "A mobile-first sunscreen planner that schedules reapplication reminders throughout the day based on live UV forecasts, swims, and skin sensitivity.",
        status: "Beta",
        tags: ["React", "TypeScript", "Firebase", "Tailwind CSS"]
    },
    {
        name: "Braut & Rosé",
        tagline: "A shared real-time trip planner for a group summer holiday, with live itinerary notes, bookings, World Cup schedule, and flight status.",
        status: "Live",
        tags: ["React", "Vite", "Firebase", "Tailwind CSS"]
    }
];

export const hobbyProjects: Project[] = parseContent(ProjectSchema, rawHobbyProjects, "content/projects.ts");
