export default function ContactCard() {
    return (
        <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Contact</div>

            <div className="muted" style={{ display: "grid", gap: 6 }}>
                <a href="mailto:cecilie.nordahl@gmail.com">cecilie.nordahl@gmail.com</a>

                <a
                    href="https://www.linkedin.com/in/cecilie-nordahl-72869171/"
                    target="_blank"
                    rel="noreferrer"
                >
                    LinkedIn
                </a>

                <a
                    href="https://github.com/Cecinordahl"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>

                <a className="btn" href="/assets/Cecilie-Nordahl-Resume.pdf" download style={{ marginTop: 10 }}>
                    Download PDF resume
                </a>
            </div>
        </div>
    );
}
