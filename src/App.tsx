import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WorkIndex from "./pages/WorkIndex";
import WorkDetail from "./pages/WorkDetail";
import Contact from "./pages/Contact";

export default function App() {
    return (
        <div style={{ padding: 32 }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
                <Link to="/">Home</Link>
                <Link to="/work">Work</Link>
                <Link to="/contact">Contact</Link>
            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<WorkIndex />} />
                <Route path="/work/:slug" element={<WorkDetail />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    );
}
