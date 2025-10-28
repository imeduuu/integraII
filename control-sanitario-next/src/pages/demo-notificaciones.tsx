/**
 * Página de demostración del sistema de notificaciones push
 * Permite probar todos los tipos de notificaciones (toast + push)
 * Acceso: http://localhost:3000/demo-notificaciones
 */
import React, { useState } from 'react';
import Head from 'next/head';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { PushNotificationManager } from '../components/PushNotificationManager';
import { notificationService } from '../services/notificationService';

const DemoNotificaciones: React.FC = () => {
  const {
    permission,
    isSupported,
    isServiceWorkerReady,
    success,
    error,
    warning,
    info,
    showNotification
  } = usePushNotifications();

  const [notificationTitle, setNotificationTitle] = useState('🔔 Notificación de prueba');
  const [notificationBody, setNotificationBody] = useState('Este es un mensaje de prueba del sistema de notificaciones');
  const [delaySeconds, setDelaySeconds] = useState(0);

  const handleCustomNotification = async () => {
    if (delaySeconds > 0) {
      info('Notificación programada', `Se mostrará en ${delaySeconds} segundos`, true);
      await notificationService.scheduleNotification({
        title: notificationTitle,
        body: notificationBody,
        showPush: true,
        type: 'info'
      }, delaySeconds * 1000);
    } else {
      await showNotification({
        title: notificationTitle,
        body: notificationBody,
        tag: 'custom-notification'
      });
    }
  };

  const handleDomainNotifications = async () => {
    // Probar notificaciones del dominio
    await notificationService.notifyNewSighting('Perro Callejero', 'Parque Central');
    
    setTimeout(() => {
      notificationService.notifyCaseUpdate('12345', 'En Tratamiento');
    }, 2000);

    setTimeout(() => {
      notificationService.notifyNewMessage('Dr. Juan Pérez', '¿Podrías revisar el caso #12345?');
    }, 4000);

    setTimeout(() => {
      notificationService.notifyAdoptionRequest('Max', 'María González');
    }, 6000);
  };

  const handleSystemAlerts = async () => {
    await notificationService.notifySystemAlert('Mantenimiento programado para mañana a las 2am', false);
    
    setTimeout(() => {
      notificationService.notifySystemAlert('¡Alerta! Nivel crítico de casos sin atender', true);
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>Demo de Notificaciones | Control Sanitario</title>
        <meta name="description" content="Demostración del sistema de notificaciones push" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              🔔 Demostración de Notificaciones
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Prueba todas las funcionalidades del sistema de notificaciones push
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Panel de configuración */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                ⚙️ Configuración
              </h2>
              <PushNotificationManager showStatus={true} />
            </div>

            {/* Panel de información */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                📊 Estado del Sistema
              </h2>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Navegador:</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      isSupported 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {isSupported ? 'Compatible' : 'No Compatible'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {navigator.userAgent.split(/[()]/)[1] || 'Desconocido'}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Service Worker:</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      isServiceWorkerReady
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {isServiceWorkerReady ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Permisos:</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      permission === 'granted'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : permission === 'denied'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {permission === 'granted' ? 'Concedido' : permission === 'denied' ? 'Denegado' : 'Pendiente'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pruebas básicas */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              🧪 Pruebas Básicas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => success('¡Éxito!', 'Operación completada correctamente', true)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                ✅ Success
              </button>
              <button
                onClick={() => error('Error', 'Algo salió mal', true)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                ❌ Error
              </button>
              <button
                onClick={() => warning('Advertencia', 'Ten cuidado con esto', true)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                ⚠️ Warning
              </button>
              <button
                onClick={() => info('Información', 'Esto es un mensaje informativo', true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                ℹ️ Info
              </button>
            </div>
          </div>

          {/* Notificación personalizada */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              ✨ Notificación Personalizada
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mensaje
                </label>
                <textarea
                  value={notificationBody}
                  onChange={(e) => setNotificationBody(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Retraso (segundos)
                </label>
                <input
                  type="number"
                  value={delaySeconds}
                  onChange={(e) => setDelaySeconds(Number(e.target.value))}
                  min="0"
                  max="60"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleCustomNotification}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                🚀 Enviar Notificación
              </button>
            </div>
          </div>

          {/* Notificaciones del dominio */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              🏥 Notificaciones del Sistema
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleDomainNotifications}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                🐾 Simular Eventos del Sistema
              </button>
              <button
                onClick={handleSystemAlerts}
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                🚨 Simular Alertas
              </button>
              <button
                onClick={() => notificationService.clearAllNotifications()}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                🗑️ Limpiar Notificaciones
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                🏠 Volver al Inicio
              </button>
            </div>
          </div>

          {/* Información técnica */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              📚 Información Técnica
            </h2>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Sistema implementado:</strong> Notificaciones Web API + Service Workers</p>
              <p><strong>Soporte PWA:</strong> Manifest.json configurado para instalación</p>
              <p><strong>Estrategia:</strong> Toast notifications + Push notifications nativas</p>
              <p><strong>Compatibilidad:</strong> Chrome, Firefox, Edge, Safari 16+, Opera</p>
              <p><strong>Características:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Notificaciones en segundo plano</li>
                <li>Vibración personalizada</li>
                <li>Acciones interactivas</li>
                <li>Programación de notificaciones</li>
                <li>Gestión de permisos</li>
                <li>Fallback a toast cuando no hay permisos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemoNotificaciones;
