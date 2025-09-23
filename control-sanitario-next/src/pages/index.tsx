import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Map from '../components/Map';
import UserMetricsCards from '../components/UserMetricsCards';
import styles from '../styles/infoBox.module.css';
import { useNotification } from '../components/NotificationProvider';

const backgroundUrl = '/perrito.png';

const buttonStyle: React.CSSProperties = {
  padding: '12px',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '700',
  fontSize: '1.08rem',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(37,99,253,0.12)',
  transition: 'transform 0.2s',
  textAlign: 'center',
  textDecoration: 'none',
  lineHeight: '2.5rem',
  width: 'clamp(140px, 40vw, 180px)',
};

const Home = () => {
  const [showMap, setShowMap] = useState(false);
  const { addToast } = useNotification();

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
          padding: '5vw 0',
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
            backdropFilter: 'blur(10px)',
          }}
        >
          <img
            src={backgroundUrl}
            alt="Salud y bienestar"
            style={{
              width: '110px',
              borderRadius: 16,
              marginBottom: 18,
              boxShadow: '0 2px 12px rgba(37,99,235,0.10)',
            }}
          />
          <h1
            style={{
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: '#2563eb',
              marginBottom: 10,
              letterSpacing: '1px',
            }}
          >
            Bienvenido a Control Sanitario
          </h1>
          <img
            src="/perrito.png"
            alt="Cachorro decorativo"
            style={{
              width: '140px',
              borderRadius: '18px',
              margin: '18px auto 24px auto',
              boxShadow: '0 2px 12px rgba(37,99,235,0.13)',
              display: 'block',
            }}
          />
          <p
            style={{
              color: '#334155',
              fontSize: '1.08rem',
              marginBottom: 32,
              fontWeight: 500,
            }}
          >
            Gestiona tu salud y bienestar de forma sencilla y segura.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '18px',
              marginBottom: '10px',
            }}
          >
            <a
              href="/login"
              style={{
                ...buttonStyle,
                background: 'linear-gradient(90deg,#2563eb 60%,#60a5fa 100%)',
              }}
            >
              Iniciar sesión
            </a>
            <a
              href="/register"
              style={{
                ...buttonStyle,
                background: 'linear-gradient(90deg,#60a5fa 60%,#2563eb 100%)',
              }}
            >
              Crear cuenta
            </a>
          </div>
        </div>
      </div>
      <main
        style={{
          padding: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#2563eb',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          Bienvenido a la Plataforma de Control Sanitario
        </h1>
        <p
          style={{
            fontSize: '1.125rem',
            color: '#334155',
            marginBottom: '2rem',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          Reporta animales en situación de calle, consulta focos sanitarios y participa en la comunidad.
        </p>
        <UserMetricsCards />
        <div className="my-8 p-6 border rounded-lg bg-gray-50 text-center">
          <h3 className="text-lg font-bold mb-4">Prueba de Notificaciones</h3>
          <div className="flex justify-center gap-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => addToast('¡Operación exitosa!', 'success')}
            >
              Notificación Éxito
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => addToast('Ocurrió un error.', 'error')}
            >
              Notificación Error
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => addToast('Revisa los datos.', 'warning')}
            >
              Notificación Advertencia
            </button>
          </div>
        </div>
        <h2>Mapa de Temuco</h2>
        <button
          style={{
            ...buttonStyle,
            marginTop: '2rem',
            background: 'linear-gradient(90deg,#2563eb 60%,#60a5fa 100%)',
          }}
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? 'Ocultar Mapa' : 'Mostrar Mapa'}
        </button>
        {showMap && <Map />}
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
