import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimalCard from '../components/AnimalCard';
import Map from '../components/Map';

import { useState } from 'react';


const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(90deg,#2563eb 60%,#60a5fa 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 700,
    fontSize: '1.08rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(37,99,235,0.12)',
    transition: 'transform 0.2s',
  };
const Animals = () => {
  const [showMap, setShowMap] = useState(false); 

  return (
  <>
    <Navbar />
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Animales Rescatados</h2>
      {/* Listado de animales aquí */}
      <AnimalCard name="Firulais" status="En tratamiento" location="Sector Centro" />
      
      <h2>Mapa de Temuco</h2>
            <button
          style={{
            ...buttonStyle,
        marginTop: '2rem',
        width: 'clamp(140px, 40vw, 180px)',
        background: 'linear-gradient(90deg,#2563eb 60%,#60a5fa 100%)'
}}
  onClick={() => setShowMap(!showMap)}
>
    {showMap ? 'Ocultar Mapa' : 'Mostrar Mapa'}
    </button>
  {showMap && <Map />}
    </main>
    <Footer />
  </>
  );
};

export default Animals;
