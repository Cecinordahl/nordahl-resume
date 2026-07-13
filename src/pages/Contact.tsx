import ContactCard from "../components/ContactCard";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function Contact() {
    useDocumentTitle("Contact");

    return (
        <div className="grid">
            <div className="card">
                <div className="h2">Contact</div>
                <p className="muted mb-0">
                    Happy to connect!
                </p>
            </div>

            <ContactCard />
        </div>
    );
}
