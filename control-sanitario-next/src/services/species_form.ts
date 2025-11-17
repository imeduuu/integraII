// Servicio para obtener especies desde el backend
// Estructura de respuesta esperada:
// {
//   success: true,
//   data: [ { id_especie: number, nombre_especie: string } ],
//   count: number
// }

export type Species = {
  id_especie: number;
  nombre_especie: string;
};

type ApiResponse = {
  success: boolean;
  data: Species[];
  count: number;
  error?: string;
};

export async function getSpecies(): Promise<Species[]> {
  const response = await fetch('/api/species', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    // Intenta leer el cuerpo para obtener más contexto del error
    let detail = '';
    try {
      const body = (await response.json()) as Partial<ApiResponse>;
      detail = body?.error ? `: ${body.error}` : '';
    } catch (_) {
      // Ignorar si no es JSON
    }
    throw new Error(`Error al obtener las especies${detail}`);
  }

  const data = (await response.json()) as ApiResponse;

  if (!data?.success || !Array.isArray(data?.data)) {
    throw new Error('Formato de respuesta inválido al obtener las especies');
  }

  return data.data;
}
