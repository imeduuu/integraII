// src/components/AnimalCard.tsx
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

// Clases reutilizables para tarjetas
const cardClasses = {
  container: 'bg-white rounded-xl shadow-md p-6 w-72 flex flex-col items-center transition-shadow hover:shadow-lg',
  thumbnail: 'w-24 h-24 object-cover rounded-full mb-3 border-2 border-green-200',
  name: 'text-xl font-bold mb-2 text-green-700',
  text: 'text-sm text-gray-600 mb-1',
  button: 'bg-blue-600 hover:bg-blue-700 mt-2'
};

const AnimalCard: React.FC<AnimalCardProps> = ({ nombre, estado_general, zona, age, images }) => {
  const router = useRouter();
  const thumbnail = images && images.length > 0 ? images[0] : '/default-animal.png';

  return (
    <div className={cardClasses.container}>
      <img src={thumbnail} alt={nombre} className={cardClasses.thumbnail} />
      <h2 className={cardClasses.name}>{nombre}</h2>
      <p className={cardClasses.text}><span className="font-semibold">Estado:</span> {estado_general}</p>
      <p className={cardClasses.text}><span className="font-semibold">Ubicación:</span> {zona}</p>
      {age && <p className={cardClasses.text}><span className="font-semibold">Edad:</span> {age}</p>}
      <Button className={cardClasses.button} onClick={() => router.push('/adopcion')}>
        Adoptar
      </Button>
    </div>
  );
};

export default AnimalCard;
