import { Link } from "react-router-dom";
import { workExperience } from "../content/experience";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function WorkIndex() {
    useDocumentTitle("Work");

    return (
        <div>
            <div className="h2">Work experience</div>
            <p className="muted">Click a workplace to open details.</p>

            <div className="grid grid-sm">
                {workExperience.map((w) => (
                    <Link key={w.slug} to={`/work/${w.slug}`} className="card">
                        <div className="row-between">
                            <div>
                                <div className="title">{w.company}</div>
                                <div className="muted">{w.rolePublic}{w.roleOfficial ? ` · ${w.roleOfficial}` : ""}</div>
                            </div>
                            <div className="muted">{w.location} · {w.dateRange}</div>
                        </div>
                        <p className="muted mb-0">{w.summary}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
