import React from 'react';

interface AnimalCardProps {
  nombre: string;
  estado: string;
  ubicacion: string;
  edad: string;
  imagen?: string;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ nombre, estado, ubicacion, edad, imagen }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-72 flex flex-col items-center">
      {imagen && (
        <img src={imagen} alt={nombre} className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-green-200" />
      )}
      <h2 className="text-xl font-bold mb-2 text-green-700">{nombre}</h2>
      <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Estado:</span> {estado}</p>
      <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Ubicación:</span> {ubicacion}</p>
      <p className="text-sm text-gray-600 mb-2"><span className="font-semibold">Edad:</span> {edad}</p>
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Ver más</button>
    </div>
  );
};

export default AnimalCard;
