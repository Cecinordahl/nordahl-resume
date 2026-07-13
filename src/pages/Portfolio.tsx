import { hobbyProjects } from "../content/projects";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function Portfolio() {
    useDocumentTitle("Portfolio");

    return (
        <div className="grid grid-sm">
            <div className="card">
                <div className="h2">Portfolio</div>
                <p className="muted mb-0">
                    Hobby projects (links will be added as repositories go live).
                </p>
            </div>

            <div className="grid grid2">
                {hobbyProjects.map((p) => (
                    <div key={p.name} className="card">
                        <div className="row-between">
                            <div className="title">{p.name}</div>
                            <div className="muted">{p.status}</div>
                        </div>

                        <p className="muted">{p.tagline}</p>

                        <div>
                            {p.tags.map((t) => (
                                <span key={t} className="pill">{t}</span>
                            ))}
                        </div>

                        {p.githubUrl ? (
                            <a className="btn" href={p.githubUrl} target="_blank" rel="noreferrer">
                                GitHub
                            </a>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
}
