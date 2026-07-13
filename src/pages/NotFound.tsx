import { Link } from "react-router-dom";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function NotFound() {
    useDocumentTitle("Page not found");

    return (
        <div className="card">
            <div className="title">Page not found</div>
            <p className="muted">That page doesn’t exist.</p>
            <Link className="btn" to="/">Back home</Link>
        </div>
    );
}
