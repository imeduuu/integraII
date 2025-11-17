// src/services/sightings.ts
import api from './api';

const BASE = '/sightings';

// Obtener todos los avistamientos
export async function getSightings() {
  const res = await api.get(BASE);
  return res.data;
}

// Obtener un avistamiento por ID
export async function getSightingById(id: number) {
  const res = await api.get(`${BASE}/${id}`);
  return res.data;
}

// Crear un nuevo avistamiento
export async function createSighting(data: any) {
  const res = await api.post(BASE, data);
  return res.data;
}
