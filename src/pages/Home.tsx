import { useDocumentTitle } from "../lib/useDocumentTitle";
import { ExternalLinkIcon } from "../components/icons";

export default function Home() {
    useDocumentTitle("Home");

    return (
        <div className="grid grid-lg">
            {/* Hero */}
            <section className="card" style={{ padding: 26 }}>
                <div className="kicker">Senior Fullstack Developer</div>
                <h1 className="h1">Cecilie Nordahl</h1>


                <p className="muted" style={{ maxWidth: 760, margin: "18px auto 0", textAlign: "center" }}>
                    I build software that makes sense- to users, stakeholders, and the teams that maintain it.
                    I care as much about understanding the problem as I do about writing the solution.
                </p>


            </section>

            {/* Image + About (editorial blocks) */}
            <section className="grid grid2">
                <div className="media">
                    <img src="/images/portrait.jpg" alt="Portrait of Cecilie Nordahl" />
                </div>

                <div className="card">
                    <div className="kicker" style={{ textAlign: "left" }}>About</div>

                    <p className="muted">
                        Tech lead and full-stack developer at Accenture, with a strong background in designing and delivering large-scale solutions.
                        I recently contributed to one of the largest tech transformations in Northern Europe for KLP — a project that was awarded
                        Konsulentprisen: Årets store oppdrag.
                    </p>

                    <a
                        className="btn"
                        href="https://www.konsulentguiden.no/konsulentprisen/norges-storste-digitale-transformasjon-klps-endringsprogram-setter-ny-standard-for-offentlig-pensjon/"
                        target="_blank"
                        rel="noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                    >
                        Read more about the project <ExternalLinkIcon />
                    </a>


                    <p className="muted">
                        I work across front- and back-end, defect analysis, and solution design, and as a team lead I’ve been closely involved in technical direction and collaboration.
                        My experience includes languages like Java, Kotlin, Python, and C# and technologies like Kafka and Camunda.
                    </p>

                    <p className="muted">
                        I care about writing clean, maintainable code- but I believe great software starts with understanding the domain.
                        Developers who invest time in learning the business and context behind a system communicate better with product owners and build solutions that actually fit the problem.
                    </p>

                    <p className="muted">
                        Always open to sharing ideas, learning from others, and improving how we build things.
                    </p>

                    <div className="h2">Code is like humor- when you have to explain it, it's bad.</div>


                    <div className="kicker" style={{ textAlign: "left", marginTop: 12 }}>Tech stack</div>
                    <div style={{ marginTop: 12 }}>
                        <span className="pill">Java</span>
                        <span className="pill">Kotlin</span>
                        <span className="pill">C#</span>
                        <span className="pill">Python</span>
                        <span className="pill">Spring</span>
                        <span className="pill">React</span>
                        <span className="pill">TypeScript</span>
                        <span className="pill">JavaScript</span>
                        <span className="pill">SQL</span>
                        <span className="pill">Camunda</span>
                        <span className="pill">Kafka</span>
                        <span className="pill">Docker</span>
                        <span className="pill">Azure</span>
                        <span className="pill">Firebase</span>
                        <span className="pill">Tailwind CSS</span>
                    </div>
                </div>
            </section>

            {/* Journey */}
            <section className="card">
                <div className="kicker" style={{ textAlign: "left" }}>How I got here</div>

                <p className="muted">
                    I played competitive golf from a young age, all the way through a golf scholarship at Rogers State
                    University in Oklahoma, where I earned a Bachelor of Technology in Applied Technology while playing
                    at the collegiate level.
                </p>

                <p className="muted">
                    The plan after that was straightforward: work in Norway for a year, then head back to the US for a
                    master's degree. Instead, I took a job as a flight attendant and fell in love with it — one year
                    turned into four, spent flying for SAS. When SAS restructured after COVID hit, I took a severance
                    package. I'd already lined up a few informatics courses on the side for that fall, so I started
                    working part-time at Vinmonopolet while studying at the University of Oslo.
                </p>

                <p className="muted">
                    About a year later I applied to Academic Work Academy's 12-week Java program, completed it, and
                    started my career at Accenture. I kept studying alongside full-time work, genuinely enjoying it, and
                    at one point naively enrolled in a full software engineering bachelor's degree at OsloMet on top of
                    it. The coursework went smoothly since I already knew most of the material, but after realizing I
                    already had three years of real software engineering experience on my résumé, I decided finishing
                    that second degree wasn't worth prioritizing anymore.
                </p>

                <p className="muted">
                    It's now nearing five years as a fullstack developer, and I enjoy it more every year. What I love
                    most is that I never stop learning — there's always something new to get better at, whether that's
                    frontend, a new tool, a different architecture, or just understanding the domain a little more
                    deeply.
                </p>

                <div className="h2">Golf taught me patience with a long game; this career just gave me a longer one to play.</div>
            </section>
        </div>
    );
}
