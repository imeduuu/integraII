/**
 * Página de prueba para visualizar las mejoras en los modales
 * Solo para desarrollo - NO USAR EN PRODUCCIÓN
 */
import React, { useState } from "react";
import AdminActionModal from "../components/AdminActionModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";

const TestModalPage: React.FC = () => {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showDangerModal, setShowDangerModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🎨 Prueba de Modales Mejorados
            </h1>
            <p className="text-gray-600 mb-8">
              Esta página te permite probar todas las variantes y mejoras implementadas en los modales.
            </p>

            <div className="space-y-6">
              {/* Sección Warning */}
              <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded">
                <h2 className="text-xl font-semibold text-yellow-800 mb-2">
                  ⚠️ Variante Warning (Advertencia)
                </h2>
                <p className="text-yellow-700 mb-3">
                  Úsala para acciones que requieren confirmación pero no son destructivas.
                </p>
                <Button onClick={() => setShowWarningModal(true)}>
                  Abrir Modal Warning
                </Button>
              </div>

              {/* Sección Danger */}
              <div className="border-l-4 border-red-400 bg-red-50 p-4 rounded">
                <h2 className="text-xl font-semibold text-red-800 mb-2">
                  🗑️ Variante Danger (Peligro)
                </h2>
                <p className="text-red-700 mb-3">
                  Úsala para acciones destructivas como eliminaciones permanentes.
                </p>
                <Button onClick={() => setShowDangerModal(true)}>
                  Abrir Modal Danger
                </Button>
              </div>

              {/* Sección Info */}
              <div className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">
                  ℹ️ Variante Info (Información)
                </h2>
                <p className="text-blue-700 mb-3">
                  Úsala para mostrar información importante que requiere confirmación.
                </p>
                <Button onClick={() => setShowInfoModal(true)}>
                  Abrir Modal Info
                </Button>
              </div>

              {/* Sección Success */}
              <div className="border-l-4 border-green-400 bg-green-50 p-4 rounded">
                <h2 className="text-xl font-semibold text-green-800 mb-2">
                  ✓ Variante Success (Éxito)
                </h2>
                <p className="text-green-700 mb-3">
                  Úsala para confirmar acciones exitosas.
                </p>
                <Button onClick={() => setShowSuccessModal(true)}>
                  Abrir Modal Success
                </Button>
              </div>
            </div>

            {/* Características implementadas */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ✨ Características implementadas:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Animaciones suaves:</strong> Fade in/out y slide in/out</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Gestión de focus:</strong> Focus automático y focus trap</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Soporte de teclado:</strong> Presiona ESC para cerrar, Tab para navegar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Accesibilidad:</strong> Atributos ARIA y navegación por teclado</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Iconos contextuales:</strong> Cada variante tiene su propio icono</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Diseño responsive:</strong> Se adapta a móvil y desktop</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      <AdminActionModal
        isOpen={showWarningModal}
        title="Cambiar configuración"
        message="¿Estás seguro de que deseas cambiar esta configuración? Esta acción afectará a todos los usuarios."
        onConfirm={() => {
          alert("Configuración cambiada ✓");
          setShowWarningModal(false);
        }}
        onCancel={() => setShowWarningModal(false)}
        confirmText="Sí, cambiar"
        cancelText="No, mantener"
        variant="warning"
      />

      <AdminActionModal
        isOpen={showDangerModal}
        title="¿Eliminar usuario permanentemente?"
        message="Esta acción no se puede deshacer. Se eliminarán todos los datos del usuario incluyendo publicaciones, comentarios y favoritos."
        onConfirm={() => {
          alert("Usuario eliminado ✓");
          setShowDangerModal(false);
        }}
        onCancel={() => setShowDangerModal(false)}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        variant="danger"
      />

      <AdminActionModal
        isOpen={showInfoModal}
        title="Información importante"
        message="Esta acción enviará una notificación a todos los usuarios activos. ¿Deseas continuar?"
        onConfirm={() => {
          alert("Notificación enviada ✓");
          setShowInfoModal(false);
        }}
        onCancel={() => setShowInfoModal(false)}
        confirmText="Sí, enviar"
        cancelText="No, cancelar"
        variant="info"
      />

      <AdminActionModal
        isOpen={showSuccessModal}
        title="¡Operación completada!"
        message="Los cambios se han guardado exitosamente. ¿Deseas ver el resultado?"
        onConfirm={() => {
          alert("Redirigiendo... ✓");
          setShowSuccessModal(false);
        }}
        onCancel={() => setShowSuccessModal(false)}
        confirmText="Ver resultado"
        cancelText="Cerrar"
        variant="success"
      />

      <Footer />
    </>
  );
};

export default TestModalPage;
