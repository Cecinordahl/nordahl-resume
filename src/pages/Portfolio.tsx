import { hobbyProjects } from "../content/projects";
import type { Project } from "../content/projects";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import { ExternalLinkIcon, GitHubIcon } from "../components/icons";

const statusClass: Record<Project["status"], string> = {
    Planned: "status-planned",
    "In progress": "status-inprogress",
    Beta: "status-beta",
    Live: "status-live",
};

export default function Portfolio() {
    useDocumentTitle("Portfolio");

    return (
        <div className="grid grid-sm">
            <div>
                <div className="h2">Portfolio</div>
                <p className="muted">Hobby projects (links will be added as repositories go live).</p>
            </div>

            <div className="grid grid2">
                {hobbyProjects.map((p) => (
                    <div key={p.name} className="card">
                        <div className="row-between">
                            <div className="title">{p.name}</div>
                            <span className={`status-badge ${statusClass[p.status]}`}>{p.status}</span>
                        </div>

                        <p className="muted">{p.tagline}</p>

                        <div>
                            {p.tags.map((t) => (
                                <span key={t} className="pill">{t}</span>
                            ))}
                        </div>

                        {(p.githubUrl || p.liveUrl) && (
                            <div style={{ marginTop: 8 }}>
                                {p.githubUrl && (
                                    <a
                                        className="icon-link"
                                        href={p.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={`${p.name} on GitHub`}
                                        title="View source on GitHub"
                                    >
                                        <GitHubIcon />
                                    </a>
                                )}
                                {p.liveUrl && (
                                    <a
                                        className="icon-link"
                                        href={p.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={`${p.name} live site`}
                                        title="View live site"
                                    >
                                        <ExternalLinkIcon />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
