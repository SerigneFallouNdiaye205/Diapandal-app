import "../styles/Header.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

import {
  FaBars,
  FaXmark,
  FaUser,
} from "react-icons/fa6";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">

      <nav className="navbar">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          className="brand"
          onClick={handleLinkClick}
        >
          <img
            src={logo}
            alt="Diapandal"
            className="header-logo"
          />

          <div className="brand-text">
            <span>Diapandal</span>
            <small>Magal de Touba</small>
          </div>
        </Link>


        {/* ================= MENU DESKTOP ================= */}
        <div
          className={`nav-menu ${
            menuOpen ? "menu-open" : ""
          }`}
        >

          <Link
            to="/"
            className="nav-link active"
            onClick={handleLinkClick}
          >
            Accueil
          </Link>

          <Link
            to="/Horaires"
            className="nav-link"
            onClick={handleLinkClick}
          >
            Horaires
          </Link>

          <Link
            to="/Localisation"
            className="nav-link"
            onClick={handleLinkClick}
          >
            Localisation
          </Link>

          <Link
            to="/Pointsdinterets"
            className="nav-link"
            onClick={handleLinkClick}
          >
            Points d'intérêt
          </Link>

          <Link
            to="/Notifications"
            className="nav-link"
            onClick={handleLinkClick}
          >
            Notifications
          </Link>

          {/* Bouton connexion dans le menu mobile */}
          <Link
            to="/Identification"
            className="mobile-login"
            onClick={handleLinkClick}
          >
            <FaUser />
            Se connecter
          </Link>

        </div>


        {/* ================= BOUTON CONNEXION DESKTOP ================= */}
        <Link
          to="/Identification"
          className="login-button"
          onClick={handleLinkClick}
        >
          <FaUser />
          <span>Se connecter</span>
        </Link>


        {/* ================= BURGER ================= */}
        <button
          className="burger-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Ouvrir le menu"
        >
          {menuOpen ? (
            <FaXmark />
          ) : (
            <FaBars />
          )}
        </button>

      </nav>

    </header>
  );
}

export default Header;