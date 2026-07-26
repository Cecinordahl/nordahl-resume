import { Link, useSearchParams } from "react-router-dom";
import { getAllNotes } from "../lib/notes";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import { InfoIcon } from "../components/icons";

export default function NotesIndex() {
    useDocumentTitle("Notes");

    const [searchParams, setSearchParams] = useSearchParams();
    const activeTag = searchParams.get("tag");

    const notes = getAllNotes();
    const allTags = [...new Set(notes.flatMap((n) => n.tags))].sort();
    const visibleNotes = activeTag ? notes.filter((n) => n.tags.includes(activeTag)) : notes;

    function selectTag(tag: string | null) {
        if (tag) setSearchParams({ tag });
        else setSearchParams({});
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
                <div style={{ marginTop: 25 }}>
                    <button
                        type="button"
                        className={`pill pill-filter${activeTag ? "" : " pill-active"}`}
                        onClick={() => selectTag(null)}
                    >
                        All
                    </button>
                    {allTags.map((t) => (
                        <button
                            type="button"
                            key={t}
                            className={`pill pill-filter${t === activeTag ? " pill-active" : ""}`}
                            onClick={() => selectTag(t === activeTag ? null : t)}
                        >
                            {t}
                        </button>
                    ))}
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
                    <p className="muted">No notes tagged "{activeTag}".</p>
                )}
            </div>
        </div>
    );
}
