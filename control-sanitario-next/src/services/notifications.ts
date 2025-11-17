

import api from './api';

/**
 * Registra un token de notificación para un usuario o dispositivo.
 */
export async function registrarTokenNotificacion(token: string, userId?: number) {
  try {
    const res = await api.post('/notifications/token', { token, userId });
    return res.data;
  } catch (error) {
    console.error('Error al registrar el token de notificación:', error);
    throw error;
  }
}

/**
 * Obtiene todas las alertas activas del sistema.
 */
export async function obtenerAlertasActivas() {
  try {
    const res = await api.get('/notifications/alertas');
    return res.data;
  } catch (error) {
    console.error('Error al obtener alertas activas:', error);
    throw error;
  }
}
