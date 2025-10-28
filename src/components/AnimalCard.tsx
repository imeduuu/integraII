// AnimalCard.tsx
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

// Reutilizable dentro del componente
const cardClasses = {
  container: 'bg-white rounded-xl shadow-md p-6 w-72 flex flex-col items-center',
  img: 'w-24 h-24 object-cover rounded-full mb-3 border-2 border-green-200',
  nombre: 'text-xl font-bold mb-2 text-green-700',
  info: 'text-sm text-gray-600 mb-1 font-semibold',
  button: 'bg-blue-600 hover:bg-blue-700 mt-2'
};

const AnimalCard: React.FC<AnimalCardProps> = ({ nombre, estado_general, zona, age, images }) => {
  const router = useRouter();
  const thumbnail = images && images.length > 0 ? images[0] : '/default-animal.png';

  return (
    <article
      className={cardClasses.container}
      role="article"
      aria-label={`Tarjeta del animal ${nombre}`}
    >
      <img src={thumbnail} alt={nombre} className={cardClasses.img} />
      <h2 className={cardClasses.nombre}>{nombre}</h2>
      <p className={cardClasses.info}>Estado: {estado_general}</p>
      <p className={cardClasses.info}>Ubicación: {zona}</p>
      {age && <p className={cardClasses.info}>Edad: {age}</p>}
      <Button
        className={cardClasses.button}
        onClick={() => router.push('/adopcion')}
        aria-label={`Iniciar proceso de adopción para ${nombre}`}
      >
        Adoptar
      </Button>
    </article>
  );
};

export default AnimalCard;
