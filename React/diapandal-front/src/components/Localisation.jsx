import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useLocation } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import '../styles/Localisation.css';

// Import de vos composants
import Header from "./Header";
import Footer from "./Footer";

// Import de vos données
import { donneesSpiritualite } from "../donnees/donnees_spiritualite";
import { donneesSante } from "../donnees/donnees_sante";
import { donneeAlimentation } from "../donnees/donnees_alimentations";

// CORRECTION DES ICÔNES LEAFLET
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const defaultPosition = [14.867, -15.874];

// Composant pour centrer sur le lieu sélectionné
function CenterOnSelected({ selectedLieu }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedLieu && selectedLieu.latitude && selectedLieu.longitude) {
      console.log('Centrage sur le lieu:', selectedLieu.lieu, selectedLieu.latitude, selectedLieu.longitude);
      
      // Petit délai pour s'assurer que la carte est chargée
      setTimeout(() => {
        map.setView([selectedLieu.latitude, selectedLieu.longitude], 16, {
          animate: true,
          duration: 1
        });
      }, 300);
    }
  }, [selectedLieu, map]);
  
  return null;
}

// Composant pour ouvrir le popup du lieu sélectionné
function OpenSelectedPopup({ selectedLieu, allLieux }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedLieu && selectedLieu.latitude && selectedLieu.longitude) {
      // Trouver le marqueur correspondant au lieu sélectionné
      setTimeout(() => {
        const markerElement = document.querySelector(`[alt="${selectedLieu.lieu}"]`)?.closest('.leaflet-marker-icon');
        if (markerElement) {
          markerElement.click();
          console.log('Popup ouvert pour:', selectedLieu.lieu);
        }
      }, 800);
    }
  }, [selectedLieu, allLieux, map]);
  
  return null;
}

// Composant pour ajuster la vue si aucun lieu sélectionné
function FitToBounds({ lieux, selectedLieu }) {
  const map = useMap();
  
  useEffect(() => {
    if (!selectedLieu) {
      const positions = lieux
        .filter((l) => l.latitude && l.longitude)
        .map((l) => [l.latitude, l.longitude]);
      
      if (positions.length > 0) {
        setTimeout(() => {
          map.fitBounds(positions, { 
            padding: [20, 20],
            maxZoom: 15 
          });
        }, 500);
      }
    }
  }, [lieux, selectedLieu, map]);
  
  return null;
}

// Composant pour initialiser la carte
function MapInitializer() {
  const map = useMap();
  
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  
  return null;
}

