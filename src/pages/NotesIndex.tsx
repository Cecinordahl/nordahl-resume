import { Link } from "react-router-dom";
import { getAllNotes } from "../lib/notes";

export default function NotesIndex() {
    const notes = getAllNotes();

    return (
        <div className="grid" style={{ gap: 14 }}>
            <div className="card">
                <div className="h2">Notes</div>
                <p className="muted" style={{ marginBottom: 0 }}>
                    Short technical reflections written as static markdown.
                </p>
            </div>

            <div className="grid" style={{ gap: 14 }}>
                {notes.map((n) => (
                    <Link key={n.slug} to={`/notes/${n.slug}`} className="card" style={{ display: "block" }}>
                        <div style={{ fontWeight: 700 }}>{n.title}</div>
                        <div className="muted">{n.date}</div>
                        <div style={{ marginTop: 10 }}>
                            {n.tags.map((t) => <span key={t} className="pill">{t}</span>)}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
