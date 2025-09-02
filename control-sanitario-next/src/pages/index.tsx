import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InfoBox from '../components/InfoBox';
import styles from '../styles/infoBox.module.css';
import AuthModal from '../components/AuthModal';

const backgroundUrl = '/perrito.png';

const buttonStyle: React.CSSProperties = {
  width: 180,
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

const outlineButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: '#fff',
  color: '#2563eb',
  border: '2px solid #2563eb',
};

const Home = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  return (
    <>
      <Navbar />
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        mode={authMode}
        setMode={setAuthMode}
      />
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
            background: 'rgba(255,255,255,0.75)',
            borderRadius: 24,
            boxShadow: '0 8px 32px rgba(37,99,235,0.10)',
            padding: '3vw 6vw',
            maxWidth: 480,
            width: '95vw',
            textAlign: 'center',
            border: '1px solid #e0e7ef',
            animation: 'fadeIn 0.7s',
            backdropFilter: 'blur(10px)'
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
          {/* SOLO UN BOTÓN REGÍSTRATE */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '10px'
          }}>
            <button
              style={buttonStyle}
              onClick={() => { setAuthMode('register'); setAuthOpen(true); }}
            >
              Regístrate
            </button>
          </div>
        </div>
      </div>
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
