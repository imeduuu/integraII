import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Report = () => (
  <>
    <Navbar />
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Reportar Animal</h2>
      {/* Formulario de reporte aquí */}
    </main>
    <Footer />
  </>
);

export default Report;
