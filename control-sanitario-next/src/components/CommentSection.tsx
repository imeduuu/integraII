import { useState } from 'react';

interface Comment {
  id: number;
  usuario: string;
  contenido: string;
  fecha: string;
}

interface CommentSectionProps {
  animalId: number; // Por si luego conectamos con DB
}

const CommentSection = ({ animalId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([
    // Mock inicial
    { id: 1, usuario: 'Juan', contenido: 'Firulais es muy amigable!', fecha: '2025-10-03' },
    { id: 2, usuario: 'María', contenido: 'Michi parece tímido pero dulce.', fecha: '2025-10-02' },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const nextId = comments.length ? comments[comments.length - 1].id + 1 : 1;
    const comment: Comment = {
      id: nextId,
      usuario: 'Usuario Demo', // Más adelante se puede reemplazar por el usuario real
      contenido: newComment,
      fecha: new Date().toISOString().split('T')[0],
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <h3 className="text-lg font-semibold mb-2">Comentarios</h3>

      {/* Lista de comentarios */}
      <div className="space-y-2 mb-4">
        {comments.map(c => (
          <div key={c.id} className="p-2 border rounded">
            <strong>{c.usuario}</strong> <span className="text-gray-500 text-sm">({c.fecha})</span>
            <p>{c.contenido}</p>
          </div>
        ))}
      </div>

      {/* Formulario de nuevo comentario */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Escribe un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
