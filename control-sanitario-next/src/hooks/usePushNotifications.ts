/**
 * Hook personalizado para gestionar notificaciones push y toast
 * Combina Web Notifications API con sistema de toast interno
 * Soporta notificaciones en escritorio, móvil y PWA
 */
import { useState, useEffect, useCallback } from 'react';
import { useToastContext } from '../components/ToastContainer';

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
  silent?: boolean;
  vibrate?: number[];
  data?: any;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
}

export type NotificationPermission = 'default' | 'granted' | 'denied';

export interface NotificationState {
  permission: NotificationPermission;
  isSupported: boolean;
  isServiceWorkerReady: boolean;
}

/**
 * Hook principal para gestionar notificaciones
 * Proporciona métodos para:
 * - Solicitar permisos
 * - Enviar notificaciones push
 * - Mostrar toasts
 * - Verificar soporte del navegador
 */
export const usePushNotifications = () => {
  const { addToast } = useToastContext();
  
  const [state, setState] = useState<NotificationState>({
    permission: 'default',
    isSupported: false,
    isServiceWorkerReady: false
  });

  // Verificar soporte y estado inicial
  useEffect(() => {
    const checkSupport = async () => {
      const isSupported = 'Notification' in window;
      const permission = isSupported ? Notification.permission : 'default';
      
      let isServiceWorkerReady = false;
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        isServiceWorkerReady = !!registration;
      }

      setState({
        permission: permission as NotificationPermission,
        isSupported,
        isServiceWorkerReady
      });
    };

    checkSupport();
  }, []);

  /**
   * Solicitar permiso para notificaciones
   */
  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!state.isSupported) {
      console.warn('Notificaciones no soportadas en este navegador');
      addToast('Tu navegador no soporta notificaciones', 'warning', 5000, true);
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      setState(prev => ({ ...prev, permission: permission as NotificationPermission }));
      
      if (permission === 'granted') {
        addToast('Notificaciones activadas correctamente', 'success', 3000, true);
      } else if (permission === 'denied') {
        addToast('Notificaciones bloqueadas. Actívalas en la configuración de tu navegador.', 'error', 5000, true);
      }
      
      return permission as NotificationPermission;
    } catch (error) {
      console.error('Error solicitando permiso:', error);
      addToast('Error al solicitar permisos de notificación', 'error', 5000, true);
      return 'denied';
    }
  }, [state.isSupported, addToast]);

  /**
   * Mostrar notificación push nativa
   */
  const showNotification = useCallback(async (options: NotificationOptions): Promise<boolean> => {
    // Si no hay soporte, mostrar solo toast
    if (!state.isSupported) {
      addToast(options.body, 'info', 5000, true);
      return false;
    }

    // Si no hay permiso, solicitarlo
    if (state.permission !== 'granted') {
      const newPermission = await requestPermission();
      if (newPermission !== 'granted') {
        // Fallback a toast
        addToast(options.body, 'info', 5000, true);
        return false;
      }
    }

    try {
      // Si hay service worker, usar ese método
      if (state.isServiceWorkerReady) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          const notificationOptions: any = {
            body: options.body,
            icon: options.icon || '/icon-192x192.svg',
            badge: options.badge || '/badge-72x72.png',
            tag: options.tag || 'notification-' + Date.now(),
            requireInteraction: options.requireInteraction || false,
            silent: options.silent || false,
            vibrate: options.vibrate || [200, 100, 200],
            data: options.data || {},
            actions: options.actions || []
          };
          await registration.showNotification(options.title, notificationOptions);
          return true;
        }
      }

      // Fallback: notificación directa sin service worker
      const notificationOptions: any = {
        body: options.body,
        icon: options.icon || '/icon-192x192.svg',
        badge: options.badge || '/badge-72x72.png',
        tag: options.tag,
        requireInteraction: options.requireInteraction,
        silent: options.silent,
        vibrate: options.vibrate || [200, 100, 200],
        data: options.data
      };
      const notification = new Notification(options.title, notificationOptions);

      // Configurar click handler
      notification.onclick = (event) => {
        event.preventDefault();
        window.focus();
        notification.close();
        
        // Si hay URL en los datos, navegar
        if (options.data?.url) {
          window.location.href = options.data.url;
        }
      };

      return true;
    } catch (error) {
      console.error('Error mostrando notificación:', error);
      // Fallback a toast
      addToast(options.body, 'error', 5000, true);
      return false;
    }
  }, [state.isSupported, state.permission, state.isServiceWorkerReady, requestPermission, addToast]);

  /**
   * Mostrar notificación combinada (toast + push opcional)
   */
  const notify = useCallback((
    title: string,
    body: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    showPush: boolean = false
  ) => {
    // Siempre mostrar toast
    addToast(body, type, 5000, true);

    // Opcionalmente mostrar push si está habilitado
    if (showPush && state.permission === 'granted') {
      showNotification({
        title,
        body,
        tag: `${type}-${Date.now()}`
      });
    }
  }, [addToast, state.permission, showNotification]);

  /**
   * Métodos de conveniencia para diferentes tipos
   */
  const success = useCallback((title: string, body: string, showPush = false) => {
    notify(title, body, 'success', showPush);
  }, [notify]);

  const error = useCallback((title: string, body: string, showPush = false) => {
    notify(title, body, 'error', showPush);
  }, [notify]);

  const warning = useCallback((title: string, body: string, showPush = false) => {
    notify(title, body, 'warning', showPush);
  }, [notify]);

  const info = useCallback((title: string, body: string, showPush = false) => {
    notify(title, body, 'info', showPush);
  }, [notify]);

  return {
    // Estado
    ...state,
    
    // Métodos principales
    requestPermission,
    showNotification,
    notify,
    
    // Métodos de conveniencia
    success,
    error,
    warning,
    info
  };
};

export default usePushNotifications;
