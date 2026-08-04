import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { hobbyProjects } from "../content/projects";
import type { Project } from "../content/projects";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import { ExternalLinkIcon, GitHubIcon } from "../components/icons";
import { ImageCarousel } from "../components/ImageCarousel";
import { fetchRepoDates, formatMonthYear, type RepoDates } from "../lib/githubRepoDates";

const statusClass: Record<Project["status"], string> = {
    Planned: "status-planned",
    "In progress": "status-inprogress",
    Beta: "status-beta",
    Live: "status-live",
};

const allStatuses = Object.keys(statusClass) as Project["status"][];

export default function Portfolio() {
    useDocumentTitle("Portfolio");

    const [searchParams, setSearchParams] = useSearchParams();
    const activeStatuses = new Set(
        searchParams.get("status")?.split(",").filter((s): s is Project["status"] => allStatuses.includes(s as Project["status"])) ?? [],
    );

    const visibleProjects = activeStatuses.size === 0
        ? hobbyProjects
        : hobbyProjects.filter((p) => activeStatuses.has(p.status));

    // undefined = not checked yet, null = checked but unavailable (e.g. private repo), otherwise the fetched dates
    const [repoDates, setRepoDates] = useState<Record<string, RepoDates | null>>({});

    useEffect(() => {
        let cancelled = false;

        for (const p of hobbyProjects) {
            if (!p.githubUrl) continue;
            fetchRepoDates(p.githubUrl).then((dates) => {
                if (cancelled) return;
                setRepoDates((prev) => ({ ...prev, [p.name]: dates }));
            });
        }

        return () => {
            cancelled = true;
        };
    }, []);

    const sortedProjects = [...visibleProjects].sort((a, b) => {
        const aDate = repoDates[a.name]?.pushedAt;
        const bDate = repoDates[b.name]?.pushedAt;
        if (aDate && bDate) return new Date(bDate).getTime() - new Date(aDate).getTime();
        if (aDate) return -1;
        if (bDate) return 1;
        return 0;
    });

    function toggleStatus(status: Project["status"]) {
        const next = new Set(activeStatuses);
        if (next.has(status)) next.delete(status);
        else next.add(status);

        if (next.size === 0) setSearchParams({});
        else setSearchParams({ status: [...next].join(",") });
    }

    return (
        <div className="grid grid-sm">
            <div>
                <div className="h2">Portfolio</div>
                <p className="muted">Hobby projects (links will be added as repositories go live).</p>
            </div>

            <div style={{ marginTop: 10 }}>
                <button
                    type="button"
                    className={`pill pill-filter${activeStatuses.size === 0 ? " pill-active" : ""}`}
                    onClick={() => setSearchParams({})}
                >
                    All
                </button>
                {allStatuses.map((s) => (
                    <button
                        type="button"
                        key={s}
                        className={`pill pill-filter${activeStatuses.has(s) ? " pill-active" : ""}`}
                        onClick={() => toggleStatus(s)}
                        aria-pressed={activeStatuses.has(s)}
                    >
                        {s}
                    </button>
                ))}
            </div>

            <div className="grid grid2">
                {sortedProjects.map((p) => (
                    <div key={p.name} className="card">
                        <div className="row-between">
                            <div className="title">{p.name}</div>
                            <span className={`status-badge ${statusClass[p.status]}`}>{p.status}</span>
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

                        <p className="muted">{p.tagline}</p>

                        {p.githubUrl && repoDates[p.name] !== undefined && (
                            <p className="muted" style={{ fontSize: 12 }}>
                                {repoDates[p.name]
                                    ? `Started ${formatMonthYear(repoDates[p.name]!.createdAt)} · Updated ${formatMonthYear(repoDates[p.name]!.pushedAt)}`
                                    : "Dates unavailable (private repo)"}
                            </p>
                        )}

                        {p.images && <ImageCarousel projectName={p.name} images={p.images} />}

                        <div>
                            {p.tags.map((t) => (
                                <span key={t} className="pill">{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
                {sortedProjects.length === 0 && (
                    <p className="muted">No projects match the selected filters.</p>
                )}
            </div>
        </div>
    );
}
