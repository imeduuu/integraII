
/**
 * Dashboard principal de administradores con gestión de usuarios, campañas y estadísticas
 */
import React, { useState } from "react";
import Button from "../components/ui/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InfoBox from "../components/InfoBox";
import AdminActionModal from "../components/AdminActionModal";
import ProtectedRoute from "../components/ProtectedRoute";
import { useNotification } from "../components/NotificationProvider";
import { HiUserGroup, HiSpeakerphone, HiChartBar, HiCog } from "react-icons/hi";

const backgroundUrl = "/admin-bg.png";

/**
 * Página principal del panel administrativo
 * Incluye: gestión de usuarios, revisión de campañas, estadísticas y modales de confirmación
 */
const AdminHome: React.FC = () => {
  const [showStats, setShowStats] = useState(false); // Control de visibilidad de estadísticas
  const [showModal, setShowModal] = useState(false); // Control del modal de confirmación
  const { addToast } = useNotification();
  // Configuración dinámica del modal
  const [modalContent, setModalContent] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
  } | null>(null);

  // Helper para abrir modales con contenido personalizado
  const openModal = (
    title: string,
    message: string,
    onConfirm: () => void,
    confirmText?: string
  ) => {
    setModalContent({ title, message, onConfirm, confirmText });
    setShowModal(true);
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <>
        <Navbar />
        {/* Sección hero con fondo de imagen y panel principal */}
        <div
          className="min-h-[60vh] w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-2 py-8 tablet:px-6 tablet:py-12"
          style={{
            backgroundImage: `linear-gradient(rgba(37,99,235,0.25),rgba(255,255,255,0.85)), url(${backgroundUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-white/80 rounded-3xl shadow-2xl border border-blue-100 p-8 max-w-lg w-full text-center animate-fadeIn backdrop-blur-md tablet:max-w-2xl tablet:p-10">
            <h1 className="font-extrabold text-3xl md:text-4xl text-blue-700 mb-3 flex items-center justify-center gap-2 tablet:text-5xl tablet:mb-4">
              <HiCog className="w-8 h-8 text-blue-400 tablet:w-10 tablet:h-10" /> Panel de Administración
            </h1>
            <p className="text-blue-900 text-lg mb-6 font-medium tablet:text-xl tablet:mb-8">
              Gestiona usuarios, revisa campañas y consulta estadísticas del sistema.
            </p>
            {/* Botones de acciones administrativas principales */}
            <div className="flex flex-wrap justify-center gap-4 mb-2 tablet:gap-6">
              <Button
                variant="primary"
                className="px-6 py-3 rounded-xl bg-blue-600 shadow-md hover:bg-blue-700 flex items-center gap-2 focus:ring-2 focus:ring-blue-400 tablet-button touch-feedback tablet:px-8 tablet:py-4 tablet:text-lg tablet:min-h-[48px]"
                onClick={() =>
                  openModal(
                    "Editar Usuario",
                    "¿Estás seguro que deseas editar este usuario?",
                    () => {
                      addToast('✓ Usuario editado correctamente.', 'success');
                      setShowModal(false);
                    },
                    "Sí, editar"
                  )
                }
              >
                <HiUserGroup className="w-5 h-5 tablet:w-6 tablet:h-6" /> Gestión de Usuarios
              </Button>
              {/* Migración: Se reemplaza el botón nativo por el componente Button UI estándar. */}
              <Button
                variant="primary"
                className="px-6 py-3 rounded-xl bg-green-500 shadow-md hover:bg-green-600 flex items-center gap-2 focus:ring-2 focus:ring-green-400 tablet-button touch-feedback tablet:px-8 tablet:py-4 tablet:text-lg tablet:min-h-[48px]"
                onClick={() =>
                  openModal(
                    "Aprobar Campaña",
                    "¿Deseas aprobar esta campaña?",
                    () => {
                      addToast('✓ Campaña aprobada exitosamente.', 'success');
                      setShowModal(false);
                    },
                    "Sí, aprobar"
                  )
                }
              >
                <HiSpeakerphone className="w-5 h-5 tablet:w-6 tablet:h-6" /> Revisar Campañas
              </Button>
              {/* Migración: Se reemplaza el botón nativo por el componente Button UI estándar. */}
              <Button
                variant="secondary"
                className={`px-6 py-3 rounded-xl font-semibold shadow-md flex items-center gap-2 focus:ring-2 focus:ring-blue-400 tablet-button touch-feedback tablet:px-8 tablet:py-4 tablet:text-lg tablet:min-h-[48px] ${showStats ? "bg-gray-200 text-blue-700" : "bg-blue-200 text-blue-700"}`}
                onClick={() =>
                  openModal(
                    "Ver Estadísticas",
                    "Aquí se mostrarán estadísticas detalladas.",
                    () => {
                      setShowStats(!showStats);
                      setShowModal(false);
                    },
                    "Cerrar"
                  )
                }
              >
                <HiChartBar className="w-5 h-5 tablet:w-6 tablet:h-6" />
                {showStats ? "Ocultar Estadísticas" : "Ver Estadísticas"}
              </Button>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <main className="px-4 py-8 max-w-6xl mx-auto flex flex-col items-center tablet:px-6 tablet:py-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-blue-700 mb-6 text-center tablet:text-4xl tablet:mb-8">Resumen del sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8 tablet:gap-8">
            <InfoBox title="Usuarios activos" value={120} link="/admin/users" />
            <InfoBox title="Campañas en curso" value={12} link="/admin/campaigns" />
            <InfoBox title="Reportes generados" value={45} link="/admin/reports" />
          </div>
          {showStats && (
            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg animate-fadeIn tablet:max-w-3xl tablet:p-10">
              <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2 tablet:text-2xl tablet:mb-5">
                <HiChartBar className="w-6 h-6 text-blue-400 tablet:w-7 tablet:h-7" /> Estadísticas Generales
              </h3>
              <p className="text-blue-900 tablet:text-lg">Aquí irán gráficas o métricas más detalladas en el futuro.</p>
            </div>
          )}
        </main>

        {/* Renderizar modal */}
        {modalContent && (
          <AdminActionModal
            isOpen={showModal}
            title={modalContent.title}
            message={modalContent.message}
            onConfirm={modalContent.onConfirm}
            onCancel={() => setShowModal(false)}
            confirmText={modalContent.confirmText || "Confirmar"}
          />
        )}

        <Footer />
        {/* Animación fadeIn personalizada y comentario de estilos */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.7s;
          }
        `}</style>
        {/* Comentario: Se utiliza Tailwind CSS, iconos y animación fadeIn para mejorar la experiencia visual y responsividad. */}
      </>
    </ProtectedRoute>
  );
};

export default AdminHome;
