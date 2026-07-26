import { certifications } from "../content/certifications";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function Certifications() {
    useDocumentTitle("Certifications");

    return (
        <div className="grid grid-sm">
            <div>
                <div className="h2">Certifications</div>
                <p className="muted">Selected certifications and courses.</p>
            </div>

            {certifications.map((c) => (
                <div key={c.name} className="card row-between" style={{ alignItems: "center" }}>
                    <div>
                        <div className="title">{c.name}</div>
                        <div className="muted">
                            {c.issuer} · {c.issued}
                        </div>
                        {c.credentialUrl && (
                            <a href={c.credentialUrl} target="_blank" rel="noreferrer">
                                View credential
                            </a>
                        )}
                    </div>
                    {c.badgeImage && (
                        <a href={c.credentialUrl ?? c.badgeImage} target="_blank" rel="noreferrer">
                            <img
                                src={c.badgeImage}
                                alt={`${c.name} badge`}
                                width={64}
                                height={64}
                                style={{ display: "block" }}
                            />
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
}
