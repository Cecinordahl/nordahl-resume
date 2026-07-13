import { useDocumentTitle } from "../lib/useDocumentTitle";

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

                        Read more about the project{" "}
                        <a
                            href="https://www.konsulentguiden.no/konsulentprisen/norges-storste-digitale-transformasjon-klps-endringsprogram-setter-ny-standard-for-offentlig-pensjon/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            here
                        </a>.
                    </p>


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

                    {/* <div className="h2">Code is like humor- when you have to explain it, it's bad.</div> */}


                    <div style={{ marginTop: 12 }}>
                        <span className="pill">Java</span>
                        <span className="pill">Kotlin</span>
                        <span className="pill">C#</span>
                        <span className="pill">python</span>
                        <span className="pill">Spring</span>
                        <span className="pill">React</span>
                        <span className="pill">TypeScript</span>
                        <span className="pill">JavaScript</span>
                        <span className="pill">SQL</span>
                        <span className="pill">Camunda</span>
                        <span className="pill">Kafka</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
