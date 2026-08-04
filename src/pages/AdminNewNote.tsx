import { useState } from "react";
import { useDocumentTitle } from "../lib/useDocumentTitle";

type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success"; slug: string } | { kind: "error"; message: string };

export default function AdminNewNote() {
    useDocumentTitle("New note");

    const [passcode, setPasscode] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [body, setBody] = useState("");
    const [draft, setDraft] = useState(false);
    const [status, setStatus] = useState<Status>({ kind: "idle" });

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus({ kind: "submitting" });

        try {
            const res = await fetch("/api/create-note", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    passcode,
                    title,
                    tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
                    body,
                    draft,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus({ kind: "error", message: data.error ?? "Something went wrong." });
                return;
            }

            setStatus({ kind: "success", slug: data.slug });
            setTitle("");
            setTags("");
            setBody("");
            setDraft(false);
        } catch {
            setStatus({ kind: "error", message: "Network error — couldn't reach the server." });
        }
    }

    return (
        <div className="grid grid-sm">
            <div>
                <div className="h2">New note</div>
                <p className="muted">Publishes directly to the site by committing a markdown file to GitHub. Live in about a minute.</p>
            </div>

            <form className="card" onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
                <label className="field">
                    <span className="field-label">Passcode</span>
                    <input
                        type="password"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        autoComplete="off"
                        required
                    />
                </label>

                <label className="field">
                    <span className="field-label">Title</span>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>

                <label className="field">
                    <span className="field-label">Tags (comma-separated)</span>
                    <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Git, CLI, Productivity" />
                </label>

                <label className="field">
                    <span className="field-label">Body (Markdown)</span>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={16} required />
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" checked={draft} onChange={(e) => setDraft(e.target.checked)} />
                    <span className="muted">Save as draft (hidden from the notes list until you flip this off)</span>
                </label>

                <button type="submit" className="btn" disabled={status.kind === "submitting"} style={{ justifySelf: "start" }}>
                    {status.kind === "submitting" ? "Publishing…" : "Publish note"}
                </button>

                {status.kind === "success" && (
                    <p className="muted">
                        Published. It'll appear at <code>/notes/{status.slug}</code> once Vercel finishes redeploying (~1 min).
                    </p>
                )}
                {status.kind === "error" && <p style={{ color: "var(--status-inprogress-fg)" }}>{status.message}</p>}
            </form>
        </div>
    );
}
