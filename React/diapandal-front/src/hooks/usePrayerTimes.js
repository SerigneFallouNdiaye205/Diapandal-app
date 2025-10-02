import { useState, useEffect } from 'react';
import { prayerTimeAPI } from '../services/prayerTimeService';

export const usePrayerTimes = (initialCity = 'Touba') => {
  const [prayerData, setPrayerData] = useState({
    today: null,
    weekly: [],
    currentInfo: null,
    cities: []
  });
  const [city, setCity] = useState(initialCity);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, [city]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [todayResponse, weeklyResponse, currentResponse, citiesResponse] = await Promise.all([
        prayerTimeAPI.getTodayPrayerTimes(city),
        prayerTimeAPI.getWeeklyPrayerTimes(city),
        prayerTimeAPI.getCurrentPrayerInfo(city),
        prayerTimeAPI.getAvailableCities()
      ]);

      setPrayerData({
        today: todayResponse.data,
        weekly: weeklyResponse.data,
        currentInfo: currentResponse.data,
        cities: citiesResponse.data
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur de connexion');
      console.error('Error fetching prayer times:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchAllData();
  };

  return {
    prayerData,
    city,
    setCity,
    loading,
    error,
    refreshData
  };
};