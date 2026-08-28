import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { CloseIcon, MenuIcon } from "./icons";

           {/* TODO add an about me type section where i can add information about my background playing competitive golf
           from a young age to playing at collegiate level in the usa at rogers state, showcase my not so normal journey
           in work-life with a diagram / sketch / cartoon or something- from bachelor the plan was to work for a year in
           norway and head back to the US for a masters, but I started working as a flight attendant and fell in love with
           the job. time flew by, literally, and i ended up working at SAS for four years. I took a package some time after
           covid hit and SAS was nedbemanning. I had already set my sights on studying a bit informatics on the side,
           so I had some single courses lined up for that fall. I applied for some part time jobs and started working at
           Vinmonopolet while taking informatics courses at UiO. After about a year doing that, I had applied to Academic
           Work Academy's Java program, I completed that and started my journey at Accenture. I continued my studies on the
           side because I genuinely found these subjects fun and interesting and wanted to learn more in-depth. I naively
           started a full software engineering bachelors degree through Oslo Met while working full-time. This went okay
           seeing as I was quite familiar with the subjects already, so I didn't spend much time on lectures but completed
           assignments and exams. After realizing I had already put three years of software engineering work experience on my resume,
           I decided that completing the extra bachelors degree was not something I wanted to prioritize anymore. It's now
           nearing 5 years working as a fullstack developer, and I enjoy it more and more every year. What I love most about
           working as a developer is that I feel like I will never stop learning. There's always something to get better at-
           whether its brushing up on frontend development, exploring new tools, testing out a new form of architecture,
           learning more about the domain, you name it... #addsomethingtofinalizethissection
           */}
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

    {/* TODO When opening the hamburger menu in mobile display, open it over the content, not by moving content down to make space for the expanded hamburger menu.  */}
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
