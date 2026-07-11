import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getNoteBySlug } from "../lib/notes";
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

            <Link className="btn" to="/notes">Back</Link>
        </div>
    );
}
