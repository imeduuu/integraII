/**
 * Servicio centralizado para gestión de notificaciones
 * Proporciona una API unificada para enviar notificaciones en toda la aplicación
 */

export interface NotificationPayload {
  title: string;
  body: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
  silent?: boolean;
  vibrate?: number[];
  data?: any;
  url?: string;
  showPush?: boolean;
  duration?: number;
}

/**
 * Tipos de notificaciones predefinidas
 */
export const NotificationTypes = {
  AVISTAMIENTO_NUEVO: 'avistamiento-nuevo',
  CASO_ACTUALIZADO: 'caso-actualizado',
  MENSAJE_NUEVO: 'mensaje-nuevo',
  ADOPCION_SOLICITUD: 'adopcion-solicitud',
  SISTEMA: 'sistema',
  ALERTA: 'alerta'
} as const;

/**
 * Clase singleton para gestionar notificaciones
 */
class NotificationService {
  private static instance: NotificationService;
  private isInitialized = false;
  private serviceWorkerRegistration: ServiceWorkerRegistration | null = null;

  private constructor() {}

  /**
   * Obtener instancia única del servicio
   */
  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  /**
   * Inicializar el servicio de notificaciones
   */
  async initialize(): Promise<boolean> {
    if (this.isInitialized) {
      return true;
    }

    try {
      // Registrar Service Worker si está disponible
      if ('serviceWorker' in navigator) {
        this.serviceWorkerRegistration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });

        console.log('[NotificationService] Service Worker registrado:', this.serviceWorkerRegistration.scope);

        // Esperar a que el service worker esté activo
        await navigator.serviceWorker.ready;
        
        this.isInitialized = true;
        return true;
      } else {
        console.warn('[NotificationService] Service Workers no soportados');
        this.isInitialized = true;
        return false;
      }
    } catch (error) {
      console.error('[NotificationService] Error inicializando:', error);
      return false;
    }
  }

  /**
   * Verificar si las notificaciones están soportadas
   */
  isSupported(): boolean {
    return 'Notification' in window;
  }

  /**
   * Obtener estado de permisos
   */
  getPermission(): NotificationPermission {
    if (!this.isSupported()) {
      return 'denied';
    }
    return Notification.permission;
  }

  /**
   * Solicitar permisos de notificación
   */
  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) {
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch (error) {
      console.error('[NotificationService] Error solicitando permisos:', error);
      return 'denied';
    }
  }

  /**
   * Enviar notificación (toast + push opcional)
   */
  async send(payload: NotificationPayload): Promise<boolean> {
    const {
      title,
      body,
      type = 'info',
      icon = '/icon-192x192.png',
      badge = '/badge-72x72.png',
      tag,
      requireInteraction = false,
      silent = false,
      vibrate = [200, 100, 200],
      data = {},
      url,
      showPush = false
    } = payload;

    // Si no hay permiso y se solicita push, intentar obtenerlo
    if (showPush && this.getPermission() !== 'granted') {
      const permission = await this.requestPermission();
      if (permission !== 'granted') {
        console.warn('[NotificationService] Permiso denegado, mostrando solo toast');
        // Aquí podrías llamar a tu sistema de toast
        return false;
      }
    }

    // Enviar notificación push si está habilitada
    if (showPush && this.getPermission() === 'granted') {
      try {
        if (this.serviceWorkerRegistration) {
          // Usar service worker si está disponible
          const notificationOptions: any = {
            body,
            icon,
            badge,
            tag: tag || `${type}-${Date.now()}`,
            requireInteraction,
            silent,
            vibrate,
            data: { ...data, url, type }
          };
          await this.serviceWorkerRegistration.showNotification(title, notificationOptions);
        } else {
          // Fallback a notificación directa
          const notificationOptions: any = {
            body,
            icon,
            badge,
            tag: tag || `${type}-${Date.now()}`,
            requireInteraction,
            silent,
            vibrate,
            data: { ...data, url, type }
          };
          const notification = new Notification(title, notificationOptions);

          notification.onclick = () => {
            window.focus();
            if (url) {
              window.location.href = url;
            }
            notification.close();
          };
        }
        return true;
      } catch (error) {
        console.error('[NotificationService] Error enviando notificación push:', error);
        return false;
      }
    }

    return false;
  }

  /**
   * Métodos de conveniencia para diferentes tipos de notificaciones
   */
  async success(title: string, body: string, showPush = false, url?: string): Promise<boolean> {
    return this.send({
      title,
      body,
      type: 'success',
      showPush,
      url
    });
  }

  async error(title: string, body: string, showPush = false, url?: string): Promise<boolean> {
    return this.send({
      title,
      body,
      type: 'error',
      showPush,
      requireInteraction: true,
      url
    });
  }

  async warning(title: string, body: string, showPush = false, url?: string): Promise<boolean> {
    return this.send({
      title,
      body,
      type: 'warning',
      showPush,
      url
    });
  }

  async info(title: string, body: string, showPush = false, url?: string): Promise<boolean> {
    return this.send({
      title,
      body,
      type: 'info',
      showPush,
      url
    });
  }

  /**
   * Notificaciones específicas del dominio
   */
  async notifyNewSighting(animalName: string, location: string): Promise<boolean> {
    return this.send({
      title: '🐾 Nuevo Avistamiento',
      body: `Se ha reportado un ${animalName} en ${location}`,
      type: 'info',
      showPush: true,
      tag: NotificationTypes.AVISTAMIENTO_NUEVO,
      url: '/avistamientos'
    });
  }

  async notifyCaseUpdate(caseId: string, status: string): Promise<boolean> {
    return this.send({
      title: '📋 Actualización de Caso',
      body: `El caso #${caseId} ha sido actualizado a: ${status}`,
      type: 'info',
      showPush: true,
      tag: NotificationTypes.CASO_ACTUALIZADO,
      url: `/casos/${caseId}`
    });
  }

  async notifyNewMessage(senderName: string, preview: string): Promise<boolean> {
    return this.send({
      title: `💬 Mensaje de ${senderName}`,
      body: preview,
      type: 'info',
      showPush: true,
      tag: NotificationTypes.MENSAJE_NUEVO,
      url: '/mensajes'
    });
  }

  async notifyAdoptionRequest(animalName: string, userName: string): Promise<boolean> {
    return this.send({
      title: '🏠 Nueva Solicitud de Adopción',
      body: `${userName} está interesado en adoptar a ${animalName}`,
      type: 'success',
      showPush: true,
      tag: NotificationTypes.ADOPCION_SOLICITUD,
      url: '/adopciones',
      requireInteraction: true
    });
  }

  async notifySystemAlert(message: string, critical = false): Promise<boolean> {
    return this.send({
      title: critical ? '⚠️ Alerta Crítica' : '🔔 Alerta del Sistema',
      body: message,
      type: critical ? 'error' : 'warning',
      showPush: true,
      tag: NotificationTypes.ALERTA,
      requireInteraction: critical,
      vibrate: critical ? [300, 100, 300, 100, 300] : [200, 100, 200]
    });
  }

  /**
   * Programar notificación para más tarde (simulado con setTimeout)
   */
  async scheduleNotification(payload: NotificationPayload, delayMs: number): Promise<void> {
    setTimeout(() => {
      this.send(payload);
    }, delayMs);
  }

  /**
   * Limpiar notificaciones con un tag específico
   */
  async clearNotificationsByTag(tag: string): Promise<void> {
    if (!this.serviceWorkerRegistration) {
      return;
    }

    try {
      const notifications = await this.serviceWorkerRegistration.getNotifications({ tag });
      notifications.forEach(notification => notification.close());
    } catch (error) {
      console.error('[NotificationService] Error limpiando notificaciones:', error);
    }
  }

  /**
   * Limpiar todas las notificaciones
   */
  async clearAllNotifications(): Promise<void> {
    if (!this.serviceWorkerRegistration) {
      return;
    }

    try {
      const notifications = await this.serviceWorkerRegistration.getNotifications();
      notifications.forEach(notification => notification.close());
    } catch (error) {
      console.error('[NotificationService] Error limpiando notificaciones:', error);
    }
  }
}

// Exportar instancia única
export const notificationService = NotificationService.getInstance();
export default notificationService;
