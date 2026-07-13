import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const WorkIndex = lazy(() => import("./pages/WorkIndex"));
const WorkDetail = lazy(() => import("./pages/WorkDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const NotesIndex = lazy(() => import("./pages/NotesIndex"));
const NoteDetail = lazy(() => import("./pages/NoteDetail"));
const Education = lazy(() => import("./pages/Education"));
const Certifications = lazy(() => import("./pages/Certifications"));

export default function App() {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/work" element={<WorkIndex />} />
                    <Route path="/work/:slug" element={<WorkDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/notes" element={<NotesIndex />} />
                    <Route path="/notes/:slug" element={<NoteDetail />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/certifications" element={<Certifications />} />
                </Route>
            </Routes>
            <Analytics />
        </>
    );
}
