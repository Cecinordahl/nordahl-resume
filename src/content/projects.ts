import {parseContent, type Project, ProjectSchema} from "./schema.ts";

export type {Project};

const rawHobbyProjects = [
    {
        name: "EuroBonus Buddy",
        tagline: "Help EuroBonus hunters maximize points and status progress with SAS.",
        status: "Planned",
        tags: ["React", "TypeScript", "Spring"],
        githubUrl: "https://github.com/Cecinordahl/eurobonusbuddy",
        // liveUrl: "https://<your-live-site>",
    },
    {
        name: "WorkoutChallenge",
        tagline: "A motivational running challenge app that builds a personalized daily training plan and tracks completion, streaks, and points with automatic Strava sync.",
        status: "Live",
        tags: ["React", "TypeScript", "Firebase", "Vercel"],
        githubUrl: "https://github.com/Cecinordahl/workout-challenge",
        liveUrl: "https://workout-challenge-app.vercel.app/",
        images: [
            "/images/projects/workout-challenge/2.png",
            "/images/projects/workout-challenge/3.png",
            "/images/projects/workout-challenge/4.png",
            "/images/projects/workout-challenge/5.png",
            "/images/projects/workout-challenge/6.png",
            "/images/projects/workout-challenge/7.png",
        ],
    },
    {
        name: "Americano",
        tagline: "Generate and score Americano matches for padel/tennis with 3+ players.",
        status: "Planned",
        tags: ["React", "TypeScript"],
        // githubUrl: "https://github.com/<you>/<repo>",
        // liveUrl: "https://<your-live-site>",
    },
    {
        name: "Daily AI Digest",
        tagline: "Email summaries of credible AI news from the last 24 hours.",
        status: "Planned",
        tags: ["Automation", "Email", "AI"],
        // githubUrl: "https://github.com/<you>/<repo>",
        // liveUrl: "https://<your-live-site>",
    },
    {
        name: "Trivia Arena",
        tagline:
            "A Jeopardy-style multiplayer trivia game with a live host-controlled board, team steals, and a countdown timer, powered by a Spring Boot WebSocket backend and a React frontend.",
        status: "In progress",
        tags: ["React", "TypeScript", "Spring Boot", "Java"],
        githubUrl: "https://github.com/Cecinordahl/trivia-arena",
        liveUrl: "https://trivia-arena.onrender.com/",
    },
    {
        name: "Casa 360",
        tagline: "Landing page for house rental",
        status: "Planned",
        tags: ["InsertTag1Here", "InsertTag2Here", "InsertTag2Here"],
        // githubUrl: "https://github.com/<you>/<repo>",
        // liveUrl: "https://<your-live-site>",
    },
    {
        name: "TanPlan",
        tagline: "A mobile-first sunscreen planner that schedules reapplication reminders throughout the day based on live UV forecasts, swims, and skin sensitivity.",
        status: "Beta",
        tags: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
        githubUrl: "https://github.com/Cecinordahl/tan-plan",
        liveUrl: "https://tan-plan.vercel.app/",
    },
    {
        name: "Braut & Rosé",
        tagline: "A shared real-time trip planner for a group summer holiday, with live itinerary notes, bookings, World Cup schedule, and flight status.",
        status: "Live",
        tags: ["React", "Vite", "Firebase", "Tailwind CSS"],
        githubUrl: "https://github.com/Cecinordahl/braut-og-rose",
        liveUrl: "https://braut-og-rose.vercel.app/",
        images: [
            "/images/projects/braut-og-rose/2.png",
            "/images/projects/braut-og-rose/3.png",
            "/images/projects/braut-og-rose/4.png",
            "/images/projects/braut-og-rose/7.png",
        ],
    },
    {
        name: "Pocket Phrases",
        tagline: "A situation-based travel phrase learner that builds short Spanish/French/German lessons for a chosen or described situation, with a Norwegian Bokmål UI.",
        status: "Live",
        tags: ["React", "TypeScript", "Java", "Spring Boot", "Anthropic API", "Firebase"],
        githubUrl: "https://github.com/Cecinordahl/pocket-phrases",
        liveUrl: "https://pocket-phrases.vercel.app",
    },
];

export const hobbyProjects: Project[] = parseContent(ProjectSchema, rawHobbyProjects, "content/projects.ts");
