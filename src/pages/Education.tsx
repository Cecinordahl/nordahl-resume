import { education } from "../content/education";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import PageHeader from "../components/PageHeader";

export default function Education() {
    useDocumentTitle("Education");

    return (
        <div className="page">
            <PageHeader label="05 — Education" title="Education">
                <p>Degrees, programs, and selected coursework.</p>
            </PageHeader>

            <div className="entries entries-flush">
                {education.map((e) => (
                    <div key={e.institution + e.program} className="card">
                        <div className="title">{e.institution}</div>
                        <div className="entry-meta">
                            {e.program} · {e.dateRange}
                        </div>

                        {e.details?.length ? (
                            <ul className="entry-body entry-list">
                                {e.details.map((d, i) => (
                                    <li key={i}>{d}</li>
                                ))}
                            </ul>
                        ) : null}

                        {e.courses?.length ? (
                            <ul className="entry-body entry-list">
                                {e.courses.map((c) => (
                                    <li key={c.name}>
                                        {c.url ? (
                                            <a href={c.url} target="_blank" rel="noreferrer">{c.name}</a>
                                        ) : (
                                            c.name
                                        )}
                                        <span className="muted"> · {c.term}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : null}

                        {e.note && <p className="entry-body" style={{ fontSize: 13 }}>{e.note}</p>}

                        {e.links?.length ? (
                            <div className="entry-links">
                                {e.links.map((l) => (
                                    <a key={l.url} className="text-link" href={l.url} target="_blank" rel="noreferrer">
                                        {l.label}
                                    </a>
                                ))}
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
}
