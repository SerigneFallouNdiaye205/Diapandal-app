import Header from "./Header";
import Footer from "./Footer";
import PrayerTimesWidget from "./PrayerTimesWidget";
import "../styles/Horaires.css";

function Horaires() {
 return(
    <>
        <Header />
    <main>
        <PrayerTimesWidget />
        <div className="evenements">          
            <div>
                <div className="heures-evenements">
                    <p><b>Recital du Saint-Coran</b></p>
                    <p><b>24h/24</b></p>
                </div>
                <p>Le Coran est récité en continu dans le lieu qui lui est dédié à savoir la <u>bibliothèque Daaray Kaamil</u>
                    ,dans les différentes mosquées ainsi que dans tous les coins et recoins de la ville vu l'importance
                    sans égale et l'amour que le cheikh avait à l'égard de ce livre.</p>
            </div>  
            <div>
                <div className="heures-evenements">
                    <p><b>Declamation des Khassidas :</b></p>
                    <p><b>24h/24</b></p>
                </div>
                <p>La declamation de ces panégériques entièrement dediés au tout puissant (swt) et à son prophète (saw) se poursuit
                    sur l'etendue de ville durant toute la periode du Magal. Cependant le lieu phart reste <u>l'esplanade de la 
                    grande mosquée </u>où l'organisation Hisbou Tarkhiya avec ses différents invités assure la declamation comme 
                    ils le font durant le mois de ramadan à la résidence Ckeikhoul Khadim.</p>
            </div>
            <div>
                <div className="heures-evenements">
                    <p><b>Ceremonie Officielle : </b></p>
                    <p><b>10h00-14h00</b></p>
                </div>
                <p>Cette cérémonie se déroule le lendemain du Grand Magal à la <u>Résidence Cheikhoul Khadim</u> presidée par le khalif
                 général des mourides en personne avec présence de la famille du cheikh, des invités de marque venus d'un peut partout dans
                 le monde ainsi que d'éminnentes autoritées de l'état et d'ambassadeurs étrangers.</p>
            </div>
        </div>
    </main>
        <Footer />
    </>
    )
    
}

export default Horaires