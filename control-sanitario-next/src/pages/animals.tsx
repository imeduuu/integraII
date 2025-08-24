import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimalCard from '../components/AnimalCard';

const Animals = () => (
  <>
    <Navbar />
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Animales Rescatados</h2>
      {/* Listado de animales aquí */}
      <AnimalCard name="Firulais" status="En tratamiento" location="Sector Centro" />
    </main>
    <Footer />
  </>
);

export default Animals;
