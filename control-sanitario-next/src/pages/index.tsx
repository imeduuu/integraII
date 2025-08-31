import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InfoBox from '../components/InfoBox';
import styles from '../styles/infoBox.module.css';

const backgroundUrl = '/perrito.png';

const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};
const formStyle: React.CSSProperties = {
  maxWidth: '400px',
  width: '90vw',
  padding: '32px',
  background: 'rgba(255,255,255,0.98)',
  borderRadius: '18px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
  border: '1px solid #e0e7ef',
  animation: 'fadeIn 0.4s'
};
const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 600,
  color: '#2563eb'
};
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  marginBottom: '18px',
  borderRadius: '8px',
  border: '1.5px solid #b6c2d6',
  fontSize: '1.05rem',
  background: '#f8fafc',
  transition: 'border 0.2s'
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
  boxShadow: '0 2px 8px rgba(37,99,235,0.12)',
  transition: 'transform 0.2s',
};
const secondaryButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: '#e5e7eb',
  color: '#2563eb',
  marginTop: 8,
  boxShadow: 'none'
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Home = () => {
  const [modal, setModal] = useState<'login' | 'register' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleOpen = (type: 'login' | 'register') => {
    setModal(type);
    setEmail('');
    setPassword('');
    setMensaje('');
  };

  const handleClose = () => setModal(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMensaje('Por favor ingresa un correo válido.');
      return;
    }
    if (password.length < 6) {
      setMensaje('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setMensaje(modal === 'login' ? 'Inicio de sesión simulado.' : 'Registro simulado.');
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: '75vh',
          width: '100%',
          backgroundImage: `linear-gradient(rgba(37,99,235,0.18),rgba(255,255,255,0.7)), url(${backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5vw 0'
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.75)', // más transparente
            borderRadius: 24,
            boxShadow: '0 8px 32px rgba(37,99,235,0.10)',
            padding: '3vw 6vw',
            maxWidth: 480,
            width: '95vw',
            textAlign: 'center',
            border: '1px solid #e0e7ef',
            animation: 'fadeIn 0.7s',
            backdropFilter: 'blur(10px)' // difuminado bonito estilo glass
          }}
        >

          <img
            src={backgroundUrl}
            alt="Salud y bienestar"
            style={{
              width: '110px',
              borderRadius: 16,
              marginBottom: 18,
              boxShadow: '0 2px 12px rgba(37,99,235,0.10)'
            }}
          />
          <h1 style={{
            fontWeight: 800,
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: '#2563eb',
            marginBottom: 10,
            letterSpacing: '1px'
          }}>
            Bienvenido a Control Sanitario
          </h1>
          {/* Imagen del perrito decorativa */}
          <img
            src="/perrito.png"
            alt="Perrito decorativo"
            style={{
              width: '140px',
              borderRadius: '18px',
              margin: '18px auto 24px auto',
              boxShadow: '0 2px 12px rgba(37,99,235,0.13)',
              display: 'block'
            }}
          />
          <p style={{
            color: '#334155',
            fontSize: '1.08rem',
            marginBottom: 32,
            fontWeight: 500
          }}>
            Gestiona tu salud y bienestar de forma sencilla y segura.
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '18px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <button
              style={{
                ...buttonStyle,
                width: 'clamp(140px, 40vw, 180px)'
              }}
              onClick={() => handleOpen('login')}
              onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Iniciar sesión
            </button>
            <button
              style={{
                ...buttonStyle,
                width: 'clamp(140px, 40vw, 180px)',
                background: 'linear-gradient(90deg,#60a5fa 60%,#2563eb 100%)'
              }}
              onClick={() => handleOpen('register')}
              onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Crear cuenta
            </button>
          </div>
        </div>
      </div>
      {modal && (
        <div style={modalStyle} onClick={handleClose}>
          <form
            style={formStyle}
            onClick={e => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <h2 style={{
              fontWeight: 700,
              fontSize: '1.5rem',
              marginBottom: 20,
              color: '#2563eb'
            }}>
              {modal === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h2>
            <label style={labelStyle}>Correo electrónico</label>
            <input
              style={inputStyle}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="ejemplo@correo.com"
            />
            <label style={labelStyle}>Contraseña</label>
            <input
              style={inputStyle}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Mínimo 6 caracteres"
            />
            <button style={buttonStyle} type="submit">
              {modal === 'login' ? 'Entrar' : 'Registrarse'}
            </button>
            {mensaje && <p style={{ marginTop: 16, color: '#2563eb', fontWeight: 600 }}>{mensaje}</p>}
            <button style={secondaryButtonStyle} type="button" onClick={handleClose}>
              Cancelar
            </button>
          </form>
        </div>
      )}
      <main style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: '#2563eb',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Bienvenido a la Plataforma de Control Sanitario
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#334155',
          marginBottom: '2rem',
          textAlign: 'center',
          maxWidth: '800px'
        }}>
          Reporta animales en situación de calle, consulta focos sanitarios y participa en la comunidad.
        </p>
        <div className={styles.infoGrid}>
          <InfoBox title="Animales registrados" value={42} link="/animals" />
          <InfoBox title="Reportes enviados" value={15} link="/report" />
          <InfoBox title="Adopciones completadas" value={8} link="/donations" />
        </div>
      </main>
      <Footer />
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </>
  );
};

export default Home;
