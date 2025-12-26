import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: isActive ? "underline" : "none",
    opacity: isActive ? 1 : 0.86,
});

export default function NavBar() {
    return (
        <header className="nav">
            <div className="container navInner">
                <div className="navLinks">
                    <NavLink to="/" style={linkStyle}>Home</NavLink>
                    <NavLink to="/work" style={linkStyle}>Work</NavLink>
                    <NavLink to="/portfolio" style={linkStyle}>Portfolio</NavLink>
                    <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
                    <NavLink to="/education" style={linkStyle}>Education</NavLink>
                    <NavLink to="/certifications" style={linkStyle}>Certifications</NavLink>
                    <NavLink to="/notes" style={linkStyle}>Notes</NavLink>
                </div>

                <div className="muted" style={{ fontSize: 13 }}>
                    Cecilie Nordahl
                </div>
            </div>
        </header>
    );
}
