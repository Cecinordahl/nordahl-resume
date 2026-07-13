import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
    return (
        <>
            <NavBar />
            <main className="container">
                <Suspense fallback={<p className="muted">Loading…</p>}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
}
