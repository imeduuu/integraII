import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

// --- estilos base ---
const footerStyle: React.CSSProperties = {
  background: "#5e8ff8ff",
  color: "#fff",
  padding: "2rem",
  textAlign: "center",
  marginTop: "3rem"
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  background: "linear-gradient(90deg,#2563eb 60%,#60a5fa 100%)",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  transition: "transform 0.2s",
  marginTop: "10px"
};

const modalStyle: React.CSSProperties = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
};

const formStyle: React.CSSProperties = {
  maxWidth: "400px",
  width: "90vw",
  padding: "32px",
  background: "#fff",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  animation: "fadeIn 0.4s"
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "14px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const Footer: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <footer style={footerStyle}>
        <h2 style={{ fontWeight: 800, fontSize: "1.5rem" }}>Huella Segura</h2>
        <p>📞 +56 9 1234 5678</p>
        <p>
          📧{" "}
          <span
            onClick={() => setShowModal(true)}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            contacto@huellasegura.cl
          </span>
        </p>

        {/* Botón Quiénes Somos */}
        <a href="/quienes-somos">
          <button
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            Quiénes Somos
          </button>
        </a>

        {/* Redes sociales */}
        <div style={{ marginTop: "1rem", fontSize: "1.4rem" }}>
          <a href="#" style={{ margin: "0 10px" }}>
            <FaFacebook />
          </a>
          <a href="#" style={{ margin: "0 10px" }}>
            <FaTwitter />
          </a>
          <a href="#" style={{ margin: "0 10px" }}>
            <FaInstagram />
          </a>
        </div>

        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          © {new Date().getFullYear()} Huella Segura - Todos los derechos reservados
        </p>
      </footer>

      {/* Modal Feedback */}
      {showModal && (
        <div style={modalStyle} onClick={() => setShowModal(false)}>
          <form style={formStyle} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: "1rem", color: "#2563eb" }}>Envíanos tu Feedback</h2>
            <input style={inputStyle} type="text" placeholder="Tu nombre" required />
            <input style={inputStyle} type="email" placeholder="Tu correo" required />
            <textarea
              style={{ ...inputStyle, height: "100px" }}
              placeholder="Escribe tu mensaje..."
              required
            />
            <button style={buttonStyle} type="submit">
              Enviar
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              style={{ ...buttonStyle, background: "#e5e7eb", color: "#2563eb", marginTop: "8px" }}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}

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

export default Footer;
