// Footer.jsx
import "../styles/Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        {/* Section info */}
        <div className="footer-info">
          <h3>Diapandal</h3>
          <p>&copy; 2025 Diapandal - Tous droits réservés</p>
        </div>

        {/* Navigation / Liens */}
        <div className="footer-links">
          <h4>Navigation</h4>
          <ul>
            <li><a href="/Acceuil">Accueil</a></li>
            <li><a href="/Localisation">Localisation</a></li>
            <li><a href="/Horaires">Horaires</a></li>
            <li><a href="/Pointsdinterets">Points d'intérêts</a></li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div className="footer-social">
          <h4>Suivez-nous</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
