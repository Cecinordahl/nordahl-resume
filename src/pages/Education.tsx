import { education } from "../content/education";

export default function Education() {
    return (
        <div className="grid" style={{ gap: 14 }}>
            <div className="card">
                <div className="h2">Education</div>
                <p className="muted" style={{ marginBottom: 0 }}>
                    Degrees, programs, and selected coursework.
                </p>
            </div>

            {education.map((e) => (
                <div key={e.institution + e.program} className="card">
                    <div style={{ fontWeight: 700 }}>{e.institution}</div>
                    <div className="muted">
                        {e.program} · {e.dateRange}
                    </div>

                    {e.details?.length ? (
                        <ul style={{ marginBottom: 0 }}>
                            {e.details.map((d, i) => (
                                <li key={i}>{d}</li>
                            ))}
                        </ul>
                    ) : null}
                </div>
            ))}
        </div>
    );
}
