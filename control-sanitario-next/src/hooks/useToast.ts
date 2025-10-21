/**
 * Hook personalizado para gestionar notificaciones Toast
 * Proporciona una API sencilla para agregar y gestionar toasts
 */
import { useCallback } from 'react';
import { useToastContext } from '../components/ToastContainer';

interface ToastOptions {
  duration?: number;
  dismissible?: boolean;
}

interface UseToastReturn {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  clearAll: () => void;
}

/**
 * Hook para gestionar toasts usando el ToastContext
 * 
 * @returns Objeto con funciones helper para mostrar toasts
 * 
 * @example
 * ```tsx
 * const toast = useToast();
 * 
 * // Mostrar un toast de éxito
 * toast.success('¡Operación completada!');
 * 
 * // Mostrar un toast de error con duración personalizada
 * toast.error('Algo salió mal', { duration: 10000 });
 * ```
 */
export const useToast = (): UseToastReturn => {
  const { addToast, clearAll } = useToastContext();

  /**
   * Helper para toast de éxito
   */
  const success = useCallback((message: string, options?: ToastOptions) => {
    addToast(message, 'success', options?.duration ?? 5000, options?.dismissible);
  }, [addToast]);

  /**
   * Helper para toast de error
   */
  const error = useCallback((message: string, options?: ToastOptions) => {
    addToast(message, 'error', options?.duration ?? 7000, options?.dismissible);
  }, [addToast]);

  /**
   * Helper para toast de información
   */
  const info = useCallback((message: string, options?: ToastOptions) => {
    addToast(message, 'info', options?.duration ?? 5000, options?.dismissible);
  }, [addToast]);

  /**
   * Helper para toast de advertencia
   */
  const warning = useCallback((message: string, options?: ToastOptions) => {
    addToast(message, 'warning', options?.duration ?? 6000, options?.dismissible);
  }, [addToast]);

  return {
    success,
    error,
    info,
    warning,
    clearAll,
  };
};

export default useToast;
