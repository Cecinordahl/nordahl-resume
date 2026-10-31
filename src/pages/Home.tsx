import { useDocumentTitle } from "../lib/useDocumentTitle";
import { ExternalLinkIcon } from "../components/icons";

export default function Home() {
    useDocumentTitle("Home");

    return (
        <div className="home">
            {/* Masthead: one large name, with a small label row in the gap beneath it */}
            <header className="home-masthead">
                <h1 className="home-title">Cecilie Nordahl</h1>

                <div className="home-meta">
                    {/* Phones get a shorter 3-line version. There, each .home-meta-line becomes its own line,
                        nudged individually so the labels follow the outline of the head. */}
                    <span>
                        <span className="home-meta-long">Tech lead, architect, and fullstack developer</span>
                        <span className="home-meta-short">
                            <span className="home-meta-line">Tech lead</span>
                            <span className="home-meta-line">Architect</span>
                            <span className="home-meta-line">Fullstack dev</span>
                        </span>
                    </span>
                    <span className="home-meta-right">
                        <span className="home-meta-line">Experience</span>{" "}
                        <span className="home-meta-line">since 2021</span>
                    </span>
                </div>
            </header>

            {/* Full-width colour band; the background-free portrait rises out of it into the title */}
            <figure className="home-band">
                <img className="home-cutout" src="/images/portrait-cutout.webp" alt="Portrait of Cecilie Nordahl" />
            </figure>

            {/* About */}
            <section className="home-section">
                <div className="home-label">About</div>
                <h2 className="home-heading">
                    I build software that makes sense — to users, stakeholders, and the teams that maintain it.
                </h2>

                <p>
                    Tech lead and full-stack developer at Accenture, with a strong background in designing and
                    delivering large-scale solutions. I recently contributed to one of the largest tech
                    transformations in Northern Europe for KLP — a project that was awarded Konsulentprisen: Årets
                    store oppdrag.{" "}
                    <a
                        className="home-link"
                        href="https://www.konsulentguiden.no/konsulentprisen/norges-storste-digitale-transformasjon-klps-endringsprogram-setter-ny-standard-for-offentlig-pensjon/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Read about the project <ExternalLinkIcon />
                    </a>
                </p>
                <p>
                    I work across front- and back-end, defect analysis, and solution design, and as a team lead I’ve
                    been closely involved in technical direction and collaboration. My experience includes languages
                    like Java, Kotlin, Python, and C# and technologies like Spring, React, Kafka and Camunda.
                </p>
                <p>
                    I care about writing clean, maintainable code — but I believe great software starts with
                    understanding the domain. Developers who invest time in learning the business and context behind a
                    system communicate better with product owners and build solutions that actually fit the problem.
                </p>
                <p>Always open to sharing ideas, learning from others, and improving how we build things.</p>
            </section>

            {/* Journey */}
            <section className="home-section">
                <div className="home-label">How I got here</div>
                <h2 className="home-heading">
                    Golf taught me patience with a long game; this career just gave me a longer one to play.
                </h2>

                <p>
                    I played competitive golf from a young age, all the way through a golf scholarship at Rogers State
                    University in Oklahoma, where I earned a Bachelor of Technology in Applied Technology while playing
                    at the collegiate level.
                </p>
                <p>
                    The plan after that was straightforward: work in Norway for a year, then head back to the US for a
                    master's degree. Instead, I took a job as a flight attendant and fell in love with it — one year
                    turned into four, spent flying for SAS. When SAS restructured after COVID hit, I took a severance
                    package. I'd already lined up a few informatics courses on the side for that fall, so I started
                    working part-time at Vinmonopolet while studying at the University of Oslo.
                </p>
                <p>
                    About a year later I applied to Academic Work Academy's 12-week Java program, completed it, and
                    started my career at Accenture. I kept studying alongside full-time work, genuinely enjoying it, and
                    at one point naively enrolled in a full software engineering bachelor's degree at OsloMet on top of
                    it. The coursework went smoothly since I already knew most of the material, but after realizing I
                    already had three years of real software engineering experience on my résumé, I decided finishing
                    that second degree wasn't worth prioritizing anymore.
                </p>
                <p>
                    It's now nearing five years as a fullstack developer, and I enjoy it more every year. What I love
                    most is that I never stop learning — there's always something new to get better at, whether that's
                    frontend, a new tool, a different architecture, or just understanding the domain a little more
                    deeply.
                </p>
            </section>
        </div>
    );
}
