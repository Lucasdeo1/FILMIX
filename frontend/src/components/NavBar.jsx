import { Link } from "react-router-dom";
import "../css/Navbar.css"

function NavBar() {
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">Filmix</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Início</Link>
            <Link to="/favorites" className="nav-link">Favoritos</Link>
        </div>
    </nav>
}

export default NavBar;