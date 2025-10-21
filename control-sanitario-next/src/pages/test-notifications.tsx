/**
 * Página de prueba para verificar notificaciones
 */
import React from 'react';
import { useNotification } from '../components/NotificationProvider';
import Button from '../components/ui/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TestNotifications() {
  const { addToast } = useNotification();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">
            🧪 Prueba de Notificaciones Toast
          </h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-600 mb-6 text-center">
              Haz clic en los botones para probar las notificaciones con fondo verde aqua
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={() => addToast('¡Operación exitosa! Todo funciona correctamente.', 'success')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
              >
                ✅ Notificación de Éxito
              </Button>
              
              <Button
                onClick={() => addToast('Ocurrió un error. Por favor intenta de nuevo.', 'error')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg"
              >
                ❌ Notificación de Error
              </Button>
              
              <Button
                onClick={() => addToast('Advertencia: Revisa los datos antes de continuar.', 'warning')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg"
              >
                ⚠️ Notificación de Advertencia
              </Button>
              
              <Button
                onClick={() => addToast('Esta es una notificación informativa.', 'info')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
              >
                ℹ️ Notificación de Información
              </Button>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-bold mb-2">📋 Características:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✅ Fondo verde aqua con gradiente</li>
                <li>✅ Iconos circulares de colores</li>
                <li>✅ Animación bounceIn al aparecer</li>
                <li>✅ Barra de progreso animada</li>
                <li>✅ Auto-cierre después de 5-7 segundos</li>
                <li>✅ Posición: esquina superior derecha</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
