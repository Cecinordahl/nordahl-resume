import { EducationItemSchema, parseContent, sortByStartDateDesc, type EducationItem } from "./schema.ts";

export type { EducationItem };

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
        courses: [
            { name: "DATA1200 Webutvikling og inkluderende design", term: "Fall 2021", url: "https://student.oslomet.no/studier/-/studieinfo/emne/DATA1200/2021/HØST" },
            { name: "DAPE1400 Programmering", term: "Fall 2021", url: "https://student.oslomet.no/studier/-/studieinfo/emne/DAPE1400/2021/HØST" },
            { name: "DATA1700 Webprogrammering", term: "Spring 2022", url: "https://student.oslomet.no/en/studier/-/studieinfo/emne/DATA1700/2021/HØST" },
            { name: "DATA1500 Databaser", term: "Spring 2022", url: "https://student.oslomet.no/en/studier/-/studieinfo/emne/DATA1500/2021/HØST" },
            { name: "DAVE3625 Introduksjon til Kunstig Intelligens", term: "Fall 2023", url: "https://student.oslomet.no/en/studier/-/studieinfo/emne/DAVE3625/2023/HØST" },
            { name: "ITPE3100 Datasikkerhet", term: "Fall 2023", url: "https://student.oslomet.no/en/studier/-/studieinfo/emne/ITPE3100/2023/HØST" },
            { name: "DATA1100 Teknologi og samfunn for programmerere", term: "Fall 2021", url: "https://student.oslomet.no/en/studier/-/studieinfo/emne/DATA1100/2021/HØST" },
        ],
        note: "All courses completed while working full-time — those finished by December 2021 while at Academic Work and Accenture, and those finished between January 2022 and December 2023 while at Accenture and KLP.",
    },
    {
        institution: "University of Oslo",
        program: "Single courses",
        dateRange: "Aug 2020 – Jun 2021",
        startDate: "2020-08",
        courses: [
            { name: "IN1050 Introduksjon til design, bruk, interaksjon", term: "Fall 2020", url: "https://www.uio.no/studier/emner/matnat/ifi/IN1050/" },
            { name: "IN1150 Logiske metoder", term: "Fall 2020", url: "https://www.uio.no/studier/emner/matnat/ifi/IN1150/" },
            { name: "IN1000 Introduksjon til objektorientert programmering", term: "Spring 2021", url: "https://www.uio.no/studier/emner/matnat/ifi/IN1000/" },
            { name: "IN2150 IT i organisasjoner", term: "Spring 2021", url: "https://www.uio.no/studier/emner/matnat/ifi/IN2150/" },
        ],
    },
];

const validated = parseContent(EducationItemSchema, rawEducation, "content/education.ts");

export const education: EducationItem[] = sortByStartDateDesc(validated);
