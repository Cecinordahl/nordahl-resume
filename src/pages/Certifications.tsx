import { certifications } from "../content/certifications";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import PageHeader from "../components/PageHeader";

export default function Certifications() {
    useDocumentTitle("Certifications");

    return (
        <div className="page">
            <PageHeader label="06 — Certifications" title="Certifications">
                <p>Selected certifications and courses.</p>
            </PageHeader>

            <div className="entries">
                {certifications.map((c) => (
                    <div key={c.name} className="card" style={{ display: "flex", alignItems: "center", gap: 20 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="title">{c.name}</div>
                            <div className="entry-meta">
                                {c.issuer} · {c.issued}
                            </div>
                            {c.credentialUrl && (
                                <a className="text-link" href={c.credentialUrl} target="_blank" rel="noreferrer">
                                    View credential
                                </a>
                            )}
                        </div>
                        {c.badgeImage && (
                            <a
                                href={c.credentialUrl ?? c.badgeImage}
                                target="_blank"
                                rel="noreferrer"
                                style={{ flexShrink: 0 }}
                            >
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
        </div>
    );
}
