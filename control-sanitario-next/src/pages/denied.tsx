import React from 'react';
import Button from '../components/ui/Button'; // Migración: Usar botón UI estándar
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

const buttonStyle: React.CSSProperties = {
  padding: '12px 32px',
  background: 'linear-gradient(90deg,#2563eb 60%,#60a5fa 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 700,
  fontSize: '1.08rem',
  cursor: 'pointer',
  margin: '0 8px',
  boxShadow: '0 2px 8px rgba(37,99,235,0.12)',
};

const DeniedPage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(90deg,#e0e7ef 60%,#f8fafc 100%)',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 18,
            boxShadow: '0 8px 32px rgba(37,99,235,0.10)',
            padding: '3vw 6vw',
            maxWidth: 400,
            textAlign: 'center',
            border: '1px solid #e0e7ef',
            animation: 'fadeIn 0.7s',
            backdropFilter: 'blur(8px)',
          }}
        >
          <h1 style={{ color: '#ef4444', fontWeight: 800, fontSize: '2rem', marginBottom: 18 }}>
            Acceso denegado
          </h1>
          <p style={{ color: '#334155', fontSize: '1.08rem', marginBottom: 24 }}>
            No tienes permisos para ver esta página.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {/* Migración: Se reemplazan los botones nativos por el componente Button UI estándar. */}
            <Button
              style={buttonStyle}
              onClick={() => router.push('/login')}
            >
              Ir a Iniciar sesión
            </Button>
            <Button
              style={{ ...buttonStyle, background: '#e5e7eb', color: '#2563eb' }}
              onClick={() => router.push('/')}
            >
              Ir al Inicio
            </Button>
          </div>
        </div>
      </div>
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

export default DeniedPage;