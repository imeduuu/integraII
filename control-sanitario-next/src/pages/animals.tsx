import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimalCard from '../components/AnimalCard';
import Button from '../components/ui/Button';
import Map from '../components/Map';
import { animalsData } from '../utils/AnimalsData';

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

type Animal = {
  id: number;
  nombre: string;
  especie: string;
  estado_general: string;
  zona: string;
  images?: string[];
};

const Animals = () => {
  const [animals, setAnimals] = useState<Animal[]>(animalsData);
  const [estado, setEstado] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [especie, setEspecie] = useState('');
  const [showMap, setShowMap] = useState(false);

  // Listas únicas para los filtros
  const estados = Array.from(new Set(animals.map(a => a.estado_general)));
  const ubicaciones = Array.from(new Set(animals.map(a => a.zona)));
  const especies = Array.from(new Set(animals.map(a => a.especie)));

  // Filtrado dinámico
  const filtered = animals.filter(a =>
    (estado ? a.estado_general === estado : true) &&
    (ubicacion ? a.zona === ubicacion : true) &&
    (especie ? a.especie === especie : true)
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
            {estados.map((est, i) => <option key={i} value={est}>{est}</option>)}
          </select>

          <select
            className="border rounded px-2 py-1"
            value={ubicacion}
            onChange={e => setUbicacion(e.target.value)}
            aria-label="Filtrar por ubicación"
          >
            <option value="">Todas las ubicaciones</option>
            {ubicaciones.map((ubi, i) => <option key={i} value={ubi}>{ubi}</option>)}
          </select>

          <select
            className="border rounded px-2 py-1"
            value={especie}
            onChange={e => setEspecie(e.target.value)}
            aria-label="Filtrar por especie"
          >
            <option value="">Todas las especies</option>
            {especies.map((esp, i) => <option key={i} value={esp}>{esp}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {filtered.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No hay animales con ese filtro.</div>
          ) : (
            filtered.map(animal => (
              <AnimalCard
                key={animal.id}
                animalId={animal.id.toString()}
                nombre={animal.nombre}
                estado_general={animal.estado_general}
                zona={animal.zona}
                images={animal.images || []}
              />
            ))
          )}
        </div>

        <h2 className="mt-12 mb-2 text-xl font-bold text-center">Mapa de Temuco</h2>
        <div className="flex justify-center">
          <Button
            style={{ ...buttonStyle, marginTop: '2rem', width: 'clamp(140px, 40vw, 180px)' }}
            onClick={() => setShowMap(!showMap)}
            aria-label={showMap ? 'Ocultar Mapa' : 'Mostrar Mapa'}
          >
            {showMap ? 'Ocultar Mapa' : 'Mostrar Mapa'}
          </Button>
        </div>

        {showMap && <Map />}
      </main>
      <Footer />
    </>
  );
};

export default Animals;
