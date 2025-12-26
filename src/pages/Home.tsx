import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="grid" style={{ gap: 22 }}>
            <div className="card">
                <h1 className="h1">Cecilie Nordahl</h1>
                <div className="muted" style={{ fontSize: 18 }}>
                    Senior Fullstack Developer · <span title="Official title">Custom Software Engineering Associate Manager</span>
                </div>

                <p style={{ marginTop: 14, maxWidth: 760 }}>
                    I build reliable backend services and minimal, high-quality UIs—often at scale.
                    I enjoy clean architecture, pragmatic delivery, and calm execution in complex environments.
                </p>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                    <Link className="btn" to="/work">View work</Link>
                    <Link className="btn" to="/contact">Contact</Link>
                    <a className="btn" href="/assets/Cecilie-Nordahl-Resume.pdf" download>
                        Download PDF
                    </a>
                </div>

                <div style={{ marginTop: 14 }}>
                    <span className="pill">Java / Spring</span>
                    <span className="pill">React / TypeScript</span>
                    <span className="pill">Camunda</span>
                    <span className="pill">Kafka</span>
                    <span className="pill">Solution design</span>
                </div>
            </div>

            <div className="grid grid2">
                <div className="card">
                    <div className="h2">Selected work</div>
                    <p className="muted">
                        Three roles with one detailed project per workplace.
                    </p>
                    <Link className="btn" to="/work">Go to work</Link>
                </div>

                <div className="card">
                    <div className="h2">Contact</div>
                    <p className="muted" style={{ marginBottom: 10 }}>
                        Email, LinkedIn, and GitHub.
                    </p>
                    <Link className="btn" to="/contact">Contact page</Link>
                </div>
            </div>
        </div>
    );
}
