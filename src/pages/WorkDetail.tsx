import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { getWorkBySlug } from "../content/experience";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import { ExternalLinkIcon } from "../components/icons";

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

// Bullets are plain content strings, but occasionally need a single inline link
// (e.g. a certification). Supports basic `[label](url)` syntax rather than
// pulling in a full markdown renderer for one link per bullet.
function renderBulletText(text: string): ReactNode {
    const parts: ReactNode[] = [];
    let lastIndex = 0;

    for (const match of text.matchAll(MARKDOWN_LINK)) {
        const [full, label, url] = match;
        const index = match.index ?? 0;
        if (index > lastIndex) parts.push(text.slice(lastIndex, index));
        parts.push(
            <a key={index} href={url} target="_blank" rel="noreferrer">
                {label}
            </a>,
        );
        lastIndex = index + full.length;
    }
    if (lastIndex < text.length) parts.push(text.slice(lastIndex));

    return parts;
}

function SourceLink({ url, label }: { url: string; label?: string }) {
    return (
        <a
            className="btn"
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10 }}
        >
            {label ?? "Read more"} <ExternalLinkIcon />
        </a>
    );
}

export default function WorkDetail() {
    const { slug } = useParams();
    const work = slug ? getWorkBySlug(slug) : undefined;

    useDocumentTitle(work ? work.company : "Work");

    if (!work) {
        return (
            <div>
                <h2>Not found</h2>
                <p>This workplace page doesn’t exist.</p>
                <Link to="/work">Back to work</Link>
            </div>
        );
    }

    return (
        <div>
            <Link to="/work">← Back</Link>

            <h2 style={{ marginBottom: 4 }}>{work.company}</h2>
            <div style={{ marginBottom: 12 }}>
                <div>
                    {work.rolePublic}
                    {work.roleOfficial ? ` · ${work.roleOfficial}` : ""}
                </div>
                <div>
                    {work.location} · {work.dateRange}
                </div>
            </div>

            <p>{work.summary}</p>

            <h3>Project: {work.project.name}</h3>
            <p>{work.project.description}</p>

            <h4>Impact</h4>
            <ul>
                {work.impactBullets.map((b, i) => (
                    <li key={i}>{renderBulletText(b)}</li>
                ))}
            </ul>

            {work.project.phases
                ? work.project.phases.map((phase) => (
                      <div key={phase.name}>
                          <h4>
                              {phase.name} · {phase.dateRange}
                          </h4>
                          <p>{phase.description}</p>
                          {phase.bullets && phase.bullets.length > 0 && (
                              <ul>
                                  {phase.bullets.map((b, i) => (
                                      <li key={i}>{renderBulletText(b)}</li>
                                  ))}
                              </ul>
                          )}
                          {phase.sourceUrl && <SourceLink url={phase.sourceUrl} label={phase.sourceLabel} />}
                      </div>
                  ))
                : work.project.bullets && (
                      <ul>
                          {work.project.bullets.map((b, i) => (
                              <li key={i}>{renderBulletText(b)}</li>
                          ))}
                      </ul>
                  )}

            <h4>{work.project.techLabel ?? "Tech"}</h4>
            <ul>
                {work.project.tech.map((t) => (
                    <li key={t}>{t}</li>
                ))}
            </ul>

            {work.project.sourceUrl && <SourceLink url={work.project.sourceUrl} label={work.project.sourceLabel} />}
        </div>
    );
}
