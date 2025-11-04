

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Registra un token de notificación para un usuario o dispositivo.
 * @param token string - Token del dispositivo o usuario.
 * @param userId number (opcional) - ID del usuario relacionado con el token.
 */
export async function registrarTokenNotificacion(
  token: string,
  userId?: number
) {
  try {
    const response = await fetch(`${API_URL}/notifications/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, userId }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("Token registrado correctamente:", data);
    return data;
  } catch (error) {
    console.error("Error al registrar el token de notificación:", error);
    throw error;
  }
}

/**
 * Obtiene todas las alertas activas del sistema.
 * @returns Lista de alertas activas (array)
 */
export async function obtenerAlertasActivas() {
  try {
    const response = await fetch(`${API_URL}/notifications/alertas`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("Alertas activas obtenidas:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener alertas activas:", error);
    throw error;
  }
}
