import "../styles/Header.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  // état pour ouvrir/fermer le menu mobile
  const [menuOpen, setMenuOpen] = useState(false);

  // ferme le menu quand on clique sur un lien
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <nav>
        <ul className={menuOpen ? "active" : ""}>
          <li className="intro-logo">
            <img className="logo" src={logo} alt="logo" />
          </li>
          <div className="links-container">
          <li>
            <Link to="/" onClick={handleLinkClick}>Acceuil</Link>
          </li>
          <li>
            <Link to="/Localisation" onClick={handleLinkClick}>Localisation</Link>
          </li>
          <li>
            <Link to="/Horaires" onClick={handleLinkClick}>Horaires</Link>
          </li>
          <li>
            <Link to="/Pointsdinterets" onClick={handleLinkClick}>
              Points d'intérêts
            </Link>
          </li>
          </div>
          <li>
            <Link className="identification" to="/Identification" onClick={handleLinkClick}>
              Identifiez-vous
            </Link>
          </li>
        </ul>

        {/* Bouton burger pour mobile */}
        <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
