/**
 * Componente para gestionar permisos y configuración de notificaciones push
 * Permite al usuario activar/desactivar notificaciones y ver su estado
 */
import React, { useState, useEffect } from 'react';
import { usePushNotifications } from '../hooks/usePushNotifications';

export interface PushNotificationManagerProps {
  showStatus?: boolean;
  autoRequest?: boolean;
  onPermissionChange?: (permission: NotificationPermission) => void;
}

/**
 * Componente que gestiona la configuración de notificaciones push
 * Puede mostrar estado actual, solicitar permisos y probar notificaciones
 */
export const PushNotificationManager: React.FC<PushNotificationManagerProps> = ({
  showStatus = true,
  autoRequest = false,
  onPermissionChange
}) => {
  const {
    permission,
    isSupported,
    isServiceWorkerReady,
    requestPermission,
    showNotification
  } = usePushNotifications();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (autoRequest && permission === 'default') {
      handleRequestPermission();
    }
  }, [autoRequest, permission]);

  useEffect(() => {
    if (onPermissionChange) {
      onPermissionChange(permission);
    }
  }, [permission, onPermissionChange]);

  const handleRequestPermission = async () => {
    setIsLoading(true);
    await requestPermission();
    setIsLoading(false);
  };

  const handleTestNotification = async () => {
    await showNotification({
      title: '🔔 Notificación de prueba',
      body: '¡Las notificaciones están funcionando correctamente!',
      tag: 'test-notification',
      requireInteraction: false
    });
  };

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <span className="text-2xl mr-3">⚠️</span>
          <div>
            <h3 className="font-semibold text-yellow-800">Notificaciones no soportadas</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Tu navegador no soporta notificaciones push. Intenta usar un navegador más moderno.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Estado de notificaciones */}
      {showStatus && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
            <span className="text-2xl mr-2">🔔</span>
            Estado de Notificaciones
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Soporte del navegador:</span>
              <span className={`font-medium ${isSupported ? 'text-green-600' : 'text-red-600'}`}>
                {isSupported ? '✅ Soportado' : '❌ No soportado'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Service Worker:</span>
              <span className={`font-medium ${isServiceWorkerReady ? 'text-green-600' : 'text-yellow-600'}`}>
                {isServiceWorkerReady ? '✅ Activo' : '⏳ Pendiente'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Permisos:</span>
              <span className={`font-medium ${
                permission === 'granted' ? 'text-green-600' :
                permission === 'denied' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {permission === 'granted' ? '✅ Concedido' :
                 permission === 'denied' ? '❌ Denegado' :
                 '⏳ Pendiente'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Acciones */}
      <div className="space-y-2">
        {permission === 'default' && (
          <button
            onClick={handleRequestPermission}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Solicitando permisos...
              </>
            ) : (
              <>
                <span className="mr-2">🔔</span>
                Activar Notificaciones
              </>
            )}
          </button>
        )}

        {permission === 'granted' && (
          <button
            onClick={handleTestNotification}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <span className="mr-2">🧪</span>
            Probar Notificación
          </button>
        )}

        {permission === 'denied' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <span className="text-2xl mr-3">🚫</span>
              <div>
                <h4 className="font-semibold text-red-800">Notificaciones bloqueadas</h4>
                <p className="text-sm text-red-700 mt-1">
                  Has bloqueado las notificaciones. Para activarlas:
                </p>
                <ol className="text-sm text-red-700 mt-2 ml-4 list-decimal">
                  <li>Haz clic en el ícono de candado/información en la barra de direcciones</li>
                  <li>Busca la opción de "Notificaciones"</li>
                  <li>Cambia el permiso a "Permitir"</li>
                  <li>Recarga la página</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Información adicional */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-2">
          💡 Sobre las notificaciones
        </h4>
        <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1 ml-4 list-disc">
          <li>Las notificaciones te alertan sobre eventos importantes</li>
          <li>Funcionan incluso cuando la aplicación no está abierta</li>
          <li>Puedes desactivarlas en cualquier momento</li>
          <li>Los datos de notificación están protegidos y encriptados</li>
        </ul>
      </div>
    </div>
  );
};

export default PushNotificationManager;
