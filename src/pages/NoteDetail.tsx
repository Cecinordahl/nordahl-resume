import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { getAllNotes, getNoteBySlug } from "../lib/notes";
import { highlightLanguages } from "../lib/highlightLanguages";
import { ChevronLeftIcon, ChevronRightIcon } from "../components/icons";

const rehypeHighlightOptions = { languages: highlightLanguages };
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function NoteDetail() {
    const { slug } = useParams();
    const note = slug ? getNoteBySlug(slug) : null;

    useDocumentTitle(note ? note.meta.title : "Notes");

    if (!note) {
        return (
            <div className="card">
                <div className="title">Not found</div>
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
        <div className="grid grid-sm">
            <div className="row-between">
                <div>
                    {newer && (
                        <Link className="icon-link" to={`/notes/${newer.slug}`} aria-label={`Newer note: ${newer.title}`} title={newer.title}>
                            <ChevronLeftIcon />
                        </Link>
                    )}
                </div>
                <div>
                    {older && (
                        <Link className="icon-link" to={`/notes/${older.slug}`} aria-label={`Older note: ${older.title}`} title={older.title}>
                            <ChevronRightIcon />
                        </Link>
                    )}
                </div>
            </div>

            <div className="card">
                <div className="h2">{note.meta.title}</div>
                <div className="muted">{note.meta.date}</div>
                <div>
                    {note.meta.tags.map((t) => <span key={t} className="pill">{t}</span>)}
                </div>
            </div>

            <div className="card note-content">
                <ReactMarkdown rehypePlugins={[[rehypeHighlight, rehypeHighlightOptions]]}>{note.content}</ReactMarkdown>
            </div>

            <Link className="btn" to="/notes">Back to all notes</Link>
        </div>
    );
}