function Localisation() {
  // RÉCUPÉRATION du lieu sélectionné depuis la navigation
  const location = useLocation();
  const selectedLieu = location.state?.selectedLieu;

  console.log('Lieu sélectionné reçu:', selectedLieu);

  // Combinaison de toutes les données avec type
  const allLieux = [
    ...(donneesSpiritualite || []).map(lieu => ({ ...lieu, type: 'spiritualite' })),
    ...(donneesSante || []).map(lieu => ({ ...lieu, type: 'sante' })),
    ...(donneeAlimentation || []).map(lieu => ({ ...lieu, type: 'alimentation' }))
  ].filter(lieu => lieu.latitude && lieu.longitude);

  console.log('Tous les lieux:', allLieux);

  // Fonction pour créer des icônes uniques par lieu
  const createCustomIcon = (lieu, isSelected) => {
    const color = isSelected ? '#e74c3c' : 
                 lieu.type === 'spiritualite' ? '#3498db' :
                 lieu.type === 'sante' ? '#2ecc71' : 'gold';
    
    const size = isSelected ? 35 : 25;
    const border = isSelected ? '3px solid white' : '2px solid white';
    
    return new L.DivIcon({
      html: `<div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: ${border};
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: ${isSelected ? '16px' : '12px'};
      ">${isSelected ? '📍' : ''}</div>`,
      iconSize: [size, size],
      iconAnchor: [size/2, size/2],
    });
  };

  return (
    <>
    <Header />
    <main>
    <div className="localisation-container">
      {/* Section titre dynamique */}
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <h1 style={{ margin: 0, color: '#2c3e50' }}>
          {selectedLieu ? `📍 ${selectedLieu.lieu}` : 'Carte des lieux à Touba'}
        </h1>
        <p style={{ margin: '10px 0 0 0', color: '#7f8c8d' }}>
          {selectedLieu 
            ? `Lieu sélectionné - ${selectedLieu.latitude}, ${selectedLieu.longitude}` 
            : `${allLieux.length} lieux référencés`
          }
        </p>
        <ul>
          <li className='marqueurAlimentation'> 🟡Zones d'alimentation</li>
          <li className='marqueurSpirituel'>🔵 Zones Spirituels</li>
          <li className='marqueurSante'>🟢 Zones de Sante</li>
        </ul>
        
        {selectedLieu && (
          <button 
            onClick={() => window.history.back()}
            style={{
              marginTop: '15px',
              padding: '8px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ← Retour à la liste
          </button>
        )}
      </div>

      {/* Conteneur carte */}
      <div className="map-wrapper">
        <div className="map-container">
          <MapContainer
            center={selectedLieu ? [selectedLieu.latitude, selectedLieu.longitude] : defaultPosition}
            zoom={selectedLieu ? 16 : 13}
            style={{ 
              height: '100%', 
              width: '100%',
              minHeight: '500px'
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Marqueurs pour tous les lieux */}
            {allLieux.map((lieu, index) => {
              const isSelected = selectedLieu && selectedLieu.lieu === lieu.lieu;
              
              return (
                <Marker
                  key={`${lieu.lieu}-${index}`}
                  position={[lieu.latitude, lieu.longitude]}
                  icon={createCustomIcon(lieu, isSelected)}
                >
                  <Popup>
                    <div style={{ minWidth: '250px' }}>
                      {isSelected && (
                        <div style={{
                          backgroundColor: '#e74c3c',
                          color: 'white',
                          padding: '5px 10px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          marginBottom: '10px',
                          textAlign: 'center'
                        }}>
                          ⭐ LIEU SÉLECTIONNÉ
                        </div>
                      )}
                      
                      <h3 style={{ 
                        margin: '0 0 10px 0', 
                        color: '#2c3e50',
                        fontSize: '18px'
                      }}>
                        {lieu.lieu}
                      </h3>
                      
                      {lieu.image && (
                        <img 
                          src={lieu.image} 
                          alt={lieu.lieu}
                          style={{
                            width: '100%',
                            height: '120px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            marginBottom: '10px'
                          }}
                        />
                      )}
                      
                      <p style={{ 
                        margin: '0 0 10px 0', 
                        lineHeight: '1.4',
                        fontSize: '14px'
                      }}>
                        {lieu.intro}
                      </p>
                      
                      <div style={{ 
                        backgroundColor: '#f8f9fa',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '10px'
                      }}>
                        <strong>🕒 Horaires:</strong> {lieu.ouverture}
                      </div>
                      
                      {lieu.option1 && (
                        <div style={{ margin: '10px 0' }}>
                          <strong>📋 Services:</strong>
                          <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '5px', 
                            marginTop: '5px' 
                          }}>
                            {[lieu.option1, lieu.option2, lieu.option3, lieu.option4]
                              .filter(opt => opt && !opt.includes('+'))
                              .map((opt, i) => (
                                <span key={i} style={{
                                  backgroundColor: '#ecf0f1',
                                  padding: '3px 8px',
                                  borderRadius: '12px',
                                  fontSize: '12px',
                                  color: '#2c3e50'
                                }}>
                                  {opt}
                                </span>
                              ))
                            }
                          </div>
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
            
            {/* Centrage automatique sur le lieu sélectionné */}
            <CenterOnSelected selectedLieu={selectedLieu} />
            
            {/* Ouverture du popup du lieu sélectionné */}
            <OpenSelectedPopup selectedLieu={selectedLieu} allLieux={allLieux} />
            
            {/* Ajustement de la vue si aucun lieu sélectionné */}
            <FitToBounds lieux={allLieux} selectedLieu={selectedLieu} />
            
            <MapInitializer />
          </MapContainer>
        </div>
      </div>
    </div>
    </main>
    <Footer />
    </>
  );
}

export default Localisation;