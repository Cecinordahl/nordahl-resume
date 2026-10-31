import type { ReactNode } from "react";

type PageHeaderProps = {
    /** Small mono label above the title, e.g. "01 — Work". */
    label: string;
    title: string;
    /** "md" for long titles on detail pages (notes, workplaces). */
    size?: "lg" | "md";
    /** Optional controls shown at the right of the label row (e.g. an RSS button). */
    actions?: ReactNode;
    /** Intro text under the title. */
    children?: ReactNode;
};

/** Editorial page header shared by the inner pages: label row, large serif title, intro, rule. */
export default function PageHeader({ label, title, size = "lg", actions, children }: PageHeaderProps) {
    return (
        <header className="page-header">
            <div className="page-header-top">
                <span className="page-label">{label}</span>
                {actions && <div className="page-actions">{actions}</div>}
            </div>
            <h1 className={`page-title${size === "md" ? " page-title-md" : ""}`}>{title}</h1>
            {children && <div className="page-intro">{children}</div>}
        </header>
    );
}
