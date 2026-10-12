import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { books, type Book } from "../content/books";
import { useDocumentTitle } from "../lib/useDocumentTitle";

// Status filters, plus one `category:<name>` filter per curated collection found in the content.
type Filter = "all" | "recommended" | "read" | "reading" | "wishlist" | `category:${string}`;

const statusFilters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "recommended", label: "Recommended" },
    { id: "read", label: "Read" },
    { id: "reading", label: "Reading" },
    { id: "wishlist", label: "Wishlist" },
];

const categories = [...new Set(books.flatMap((b) => b.categories ?? []))];
const categoryFilters: { id: Filter; label: string }[] = categories.map((c) => ({ id: `category:${c}`, label: c }));

const statusLabels: Record<Book["status"], string> = {
    read: "Read",
    reading: "Currently reading",
    wishlist: "Wishlist",
};

// Small props placed between books, keyed by the index of the book they follow.
const decorAfter: Record<number, "plant" | "bookend" | "mug"> = {
    4: "plant",
    11: "bookend",
    17: "mug",
};

function matches(book: Book, filter: Filter) {
    if (filter === "all") return true;
    if (filter === "recommended") return !!book.recommended;
    if (filter.startsWith("category:")) return !!book.categories?.includes(filter.slice("category:".length));
    return book.status === filter;
}

// Deterministic per-title variation, so spines don't all look identical but stay stable between renders.
function hash(s: string) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
}

function inkFor(hex: string) {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? "#1a1a1a" : "#f6f1e7";
}

function bookStyle(book: Book): CSSProperties {
    const h = hash(book.slug);
    return {
        "--book-color": book.color,
        "--book-ink": inkFor(book.color),
        "--spine-w": `${24 + (h % 14)}px`,
        "--spine-h": `${80 + ((h >> 4) % 19)}%`,
    } as CSSProperties;
}

function Cover({ book, large = false }: { book: Book; large?: boolean }) {
    if (book.coverImage) {
        return <img className="book-cover-img" src={book.coverImage} alt="" draggable={false} />;
    }
    return (
        <span className={`book-cover-art book-cover-art-${hash(book.title) % 3}${large ? " book-cover-art-large" : ""}`}>
            <span className="book-cover-title">{book.title}</span>
            <span className="book-cover-author">{book.author.split(/,|&/)[0].trim()}</span>
        </span>
    );
}

function Decor({ kind }: { kind: "plant" | "bookend" | "mug" }) {
    return (
        <div className={`shelf-slot shelf-decor shelf-decor-${kind}`} aria-hidden="true">
            {kind === "plant" && (
                <svg viewBox="0 0 40 56" width="40" height="56">
                    <path d="M20 30 C10 26 6 16 9 8 C16 12 20 20 20 30Z" fill="#6f8f5a" />
                    <path d="M20 30 C30 26 34 14 31 6 C24 11 20 20 20 30Z" fill="#86a86d" />
                    <path d="M20 32 C14 24 16 14 20 4 C24 14 26 24 20 32Z" fill="#5d7c4a" />
                    <path d="M10 32 H30 L27 54 H13Z" fill="#c9805b" />
                    <rect x="9" y="30" width="22" height="5" rx="1.5" fill="#b56f4c" />
                </svg>
            )}
            {kind === "bookend" && (
                <svg viewBox="0 0 30 60" width="30" height="60">
                    <path d="M4 60 V18 A11 11 0 0 1 26 18 V60Z" fill="#8a8f86" />
                    <path d="M4 60 V18 A11 11 0 0 1 15 7 V60Z" fill="#9ea398" />
                </svg>
            )}
            {kind === "mug" && (
                <svg viewBox="0 0 44 40" width="44" height="40">
                    <path d="M30 14 h4 a7 7 0 0 1 0 14 h-4" fill="none" stroke="#c7bfb1" strokeWidth="4" />
                    <path d="M6 10 H32 V34 a4 4 0 0 1 -4 4 H10 a4 4 0 0 1 -4 -4Z" fill="#e8e2d6" />
                    <path d="M14 2 q3 3 0 6 M20 1 q3 3 0 6" fill="none" stroke="#b9b1a3" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
            )}
        </div>
    );
}

function Tooltip({ book, onOpen }: { book: Book; onOpen: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    const [shift, setShift] = useState(0);

    // Nudge the bubble back inside the viewport when its book sits near the edge of the shelf.
    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const margin = 12;
        const vw = document.documentElement.clientWidth;
        if (rect.left < margin) setShift(margin - rect.left);
        else if (rect.right > vw - margin) setShift(vw - margin - rect.right);
    }, []);

    return (
        <div
            ref={ref}
            className="book-tooltip"
            style={{ "--tip-shift": `${shift}px` } as CSSProperties}
            role="tooltip"
        >
            <div className="book-tooltip-title">{book.title}</div>
            <div className="book-tooltip-author">by {book.author}</div>
            <button
                type="button"
                className="book-tooltip-link"
                onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                }}
            >
                View details →
            </button>
        </div>
    );
}

