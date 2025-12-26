import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import WorkIndex from "./pages/WorkIndex";
import WorkDetail from "./pages/WorkDetail";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import NotesIndex from "./pages/NotesIndex";
import NoteDetail from "./pages/NoteDetail";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<WorkIndex />} />
                <Route path="/work/:slug" element={<WorkDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/notes" element={<NotesIndex />} />
                <Route path="/notes/:slug" element={<NoteDetail />} />

            </Route>
        </Routes>
    );
}
