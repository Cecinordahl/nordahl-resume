import { workExperience } from "../src/content/experience.ts";
import { education } from "../src/content/education.ts";
import { certifications } from "../src/content/certifications.ts";
import { hobbyProjects } from "../src/content/projects.ts";

console.log(
    `Content OK: ${workExperience.length} jobs, ${education.length} education entries, ` +
        `${certifications.length} certifications, ${hobbyProjects.length} projects.`,
);
