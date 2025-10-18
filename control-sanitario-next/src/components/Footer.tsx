/**
 * Footer principal con información de contacto y modal de feedback
 */
import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";





/**
 * Componente de footer con información corporativa y formulario de contacto
 * Incluye: datos de contacto, redes sociales, modal de feedback
 */
const Footer: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>

      <footer
        className="w-full min-w-full left-0 py-10 px-4 md:px-0 text-center mt-12 shadow-lg relative z-10 text-white border-t border-blue-200 dark:border-gray-700"
        style={{
          background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
          backgroundColor: '#2563eb',
        }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
          <h2 className="font-extrabold text-3xl mb-1 tracking-wide drop-shadow">Huella Segura</h2>
          <div className="flex flex-col sm:flex-row items-center gap-2 text-base font-medium">
            <span className="flex items-center gap-2 text-pink-200 dark:text-pink-300">
              <svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-1.3L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7' /></svg>
              +56 9 1234 5678
            </span>
            <span className="hidden sm:inline text-blue-100 dark:text-gray-500">|</span>
            <span className="flex items-center gap-2">
              <svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5 text-blue-200 dark:text-blue-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12H8m8 0a8 8 0 11-16 0 8 8 0 0116 0z' /></svg>
              <span
                onClick={() => setShowModal(true)}
                className="underline cursor-pointer hover:text-blue-200 dark:hover:text-blue-400 transition"
              >
                contacto@huellasegura.cl
              </span>
            </span>
          </div>

          <a href="/quienes-somos" className="inline-block mt-2">
            <Button className="rounded-full px-6 py-2 font-semibold shadow-md bg-white/90 text-blue-700 hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-200 dark:hover:bg-gray-700 transition">Quiénes Somos</Button>
          </a>

          <div className="mt-3 flex justify-center gap-6 text-2xl">
            <a href="#" className="hover:text-blue-300 dark:hover:text-blue-400 transition" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-blue-300 dark:hover:text-blue-400 transition" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-300 dark:hover:text-blue-400 transition" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>

          <p className="mt-4 text-xs text-white/80 dark:text-gray-200">
            © {new Date().getFullYear()} Huella Segura - Todos los derechos reservados
          </p>
        </div>
        <style>{`
          @media (prefers-color-scheme: dark) {
            footer {
              background: linear-gradient(90deg, #111827 60%, #1e293b 100%) !important;
              color: #fff;
            }
          }
        `}</style>
      </footer>

      {/* Modal Feedback */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <form className="flex flex-col gap-3 dark:bg-gray-900 dark:text-white" onClick={e => e.stopPropagation()}>
          <h2 className="mb-2 text-blue-700 dark:text-blue-300 font-bold text-lg">Envíanos tu Feedback</h2>
          <Input type="text" placeholder="Tu nombre" required />
          <Input type="email" placeholder="Tu correo" required />
          <textarea className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700" style={{height: '100px'}} placeholder="Escribe tu mensaje..." required />
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