import Tooltip from './Tooltip';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Button from './ui/Button';
import { useRouter } from 'next/router';
import api from '../services/api';

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
  const [hasHistory, setHasHistory] = useState(false);
  const thumbnail = images && images.length > 0 ? images[0] : '/default-animal.png';

  // Verifica si el animal tiene historial médico para mostrar el botón
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await api.get(`/medicalHistory/${animalId}`);
        if (!mounted) return;
        setHasHistory(Array.isArray(data) && data.length > 0);
      } catch {
        if (!mounted) return;
        setHasHistory(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [animalId]);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 tablet:p-5 w-full max-w-xs sm:w-72 tablet:w-80 flex flex-col items-center hover:shadow-lg transition-shadow duration-300 motion-safe-transition tablet-card">
      {/* Imagen del animal con tooltip y click para ver detalles usando Next/Image */}
      <Tooltip text={`Ver detalles de ${nombre}`}>
        <div onClick={() => router.push(`/animals/${animalId}`)} style={{ cursor: 'pointer' }}>
          <Image
            src={thumbnail}
            alt={nombre}
            width={96}
            height={96}
            className="w-24 h-24 tablet:w-28 tablet:h-28 object-cover rounded-full mb-3 border-2 border-blue-300 hover:scale-105 transition-transform"
          />
        </div>
      </Tooltip>
      <h2 className="text-xl tablet:text-2xl font-bold mb-2 text-blue-700">{nombre}</h2>
      <p className="text-sm tablet:text-base text-gray-600 mb-1">
        <span className="font-semibold">Estado:</span> {estado_general}
      </p>
      <p className="text-sm tablet:text-base text-gray-600 mb-1">
        <span className="font-semibold">Ubicación:</span> {zona}
      </p>
      {age && (
        <p className="text-sm tablet:text-base text-gray-600 mb-2">
          <span className="font-semibold">Edad:</span> {age}
        </p>
      )}
      {/* Botón Adoptar con tooltip */}
      <Tooltip text={`Adoptar a ${nombre}`}>
        <Button
          className="bg-blue-600 hover:bg-blue-700 mt-2 tablet-button"
          onClick={() => router.push('/adopcion')}
        >
          Adoptar
        </Button>
      </Tooltip>
      <Tooltip text={`Ver historial médico de ${nombre}`}>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700 mt-2 tablet-button"
          onClick={() => router.push(`/medicalHistory/${animalId}`)}
        >
          Historial médico{hasHistory ? '' : ' (sin registros)'}
        </Button>
      </Tooltip>
      {/* Sección de comentarios */}
      <div className="mt-4 w-full">
        <CommentSection animalId={Number(animalId)} />
      </div>
    </div>
  );
};

export default AnimalCard;
