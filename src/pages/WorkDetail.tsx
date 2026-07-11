import { Link, useParams } from "react-router-dom";
import { getWorkBySlug } from "../content/experience";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function WorkDetail() {
    const { slug } = useParams();
    const work = slug ? getWorkBySlug(slug) : undefined;

    useDocumentTitle(work ? work.company : "Work");

    if (!work) {
        return (
            <div>
                <h2>Not found</h2>
                <p>This workplace page doesn’t exist.</p>
                <Link to="/work">Back to work</Link>
            </div>
        );
    }

    return (
        <div>
            <Link to="/work">← Back</Link>

            <h2 style={{ marginBottom: 4 }}>{work.company}</h2>
            <div style={{ marginBottom: 12 }}>
                <div>
                    {work.rolePublic}
                    {work.roleOfficial ? ` · ${work.roleOfficial}` : ""}
                </div>
                <div>
                    {work.location} · {work.dateRange}
                </div>
            </div>

            <p>{work.summary}</p>

            <h3>Impact</h3>
            <ul>
                {work.impactBullets.map((b, i) => (
                    <li key={i}>{b}</li>
                ))}
            </ul>

            <h3>Project: {work.project.name}</h3>
            <p>{work.project.description}</p>
            <ul>
                {work.project.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                ))}
            </ul>

            <h4>Tech</h4>
            <ul>
                {work.project.tech.map((t) => (
                    <li key={t}>{t}</li>
                ))}
            </ul>
        </div>
    );
}
