import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrgHome = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Página de la Organización
        </h1>

        {/* Campañas activas */}
        <section className="p-6 bg-gray-100 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Campañas Activas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded bg-white">Campaña 1</div>
            <div className="p-4 border rounded bg-white">Campaña 2</div>
          </div>
        </section>

        {/* Publicar adopción */}
        <section className="p-6 bg-gray-100 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Publicar Adopción</h2>
          <div className="p-4 border rounded bg-white">
            <p>
              Aquí irá un formulario para publicar mascotas en adopción (solo
              maquetación).
            </p>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="p-6 bg-gray-100 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Estadísticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white border rounded">
              <p className="text-4xl font-bold">120</p>
              <p>Adopciones</p>
            </div>
            <div className="p-4 bg-white border rounded">
              <p className="text-4xl font-bold">15</p>
              <p>Campañas</p>
            </div>
            <div className="p-4 bg-white border rounded">
              <p className="text-4xl font-bold">300</p>
              <p>Voluntarios</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default OrgHome;
