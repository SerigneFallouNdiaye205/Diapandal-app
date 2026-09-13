import "../styles/Footer.css";

import logo from "../images/logo.png";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaGithub,
  FaArrowRight,
  FaLocationDot,
  FaEnvelope,
  FaPhone,
  FaHeart,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      {/* ================= CTA ================= */}
      <div className="footer-cta">

        <div className="footer-cta-text">
          <span>Diapandal • Magal de Touba</span>

          <h2>
            Préparez votre pèlerinage
            <br />
            en toute sérénité.
          </h2>

          <p>
            Retrouvez toutes les informations utiles pour
            vivre pleinement votre pèlerinage à Touba.
          </p>
        </div>

        <Link to="/Identification" className="footer-cta-button">
          Commencer
          <FaArrowRight />
        </Link>

      </div>


      {/* ================= CONTENU PRINCIPAL ================= */}
      <div className="footer-container">

        {/* -------- BRAND -------- */}
        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            <img src={logo} alt="Diapandal" />

            <div>
              <strong>Diapandal</strong>
              <span>Magal de Touba</span>
            </div>
          </Link>

          <p>
            Votre compagnon numérique pour un pèlerinage
            plus simple, plus sûr et plus serein.
          </p>

          {/* Réseaux sociaux */}
          <div className="social-icons">

            <a
              href="#"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <a
              href="#"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

          </div>

        </div>


        {/* -------- NAVIGATION -------- */}
        <div className="footer-column">

          <h3>Navigation</h3>

          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>

            <li>
              <Link to="/Horaires">Horaires</Link>
            </li>

            <li>
              <Link to="/Localisation">Localisation</Link>
            </li>

            <li>
              <Link to="/Pointsdinterets">
                Points d'intérêt
              </Link>
            </li>

            <li>
              <Link to="/Notifications">
                Notifications
              </Link>
            </li>
          </ul>

        </div>


        {/* -------- SERVICES -------- */}
        <div className="footer-column">

          <h3>Services</h3>

          <ul>
            <li>
              <Link to="/Identification">
                Inscription pèlerin
              </Link>
            </li>

            <li>
              <Link to="/Localisation">
                Carte de Touba
              </Link>
            </li>

            <li>
              <Link to="/Horaires">
                Horaires des prières
              </Link>
            </li>

            <li>
              <Link to="/Pointsdinterets">
                Lieux importants
              </Link>
            </li>
          </ul>

        </div>


        {/* -------- CONTACT -------- */}
        <div className="footer-column footer-contact">

          <h3>Contact</h3>

          <div className="contact-item">
            <FaLocationDot />
            <span>
              Touba, Sénégal
            </span>
          </div>

          <div className="contact-item">
            <FaEnvelope />
            <span>
              contact@diapandal.com
            </span>
          </div>

          <div className="contact-item">
            <FaPhone />
            <span>
              +221 XX XXX XX XX
            </span>
          </div>

        </div>

      </div>


      {/* ================= BAS DU FOOTER ================= */}
      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Diapandal.
          Tous droits réservés.
        </p>

        <div className="footer-bottom-links">

          <Link to="#">
            Politique de confidentialité
          </Link>

          <Link to="#">
            Conditions d'utilisation
          </Link>

        </div>

        <p className="made-with">
          Fait avec <FaHeart /> pour la communauté
        </p>

      </div>

    </footer>
  );
}

export default Footer;