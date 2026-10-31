import { useDocumentTitle } from "../lib/useDocumentTitle";
import PageHeader from "../components/PageHeader";

const links = [
    { label: "Email", value: "cecilie.nordahl@gmail.com", href: "mailto:cecilie.nordahl@gmail.com", external: false },
    { label: "LinkedIn", value: "cecilie-nordahl", href: "https://www.linkedin.com/in/cecilie-nordahl", external: true },
    { label: "GitHub", value: "Cecinordahl", href: "https://github.com/Cecinordahl", external: true },
];

export default function Contact() {
    useDocumentTitle("Contact");

    return (
        <div className="page">
            <PageHeader label="07 — Contact" title="Contact">
                <p>Always open to sharing ideas, learning from others, and improving how we build things.</p>
            </PageHeader>

            <div className="entries">
                {links.map((l) => (
                    <a
                        key={l.label}
                        className="card contact-row"
                        href={l.href}
                        {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                        <span className="section-label">{l.label}</span>
                        <span className="title">{l.value}</span>
                    </a>
                ))}
            </div>

            <div>
                <a className="btn" href="/ResumeNordahl.pdf" download>
                    Download PDF resume
                </a>
            </div>
        </div>
    );
}
