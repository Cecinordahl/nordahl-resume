import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import WorkIndex from "./pages/WorkIndex";
import WorkDetail from "./pages/WorkDetail";
import Contact from "./pages/Contact";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<WorkIndex />} />
                <Route path="/work/:slug" element={<WorkDetail />} />
                <Route path="/contact" element={<Contact />} />
            </Route>
        </Routes>
    );
}
