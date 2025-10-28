/**
 * Provider de notificaciones usando el nuevo sistema Toast
 * Este es un wrapper sobre ToastProvider para mantener compatibilidad
 * con el código existente que usa useNotification()
 */
import React from 'react';
import { ToastProvider, useToastContext } from './ToastContainer';

/**
 * Provider que maneja notificaciones toast en toda la aplicación
 * Utilizado para mostrar mensajes de éxito, error, advertencia e información
 */
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ToastProvider position="top-right">
      {children}
    </ToastProvider>
  );
};

/**
 * Hook compatible con el sistema anterior
 * Wrapper sobre useToastContext para proporcionar la API addToast
 */
export const useNotification = () => {
  // Hacemos la API tolerante a la ausencia del provider para facilitar tests y uso aislado
  try {
    const { addToast: contextAddToast } = useToastContext();

    const addToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
      const durations = {
        success: 5000,
        error: 7000,
        warning: 6000,
        info: 5000
      };
      contextAddToast(message, type, durations[type], true);
    };

    return { addToast };
  } catch (e) {
    // Si no hay provider, devolvemos una versión no-op para evitar que componentes fallen en tests
    const addToast = (_message: string, _type: 'success' | 'error' | 'warning' | 'info') => {
      // noop
    };
    return { addToast };
  }
};