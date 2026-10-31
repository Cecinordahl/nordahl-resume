import { Link, useParams } from "react-router-dom";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getAllNotes, getNoteBySlug } from "../lib/notes";
import { highlightLanguages } from "../lib/highlightLanguages";
import { ChevronLeftIcon, ChevronRightIcon } from "../components/icons";

const rehypeHighlightOptions = { languages: highlightLanguages };
import { useDocumentTitle } from "../lib/useDocumentTitle";
import PageHeader from "../components/PageHeader";
import CodeBlock from "../components/CodeBlock";

// Markdown has no video syntax, so `![alt](clip.mp4)` renders as a video.
// The poster is expected next to the clip as `clip-poster.jpg`.
const markdownComponents: Components = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- drop the hast node so it isn't spread onto <pre>
    pre: ({ node, ...props }) => <CodeBlock {...props} />,
    img: ({ src, alt }) => {
        if (typeof src === "string" && src.endsWith(".mp4")) {
            return (
                <video controls preload="metadata" poster={src.replace(/\.mp4$/, "-poster.jpg")} aria-label={alt}>
                    <source src={src} type="video/mp4" />
                </video>
            );
        }
        return <img src={src} alt={alt} />;
    },
};

export default function NoteDetail() {
    const { slug } = useParams();
    const note = slug ? getNoteBySlug(slug) : null;

    useDocumentTitle(note ? note.meta.title : "Notes");

    if (!note) {
        return (
            <div className="page">
                <PageHeader label="Notes" title="Not found">
                    <p>That note doesn’t exist.</p>
                </PageHeader>
                <div>
                    <Link className="btn" to="/notes">Back to notes</Link>
                </div>
            </div>
        );
    }

    const allNotes = getAllNotes();
    const index = allNotes.findIndex((n) => n.slug === note.meta.slug);
    const newer = index > 0 ? allNotes[index - 1] : null;
    const older = index >= 0 && index < allNotes.length - 1 ? allNotes[index + 1] : null;

    return (
        <div className="page">
            <div className="row-between" style={{ alignItems: "center" }}>
                <Link className="back-link" to="/notes">← All notes</Link>
                <div>
                    {newer && (
                        <Link className="icon-link" to={`/notes/${newer.slug}`} aria-label={`Newer note: ${newer.title}`} title={newer.title}>
                            <ChevronLeftIcon />
                        </Link>
                    )}
                    {older && (
                        <Link className="icon-link" to={`/notes/${older.slug}`} aria-label={`Older note: ${older.title}`} title={older.title}>
                            <ChevronRightIcon />
                        </Link>
                    )}
                </div>
            </div>

            {/* Magazine-style article header: title, then a byline between two thin rules */}
            <header className="article-header">
                <h1 className="page-title page-title-md">{note.meta.title}</h1>
                <div className="article-byline">
                    <div>Written by Cecilie Nordahl · {note.meta.date}</div>
                    <div className="muted">{note.meta.tags.join(" · ")}</div>
                </div>
            </header>

            {/* One column on phones; two justified columns on desktop (see .article in index.css) */}
            <div className="prose note-content article">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[[rehypeHighlight, rehypeHighlightOptions]]} components={markdownComponents}>{note.content}</ReactMarkdown>
            </div>

            <div>
                <Link className="btn" to="/notes">Back to all notes</Link>
            </div>
        </div>
    );
}
