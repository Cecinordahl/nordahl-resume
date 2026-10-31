import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
    return (
        <>
            <ScrollToTop />
            <NavBar />
            <main className="container">
                <Suspense fallback={<p className="muted">Loading…</p>}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
}
