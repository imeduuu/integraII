/**
 * Lista de animales con filtros por estado y ubicación
 */
import React, { useState } from 'react';
import AnimalCard from './AnimalCard';

// Datos mock de animales disponibles
const animals = [
  {
    nombre: 'Luna',
    estado: 'Disponible',
    ubicacion: 'Norte',
    edad: '1 año',
    imagenes: [
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=96&h=96',
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=400&h=300',
    ],
  },
  {
    nombre: 'Max',
    estado: 'Adoptado',
    ubicacion: 'Sur',
    edad: '3 años',
    imagenes: [
      'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=facearea&w=96&h=96',
      'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=facearea&w=400&h=300',
    ],
  },
  {
    nombre: 'Bella',
    estado: 'Disponible',
    ubicacion: 'Centro',
    edad: '2 años',
    imagenes: [
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=facearea&w=96&h=96',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=facearea&w=400&h=300',
    ],
  },
  {
    nombre: 'Rocky',
    estado: 'En tratamiento',
    ubicacion: 'Centro',
    edad: '2 años',
    imagenes: [
      'https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=96&h=96',
      'https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=400&h=300',
    ],
  },
  {
    nombre: 'Nina',
    estado: 'Disponible',
    ubicacion: 'Norte',
    edad: '4 años',
    imagenes: [
      'https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=96&h=96',
      'https://images.unsplash.com/photo-1518715308788-300e1e1e2d4c?auto=format&fit=facearea&w=400&h=300',
    ],
  },
];

/**
 * Componente que renderiza lista filtrable de animales disponibles
 * Incluye filtros por estado y ubicación con vista en grid responsivo
 */
export default function AnimalList() {
  const [estado, setEstado] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  // Aplicar filtros de búsqueda
  const filtered = animals.filter(a =>
    (estado ? a.estado === estado : true) &&
    (ubicacion ? a.ubicacion === ubicacion : true)
  );

  return (
    <div className="p-4">
      {/* Filtros de búsqueda */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          className="border rounded px-2 py-1"
          value={estado}
          onChange={e => setEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="Disponible">Disponible</option>
          <option value="Adoptado">Adoptado</option>
          <option value="En tratamiento">En tratamiento</option>
        </select>
        <select
          className="border rounded px-2 py-1"
          value={ubicacion}
          onChange={e => setUbicacion(e.target.value)}
        >
          <option value="">Todas las ubicaciones</option>
          <option value="Norte">Norte</option>
          <option value="Sur">Sur</option>
          <option value="Centro">Centro</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {filtered.map((animal, i) => (
          <AnimalCard
            key={i}
            animalId={`${i + 1}`}
            nombre={animal.nombre}
            estado_general={animal.estado}
            zona={animal.ubicacion}
            age={animal.edad}
            images={animal.imagenes}
          />
        ))}
      </div>
    </div>
  );
}
