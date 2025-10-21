/**
 * Página de bandeja de entrada para administradores
 */
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mockMessages } from '../services/mockMessages';
import styles from '../styles/admin-inbox.module.css';
import { userMock } from '../context/userMock';
import ProtectedRoute from '../components/ProtectedRoute';

const AdminInbox = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulación de protección de ruta
  useEffect(() => {
    if (userMock.role !== 'admin') {
      // En una app real, usaríamos router.push('/unauthorized') o similar
      if (typeof window !== 'undefined') {
        window.location.href = '/denied';
      }
    }
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <Navbar />
      <main className={styles.container}>
        <h1 className={styles.title}>Bandeja de Entrada</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar por remitente, asunto o contenido..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <ul className={styles.messageList}>
          {filteredMessages.map((message) => (
            <li key={message.id} className={styles.messageItem}>
              <div className={styles.messageHeader}>
                <span className={styles.sender}>{message.sender}</span>
                <span className={styles.date}>
                  {new Date(message.date).toLocaleDateString('es-CL')}
                </span>
              </div>
              <h2 className={styles.subject}>{message.subject}</h2>
              <p className={styles.content}>{message.content}</p>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </ProtectedRoute>
  );
};

export default AdminInbox;