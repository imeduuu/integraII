// src/services/sightings.ts
import axios from 'axios';

// ✅ Usa la ruta relativa del API interno de Next.js
const API_URL = '/api/sightings';

// Obtener todos los avistamientos
export async function getSightings() {
  const res = await axios.get(API_URL);
  return res.data;
}

// Obtener un avistamiento por ID
export async function getSightingById(id: number) {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}

// Crear un nuevo avistamiento
export async function createSighting(data: any) {
  const res = await axios.post(API_URL, data, {
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
}
