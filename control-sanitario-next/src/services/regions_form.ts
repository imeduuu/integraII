/**
 * Servicio para consumir el endpoint /api/regions desde el frontend
 * Sigue el mismo patrón de manejo de errores que otros servicios en `src/services`.
 */

// Tipo mínimo para región — puedes extenderlo según el schema real
export type Region = any;

/**
 * Obtener todas las regiones ordenadas alfabéticamente
 * El backend responde con { success: true, data: [...], count }
 * Esta función devuelve el array `data` para fácil consumo en componentes.
 */
export async function getRegions(): Promise<any[]> {
  const response = await fetch('/api/regions');

  if (!response.ok) {
    const text = await response.text().catch(() => null);
    throw new Error('Error al obtener las regiones' + (text ? `: ${text}` : ''));
  }

  const json = await response.json();

  if (json && json.data) return json.data;
  if (Array.isArray(json)) return json;
  return [];
}

export default { getRegions };
