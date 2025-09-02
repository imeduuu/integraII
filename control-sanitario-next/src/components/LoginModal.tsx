import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('Login simulado (sin backend)');
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <form style={{ maxWidth: '400px', padding: '32px', background: '#f3f4f6', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', position: 'relative' }} onSubmit={handleSubmit}>
        <button type="button" onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}>&times;</button>
        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: 20 }}>Iniciar Sesión</h2>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Correo electrónico</label>
        <input style={{ width: '100%', padding: '8px', marginBottom: '16px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Contraseña</label>
        <input style={{ width: '100%', padding: '8px', marginBottom: '16px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button style={{ width: '100%', padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }} type="submit">Entrar</button>
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <a href="/forgot-password" style={{ color: '#2563eb', textDecoration: 'underline', fontSize: '0.95rem' }}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        {mensaje && <p style={{ marginTop: 16, color: '#2563eb', fontWeight: 600 }}>{mensaje}</p>}
      </form>
    </div>
  );
};

export default LoginModal;
