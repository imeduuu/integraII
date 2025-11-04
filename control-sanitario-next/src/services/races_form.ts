/**
 * Servicio para consumir el endpoint /api/races desde el frontend
 * Sigue el patrón usado en otros servicios del proyecto (fetch + manejo de response.ok)
 */

// Tipo mínimo para razas — puedes extenderlo según el schema real
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
