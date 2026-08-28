import { EducationItemSchema, parseContent, sortByStartDateDesc, type EducationItem } from "./schema.ts";

export type { EducationItem };

{/* TODO add links for the courses at UiO and OsloMet. Add for AW Academy as well if theres a info page for that or maybe I have a certification or something */}
const rawEducation = [
    {
        institution: "Rogers State University",
        program: "Bachelor of Technology, Applied Technology",
        dateRange: "2011 – 2015",
        startDate: "2011-01",
        details: [
            "Specialized in Applied Technology, the program focuses on practical skills and management in tech fields. It emphasized technical expertise, problem-solving, project management, and leadership.",
        ],
    },
    {
        institution: "Academic Work Academy Norway",
        program: "12 Week Program, Java",
        dateRange: "Sep 2021 – Nov 2021",
        startDate: "2021-09",
        details: [
            "Intensive program in Java and object-oriented programming.",
            "Hands-on work with database modeling, Spring Boot, basic frontend development, version control, and Agile methodology.",
        ],
    },
    {
        institution: "OsloMet – Oslo Metropolitan University",
        program: "Single courses",
        dateRange: "Sep 2021 – Dec 2023",
        startDate: "2021-09",
        details: [
            "DATA1200 Webutvikling og inkluderende design",
            "DAPE1400 Programmering",
            "DATA1700 Webprogrammering",
            "DATA1500 Databaser",
            "DAVE3625 Introduksjon til Kunstig Intelligens",
            "ITPE3100 Datasikkerhet",
            "DATA1100 Teknologi og samfunn for programmerere",
        ],
        note: "All courses completed while working full-time — those finished by December 2021 while at Academic Work and Accenture, and those finished between January 2022 and December 2023 while at Accenture and KLP.",
    },
    {
        institution: "University of Oslo",
        program: "Single courses",
        dateRange: "Aug 2020 – Jun 2021",
        startDate: "2020-08",
        details: [
            "IN1050 Introduksjon til design, bruk, interaksjon",
            "IN1150 Logiske metoder",
            "IN1000 Introduksjon til objektorientert programmering",
            "IN2150 IT i organisasjoner",
        ],
    },
];

const validated = parseContent(EducationItemSchema, rawEducation, "content/education.ts");

export const education: EducationItem[] = sortByStartDateDesc(validated);
