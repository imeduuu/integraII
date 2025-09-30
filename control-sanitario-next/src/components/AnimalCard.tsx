import React from 'react';
import Button from './ui/Button';
import { useRouter } from 'next/router';

interface AnimalCardProps {
  nombre: string;
  estado_general: string;
  zona: string;
  age?: string;
  images?: string[];
}

const AnimalCard: React.FC<AnimalCardProps> = ({ nombre, estado_general, zona, age, images }) => {
  const router = useRouter();
  const thumbnail = images && images.length > 0 ? images[0] : '/default-animal.png';

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-72 flex flex-col items-center">
      <img 
        src={thumbnail} 
        alt={nombre} 
        className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-green-200" 
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
