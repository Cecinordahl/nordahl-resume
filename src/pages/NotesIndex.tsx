import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getAllNotes } from "../lib/notes";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import { InfoIcon, ChevronDownIcon } from "../components/icons";

export default function NotesIndex() {
    useDocumentTitle("Notes");

    const [searchParams, setSearchParams] = useSearchParams();
    const [filterOpen, setFilterOpen] = useState(false);

    const notes = getAllNotes();
    const allTags = [...new Set(notes.flatMap((n) => n.tags))].sort();

    const activeTags = new Set(
        searchParams.get("tags")?.split(",").filter((t) => allTags.includes(t)) ?? [],
    );

    const visibleNotes = activeTags.size === 0 ? notes : notes.filter((n) => n.tags.some((t) => activeTags.has(t)));

    function toggleTag(tag: string) {
        const next = new Set(activeTags);
        if (next.has(tag)) next.delete(tag);
        else next.add(tag);

        if (next.size === 0) setSearchParams({});
        else setSearchParams({ tags: [...next].join(",") });
    }

    function clearTags() {
        setSearchParams({});
    }

    return (
        <div className="grid grid-sm">
            <div className="row-between" style={{ alignItems: "flex-start" }}>
                <div>
                    <div className="h2">Notes</div>
                    <p className="muted mb-0">
                        Short technical reflections written as static markdown.
                    </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <a className="btn" href="/rss.xml" target="_blank" rel="noreferrer">RSS</a>
                    <span className="tooltip-wrap" tabIndex={0} aria-label="What is RSS?">
                        <InfoIcon />
                        <span className="tooltip-bubble">
                            RSS lets you follow new notes without checking back here — add this
                            feed to a reader app (e.g. Feedly) and get notified whenever I publish
                            something new.
                        </span>
                    </span>
                </div>
            </div>

            {allTags.length > 0 && (
                <div>
                    <button
                        type="button"
                        className="btn"
                        onClick={() => setFilterOpen((o) => !o)}
                        aria-expanded={filterOpen}
                        style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                    >
                        Filter{activeTags.size > 0 ? ` (${activeTags.size})` : ""}
                        <span style={{ display: "inline-flex", transform: filterOpen ? "rotate(180deg)" : undefined, transition: "transform 0.15s ease" }}>
                            <ChevronDownIcon />
                        </span>
                    </button>

                    {filterOpen && (
                        <div style={{ marginTop: 12 }}>
                            <button
                                type="button"
                                className={`pill pill-filter${activeTags.size === 0 ? " pill-active" : ""}`}
                                onClick={clearTags}
                            >
                                All
                            </button>
                            {allTags.map((t) => (
                                <button
                                    type="button"
                                    key={t}
                                    className={`pill pill-filter${activeTags.has(t) ? " pill-active" : ""}`}
                                    onClick={() => toggleTag(t)}
                                    aria-pressed={activeTags.has(t)}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-sm">
                {visibleNotes.map((n) => (
                    <Link key={n.slug} to={`/notes/${n.slug}`} className="card">
                        <div className="title">{n.title}</div>
                        <div className="muted">{n.date}</div>
                        <div>
                            {n.tags.map((t) => <span key={t} className="pill">{t}</span>)}
                        </div>
                    </Link>
                ))}
                {visibleNotes.length === 0 && (
                    <p className="muted">No notes match the selected tags.</p>
                )}
            </div>
        </div>
    );
}
