import ContactCard from "../components/ContactCard";

export default function Contact() {
    return (
        <div className="grid" style={{ gap: 18 }}>
            <div className="card">
                <div className="h2">Contact</div>
                <p className="muted" style={{ marginBottom: 0 }}>
                    Happy to connect about fullstack roles, architecture, and delivery.
                </p>
            </div>

            <ContactCard />
        </div>
    );
}
