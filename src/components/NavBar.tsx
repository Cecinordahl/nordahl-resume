import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

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
    return (
        <header className="nav">
            <div className="container navInner">
                <nav className="navLinks">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
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
