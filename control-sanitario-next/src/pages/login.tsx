import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


import { useState } from 'react';

const formStyle: React.CSSProperties = {
  maxWidth: '400px',
  margin: '60px auto',
  padding: '32px',
  background: '#f3f4f6',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
};
const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 600
};
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  marginBottom: '16px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};
const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 700,
  fontSize: '1rem',
  cursor: 'pointer'
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('Login simulado (sin backend)');
  };

  return (
    <>
      <Navbar />
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: 20 }}>Iniciar Sesión</h2>
        <label style={labelStyle}>Correo electrónico</label>
        <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label style={labelStyle}>Contraseña</label>
        <input style={inputStyle} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button style={buttonStyle} type="submit">Entrar</button>
        <div style={{ marginTop: 12 }}>
          <a href="/forgot-password" style={{ color: '#2563eb', textDecoration: 'underline', fontSize: '0.95rem' }}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        {mensaje && <p style={{ marginTop: 16, color: '#2563eb', fontWeight: 600 }}>{mensaje}</p>}
      </form>
      <Footer />
    </>
  );
};

export default Login;
