import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InfoBox from "../components/InfoBox";
import AdminActionModal from "../components/AdminActionModal";
import ProtectedRoute from "../components/ProtectedRoute";

const backgroundUrl = "/admin-bg.png";

const buttonStyle: React.CSSProperties = {
  width: "clamp(140px, 40vw, 180px)",
  padding: "12px",
  background: "linear-gradient(90deg,#2563eb 60%,#60a5fa 100%)",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: 700,
  fontSize: "1.08rem",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(37,99,235,0.12)",
  transition: "transform 0.2s",
  textDecoration: "none",
  textAlign: "center",
  lineHeight: "2.5rem",
};

const AdminHome: React.FC = () => {
  const [showStats, setShowStats] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
  } | null>(null);

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
        {/* Hero / portada */}
        <div
          style={{
            minHeight: "60vh",
            width: "100%",
            backgroundImage: `linear-gradient(rgba(37,99,235,0.25),rgba(255,255,255,0.85)), url(${backgroundUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "5vw 0",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.8)",
              borderRadius: 24,
              boxShadow: "0 8px 32px rgba(37,99,235,0.12)",
              padding: "3vw 6vw",
              maxWidth: 480,
              width: "95vw",
              textAlign: "center",
              border: "1px solid #e0e7ef",
              animation: "fadeIn 0.7s",
              backdropFilter: "blur(10px)",
            }}
          >
            <h1
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                color: "#2563eb",
                marginBottom: 12,
              }}
            >
              Panel de Administración
            </h1>
            <p
              style={{
                color: "#334155",
                fontSize: "1.1rem",
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              Gestiona usuarios, revisa campañas y consulta estadísticas del sistema.
            </p>

            {/* Botones que abren modales */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "16px",
                marginBottom: "10px",
                flexWrap: "wrap",
              }}
            >
              <button
                style={buttonStyle}
                onClick={() =>
                  openModal(
                    "Editar Usuario",
                    "¿Estás seguro que deseas editar este usuario?",
                    () => {
                      alert("Usuario editado");
                      setShowModal(false);
                    },
                    "Sí, editar"
                  )
                }
              >
                Gestión de Usuarios
              </button>

              <button
                style={buttonStyle}
                onClick={() =>
                  openModal(
                    "Aprobar Campaña",
                    "¿Deseas aprobar esta campaña?",
                    () => {
                      alert("Campaña aprobada");
                      setShowModal(false);
                    },
                    "Sí, aprobar"
                  )
                }
              >
                Revisar Campañas
              </button>

              <button
                style={{ ...buttonStyle, background: "#e5e7eb", color: "#2563eb" }}
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
                {showStats ? "Ocultar Estadísticas" : "Ver Estadísticas"}
              </button>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <main
          style={{
            padding: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#2563eb",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Resumen del sistema
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              width: "100%",
              marginBottom: "2rem",
            }}
          >
            <InfoBox title="Usuarios activos" value={120} link="/admin/users" />
            <InfoBox title="Campañas en curso" value={12} link="/admin/campaigns" />
            <InfoBox title="Reportes generados" value={45} link="/admin/reports" />
          </div>

          {showStats && (
            <div
              style={{
                width: "100%",
                maxWidth: "800px",
                background: "white",
                padding: "2rem",
                borderRadius: "18px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                animation: "fadeIn 0.5s",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#2563eb",
                  marginBottom: "1rem",
                }}
              >
                Estadísticas Generales
              </h3>
              <p style={{ color: "#334155" }}>
                Aquí irán gráficas o métricas más detalladas en el futuro.
              </p>
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

        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px);}
              to { opacity: 1; transform: translateY(0);}
            }
          `}
        </style>
      </>
    </ProtectedRoute>
  );
};

export default AdminHome;
