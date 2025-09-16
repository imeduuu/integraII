import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";

// --- estilos base ---
const footerStyle: React.CSSProperties = {
  background: "#5e8ff8ff",
  color: "#fff",
  padding: "2rem",
  textAlign: "center",
  marginTop: "3rem"
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
          <Button className="mt-2">Quiénes Somos</Button>
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
