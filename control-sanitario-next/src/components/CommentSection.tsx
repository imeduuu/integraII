import { useState } from 'react';
import styles from '../styles/commentSection.module.css';

interface Comment {
  id: number;
  usuario: string;
  contenido: string;
  fecha: string;
}

interface CommentSectionProps {
  animalId: number;
}

const CommentSection = ({ animalId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([
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
      usuario: 'Usuario Demo',
      contenido: newComment,
      fecha: new Date().toISOString().split('T')[0],
    };
    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleDelete = (id: number) => {
    setComments(comments.filter(c => c.id !== id));
  };

  const handleEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.contenido);
  };

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
    <div className={styles.root}>
      <h3 className={styles.title}>Comentarios</h3>
      <div style={{ marginBottom: '1rem' }}>
        {comments.map(c => (
          <div key={c.id} className={styles.comment}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className={styles.user}>{c.usuario}</span>
              <span className={styles.date}>({c.fecha})</span>
            </div>
            {editingCommentId === c.id ? (
              <div>
                <input
                  type="text"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className={styles.input}
                />
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button
                    onClick={() => handleSaveEdit(c.id)}
                    className={styles.button}
                  >Guardar</button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    className={styles.editButton}
                  >Cancelar</button>
                </div>
              </div>
            ) : (
              <div>
                <span className={styles.commentContent} style={{ display: 'block', margin: '0.5rem 0' }}>{c.contenido}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEdit(c)}
                    className={styles.editButton}
                  >Editar</button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className={styles.deleteButton}
                  >Eliminar</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <input
          type="text"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          className={styles.input}
          placeholder="Escribe un comentario..."
        />
        <button
          onClick={handleAddComment}
          className={styles.button}
        >Enviar</button>
      </div>
    </div>
  );
};

export default CommentSection;
