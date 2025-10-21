import React, { useState } from 'react';
import Input from '../components/ui/Input'; // Migración: Usar input UI estándar
import Button from '../components/ui/Button'; // Migración: Usar botón UI estándar
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNotification } from '../components/NotificationProvider';
import styles from '../styles/forgotPassword.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { addToast } = useNotification();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      addToast('Por favor ingresa tu correo electrónico.', 'warning');
      return;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addToast('Por favor ingresa un correo electrónico válido.', 'error');
      return;
    }
    
    // Simulación: En producción, aquí harías la llamada a la API
    try {
      addToast('Se ha enviado un correo con instrucciones para recuperar tu contraseña.', 'success');
      setMensaje('');
      setEmail(''); // Limpiar el campo
    } catch (error) {
      addToast('Error al enviar el correo. Por favor intenta de nuevo.', 'error');
    }
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
