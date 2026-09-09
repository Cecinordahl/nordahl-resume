import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { workExperience } from "../content/experience";
import { useDocumentTitle } from "../lib/useDocumentTitle";

const logos = "/images/logos";

// Summer & seasonal jobs (2009–2018) runs alongside and beyond the other stops, so it's kept
// separate from the main sequence: on desktop and in the mobile steps strip it floats above
// "Golf Scholar & Student" to show it starts earlier and ends later.
const summerJobs = {
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

// Approximate brand colors, eyeballed from each employer's logo.
const brandColor = {
    rsu: "#b3352a",
    sas: "#4169e1",
    vinmonopolet: "#7eb3a3",
    accenture: "#a100ff",
};

// slug links each stop to its detailed writeup on /work/:slug — Golf Scholar & Student has
// none (it's education, not a workExperience entry), so it stays plain, unlinked text.
const mainTimeline: { role: string; org: string; dateRange: string; startYear: string; icon: ReactNode; slug?: string }[] = [
    {
        role: "Golf Scholar & Student",
        org: "Rogers State University",
        dateRange: "2011 – 2015",
        startYear: "2011",
        icon: <img src={`${logos}/rsu-hillcats.png`} alt="Rogers State University Hillcats logo" className="timeline-logo" />,
    },
    {
        role: "Cabin Crew",
        org: "Scandinavian Airlines",
        dateRange: "May 2016 – Jul 2020",
        startYear: "2016",
        icon: <img src={`${logos}/sas.png`} alt="SAS logo" className="timeline-logo" />,
        slug: "sas",
    },
    {
        role: "Wine Advisor",
        org: "Vinmonopolet",
        dateRange: "Aug 2020 – Dec 2021",
        startYear: "2020",
        icon: <img src={`${logos}/vinmonopolet.png`} alt="Vinmonopolet logo" className="timeline-logo" />,
        slug: "vinmonopolet",
    },
    {
        role: "Fullstack Developer",
        org: "Accenture",
        dateRange: "Nov 2021 – Present",
        startYear: "2021",
        icon: <img src={`${logos}/accenture.png`} alt="Accenture logo" className="timeline-logo" />,
        slug: "accenture",
    },
];

// Oldest → newest, for the quicklinks row under the page title.
const quicklinks = mainTimeline.filter((t): t is typeof mainTimeline[number] & { slug: string } => !!t.slug);

// Each segment is colored by whichever employer was active during that span — e.g. the RSU-red
// segment runs 2011–2016 because that's when "Golf Scholar & Student" was ongoing.
const desktopSegments = [
    { left: 12.5, right: 62.5, color: brandColor.rsu }, // 2011–2016
    { left: 37.5, right: 37.5, color: brandColor.sas }, // 2016–2020
    { left: 62.5, right: 12.5, color: brandColor.vinmonopolet }, // 2020–2021
    { left: 87.5, right: 0, color: brandColor.accenture }, // 2021–present
];

// The mobile spine is a 5-column grid, giving 6 evenly-spaced grid lines: 2009, 2011, 2016,
// 2018, 2020, 2021. Summer jobs spans line 1 to line 4 (2009–2018); each mainTimeline item
// below is right-aligned (+ shifted back 50% of its own width) to sit exactly on its own line.
const spineLowerColumns = [1, 2, 4, 5]; // → lines 2 (2011), 3 (2016), 5 (2020), 6 (2021)

// Same idea as desktopSegments, mapped onto the spine's 6-point (0/20/40/60/80/100%) scale.
// Cabin Crew (2016–2020) covers two spine ticks (2016 and 2018), so its blue spans both.
const spineSegments = [
    { left: 20, right: 60, color: brandColor.rsu }, // 2011–2016
    { left: 40, right: 20, color: brandColor.sas }, // 2016–2020 (via the 2018 tick)
    { left: 80, right: 0, color: brandColor.vinmonopolet }, // 2020–2021
];

export default function WorkIndex() {
    useDocumentTitle("Work");

    return (
        <div>
            <div className="h2">Work experience</div>

            <div className="quicklinks">
                {quicklinks.map((t) => (
                    <Link key={t.slug} to={`/work/${t.slug}`} className="quicklink">
                        {t.icon}
                        <span>{t.org}</span>
                    </Link>
                ))}
            </div>

            <p className="muted">
                I've got a fairly varied background — flight attendant, then wine advisor, now developer.
                Before that I spent a lot of summers at Bergen Golf Club and a lot of Christmases at
                Iversen & Co, so I've picked up bits of domain knowledge from quite a few different corners.
            </p>
            <br/>

            {/* Desktop: floating top line for summer jobs, spanning before/after the main sequence */}
            <div className="timeline timeline-desktop">
                <div className="timeline-overlap-bar">
                    <div className="timeline-content">
                        <div className="timeline-logo-row">{summerJobs.icon}</div>
                        <div className="timeline-role">{summerJobs.role}</div>
                        <div className="muted timeline-org">{summerJobs.org}</div>
                        <div className="muted timeline-date">{summerJobs.dateRange}</div>
                    </div>
                    <div className="timeline-overlap-track" />
                </div>

                <div className="timeline-employer-line">
                    {desktopSegments.map((s) => (
                        <span
                            key={s.color}
                            className="timeline-line-segment"
                            style={{ left: `${s.left}%`, right: `${s.right}%`, background: s.color }}
                        />
                    ))}
                </div>

                {mainTimeline.map((t, i) => {
                    const ContentTag = t.slug ? Link : "div";
                    return (
                        <div className="timeline-item" style={{ gridColumn: i + 1 }} key={t.role}>
                            <div className="timeline-marker" />
                            <ContentTag className="timeline-content" to={t.slug ? `/work/${t.slug}` : undefined}>
                                <div className="timeline-logo-row">{t.icon}</div>
                                <div className="timeline-role">{t.role}</div>
                                <div className="muted">{t.org}</div>
                                <div className="muted timeline-date">{t.dateRange}</div>
                            </ContentTag>
                        </div>
                    );
                })}
            </div>

            {/* Mobile: a shared middle "spine" line is the reference axis for years. The
                Summer & seasonal jobs bar sits above it, connected to the spine by two stems
                at its start/end years; the main sequence sits below, each connected up to the
                spine by a stem at its start year. All positions share one 6-point year scale:
                2009 · 2011 · 2016 · 2018 · 2020 · 2021 (evenly spaced, at grid lines 0–5). */}
            <div className="timeline-spine">
                <div className="timeline-spine-bar">
                    <div className="timeline-gantt-logos">{summerJobs.icon}</div>
                    <div className="timeline-gantt-label">{summerJobs.role}</div>
                    <div className="timeline-gantt-track">
                        <span className="timeline-gantt-diamond timeline-gantt-diamond--start" />
                        <span className="timeline-gantt-diamond timeline-gantt-diamond--end" />
                        <span className="timeline-gantt-stem timeline-gantt-stem--start" />
                        <span className="timeline-gantt-stem timeline-gantt-stem--end" />
                    </div>
                </div>

                <div className="timeline-spine-line">
                    {spineSegments.map((s) => (
                        <span
                            key={s.color}
                            className="timeline-line-segment"
                            style={{ left: `${s.left}%`, right: `${s.right}%`, background: s.color }}
                        />
                    ))}
                </div>

                {mainTimeline.map((t, i) => {
                    const SpineItemTag = t.slug ? Link : "div";
                    return (
                        <SpineItemTag
                            className="timeline-spine-item"
                            style={{ gridColumn: spineLowerColumns[i] }}
                            to={t.slug ? `/work/${t.slug}` : undefined}
                            key={t.role}
                        >
                            <div className="timeline-steps-icon">{t.icon}</div>
                            <div className="timeline-step-year">{t.startYear}</div>
                            <div className="timeline-step-title">{t.role}</div>
                        </SpineItemTag>
                    );
                })}
            </div>

            <br/>
            <p className="muted">
                I won't claim it makes me a better developer than anyone else, but I do think it helps.
                Coming from other fields, I often end up approaching a problem from a slightly odd angle,
                and I'm comfortable talking to people who don't write code — bridging the gap between the
                technical team and everyone else. Having learned a completely new discipline from scratch a
                couple of times also makes it less daunting to pick up a new language or framework; you get
                used to being a beginner. Mostly I think it just gives me a broader sense of who's actually
                on the other end of the software.
            </p>

            <br/>
            <p className="muted">Click a workplace to open details.</p>

            <div className="grid grid-sm">
                {workExperience.map((w) => (
                    <Link key={w.slug} to={`/work/${w.slug}`} className="card">
                        <div className="row-between">
                            <div>
                                <div className="title">{w.company}</div>
                                <div className="muted">{w.rolePublic}{w.roleOfficial ? ` · ${w.roleOfficial}` : ""}</div>
                            </div>
                            <div className="muted">{w.location} · {w.dateRange}</div>
                        </div>
                        <p className="muted mb-0">{w.summary}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
