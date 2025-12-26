import { Link } from "react-router-dom";
import { workExperience } from "../content/experience";

export default function WorkIndex() {
    return (
        <div>
            <div className="h2">Work experience</div>
            <p className="muted">Click a workplace to open details.</p>

            <div className="grid" style={{ gap: 14 }}>
                {workExperience.map((w) => (
                    <Link key={w.slug} to={`/work/${w.slug}`} className="card" style={{ display: "block" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                            <div>
                                <div style={{ fontWeight: 700 }}>{w.company}</div>
                                <div className="muted">{w.rolePublic}{w.roleOfficial ? ` · ${w.roleOfficial}` : ""}</div>
                            </div>
                            <div className="muted">{w.location} · {w.dateRange}</div>
                        </div>
                        <p className="muted" style={{ marginBottom: 0 }}>{w.summary}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
