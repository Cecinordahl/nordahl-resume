import { Link } from "react-router-dom";
import { workExperience } from "../content/experience";

export default function WorkIndex() {
    return (
        <div>
            <h2>Work</h2>
            <p>Workplaces (click to open details):</p>

            <ul>
                {workExperience.map((w) => (
                    <li key={w.slug} style={{ marginBottom: 10 }}>
                        <Link to={`/work/${w.slug}`}>
                            <strong>{w.company}</strong> — {w.rolePublic} ({w.dateRange})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
