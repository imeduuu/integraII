
// Tipo mínimo para razas — se puede extender según el schema real
export type Race = any;

/**
 * Obtener todas las razas
 */
export async function getRaces(): Promise<any> {
  const response = await fetch('/api/races');

  if (!response.ok) {
    const text = await response.text().catch(() => null);
    throw new Error('Error al obtener las razas' + (text ? `: ${text}` : ''));
  }

  return response.json();
}

/**
 * Obtener razas por id de especie
 * El backend responde con { success: true, data: [...], count }
 * Esta función devuelve el array `data` para fácil consumo en componentes.
 */
export async function getRacesBySpecies(speciesId: number | string): Promise<any[]> {
  const response = await fetch(`/api/races/${speciesId}`);

  if (!response.ok) {
    const text = await response.text().catch(() => null);
    throw new Error('Error al obtener las razas por especie' + (text ? `: ${text}` : ''));
  }

  const json = await response.json();

  // Manejo defensivo si la API devuelve diferentes formatos
  if (json && json.data) return json.data;
  if (Array.isArray(json)) return json;
  return [];
}

/**
 * Crear una nueva raza
 */
export async function createRace(data: any): Promise<any> {
  const response = await fetch('/api/races', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => null);
    throw new Error('Error al crear la raza' + (text ? `: ${text}` : ''));
  }

  return response.json();
}

/**
 * Actualizar una raza por id
 */
export async function updateRace(id: string | number, data: any): Promise<any> {
  const response = await fetch(`/api/races/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => null);
    throw new Error('Error al actualizar la raza' + (text ? `: ${text}` : ''));
  }

  return response.json();
}

/**
 * Eliminar una raza por id
 */
export async function deleteRace(id: string | number): Promise<any> {
  const response = await fetch(`/api/races/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const text = await response.text().catch(() => null);
    throw new Error('Error al eliminar la raza' + (text ? `: ${text}` : ''));
  }

  return response.json();
}

export default { getRaces, createRace, updateRace, deleteRace };
