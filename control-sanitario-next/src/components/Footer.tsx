import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-secondary text-white p-6 mt-10">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
      
      {/* Nombre del proyecto */}
      <div>
        <h2 className="text-xl font-bold">Huella Segura</h2>
      </div>

      {/* Botón Quiénes Somos */}
      <div className="flex justify-center items-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Quiénes Somos
        </button>
      </div>

      {/* Contacto y redes */}
      <div>
        <h3 className="text-lg font-semibold">Contacto</h3>
        <p>📞 +56 9 1234 5678</p>
        <p>📧 huellasegura@gmail.com</p>
        <div className="flex justify-center md:justify-start space-x-4 mt-2">
          <a href="#" className="hover:text-blue-400"><FaFacebook /></a>
          <a href="#" className="hover:text-sky-400"><FaTwitter /></a>
          <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
        </div>
      </div>
    </div>

    {/* Línea inferior */}
    <div className="text-center text-sm text-gray-300 mt-6 border-t border-gray-700 pt-4">
      © {new Date().getFullYear()} Huella Segura - Todos los derechos reservados
    </div>
  </footer>
);

export default Footer;

