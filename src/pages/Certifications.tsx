import { certifications } from "../content/certifications";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function Certifications() {
    useDocumentTitle("Certifications");

    return (
        <div className="grid grid-sm">
            <div className="card">
                <div className="h2">Certifications</div>
                <p className="muted mb-0">
                    Selected certifications and courses.
                </p>
            </div>

            {certifications.map((c) => (
                <div key={c.name} className="card">
                    <div className="title">{c.name}</div>
                    <div className="muted">
                        {c.issuer} · {c.issued}
                    </div>
                </div>
            ))}
        </div>
    );
}