function BookDetails({ book, onClose }: { book: Book; onClose: () => void }) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [onClose]);

    return (
        <div className="book-modal-backdrop" onClick={onClose}>
            <div
                className="book-modal card"
                role="dialog"
                aria-modal="true"
                aria-label={book.title}
                onClick={(e) => e.stopPropagation()}
            >
                <button type="button" className="book-modal-close" onClick={onClose} aria-label="Close">
                    ×
                </button>
                <div className="book-modal-cover" style={bookStyle(book)}>
                    <Cover book={book} large />
                </div>
                <div className="book-modal-body">
                    <div className="h2 mb-0">{book.title}</div>
                    <div className="muted">
                        {book.author}
                        {book.year && <> · {book.year}</>}
                    </div>
                    <div className="book-modal-badges">
                        <span className={`book-status book-status-${book.status}`}>{statusLabels[book.status]}</span>
                        {book.recommended && <span className="book-status book-status-recommended">★ Recommended</span>}
                    </div>
                    <p>{book.blurb}</p>
                    {book.categories && <div className="muted book-modal-categories">{book.categories.join(" · ")}</div>}
                    {book.notes && (
                        <div className="note-content">
                            <div className="details-heading">My notes</div>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{book.notes}</ReactMarkdown>
                        </div>
                    )}
                    <div className="book-modal-links">
                        {book.relatedNote && (
                            <Link className="btn" to={`/notes/${book.relatedNote}`}>
                                Read my note
                            </Link>
                        )}
                        {book.url && (
                            <a className="btn" href={book.url} target="_blank" rel="noreferrer">
                                More info
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Bookshelf() {
    useDocumentTitle("Bookshelf");

    const [filter, setFilter] = useState<Filter>("all");
    const [active, setActive] = useState<string | null>(null);
    const [open, setOpen] = useState<Book | null>(null);
    const pointerType = useRef<string>("mouse");
    const shelfRef = useRef<HTMLDivElement>(null);

    // Tapping anywhere off the shelf dismisses the tooltip on touch devices.
    useEffect(() => {
        if (!active) return;
        const onDown = (e: PointerEvent) => {
            if (!shelfRef.current?.contains(e.target as Node)) setActive(null);
        };
        document.addEventListener("pointerdown", onDown);
        return () => document.removeEventListener("pointerdown", onDown);
    }, [active]);

    const counts = Object.fromEntries([...statusFilters, ...categoryFilters].map((f) => [f.id, books.filter((b) => matches(b, f.id)).length]));

    return (
        <div className="grid grid-sm">
            <div>
                <div className="h2">Bookshelf</div>
                <p className="muted">A curation of reads and resources — favorites, what I’m reading now, and what’s next.</p>
            </div>

            {[statusFilters, categoryFilters].map((group, gi) => (
                <div key={gi} className={`status-filter${gi === 1 ? " category-filter" : ""}`}>
                    {group.map((f) => (
                        <button
                            key={f.id}
                            type="button"
                            className={`pill pill-filter${filter === f.id ? " pill-active" : ""}`}
                            onClick={() => setFilter(f.id)}
                            aria-pressed={filter === f.id}
                        >
                            {f.label} · {counts[f.id]}
                        </button>
                    ))}
                </div>
            ))}

            <div className="shelf" ref={shelfRef}>
                {books.map((book, i) => {
                    const isActive = active === book.slug;
                    const dimmed = !matches(book, filter);
                    const face = book.face ?? "spine";
                    return (
                        <div key={book.slug} style={{ display: "contents" }}>
                            <div
                                className={`shelf-slot${isActive ? " shelf-slot-active" : ""}`}
                                onPointerEnter={(e) => e.pointerType === "mouse" && !dimmed && setActive(book.slug)}
                                onPointerLeave={(e) => e.pointerType === "mouse" && setActive((a) => (a === book.slug ? null : a))}
                            >
                                <button
                                    type="button"
                                    className={`book book-${face}${dimmed ? " book-dimmed" : ""}`}
                                    style={bookStyle(book)}
                                    aria-label={`${book.title} by ${book.author}`}
                                    tabIndex={dimmed ? -1 : 0}
                                    onPointerDown={(e) => (pointerType.current = e.pointerType)}
                                    onFocus={(e) => e.currentTarget.matches(":focus-visible") && setActive(book.slug)}
                                    onClick={() => {
                                        if (dimmed) return;
                                        // Touch: first tap pulls the book out and shows the tooltip, second tap opens it.
                                        if (pointerType.current !== "mouse" && !isActive) setActive(book.slug);
                                        else setOpen(book);
                                    }}
                                >
                                    {face === "cover" ? (
                                        <Cover book={book} />
                                    ) : (
                                        <span className="book-spine-text">{book.title}</span>
                                    )}
                                    {book.recommended && <span className="book-ribbon" aria-hidden="true" />}
                                </button>
                                {isActive && <Tooltip book={book} onOpen={() => setOpen(book)} />}
                            </div>
                            {decorAfter[i] && <Decor kind={decorAfter[i]} />}
                        </div>
                    );
                })}
            </div>

            <p className="muted shelf-legend">
                <span className="book-ribbon book-ribbon-legend" aria-hidden="true" /> Ribbon = recommended. Tap or hover a book for details.
            </p>

            {open && <BookDetails book={open} onClose={() => setOpen(null)} />}
        </div>
    );
}
