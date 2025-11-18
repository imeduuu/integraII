import axios from 'axios';

// Base URL público para la API. Defínela en tu .env como NEXT_PUBLIC_API_URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  // si usas cookies para auth, habilita withCredentials
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar token Bearer desde localStorage (ajusta según tu auth)
api.interceptors.request.use(
  (config) => {
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (e) {
      // noop
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
