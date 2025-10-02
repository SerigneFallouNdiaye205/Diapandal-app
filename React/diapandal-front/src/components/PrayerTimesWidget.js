import React from 'react';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import '../styles/PrayerTimesWidget.css';

const PrayerTimesWidget = () => {
  const { prayerData, city, setCity, loading, error } = usePrayerTimes();

  if (loading) {
    return (
      <div className="prayer-widget loading">
        <div className="loading-spinner">Chargement des horaires en cours...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="prayer-widget error">
        <div className="error-message">⚠️ {error}</div>
      </div>
    );
  }

  if (!prayerData.today) {
    return (
      <div className="prayer-widget error">
        <div className="error-message">Aucune donnée disponible</div>
      </div>
    );
  }

  return (
    <div className="prayer-widget">
      <div className="widget-header">
        <h3>🕌 Horaires de Prière</h3>
        <div className="city-selector">
          <select 
            value={city} 
            onChange={(e) => setCity(e.target.value)}
            className="city-select"
          >
            {prayerData.cities.map(cityOption => (
              <option key={cityOption} value={cityOption}>
                {cityOption}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="current-info">
        <div className="current-time">
          ⌚ {prayerData.currentInfo?.current_time}
        </div>
        {prayerData.currentInfo?.next_prayer && (
          <div className="next-prayer">
            <span>Prochaine: {prayerData.currentInfo.next_prayer.name}</span>
            <span className="prayer-time">{prayerData.currentInfo.next_prayer.time}</span>
            <span className="countdown">({prayerData.currentInfo.next_prayer.remaining})</span>
          </div>
        )}
      </div>

      <div className="prayer-times-grid">
        <PrayerTimeItem name="Fajr" time={prayerData.today.fajr} />
        <PrayerTimeItem name="Levée du soleil" time={prayerData.today.sunrise} />
        <PrayerTimeItem name="Dhuhr" time={prayerData.today.dhuhr} />
        <PrayerTimeItem name="Asr" time={prayerData.today.asr} />
        <PrayerTimeItem name="Maghrib" time={prayerData.today.maghrib} />
        <PrayerTimeItem name="Isha" time={prayerData.today.isha} />
      </div>

      <div className="hijri-date">
        📅 {prayerData.today.hijri_date}
      </div>
    </div>
    
  );
};

const PrayerTimeItem = ({ name, time }) => (
  <div className="prayer-item">
    <span className="prayer-name">{name}</span>
    <span className="prayer-time">{time}</span>
  </div>
);

export default PrayerTimesWidget;