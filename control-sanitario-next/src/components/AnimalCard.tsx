// AnimalCard.tsx
import React from 'react';
import Image from 'next/image';
import Button from './ui/Button';
import { useRouter } from 'next/router';
import CommentSection from './CommentSection';

interface AnimalCardProps {
  animalId?: number | string;
  nombre: string;
  estado_general: string;
  zona: string;
  age?: string;
  images?: string[];
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animalId, nombre, estado_general, zona, age, images }) => {
  const router = useRouter();
  const thumbnail = images && images.length > 0 ? images[0] : '/default-animal.png';

  const goToAnimal = () => {
    if (animalId) router.push(`/animals/${animalId}`);
    else router.push('/animals');
  };

  return (
    <article
      className="bg-white rounded-xl shadow-md p-4 w-72 flex flex-col items-start"
      role="article"
      aria-label={`Tarjeta del animal ${nombre}`}>
      <div className="w-full overflow-hidden rounded-lg mb-3 cursor-pointer" onClick={goToAnimal}>
        <Image
          src={thumbnail}
          alt={nombre}
          width={400}
          height={300}
          className="w-full h-40 object-cover rounded-lg"
          loading="lazy"
        />
      </div>

      <h2 className="text-lg font-bold mb-1 text-green-700">{nombre}</h2>
      <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Estado:</span> {estado_general}</p>
      <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Ubicación:</span> {zona}</p>
      {age && <p className="text-sm text-gray-600 mb-2"><span className="font-semibold">Edad:</span> {age}</p>}

      <div className="mt-2 w-full flex gap-2">
        <Button className="w-1/2" onClick={() => router.push('/adopcion')}>Adoptar</Button>
        <Button variant="secondary" className="w-1/2" onClick={goToAnimal}>Ver</Button>
      </div>

      <div className="mt-4 w-full">
        {/* CommentSection expects a numeric id; guard if missing */}
        {animalId ? <CommentSection animalId={Number(animalId)} /> : <div className="text-sm text-gray-500">Comentarios</div>}
      </div>
    </article>
  );
};

export default AnimalCard;
