import { education } from "../content/education";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function Education() {
    useDocumentTitle("Education");

    return (
        <div className="grid grid-sm">
            <div className="card">
                <div className="h2">Education</div>
                <p className="muted mb-0">
                    Degrees, programs, and selected coursework.
                </p>
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
                </div>
            ))}
        </div>
    );
}
