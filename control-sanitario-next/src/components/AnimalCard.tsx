import React from 'react';

interface AnimalCardProps {
  name: string;
  status: string;
  location: string;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ name, status, location }) => (
  <div className="border rounded-lg p-4 shadow-md bg-white">
    <h2 className="font-bold text-xl mb-2">{name}</h2>
    <p className="text-sm">Estado: {status}</p>
    <p className="text-sm">Ubicación: {location}</p>
  </div>
);

export default AnimalCard;
