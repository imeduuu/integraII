import React, { useState } from 'react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  setMode: (mode: 'login' | 'register') => void;
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.18)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};
const modalStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 16,
  padding: '32px 28px',
  minWidth: 320,
  maxWidth: 360,
  boxShadow: '0 2px 16px rgba(37,99,235,0.12)',
  position: 'relative'
};
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  marginBottom: '16px',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  fontSize: '1rem'
};
const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  background: 'linear-gradient(90deg,#2563eb 60%,#60a5fa 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 700,
  fontSize: '1.08rem',
  cursor: 'pointer',
  marginTop: 8
};
const closeBtn: React.CSSProperties = {
  position: 'absolute',
  top: 10,
  right: 16,
  fontSize: 22,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#2563eb'
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, mode, setMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!validateEmail(email)) {
      setMensaje('Por favor ingresa un correo válido.');
      return;
    }
    if (password.length < 6) {
      setMensaje('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setMensaje(mode === 'login'
      ? 'Inicio de sesión simulado (sin backend)'
      : 'Registro simulado (sin backend)'
    );
  };

  React.useEffect(() => {
    if (open) {
      setEmail('');
      setPassword('');
      setMensaje('');
      setTouched(false);
    }
  }, [open, mode]);

  if (!open) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <button style={closeBtn} onClick={onClose} aria-label="Cerrar">×</button>
        <div style={{ display: 'flex', marginBottom: 24, borderBottom: '1.5px solid #e5e7eb' }}>
          <button
            style={{
              flex: 1,
              padding: '10px 0',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '1.08rem',
              border: 'none',
              background: 'none',
              borderBottom: mode === 'register' ? '2.5px solid #2563eb' : '2.5px solid transparent',
              color: mode === 'register' ? '#2563eb' : '#64748b',
              transition: 'border 0.2s, color 0.2s'
            }}
            onClick={() => setMode('register')}
          >
            Crear cuenta
          </button>
          <button
            style={{
              flex: 1,
              padding: '10px 0',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '1.08rem',
              border: 'none',
              background: 'none',
              borderBottom: mode === 'login' ? '2.5px solid #2563eb' : '2.5px solid transparent',
              color: mode === 'login' ? '#2563eb' : '#64748b',
              transition: 'border 0.2s, color 0.2s'
            }}
            onClick={() => setMode('login')}
          >
            Iniciar sesión
          </button>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>Correo electrónico</label>
          <input
            style={inputStyle}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            onBlur={() => setTouched(true)}
            placeholder="correo@ejemplo.com"
          />
          {touched && !validateEmail(email) && (
            <span style={{ color: '#e11d48', fontSize: 13 }}>Correo inválido</span>
          )}
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8, marginTop: 8 }}>Contraseña</label>
          <input
            style={inputStyle}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            placeholder="Mínimo 6 caracteres"
          />
          {touched && password.length > 0 && password.length < 6 && (
            <span style={{ color: '#e11d48', fontSize: 13 }}>Mínimo 6 caracteres</span>
          )}
          <button style={buttonStyle} type="submit">
            {mode === 'login' ? 'Entrar' : 'Crear cuenta'}
          </button>
        </form>
        {mensaje && <p style={{ marginTop: 16, color: '#2563eb', fontWeight: 600 }}>{mensaje}</p>}
      </div>
    </div>
  );
};

export default AuthModal;