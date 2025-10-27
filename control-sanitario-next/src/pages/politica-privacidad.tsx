import Link from "next/link";
import React from "react";

const PoliticaPrivacidad: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>

      <p className="mb-4">
        En nuestra plataforma valoramos tu privacidad y nos comprometemos a proteger tus datos personales.
        Esta política describe cómo recopilamos, usamos y protegemos tu información.
      </p>

      <h2 className="text-2xl font-semibold mb-3">1. Datos que recopilamos</h2>
      <p className="mb-4">
        Podemos recopilar información personal que tú nos proporcionas al registrarte o enviar formularios,
        como nombre, correo electrónico, teléfono, ubicación y comentarios.
      </p>

      <h2 className="text-2xl font-semibold mb-3">2. Finalidad del uso de los datos</h2>
      <p className="mb-4">
        Los datos que recopilamos se utilizan para:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Proporcionar y mejorar nuestros servicios.</li>
        <li>Responder a tus solicitudes y consultas.</li>
        <li>Informarte sobre novedades, reportes o adopciones de animales.</li>
        <li>Cumplir con obligaciones legales y de seguridad.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">3. Derechos de los usuarios</h2>
      <p className="mb-4">
        Tienes derecho a acceder, rectificar, eliminar o limitar el uso de tus datos personales. 
        Puedes ejercer estos derechos contactándonos a través de nuestros formularios o correo electrónico.
      </p>

      <h2 className="text-2xl font-semibold mb-3">4. Seguridad de los datos</h2>
      <p className="mb-4">
        Implementamos medidas técnicas y organizativas para proteger tu información personal frente a accesos no autorizados,
        pérdida o alteración.
      </p>

      <h2 className="text-2xl font-semibold mb-3">5. Enlaces a otros servicios</h2>
      <p className="mb-4">
        Nuestra plataforma puede contener enlaces a otros sitios web. No nos hacemos responsables de las prácticas de privacidad de terceros.
      </p>

      <p className="mt-6">
        Volver a los formularios principales:{" "}
        <Link href="/registro" className="text-blue-600 underline">
          Registro
        </Link>{" "}
        |{" "}
        <Link href="/login" className="text-blue-600 underline">
          Login
        </Link>{" "}
        |{" "}
        <Link href="/reportes" className="text-blue-600 underline">
          Reportes
        </Link>
      </p>
    </div>
  );
};

export default PoliticaPrivacidad;
