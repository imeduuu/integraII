// AnimalCard ahora acepta un array de imágenes (images) y muestra la primera como miniatura.
// Al hacer clic en "Ver más" se abre el detalle con la galería completa.
// Para agregar imágenes, usa la prop 'images' como array de URLs.

import React from 'react';
import Button from './ui/Button';
import { useRouter } from 'next/router';

import AnimalDetail from './AnimalDetail';

interface AnimalCardProps {
  name: string;
  status: string;
  location: string;
  age?: string;
  images?: string[];
}

const AnimalCard: React.FC<AnimalCardProps> = ({ name, status, location, age, images }) => {
  const router = useRouter();


  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-72 flex flex-col items-center">
      {images && images.length > 0 && (
        <img src={images[0]} alt={name} className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-green-200" />
      )}
      <h2 className="text-xl font-bold mb-2 text-green-700">{name}</h2>
      <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Estado:</span> {status}</p>
      <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Ubicación:</span> {location}</p>
      {age && <p className="text-sm text-gray-600 mb-2"><span className="font-semibold">Edad:</span> {age}</p>}
      <Button
        className="bg-blue-600 hover:bg-blue-700 mt-2"
        onClick={() => router.push('/adopcion')}
      >
        Adoptar
      </Button>
    </div>
  );
};

export default AnimalCard;
