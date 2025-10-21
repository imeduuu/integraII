import React, { useState } from 'react';
import Button from './ui/Button';
import { useRouter } from 'next/router';
import CommentSection from './CommentSection';


interface AnimalCardProps {
  nombre: string; // Nombre del animal
  estado_general: string; // Estado (Disponible, Adoptado, etc.)
  zona: string; // Ubicación geográfica
  age?: string; // Edad opcional
  images?: string[]; // Array de URLs de imágenes
  animalId: string; // ID del animal
}

const AnimalCard: React.FC<AnimalCardProps> = ({ nombre, estado_general, zona, age, images, animalId }) => {
  const router = useRouter();
  const thumbnail = images && images.length > 0 ? images[0] : '/default-animal.png';

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-72 flex flex-col items-center transform transition-transform duration-200 hover:scale-105 hover:shadow-lg motion-safe-transition">
      <img
        src={thumbnail}
        alt={nombre}
        className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-green-200 transition-transform duration-300 transform hover:scale-110 motion-safe-transition"
      />
      <h2 className="text-xl font-bold mb-2 text-green-700">{nombre}</h2>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Estado:</span> {estado_general}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Ubicación:</span> {zona}
      </p>
      {age && (
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Edad:</span> {age}
        </p>
      )}
      <Button className="mt-2" onClick={() => router.push('/adopcion')}>
        Adoptar
      </Button>

      {/* Sección de comentarios usando CommentSection */}
      <div className="mt-4 w-full">
        <CommentSection animalId={Number(animalId)} />
      </div>
    </div>
  );
};

export default AnimalCard;