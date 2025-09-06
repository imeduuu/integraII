import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setMensaje(''); // Limpiar mensajes de error anteriores

    // Validación secuencial y unificada
    if (!nombre) {
      setMensaje('El nombre es obligatorio.');
      return;
    }
    if (!validateEmail(email)) {
      setMensaje('Por favor ingresa un correo válido.');
      return;
    }
    if (password.length < 6) {
      setMensaje('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      setMensaje('Las contraseñas no coinciden.');
      return;
    }
    
    setMensaje('Registro simulado (sin backend)');
  };

  return (
    <>
      <Navbar />
      <form style={formStyle} onSubmit={handleSubmit} noValidate>
        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: 20 }}>Crear Cuenta</h2>
        <label style={labelStyle}>Nombre</label>
        <input
          style={inputStyle}
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
        <label style={labelStyle}>Correo electrónico</label>
        <input
          style={inputStyle}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          onBlur={() => setTouched(true)}
        />
        {touched && !validateEmail(email) && (
          <span style={{ color: '#e11d48', fontSize: 13 }}>Correo inválido</span>
        )}
        <label style={labelStyle}>Contraseña</label>
        <input
          style={inputStyle}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={6}
        />
        {touched && password.length > 0 && password.length < 6 && (
          <span style={{ color: '#e11d48', fontSize: 13 }}>Mínimo 6 caracteres</span>
        )}
        <label style={labelStyle}>Confirmar contraseña</label>
        <input
          style={inputStyle}
          type="password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        {touched && password !== confirm && confirm.length > 0 && (
          <span style={{ color: '#e11d48', fontSize: 13 }}>Las contraseñas no coinciden</span>
        )}
        <button style={buttonStyle} type="submit">Registrarse</button>
        {mensaje && <p style={{ marginTop: 16, color: '#2563eb', fontWeight: 600 }}>{mensaje}</p>}
      </form>
      <Footer />
    </>
  );
};

export default Register;