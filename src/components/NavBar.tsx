import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { CloseIcon, MenuIcon } from "./icons";

const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/work", label: "Work" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/notes", label: "Notes" },
    { to: "/education", label: "Education" },
    { to: "/certifications", label: "Certifications" },
    { to: "/contact", label: "Contact" },
];

export default function NavBar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="nav">
            <div className="container navInner">
                <button
                    type="button"
                    className="navHamburger"
                    onClick={() => setOpen((o) => !o)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                >
                    {open ? <CloseIcon /> : <MenuIcon />}
                </button>

                <nav className={`navLinks${open ? " navLinks-open" : ""}`}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) => (isActive ? "navLink-active" : undefined)}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <ThemeToggle />
            </div>
        </header>
    );
}
