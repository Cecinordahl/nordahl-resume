import { hobbyProjects } from "../content/projects";

export default function Portfolio() {
    return (
        <div className="grid" style={{ gap: 14 }}>
            <div className="card">
                <div className="h2">Portfolio</div>
                <p className="muted" style={{ marginBottom: 0 }}>
                    Hobby projects (links will be added as repositories go live).
                </p>
            </div>

            <div className="grid grid2">
                {hobbyProjects.map((p) => (
                    <div key={p.name} className="card">
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                            <div style={{ fontWeight: 700 }}>{p.name}</div>
                            <div className="muted">{p.status}</div>
                        </div>

                        <p className="muted">{p.tagline}</p>

                        <div style={{ marginTop: 6 }}>
                            {p.tags.map((t) => (
                                <span key={t} className="pill">{t}</span>
                            ))}
                        </div>

                        {p.githubUrl ? (
                            <div style={{ marginTop: 12 }}>
                                <a className="btn" href={p.githubUrl} target="_blank" rel="noreferrer">
                                    GitHub
                                </a>
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
}
