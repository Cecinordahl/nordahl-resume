import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: isActive ? "underline" : "none",
    opacity: isActive ? 1 : 0.88,
});

export default function NavBar() {
    return (
        <header className="nav">
            <div className="container">
                <nav
                    className="navLinks"
                    style={{
                        justifyContent: "center",
                    }}
                >
                    <NavLink to="/" style={linkStyle}>Home</NavLink>
                    <NavLink to="/work" style={linkStyle}>Work</NavLink>
                    <NavLink to="/portfolio" style={linkStyle}>Portfolio</NavLink>
                    <NavLink to="/notes" style={linkStyle}>Notes</NavLink>
                    <NavLink to="/education" style={linkStyle}>Education</NavLink>
                    <NavLink to="/certifications" style={linkStyle}>Certifications</NavLink>
                    <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
                </nav>
            </div>
        </header>
    );
}
