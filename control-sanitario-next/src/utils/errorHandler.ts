/**
 * Manejador centralizado de errores para UI
 * Permite normalizar distintos tipos de error (Error, fetch response, axios, strings)
 * y extraer un mensaje legible para mostrar al usuario.
 */

export function getErrorMessage(err: any): string {
  if (!err) return 'Ocurrió un error desconocido';

  // Errores del estándar Error
  if (err instanceof Error) return err.message || 'Ocurrió un error';

  // Si es una respuesta fetch con status y json
  if (err && typeof err === 'object') {
    // axios-like
    if (err.response) {
      const data = err.response.data;
      if (data && typeof data === 'string') return data;
      if (data && data.message) return data.message;
      return `Error ${err.response.status || ''}`.trim();
    }

    // si es objeto con message
    if (err.message) return err.message;
  }

  // string
  if (typeof err === 'string') return err;

  // fallback
  try {
    return JSON.stringify(err);
  } catch (e) {
    return 'Ocurrió un error';
  }
}

export default { getErrorMessage };
