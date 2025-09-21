import React from "react";
import AnimalGallery from "./AnimalGallery";

interface AnimalDetailProps {
  name: string;
  status: string;
  location: string;
  age?: string;
  images: string[];
}

const AnimalDetail: React.FC<AnimalDetailProps> = ({ name, status, location, age, images }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl mx-auto flex flex-col items-center">
      <AnimalGallery images={images} />
      <h2 className="text-2xl font-bold mb-2 text-green-700 mt-4">{name}</h2>
      <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Estado:</span> {status}</p>
      <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Ubicación:</span> {location}</p>
      {age && <p className="text-sm text-gray-600 mb-2"><span className="font-semibold">Edad:</span> {age}</p>}
    </div>
  );
};

export default AnimalDetail;

// Para usar este componente, pásale un array de imágenes en la prop "images".
// Ejemplo:
// <AnimalDetail name="Firulais" status="En tratamiento" location="Centro" images={["/img1.jpg", "/img2.jpg"]} />
// Este componente muestra la galería y los datos del animal.
