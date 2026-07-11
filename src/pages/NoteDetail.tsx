import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getAllNotes, getNoteBySlug } from "../lib/notes";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function NoteDetail() {
    const { slug } = useParams();
    const note = slug ? getNoteBySlug(slug) : null;

    useDocumentTitle(note ? note.meta.title : "Notes");

    if (!note) {
        return (
            <div className="card">
                <div style={{ fontWeight: 700 }}>Not found</div>
                <p className="muted">That note doesn’t exist.</p>
                <Link className="btn" to="/notes">Back to notes</Link>
            </div>
        );
    }

    const allNotes = getAllNotes();
    const index = allNotes.findIndex((n) => n.slug === note.meta.slug);
    const newer = index > 0 ? allNotes[index - 1] : null;
    const older = index >= 0 && index < allNotes.length - 1 ? allNotes[index + 1] : null;

    return (
        <div className="grid" style={{ gap: 14 }}>
            <div className="card">
                <div className="h2">{note.meta.title}</div>
                <div className="muted">{note.meta.date}</div>
                <div style={{ marginTop: 10 }}>
                    {note.meta.tags.map((t) => <span key={t} className="pill">{t}</span>)}
                </div>
            </div>

            <div className="card" style={{ lineHeight: 1.7 }}>
                <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                    {older && (
                        <Link className="btn" to={`/notes/${older.slug}`}>← {older.title}</Link>
                    )}
                </div>
                <div>
                    {newer && (
                        <Link className="btn" to={`/notes/${newer.slug}`}>{newer.title} →</Link>
                    )}
                </div>
            </div>

            <Link className="btn" to="/notes">Back to all notes</Link>
        </div>
    );
}
