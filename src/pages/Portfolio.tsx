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

// undefined = nothing to show, null = fetch attempted but unavailable (e.g. private repo)
function effectiveDates(p: Project, repoDates: Record<string, RepoDates | null>): RepoDates | null | undefined {
    if (p.manualDates) return p.manualDates;
    if (!p.githubUrl) return undefined;
    return repoDates[p.name];
}

export default function Portfolio() {
    useDocumentTitle("Portfolio");

    const [searchParams, setSearchParams] = useSearchParams();
    const activeStatuses = new Set(
        searchParams.get("status")?.split(",").filter((s): s is Project["status"] => allStatuses.includes(s as Project["status"])) ?? [],
    );

    const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set());
    function toggleDetails(name: string) {
        setExpandedDetails((prev) => {
            const next = new Set(prev);
            if (next.has(name)) next.delete(name);
            else next.add(name);
            return next;
        });
    }

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
        const aDate = effectiveDates(a, repoDates)?.pushedAt;
        const bDate = effectiveDates(b, repoDates)?.pushedAt;
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
                <div className="h2">Portfolio</div> {/* TODO re-phrase/word/improve the following two p sections */}
                <p className="muted">Welcome to the showcase of my hobby projects (links will be added as repositories go live).</p>
                <p className="muted">I genuinely love what I do for a living, so my motivation for learning, creating and building things doesn't stop when I get home from work. In my spare time, when I feel motivated, I enjoy making web- and iOS apps and exploring different ways to utilize technology for fun, to solve a problem, automate/streamline tasks, get a better UI than functionality I have created in excel, or simply to build/create something cool. Could be because I want to create something useful, because I want to learn a new topic, or rather just play around.</p>
            </div>

            {/* TODO add a section to list the external services I use for my projects, ie Firebase, Vercel, Render, Anthropic API, Cloudflare, Telegram, etc. And why I chose then and what I use each of them for. */}

            {/* TODO center status pills over the projects components below for mobile view */}
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
                {sortedProjects.map((p) => {
                    const dates = effectiveDates(p, repoDates);
                    return (
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

                        {p.details && (
                            <div style={{ marginTop: 4 }}>
                                <button
                                    type="button"
                                    className="details-toggle"
                                    onClick={() => toggleDetails(p.name)}
                                    aria-expanded={expandedDetails.has(p.name)}
                                >
                                    {expandedDetails.has(p.name) ? "− Hide technical details" : "+ Technical details"}
                                </button>

                                {expandedDetails.has(p.name) && (
                                    <div className="details-panel">
                                        {p.details.summary && <p className="muted">{p.details.summary}</p>}

                                        <div className="details-section">
                                            <div className="details-heading">Technical highlights</div>
                                            <ul>
                                                {p.details.highlights.map((h, i) => (
                                                    <li key={i}>{h}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        {p.details.challenges && p.details.challenges.length > 0 && (
                                            <div className="details-section">
                                                <div className="details-heading">Challenges & fixes</div>
                                                <ul>
                                                    {p.details.challenges.map((c, i) => (
                                                        <li key={i}>{c}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {dates !== undefined && (
                            <p className="muted" style={{ fontSize: 12 }}>
                                {dates
                                    ? `Started ${formatMonthYear(dates.createdAt)} · Updated ${formatMonthYear(dates.pushedAt)}`
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
                    );
                })}
                {sortedProjects.length === 0 && (
                    <p className="muted">No projects match the selected filters.</p>
                )}
            </div>
        </div>
    );
}
