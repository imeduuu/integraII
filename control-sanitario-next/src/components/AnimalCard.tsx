import React, { useState } from 'react';
import Button from './ui/Button';
import { useRouter } from 'next/router';

interface Comment {
  id: number;
  usuario: string;
  contenido: string;
  fecha: string;
}

interface AnimalCardProps {
  nombre: string; // Nombre del animal
  estado_general: string; // Estado (Disponible, Adoptado, etc.)
  zona: string; // Ubicación geográfica
  age?: string; // Edad opcional
  images?: string[]; // Array de URLs de imágenes
}

const AnimalCard: React.FC<AnimalCardProps> = ({ nombre, estado_general, zona, age, images }) => {
  const router = useRouter();
  const thumbnail = images && images.length > 0 ? images[0] : '/default-animal.png';

  const [comments, setComments] = useState<Comment[]>([
    { id: 1, usuario: 'Juan', contenido: 'Qué lindo!', fecha: '2025-10-03' },
    { id: 2, usuario: 'María', contenido: 'Se ve saludable.', fecha: '2025-10-02' },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const nextComment: Comment = {
      id: comments.length + 1,
      usuario: 'Invitado', // Aquí luego usarás el usuario logueado
      contenido: newComment,
      fecha: new Date().toISOString().split('T')[0],
    };

    setComments([...comments, nextComment]);
    setNewComment('');
  };

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

      {/* Sección de comentarios */}
      <div className="mt-4 w-full">
        <h3 className="text-lg font-bold text-green-700 mb-2">Comentarios</h3>

        <div className="mb-2 max-h-40 overflow-y-auto">
          {comments.map((c) => (
            <div key={c.id} className="border p-2 rounded mb-1 bg-gray-50">
              <p className="text-sm font-semibold">{c.usuario} <span className="text-gray-400 text-xs">{c.fecha}</span></p>
              <p>{c.contenido}</p>
            </div>
          ))}
        </div>

        <textarea
          className="border rounded p-2 w-full mb-2 resize-none"
          placeholder="Escribe un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <Button
          className="bg-blue-600 hover:bg-blue-700 w-full"
          onClick={handleAddComment}
        >
          Agregar comentario
        </Button>
      </div>
    </div>
  );
};

export default AnimalCard;
