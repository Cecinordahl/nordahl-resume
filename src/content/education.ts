export type EducationItem = {
    institution: string;
    program: string;
    dateRange: string;
    details?: string[];
};

export const education: EducationItem[] = [
    {
        institution: "Rogers State University",
        program: "BTech, Applied Technology",
        dateRange: "2011 – 2015",
        details: [
            "Focus on practical technical skills combined with project management and leadership fundamentals.",
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
            "Selected coursework: Web development & inclusive design, programming, databases, introductory AI, data security.",
        ],
    },
    {
        institution: "University of Oslo",
        program: "Single courses",
        dateRange: "Aug 2020 – Jun 2021",
        details: [
            "Selected coursework: Object-oriented programming, interaction design, logical methods, IT in organizations.",
        ],
    },
];
