import React, { useState } from 'react';
import Input from '../components/ui/Input'; // Migración: Usar input UI estándar
import Button from '../components/ui/Button'; // Migración: Usar botón UI estándar
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
          {/* Migración: Se reemplaza el input nativo por el componente Input UI estándar. */}
          <Input
            className={styles.forgotInput}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          {/* Migración: Se reemplaza el botón nativo por el componente Button UI estándar. */}
          <Button className={styles.forgotButton} type="submit">Recuperar</Button>
          {mensaje && <p className={styles.forgotMessage}>{mensaje}</p>}
        </form>
      </main>
      <Footer />
    </>
  );
};

export default ForgotPassword;
