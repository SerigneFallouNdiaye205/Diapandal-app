import axios from 'axios';

// Utilisez l'URL de votre backend diapandal
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification si nécessaire
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const prayerTimeAPI = {
  getTodayPrayerTimes: (city = 'Touba') => 
    api.get(`/prayer-times/today?city=${encodeURIComponent(city)}`),
  
  getWeeklyPrayerTimes: (city = 'Touba') => 
    api.get(`/prayer-times/weekly?city=${encodeURIComponent(city)}`),
  
  getCurrentPrayerInfo: (city = 'Touba') => 
    api.get(`/prayer-times/current?city=${encodeURIComponent(city)}`),
  
  getAvailableCities: () => 
    api.get('/prayer-times/cities'),
};

export default api;