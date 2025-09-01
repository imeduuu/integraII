import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/forgotPassword.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('Si el correo existe, recibirás instrucciones para recuperar tu contraseña.');
  };

  return (
    <>
      <Navbar />
      <main>
        <form className={styles.forgotContainer} onSubmit={handleSubmit}>
          <h2 className={styles.forgotTitle}>Recuperar Contraseña</h2>
          <label className={styles.forgotLabel}>Correo electrónico</label>
          <input
            className={styles.forgotInput}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button className={styles.forgotButton} type="submit">
            Recuperar
          </button>
          {mensaje && <p className={styles.forgotMessage}>{mensaje}</p>}
        </form>
      </main>
      <Footer />
    </>
  );
};

export default ForgotPassword;
