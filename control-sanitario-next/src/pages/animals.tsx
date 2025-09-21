import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimalCard from '../components/AnimalCard';
import Map from '../components/Map';

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
  // Lista de animales
  const animals = [
    {
      name: 'Bella', status: 'Disponible', location: 'Monterrey', age: '3 años', images: ['https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=96&h=96'],
    },
    {
      name: 'Coco', status: 'Disponible', location: 'Tijuana', age: '4 años', images: ['https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=facearea&w=96&h=96'],
    },
    {
      name: 'Kira', status: 'Disponible', location: 'Mérida', age: '2 años', images: ['https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=facearea&w=96&h=96'],
    },
    {
      name: 'Luna', status: 'Disponible', location: 'CDMX', age: '2 años', images: ['https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=96&h=96'],
    },
    {
      name: 'Max', status: 'En proceso', location: 'Guadalajara', age: '1 año', images: ['https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=96&h=96'],
    },
    {
      name: 'Milo', status: 'En proceso', location: 'Cancún', age: '3 años', images: ['https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=96&h=96'],
    },
    {
      name: 'Nina', status: 'Disponible', location: 'Querétaro', age: '5 años', images: ['https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=96&h=96'],
    },
    {
      name: 'Rocky', status: 'Disponible', location: 'Puebla', age: '4 años', images: ['https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=96&h=96'],
    },
    {
      name: 'Simba', status: 'En proceso', location: 'Toluca', age: '2 años', images: ['https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=96&h=96'],
    },
    {
      name: 'Toby', status: 'Disponible', location: 'León', age: '1 año', images: ['https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=96&h=96'],
    },
    // Animal rescatado ejemplo
    {
      name: 'Firulais', status: 'En tratamiento', location: 'Sector Centro', age: '2 años', images: ["https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=96&h=96","https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=400&h=300"],
    },
  ];

  // Filtros
  const [estado, setEstado] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [showMap, setShowMap] = useState(false);
  const estados = Array.from(new Set(animals.map(a => a.status)));
  const ubicaciones = Array.from(new Set(animals.map(a => a.location)));
  const filtered = animals.filter(a =>
    (estado ? a.status === estado : true) &&
    (ubicacion ? a.location === ubicacion : true)
  );

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-center mb-8">Animales en Adopción y Rescatados</h2>
        <div className="flex gap-4 mb-6 flex-wrap justify-center">
          <select
            className="border rounded px-2 py-1"
            value={estado}
            onChange={e => setEstado(e.target.value)}
            aria-label="Filtrar por estado"
          >
            <option value="">Todos los estados</option>
            {estados.map((est, i) => (
              <option key={i} value={est}>{est}</option>
            ))}
          </select>
          <select
            className="border rounded px-2 py-1"
            value={ubicacion}
            onChange={e => setUbicacion(e.target.value)}
            aria-label="Filtrar por ubicación"
          >
            <option value="">Todas las ubicaciones</option>
            {ubicaciones.map((ubi, i) => (
              <option key={i} value={ubi}>{ubi}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {filtered.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No hay animales con ese filtro.</div>
          ) : (
            filtered.map((animal, idx) => (
              <AnimalCard key={idx} {...animal} />
            ))
          )}
        </div>
        <h2 className="mt-12 mb-2 text-xl font-bold text-center">Mapa de Temuco</h2>
        <div className="flex justify-center">
          <button
            style={{
              ...buttonStyle,
              marginTop: '2rem',
              width: 'clamp(140px, 40vw, 180px)',
              background: 'linear-gradient(90deg,#2563eb 60%,#60a5fa 100%)'
            }}
            onClick={() => setShowMap(!showMap)}
            aria-label={showMap ? 'Ocultar Mapa' : 'Mostrar Mapa'}
          >
            {showMap ? 'Ocultar Mapa' : 'Mostrar Mapa'}
          </button>
        </div>
        {showMap && <Map />}
      </main>
      <Footer />
    </>
  );
};

export default Animals;
