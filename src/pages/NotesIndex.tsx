import { Link, useSearchParams } from "react-router-dom";
import { getAllNotes } from "../lib/notes";
import { useDocumentTitle } from "../lib/useDocumentTitle";

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
        <div className="grid" style={{ gap: 14 }}>
            <div className="card">
                <div className="h2">Notes</div>
                <p className="muted" style={{ marginBottom: 0 }}>
                    Short technical reflections written as static markdown.
                </p>
                <p style={{ marginBottom: 0 }}>
                    <a className="btn" href="/rss.xml" target="_blank" rel="noreferrer">RSS</a>
                </p>
            </div>

            {allTags.length > 0 && (
                <div>
                    <span
                        className="pill"
                        onClick={() => selectTag(null)}
                        style={{ cursor: "pointer", fontWeight: activeTag ? 400 : 700 }}
                    >
                        All
                    </span>
                    {allTags.map((t) => (
                        <span
                            key={t}
                            className="pill"
                            onClick={() => selectTag(t === activeTag ? null : t)}
                            style={{ cursor: "pointer", fontWeight: t === activeTag ? 700 : 400 }}
                        >
                            {t}
                        </span>
                    ))}
                </div>
            )}

            <div className="grid" style={{ gap: 14 }}>
                {visibleNotes.map((n) => (
                    <Link key={n.slug} to={`/notes/${n.slug}`} className="card" style={{ display: "block" }}>
                        <div style={{ fontWeight: 700 }}>{n.title}</div>
                        <div className="muted">{n.date}</div>
                        <div style={{ marginTop: 10 }}>
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
