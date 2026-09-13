import "../styles/Acceuil.css";

import Header from "./Header";
import Footer from "./Footer";

import ImCheikh from "../images/ImCheikh.jpg";
import mosque_1 from "../images/mosque_1.jpg";
import KR from "../images/KR.jpg";

import {
  FaClock,
  FaUser,
  FaLocationDot,
  FaStar,
  FaBell,
  FaArrowRight,
  FaMap,
  FaShieldHalved,
  FaMobileScreenButton,
  FaHeart,
} from "react-icons/fa6";

function Acceuil() {
  return (
    <>
      <Header />

      <main>

        {/* ================= HERO ================= */}
        <section className="hero">

          <div className="hero-content">

            <div className="hero-text">

              <div className="magal-badge">
                <FaStar />
                <span>Magal de Touba</span>
              </div>

              <h1>
                Diapandal,
                <br />
                votre compagnon pour un
                <span> pèlerinage réussi</span>
              </h1>

              <p>
                Diapandal facilite le pèlerinage des aspirants
                lors du Magal de Touba en vous offrant toutes
                les informations utiles au même endroit :
                horaires, inscription, localisation,
                points d’intérêt et bien plus encore.
              </p>

              <div className="hero-buttons">

                <a
                  href="#fonctionnalites"
                  className="btn-primary"
                >
                  <FaMap />
                  <span>Commencer</span>
                  <FaArrowRight />
                </a>

                <a
                  href="#mission"
                  className="btn-secondary"
                >
                  En savoir plus
                </a>

              </div>

            </div>


            <div className="hero-quote">
              <span>“</span>
              Touba,
              <br />
              une foi,
              <br />
              un chemin,
              <br />
              une même
              <br />
              destination...
              <span>”</span>
            </div>

          </div>

        </section>


        {/* ================= FONCTIONNALITÉS ================= */}

        <section
          id="fonctionnalites"
          className="features-section"
        >

          <div className="features-grid">

            {/* Horaires */}
            <div className="feature-card">

              <div className="feature-icon green">
                <FaClock />
              </div>

              <div>
                <h3>Horaires</h3>

                <p>
                  Consultez les horaires des prières
                  et des événements du Magal.
                </p>
              </div>

              <FaArrowRight className="card-arrow" />

            </div>


            {/* Inscription */}
            <div className="feature-card">

              <div className="feature-icon blue">
                <FaUser />
              </div>

              <div>
                <h3>Inscription pèlerins</h3>

                <p>
                  Enregistrez-vous facilement et
                  suivez votre statut d’inscription.
                </p>
              </div>

              <FaArrowRight className="card-arrow" />

            </div>


            {/* Localisation */}
            <div className="feature-card">

              <div className="feature-icon orange">
                <FaLocationDot />
              </div>

              <div>
                <h3>Localisation</h3>

                <p>
                  Trouvez votre chemin avec la
                  carte interactive de Touba.
                </p>
              </div>

              <FaArrowRight className="card-arrow" />

            </div>


            {/* Points d'intérêt */}
            <div className="feature-card">

              <div className="feature-icon purple">
                <FaStar />
              </div>

              <div>
                <h3>Points d’intérêt</h3>

                <p>
                  Découvrez les lieux importants
                  et les services disponibles sur place.
                </p>
              </div>

              <FaArrowRight className="card-arrow" />

            </div>


            {/* Notifications */}
            <div className="feature-card notification-card">

              <div className="feature-icon red">
                <FaBell />
              </div>

              <div>
                <h3>Notifications</h3>

                <p>
                  Restez informé en temps réel des
                  actualités et des alertes importantes.
                </p>
              </div>

              <FaArrowRight className="card-arrow" />

            </div>

          </div>

        </section>


        {/* ================= MISSION ================= */}

        <section
          id="mission"
          className="mission-section"
        >

          <div className="mission-content">

            <div className="mission-text">

              <div className="mission-badge">
                Notre mission
              </div>

              <h2>
                Un pèlerinage plus simple,
                <span> plus sûr, plus serein</span>
              </h2>

              <p>
                Diapandal est né de la volonté d’accompagner
                chaque pèlerin dans son cheminement spirituel
                en offrant une solution numérique fiable,
                pratique et accessible pendant le Magal de Touba.
              </p>


              <div className="mission-values">

                <div>
                  <FaShieldHalved />

                  <span>
                    Fiable
                    <small>et sécurisé</small>
                  </span>
                </div>


                <div>
                  <FaMobileScreenButton />

                  <span>
                    Accessible
                    <small>sur tous vos appareils</small>
                  </span>
                </div>


                <div>
                  <FaHeart />

                  <span>
                    Au service
                    <small>de la communauté</small>
                  </span>
                </div>

              </div>

            </div>


            <div className="mission-image">

              <img
                src={mosque_1}
                alt="Pèlerinage à Touba"
              />

              <div className="image-quote">
                Touba,
                <br />
                une foi,
                <br />
                un chemin,
                <br />
                une même destination...
              </div>

            </div>

          </div>

        </section>


        {/* ================= ARTICLES ================= */}

        <section className="articles-section">

          <div className="section-heading">

            <span>Netali Borom Ndame</span>

            <h2>
              Découvrez l'histoire et la spiritualité
              de Touba
            </h2>

          </div>


          {/* Article 1 */}

          <article className="article">

            <img
              src={ImCheikh}
              alt="Cheikh Ahmadou Bamba"
            />

            <div className="article-content">

              <h2>
                Les premières heures de l’Exil du Cheikh,
                les prémices d’une destinée hors du commun
              </h2>

              <p>
                Ce fut le samedi 18 Safar de l’an 1313 de
                l’Hégire (18 Août 1895) que Cheikh Ahmadou
                Bamba quitta la résidence qu’il avait
                construite dans le Djolof pour l’acquisition
                et la diffusion de la science.
              </p>

              <a
                href="#"
                className="read-more"
              >
                Lire l'article
                <FaArrowRight />
              </a>

            </div>

          </article>


          {/* Article 2 */}

          <article className="article reverse">

            <img
              src={KR}
              alt="Retour du Cheikh Ahmadou Bamba"
            />

            <div className="article-content">

              <h2>
                NETALI : 11 novembre 1902,
                le retour d’exil triomphal
              </h2>

              <p>
                Sous un soleil brûlant, le navire arrivait
                au port de Dakar. Des milliers de talibés
                mourides s’étaient déplacés pour vivre cet
                instant unique et mémorable.
              </p>

              <a
                href="#"
                className="read-more"
              >
                Lire l'article
                <FaArrowRight />
              </a>

            </div>

          </article>

        </section>


        {/* ================= CTA ================= */}

        <section className="cta-section">

          <div>

            <span>
              Ensemble pour le Magal
            </span>

            <h2>
              Un pèlerinage plus simple,
              plus connecté
            </h2>

            <p>
              Toutes les informations dont vous avez besoin,
              réunies au même endroit.
            </p>

          </div>


          <a
            href="#fonctionnalites"
            className="btn-primary"
          >
            Découvrir Diapandal
            <FaArrowRight />
          </a>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Acceuil;