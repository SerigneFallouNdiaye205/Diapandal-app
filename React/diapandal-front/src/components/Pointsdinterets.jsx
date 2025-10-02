import "../styles/Pointsdinterets.css";
import { donneesSpiritualite } from "../donnees/donnees_spiritualite";
import { donneesSante } from "../donnees/donnees_sante";
import { donneeAlimentation } from "../donnees/donnees_alimentations";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaMapLocationDot } from "react-icons/fa6";
import { FcAlarmClock } from "react-icons/fc";
import { IoCallOutline } from "react-icons/io5";
import { CiMedicalCross } from "react-icons/ci";
import { FcAssistant } from "react-icons/fc";
import { CiCircleInfo } from "react-icons/ci";

function Pointsdinterets() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleClick = (donnee) => setSelected(donnee);
  const handleClose = () => setSelected(null);

  const handleLocation = (donnee) => {
    navigate("/Localisation", { state: { selectedLieu: donnee } });
  };

  const rendu = (data) =>
    data.map((donnee, index) => (
      <div key={index} className="part">
        <img className="mosque" src={donnee.image} alt={donnee.lieu} />
        <h3>{donnee.lieu}</h3>
        <p className="p">{donnee.intro}</p>
        <div className="options">
          <p className="option">{donnee.option1}</p>
          <p className="option">{donnee.option2}</p>
          <p className="option">{donnee.option3}</p>
          <p className="autre">{donnee.option4}</p>
        </div>
        <p className="horaire"><FcAlarmClock /> {donnee.ouverture}</p>
        <hr />
        <div className="links">
          <button className="location" onClick={() => handleLocation(donnee)}>
            <FaMapLocationDot />   Localisation
          </button>
          <button className="detail" onClick={() => handleClick(donnee)}>
            Details
          </button>
        </div>
      </div>
    ));

  return (
    <>
      <Header />
      <main>
          <div className="intro">
            <h1>Spiritualité</h1>
            <p>
                Touba, la ville sainte du Sénégal, est un pilier central pour la communauté mouride. 
                Fondée par Cheikh Ahmadou Bamba, cette cité spirituelle attire chaque année des
                milliers de pèlerins, notamment lors du Magal, un événement religieux de grande envergure.
                Si vous planifiez une visite à Touba, que ce soit pour le Magal ou une autre occasion, 
                voici six sites incontournables qui enrichiront votre compréhension de l’histoire et 
                de la spiritualité mouride.
            </p>
            <section className="text">{rendu(donneesSpiritualite)}</section>
          </div>

        
          <div className="conclusion">
            <p>
                Plongée au Cœur de la Spiritualité Mouride; Visiter ces sites à Touba vous offrira une expérience spirituelle 
                unique et enrichissante. Chacun de ces lieux raconte une partie de l’histoire du mouridisme et de son fondateur, 
                Cheikh Ahmadou Bamba. Que vous soyez un fidèle mouride ou un visiteur curieux, ces sites sont des étapes 
                incontournables pour comprendre la profondeur et la richesse de la spiritualité de Touba. 
                Planifiez votre visite pour découvrir le cœur spirituel du Sénégal et vivre une expérience inoubliable.
            </p>
          </div>
          <div className="intro">
              <h1>Santé et Soins</h1>
              <p>Ces deux établissements de santé sont les plus à l'avance de la ville raliant modernité et qualité mais néanmoins
              Touba dispose de maintes autres hopitaux, cliniques et pharmacie proche de la populations ou que vous soyez 
              pouvant apporter de nettes solutions a vos soucis durant cette periode du Grand Magal de Touba.</p>
              <section className="text">{rendu(donneesSante)}</section>
          </div>

          <div className="intro">
              <h1>Alimentation</h1>
              <p> Bien vrai que lors du magal les Daahira ou familles qui viennent des coins reculés du pays ou meme de l'exterieur
                ont la nouvelle tendance de venir faire toutes leurs courses ici meme dans la ville pour amoindrir les charges et la fatigue lors du voyage
                , ces grandes surfaces participent ainsi avous faciliter la donne. A preciser aussi que vous n'avez ni besoin de restaurants ni de quoi que ce soit
                venez et les talibés mourides seront enchantés de prendre soins de vous avec une generosité sans aucune limite en pratiquant ce que l'on appel
                communément le "berndé".  </p>
                <section className="text">{rendu(donneeAlimentation)}</section>
          </div>

          <div className="contactUrgence">
            <h2><IoCallOutline color="red" />  Contacts d'Urgence : </h2><br />
            <p>En cas d'urgence, n'hésitez pas à contacter les numéros suivants :</p><br />
            <p> <IoCallOutline className="icon" /> Sécurité <p>17,  123  ou  800 00 20 20</p></p><br />
            <p><CiMedicalCross className="icon" />  Médicale <p>1515,  18  ou  +221 33 889 15 15</p></p><br />
            <p><FcAssistant className="icon" />  Assistance Routière <p>800 00 20 39</p></p><br />
            <p><CiCircleInfo className="icon" /> Information <p>800 800 200</p></p>
          </div>
          
      </main>


      <Footer />

      {/* Modal détails */}
      {selected && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img src={selected.image} alt={selected.lieu} />
            <h2>{selected.lieu}</h2>
            <div className="description">
              <p>{selected.description}</p>
            </div>
            <button className="close" onClick={handleClose}>Fermer</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Pointsdinterets;
