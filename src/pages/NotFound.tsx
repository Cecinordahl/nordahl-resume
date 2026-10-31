import { Link } from "react-router-dom";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import PageHeader from "../components/PageHeader";

export default function NotFound() {
    useDocumentTitle("Page not found");

    return (
        <div className="page">
            <PageHeader label="404" title="Page not found">
                <p>That page doesn’t exist.</p>
            </PageHeader>
            <div>
                <Link className="btn" to="/">Back home</Link>
            </div>
        </div>
    );
}
