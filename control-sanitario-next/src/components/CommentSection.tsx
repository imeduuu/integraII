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

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');

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
  
  // ✅ Función para borrar comentario
  const handleDelete = (id: number) => {
    setComments(comments.filter(c => c.id !== id));
  };

  // ✅ Función para iniciar edición
  const handleEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.contenido);
  };

  // ✅ Función para guardar edición
  const handleSaveEdit = (id: number) => {
    setComments(
      comments.map(c =>
        c.id === id ? { ...c, contenido: editingContent } : c
      )
    );
    setEditingCommentId(null);
    setEditingContent('');
  };

  return (
    <div className="comment-section">
      <h3 className="text-lg font-semibold mb-2">Comentarios</h3>

      {/* Lista de comentarios */}
      <div className="space-y-2 mb-4">
        {comments.map(c => (
          <div key={c.id} className="p-2 border rounded">
            <strong>{c.usuario}</strong> <span className="text-gray-500 text-sm">({c.fecha})</span>
            {/* ✅ Edición inline */}
            {editingCommentId === c.id ? (
              <>
                <input
                  type="text"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="border rounded p-1 w-full mt-1 mb-1"
                />
                <button
                  onClick={() => handleSaveEdit(c.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-1"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditingCommentId(null)}
                  className="bg-gray-400 text-white px-2 py-1 rounded"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <p>{c.contenido}</p>
            )}

            {/* ✅ Botones solo para el autor */}
            {c.usuario === 'Invitado' && editingCommentId !== c.id && (
              <div className="mt-1">
                <button
                  onClick={() => handleEdit(c)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded mr-1"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Borrar
                  </button>
          </div>
        )}
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
          className="bg-blue-500 tFext-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
