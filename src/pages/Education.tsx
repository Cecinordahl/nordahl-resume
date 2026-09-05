import { education } from "../content/education";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function Education() {
    useDocumentTitle("Education");

    return (
        <div className="grid grid-sm">
            <div>
                <div className="h2">Education</div>
                <p className="muted">Degrees, programs, and selected coursework.</p>
            </div>

            {education.map((e) => (
                <div key={e.institution + e.program} className="card">
                    <div className="title">{e.institution}</div>
                    <div className="muted">
                        {e.program} · {e.dateRange}
                    </div>

                    {e.details?.length ? (
                        <ul className="mb-0">
                            {e.details.map((d, i) => (
                                <li key={i}>{d}</li>
                            ))}
                        </ul>
                    ) : null}

                    {e.courses?.length ? (
                        <ul className="mb-0">
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

                    {e.note && <p className="muted" style={{ fontSize: 13, marginTop: 8 }}>{e.note}</p>}
                </div>
            ))}
        </div>
    );
}
