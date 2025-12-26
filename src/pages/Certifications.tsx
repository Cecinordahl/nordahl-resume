import { certifications } from "../content/certifications";

export default function Certifications() {
    return (
        <div className="grid" style={{ gap: 14 }}>
            <div className="card">
                <div className="h2">Certifications</div>
                <p className="muted" style={{ marginBottom: 0 }}>
                    Selected certifications and courses.
                </p>
            </div>

            {certifications.map((c) => (
                <div key={c.name} className="card">
                    <div style={{ fontWeight: 700 }}>{c.name}</div>
                    <div className="muted">
                        {c.issuer} · {c.issued}
                    </div>
                </div>
            ))}
        </div>
    );
}
