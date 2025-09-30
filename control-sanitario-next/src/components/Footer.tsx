/**
 * Footer principal con información de contacto y modal de feedback
 */
import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";

// Estilos base del footer
const footerStyle: React.CSSProperties = {
  width: "100vw",
  minWidth: "100vw",
  left: 0,
  background: "linear-gradient(90deg,#2563eb 60%,#60a5fa 100%)",
  color: "#fff",
  padding: "2.5rem 0 2rem 0",
  textAlign: "center",
  marginTop: "3rem",
  boxShadow: "0 -2px 12px rgba(37,99,235,0.08)",
  position: "relative",
  zIndex: 10
};


/**
 * Componente de footer con información corporativa y formulario de contacto
 * Incluye: datos de contacto, redes sociales, modal de feedback
 */
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

        {/* Enlace a página institucional */}
        <a href="/quienes-somos">
          <Button className="mt-2">Quiénes Somos</Button>
        </a>

        {/* Enlaces a redes sociales */}
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <form className="flex flex-col gap-3" onClick={e => e.stopPropagation()}>
          <h2 className="mb-2 text-blue-700 font-bold text-lg">Envíanos tu Feedback</h2>
          <Input type="text" placeholder="Tu nombre" required />
          <Input type="email" placeholder="Tu correo" required />
          <textarea className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" style={{height: '100px'}} placeholder="Escribe tu mensaje..." required />
          <Button type="submit">Enviar</Button>
          <Button type="button" variant="secondary" className="mt-1" onClick={() => setShowModal(false)}>Cancelar</Button>
        </form>
      </Modal>

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
