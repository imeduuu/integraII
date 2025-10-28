import { useState } from 'react';
import styles from '../styles/commentSection.module.css';
import { Skeleton } from './ui/Skeleton';
import { useNotification } from './NotificationProvider';
import { isRequired } from '../utils/validators';

interface Comment {
  id: number;
  usuario: string;
  contenido: string;
  fecha: string;
}

interface CommentSectionProps {
  animalId: number;
  isLoading?: boolean;
}

const CommentSection = ({ animalId, isLoading = false }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, usuario: 'Juan', contenido: 'Firulais es muy amigable!', fecha: '2025-10-03' },
    { id: 2, usuario: 'María', contenido: 'Michi parece tímido pero dulce.', fecha: '2025-10-02' },
  ]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [savingId, setSavingId] = useState<number | null>(null);
  const { addToast } = useNotification();

  const handleAddComment = () => {
    if (!isRequired(newComment)) {
      addToast('El comentario está vacío', 'error');
      return;
    }
    setIsAdding(true);
    // Simular llamada a API
    setTimeout(() => {
      const nextId = comments.length ? comments[comments.length - 1].id + 1 : 1;
      const comment: Comment = {
        id: nextId,
        usuario: 'Usuario Demo',
        contenido: newComment,
        fecha: new Date().toISOString().split('T')[0],
      };
      setComments([...comments, comment]);
      setNewComment('');
      setIsAdding(false);
      addToast('Comentario agregado', 'success');
    }, 300);
  };

  const handleDelete = (id: number) => {
    // Confirmación simple y feedback
    setDeletingId(id);
    setTimeout(() => {
      setComments(comments.filter(c => c.id !== id));
      setDeletingId(null);
      addToast('Comentario eliminado', 'success');
    }, 300);
  };

  const handleEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.contenido);
  };

  const handleSaveEdit = (id: number) => {
    setSavingId(id);
    setTimeout(() => {
      setComments(
        comments.map(c =>
          c.id === id ? { ...c, contenido: editingContent } : c
        )
      );
      setEditingCommentId(null);
      setEditingContent('');
      setSavingId(null);
      addToast('Comentario actualizado', 'success');
    }, 300);
  };

  return (
    <div className={styles.root}>
      {isLoading ? (
        <div>
          <h3 className={styles.title}>Comentarios</h3>
          <div style={{ marginBottom: '1rem' }}>
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded mb-3">
              <Skeleton width="w-1/4" height="h-4" />
              <div className="mt-2"><Skeleton width="w-full" height="h-3" /></div>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded mb-3">
              <Skeleton width="w-1/4" height="h-4" />
              <div className="mt-2"><Skeleton width="w-full" height="h-3" /></div>
            </div>
          </div>
        </div>
      ) : (
        <>
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
                        disabled={savingId === c.id}
                      >{savingId === c.id ? 'Guardando...' : 'Guardar'}</button>
                      <button
                        onClick={() => setEditingCommentId(null)}
                        className={styles.editButton}
                        disabled={savingId === c.id}
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
                        disabled={deletingId === c.id}
                      >Editar</button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className={styles.deleteButton}
                        disabled={deletingId === c.id}
                      >{deletingId === c.id ? 'Eliminando...' : 'Eliminar'}</button>
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
              disabled={isAdding}
            >{isAdding ? 'Enviando...' : 'Enviar'}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentSection;
