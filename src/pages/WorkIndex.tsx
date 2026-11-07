import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { workExperience } from "../content/experience";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import PageHeader from "../components/PageHeader";
import RoleList from "../components/RoleList";

const logos = "/images/logos";

// Approximate brand colors, eyeballed from each employer's logo.
const brandColor = {
    rsu: "#b3352a",
    sas: "#4169e1",
    vinmonopolet: "#7eb3a3",
    accenture: "#a100ff",
};

type Stop = { role: string; org: string; dateRange: string; startYear: string; color: string; icon: ReactNode; slug?: string };

// Newest first. Each stop's colored line runs from the stop above it down to its own start
// year (the dot). slug links to the writeup on /work/:slug; Golf Scholar & Student is
// education, not a workExperience entry, so it has none.
const mainTimeline: Stop[] = [
    {
        role: "Fullstack Developer",
        org: "Accenture",
        dateRange: "Nov 2021 – Present",
        startYear: "2021",
        color: brandColor.accenture,
        icon: <img src={`${logos}/accenture.png`} alt="Accenture logo" className="timeline-logo" />,
        slug: "accenture",
    },
    {
        role: "Wine Advisor",
        org: "Vinmonopolet",
        dateRange: "Aug 2020 – Dec 2021",
        startYear: "2020",
        color: brandColor.vinmonopolet,
        icon: <img src={`${logos}/vinmonopolet.png`} alt="Vinmonopolet logo" className="timeline-logo" />,
        slug: "vinmonopolet",
    },
    {
        role: "Cabin Crew",
        org: "Scandinavian Airlines",
        dateRange: "May 2016 – Jul 2020",
        startYear: "2016",
        color: brandColor.sas,
        icon: <img src={`${logos}/sas.png`} alt="SAS logo" className="timeline-logo" />,
        slug: "sas",
    },
    {
        role: "Golf Scholar & Student",
        org: "Rogers State University",
        dateRange: "2011 – 2015",
        startYear: "2011",
        color: brandColor.rsu,
        icon: <img src={`${logos}/rsu-hillcats.png`} alt="Rogers State University Hillcats logo" className="timeline-logo" />,
    },
];

// Seasonal jobs (2009–2018) ran alongside the main sequence, so they get a thin side line of
// their own. It starts level with the 2016 dot, so it doesn't run into the SAS row, and
// continues past RSU to 2009.
const seasonalJobs = {
    role: "Seasonal jobs",
    org: "Bergen Golf Club · Iversen & Co",
    dateRange: "2009 – 2018",
    startYear: "2009",
    icon: (
        <>
            <img src={`${logos}/bergen-golfklubb.png`} alt="Bergen Golfklubb logo" className="timeline-logo" />
            <img src={`${logos}/protid.png`} alt="Protid logo" className="timeline-logo" />
        </>
    ),
};
// Which side-line piece each main row draws: none, starting mid-row, or the full row.
const sideLine: Record<string, "start" | undefined> = { "Golf Scholar & Student": "start" };

function StopContent({ icon, role, org, dateRange }: { icon: ReactNode; role: string; org: string; dateRange: string }) {
    return (
        <>
            <div className="timeline-logo-row">{icon}</div>
            <div className="timeline-role">{role}</div>
            <div className="muted">{org}</div>
            <div className="muted timeline-date">{dateRange}</div>
        </>
    );
}

export default function WorkIndex() {
    useDocumentTitle("Work");
    const currentYear = new Date().getFullYear();

    return (
        <div className="page">
            <PageHeader label="01 — Work" title="Work experience">
                <p>
                    I've got a fairly varied background — flight attendant, then wine advisor, now developer.
                    Before that I spent a lot of summers at Bergen Golf Club and a lot of Christmases at
                    Iversen & Co, so I've picked up bits of domain knowledge from quite a few different corners.
                </p>
            </PageHeader>

            {/* Phones: timeline above the text. Desktop: timeline on the left (sticky), text on the right. */}
            <div className="work-layout">
                <ol className="vtimeline" aria-label="Timeline">
                    <li className="vt-row vt-now" style={{ "--c": brandColor.accenture } as CSSProperties}>
                        <span className="vt-year"><strong>Now</strong> {currentYear}</span>
                        <span className="vt-main" />
                    </li>

                    {mainTimeline.map((t) => {
                        const side = sideLine[t.slug ?? t.role];
                        const content = <StopContent {...t} />;
                        return (
                            <li className="vt-row" style={{ "--c": t.color } as CSSProperties} key={t.role}>
                                <span className="vt-year">{t.startYear}</span>
                                <span className="vt-main" />
                                <span className={side ? `vt-side vt-side--${side}` : "vt-side"} />
                                {t.slug ? (
                                    <Link className="vt-content" to={`/work/${t.slug}`}>{content}</Link>
                                ) : (
                                    <div className="vt-content">{content}</div>
                                )}
                            </li>
                        );
                    })}

                    <li className="vt-row vt-row--side-only">
                        <span className="vt-year">{seasonalJobs.startYear}</span>
                        <span className="vt-main" />
                        <span className="vt-side vt-side--end" />
                        <div className="vt-content"><StopContent {...seasonalJobs} /></div>
                    </li>
                </ol>

                <div className="work-text">
                    <div className="page-section">
                        <p>
                            I won't claim it makes me a better developer than anyone else, but I do think it helps.
                            Coming from other fields, I often end up approaching a problem from a slightly odd angle,
                            and I'm comfortable talking to people who don't write code — bridging the gap between the
                            technical team and everyone else. Having learned a completely new discipline from scratch a
                            couple of times also makes it less daunting to pick up a new language or framework; you get
                            used to being a beginner. Mostly I think it just gives me a broader sense of who's actually
                            on the other end of the software.
                        </p>
                    </div>

                    <div className="page-section">
                        <div className="section-label">Workplaces — click for details</div>
                        <div className="entries">
                            {workExperience.map((w) => (
                                <Link key={w.slug} to={`/work/${w.slug}`} className="card">
                                    <div className="row-between" style={{ alignItems: "baseline" }}>
                                        <div className="title">{w.company}</div>
                                        <div className="entry-meta">{w.location} · {w.dateRange}</div>
                                    </div>
                                    <div className="entry-meta"><RoleList roles={w.roles} /></div>
                                    <p className="entry-body">{w.summary}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
