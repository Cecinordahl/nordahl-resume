export type EducationItem = {
    institution: string;
    program: string;
    dateRange: string;
    details?: string[];
};

export const education: EducationItem[] = [
    {
        institution: "Rogers State University",
        program: "Bachelor of Technology, Applied Technology",
        dateRange: "2011 – 2015",
        details: [
            "Specialized in Applied Technology, the program focuses on practical skills and management in tech fields. It emphasized technical expertise, problem-solving, project management, and leadership.",
        ],
    },
    {
        institution: "Academic Work Academy Norway",
        program: "12 Week Program, Java",
        dateRange: "Sep 2021 – Nov 2021",
        details: [
            "Intensive program in Java and object-oriented programming.",
            "Hands-on work with database modeling, Spring Boot, basic frontend development, version control, and Agile methodology.",
        ],
    },
    {
        institution: "OsloMet – Oslo Metropolitan University",
        program: "Single courses",
        dateRange: "Sep 2021 – Dec 2023",
        details: [
            "DATA1200 Webutvikling og inkluderende design",
            "DAPE1400 Programmering",
            "DATA1700 Webprogrammering",
            "DATA1500 Databaser",
            "DAVE3625 Introduksjon til Kunstig Intelligens",
            "ITPE3100 Datasikkerhet",
            "DATA1100 Teknologi og samfunn for programmerere"
        ],
    },
    {
        institution: "University of Oslo",
        program: "Single courses",
        dateRange: "Aug 2020 – Jun 2021",
        details: [
            "IN1050 Introduksjon til design, bruk, interaksjon",
            "IN1150 Logiske metoder",
            "IN1000 Introduksjon til objektorientert programmering",
            "IN2150 IT i organisasjoner"
        ],
    },
];
