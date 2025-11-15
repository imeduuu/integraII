import Tooltip from './Tooltip';

import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Button from './ui/Button';
import { useRouter } from 'next/router';

const CommentSection = dynamic(() => import('./CommentSection'), {
  ssr: false,
  loading: () => <div className="py-4 text-center text-sm text-gray-500">Cargando comentarios...</div>,
});

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
    <div className="card w-72 flex flex-col items-start animate-float">
      <div className="w-full overflow-hidden rounded-lg mb-3">
        <Image
          src={thumbnail}
          alt={nombre}
          width={500}
          height={300}
          className="w-full h-40 object-cover rounded-lg"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
        />
      </div>

      <h2 className="text-lg font-bold mb-1 text-green-700">{nombre}</h2>
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
      <div className="mt-2 w-full flex gap-2">
        <Button className="w-1/2" onClick={() => router.push('/adopcion')}>Adoptar</Button>
        <Button variant="secondary" className="w-1/2">Ver</Button>
      </div>

      {/* Sección de comentarios usando CommentSection */}
      <div className="mt-4 w-full">
        <CommentSection animalId={Number(animalId)} />
      </div>
    </div>
  );
};

export default AnimalCard;