
// Tipo mínimo para razas — se puede extender según el schema real
export type Race = any;

/**
 * Obtener todas las razas
 */
import api from './api';

export async function getRaces(): Promise<any> {
  const res = await api.get('/races');
  return res.data;
}

/**
 * Obtener razas por id de especie
 * El backend responde con { success: true, data: [...], count }
 * Esta función devuelve el array `data` para fácil consumo en componentes.
 */
export async function getRacesBySpecies(speciesId: number | string): Promise<any[]> {
  const res = await api.get(`/races/${speciesId}`);
  const json = res.data as any;
  if (json && json.data) return json.data;
  if (Array.isArray(json)) return json;
  return [];
}

/**
 * Crear una nueva raza
 */
export async function createRace(data: any): Promise<any> {
  const res = await api.post('/races', data);
  return res.data;
}

/**
 * Actualizar una raza por id
 */
export async function updateRace(id: string | number, data: any): Promise<any> {
  const res = await api.put(`/races/${id}`, data);
  return res.data;
}

/**
 * Eliminar una raza por id
 */
export async function deleteRace(id: string | number): Promise<any> {
  const res = await api.delete(`/races/${id}`);
  return res.data;
}

export default { getRaces, createRace, updateRace, deleteRace };
