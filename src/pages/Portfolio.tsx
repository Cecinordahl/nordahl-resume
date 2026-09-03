import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { hobbyProjects } from "../content/projects";
import type { Project } from "../content/projects";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import { ChevronDownIcon, ExternalLinkIcon, GitHubIcon } from "../components/icons";
import { ImageCarousel } from "../components/ImageCarousel";
import { fetchRepoDates, formatMonthYear, type RepoDates } from "../lib/githubRepoDates";

const statusClass: Record<Project["status"], string> = {
    Planned: "status-planned",
    "In progress": "status-inprogress",
    Beta: "status-beta",
    Live: "status-live",
};

const allStatuses = Object.keys(statusClass) as Project["status"][];

const externalServices: { name: string; why: string }[] = [
    {
        name: "Vercel",
        why: "Hosts the frontend for almost every project here, auto-deployed from GitHub on push. Serverless functions also handle anything that needs a server-side secret — webhook receivers, API proxies, contact form submissions — without running a separate backend.",
    },
    {
        name: "Firebase",
        why: "Auth and Firestore for projects that need real-time sync or a login without standing up their own backend — e.g. shared trip data syncing live across devices, or an admin panel gated behind Firebase-authenticated users. Free Spark tier covers everything.",
    },
    {
        name: "Render",
        why: "Hosts the Spring Boot backends as Docker containers on the free tier — the only practical free option for an always-available Java service. The tradeoff is cold starts after inactivity, which I work around with keep-alive pings or an explicit \"waking up\" state in the UI.",
    },
    {
        name: "Anthropic API",
        why: "Powers Claude-generated content inside a couple of apps — e.g. a language-learning app's free-text lesson generator, using Claude's structured outputs so generated content is schema-validated instead of parsed from free text. Also what runs the scheduled AI news digest task above.",
    },
    {
        name: "Telegram Bot API",
        why: "Used for push-style alerts (like a rain warning before an outdoor booking) without building notification infrastructure — everyone already has Telegram, and the bot API gives simple two-way commands for free.",
    },
    {
        name: "Cloudflare",
        why: "DNS management for a couple of project domains. (Placeholder — Cecilie, confirm/adjust this one.)",
    },
];

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

    const [toolsOpen, setToolsOpen] = useState(false);

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
                <div className="h2">Portfolio</div>
                <p className="muted">A showcase of my hobby projects — small apps I build outside of work, for myself, my husband, or friends. Links go live as each project ships.</p>
                <p className="muted">My curiosity for building things doesn't clock out at 5pm. In my spare time I make web and iOS apps to solve a problem, automate something tedious, replace a clunky spreadsheet, or just try out a new tool or idea — sometimes to create something genuinely useful, sometimes purely to learn, and sometimes just to play.</p>
            </div>

            <div className="card">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setToolsOpen((o) => !o)}
                    aria-expanded={toolsOpen}
                    style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                    Tools & services
                    <span style={{ display: "inline-flex", transform: toolsOpen ? "rotate(180deg)" : undefined, transition: "transform 0.15s ease" }}>
                        <ChevronDownIcon />
                    </span>
                </button>

                {toolsOpen && (
                    <div className="grid grid2" style={{ marginTop: 12 }}>
                        {externalServices.map((s) => (
                            <div key={s.name}>
                                <div className="title">{s.name}</div>
                                <p className="muted" style={{ marginTop: 4 }}>{s.why}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="status-filter" style={{ marginTop: 10 }}>
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
