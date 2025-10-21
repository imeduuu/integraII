/**
 * Página de prueba para el sistema de notificaciones Toast
 * Acceder en: http://localhost:3000/test-toast
 */
import React from 'react';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/ToastContainer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TestToastPage: React.FC = () => {
  const { toasts, success, error, info, warning, removeToast } = useToast();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            🔔 Prueba de Notificaciones Toast
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Haz clic en los botones para probar diferentes tipos de notificaciones
          </p>
        </div>

        {/* Sección: Tipos Básicos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Tipos Básicos de Notificaciones
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => success('¡Operación completada exitosamente!')}
              className="px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-md"
            >
              ✅ Éxito
            </button>

            <button
              onClick={() => error('Ha ocurrido un error. Por favor, inténtalo de nuevo.')}
              className="px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-md"
            >
              ❌ Error
            </button>

            <button
              onClick={() => info('Esta es una notificación informativa.')}
              className="px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-md"
            >
              ℹ️ Información
            </button>

            <button
              onClick={() => warning('¡Atención! Esta es una advertencia importante.')}
              className="px-6 py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-md"
            >
              ⚠️ Advertencia
            </button>
          </div>
        </div>

        {/* Sección: Opciones Personalizadas */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Opciones Personalizadas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => success('Toast con 10 segundos de duración', { duration: 10000 })}
              className="px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors shadow-md"
            >
              ⏱️ Duración Larga (10s)
            </button>

            <button
              onClick={() => error('Toast que no se cierra automáticamente', { duration: 0 })}
              className="px-6 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium transition-colors shadow-md"
            >
              🔒 Sin Auto-cierre
            </button>

            <button
              onClick={() => info('Toast no cerrable manualmente', { dismissible: false, duration: 3000 })}
              className="px-6 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-colors shadow-md"
            >
              🚫 No Cerrable
            </button>

            <button
              onClick={() => {
                for (let i = 0; i < 3; i++) {
                  setTimeout(() => {
                    success(`Notificación ${i + 1} de 3`);
                  }, i * 500);
                }
              }}
              className="px-6 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors shadow-md"
            >
              📚 Múltiples Toasts
            </button>

            <button
              onClick={() => success('Toast con mensaje muy largo: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')}
              className="px-6 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors shadow-md"
            >
              📝 Mensaje Largo
            </button>

            <button
              onClick={() => warning('Toast rápido', { duration: 2000 })}
              className="px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-md"
            >
              ⚡ Duración Corta (2s)
            </button>
          </div>
        </div>

        {/* Sección: Casos de Uso Reales */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Simulación de Casos de Uso Reales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => {
                info('Guardando cambios...');
                setTimeout(() => success('Perfil actualizado correctamente'), 2000);
              }}
              className="px-6 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors shadow-md"
            >
              💾 Simular Guardado
            </button>

            <button
              onClick={() => {
                info('Procesando solicitud...');
                setTimeout(() => error('No se pudo completar la operación. Verifica tu conexión.'), 2000);
              }}
              className="px-6 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-colors shadow-md"
            >
              🔌 Simular Error de Red
            </button>

            <button
              onClick={() => warning('Tu sesión expirará en 5 minutos. Por favor, guarda tu trabajo.', { duration: 8000 })}
              className="px-6 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors shadow-md"
            >
              ⏰ Advertencia de Sesión
            </button>

            <button
              onClick={() => {
                success('Archivo cargado exitosamente');
                setTimeout(() => info('Procesando archivo...'), 1000);
                setTimeout(() => success('¡Listo! Tu archivo está disponible'), 3000);
              }}
              className="px-6 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors shadow-md"
            >
              📤 Simular Subida de Archivo
            </button>
          </div>
        </div>

        {/* Sección: Información */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            ℹ️ Instrucciones de Prueba
          </h2>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⌨️</span>
              <div>
                <strong className="block mb-1">Navegación por Teclado:</strong>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Presiona <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Tab</kbd> para navegar a un toast</li>
                  <li>Presiona <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Escape</kbd> para cerrar el toast enfocado</li>
                  <li>Presiona <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Enter</kbd> o <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Space</kbd> en el botón de cierre</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">♿</span>
              <div>
                <strong className="block mb-1">Accesibilidad:</strong>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Compatible con lectores de pantalla</li>
                  <li>Focus automático al aparecer</li>
                  <li>Contraste de color AAA</li>
                  <li>Atributos ARIA completos</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">🎨</span>
              <div>
                <strong className="block mb-1">Características Visuales:</strong>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Animaciones suaves de entrada y salida</li>
                  <li>Barra de progreso visual</li>
                  <li>Soporte para modo oscuro</li>
                  <li>Diseño responsive</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <strong className="block mb-1">Pruebas Adicionales:</strong>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Prueba en modo oscuro (toggle del navbar)</li>
                  <li>Redimensiona la ventana para ver responsive</li>
                  <li>Crea múltiples toasts (máximo 5 simultáneos)</li>
                  <li>Prueba hover sobre los toasts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">📊 Toasts Activos</h3>
          <p className="text-3xl font-bold">{toasts.length} / 5</p>
          <p className="text-sm opacity-90 mt-2">Máximo 5 toasts simultáneos permitidos</p>
        </div>
      </main>

      <Footer />

      {/* Contenedor de Toasts */}
      <ToastContainer
        toasts={toasts}
        onDismiss={removeToast}
        position="top-right"
        maxToasts={5}
      />
    </div>
  );
};

export default TestToastPage;
