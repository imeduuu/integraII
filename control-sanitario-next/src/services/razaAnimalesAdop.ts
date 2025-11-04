// src/services/razaAnimalesAdop.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'; // Ajusta según tu backend

/**
 * Obtiene todas las razas registradas desde el backend.
 * Endpoint: GET /races
 * 
 * @returns Lista de razas como array de objetos.
 */
export const getRazas = async () => {
  try {
    const response = await axios.get('/api/races');
    return response.data; // Devuelve directamente la lista de razas
  } catch (error) {
    console.error('Error al obtener las razas:', error);
    throw error; // Re-lanza el error para manejarlo en el frontend
  }
};
