// src/services/razaAnimalesAdop.ts
import api from './api';

/**
 * Obtiene todas las razas registradas desde el backend.
 * Endpoint: GET /races
 *
 * @returns Lista de razas como array de objetos.
 */
export const getRazas = async () => {
  try {
    const response = await api.get('/races');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las razas:', error);
    throw error;
  }
};
