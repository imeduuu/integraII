import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => (
  <>
    <Navbar />
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a la Plataforma de Control Sanitario</h1>
      <p>Reporta animales en situación de calle, consulta focos sanitarios y participa en la comunidad.</p>
    </main>
    <Footer />
  </>
);

export default Home;
