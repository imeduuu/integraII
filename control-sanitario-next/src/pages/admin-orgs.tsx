import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const backgroundUrl = "/perrito.png";

const AdminOrgs = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "75vh",
          width: "100%",
          backgroundImage: `linear-gradient(rgba(37,99,235,0.15),rgba(255,255,255,0.8)), url(${backgroundUrl})`,
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
            background: "rgba(255,255,255,0.75)",
            borderRadius: 24,
            boxShadow: "0 8px 32px rgba(37,99,235,0.10)",
            padding: "3vw 6vw",
            maxWidth: 900,
            width: "95vw",
            border: "1px solid #e0e7ef",
            animation: "fadeIn 0.7s",
            backdropFilter: "blur(10px)",
          }}
        >
          <h1
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              color: "#2563eb",
              marginBottom: 20,
              textAlign: "center",
              letterSpacing: "1px",
            }}
          >
            Administración de Organizaciones
          </h1>

          {/* Tabla */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f3f4f6" }}>
                <th style={thStyle}>Nombre</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Estado</th>
                <th style={thStyle}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: "center" }}>
                <td style={tdStyle}>Simon</td>
                <td style={tdStyle}>hola123@gmail.com</td>
                <td style={tdStyle}>Activa</td>
                <td style={tdStyle}>
                  <button style={buttonStyle}>Editar</button>
                  <button style={{ ...buttonStyle, background: "#ef4444" }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </>
  );
};

const thStyle: React.CSSProperties = {
  padding: "14px",
  textAlign: "left",
  fontWeight: 600,
  color: "#374151",
  borderBottom: "2px solid #e5e7eb",
};

const tdStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderBottom: "1px solid #e5e7eb",
  fontSize: "0.95rem",
  color: "#374151",
};

const buttonStyle: React.CSSProperties = {
  padding: "6px 12px",
  marginRight: "8px",
  border: "none",
  borderRadius: "6px",
  background: "linear-gradient(90deg,#2563eb 60%,#60a5fa 100%)",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 2px 6px rgba(37,99,235,0.15)",
  transition: "transform 0.2s",
};

export default AdminOrgs;
