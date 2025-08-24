import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Alert from '../components/Alert';

const Alerts = () => (
  <>
    <Navbar />
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Alertas Sanitarias</h2>
      {/* Listado de alertas aquí */}
      <Alert message="Zona roja detectada en Sector Norte" type="error" />
    </main>
    <Footer />
  </>
);

export default Alerts;
