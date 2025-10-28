/**
 * Página de inicio pública con información principal del sistema
 */
import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// ...import eliminado: Map...
import UserMetricsCards from '../components/UserMetricsCards';
import styles from '../styles/infoBox.module.css';
import { useNotification } from '../components/NotificationProvider';

const backgroundUrl = '/backgrounds/perrito.webp';

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

/**
 * Página principal de landing con hero section, métricas y mapa interactivo
 * Accesible a todos los usuarios sin autenticación
 */
const Home = () => {
  // ...eliminado showMap para mapa antiguo...
  const { addToast } = useNotification(); // Hook de notificaciones

  return (
    <>
      <Navbar />
      <div
        className="hero-section"
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
          className="hero-content tablet-fade-in"
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
            className="text-responsive-h1 font-extrabold tracking-tight"
            style={{
              color: '#2563eb',
              marginBottom: 10,
            }}
          >
            Bienvenido a Control Sanitario
          </h1>
          <img
            src="/backgrounds/perrito.webp"
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
            className="text-responsive-lead leading-relaxed font-medium"
            style={{
              color: '#334155',
              marginBottom: 32,
            }}
          >
            Gestiona tu salud y bienestar de forma sencilla y segura.
          </p>
          <div
            className="tablet:gap-6"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '18px',
              marginBottom: '10px',
            }}
          >
            <a
              href="/login"
              className="tablet-button touch-feedback"
              style={{
                ...buttonStyle,
                background: 'linear-gradient(90deg,#2563eb 60%,#60a5fa 100%)',
              }}
            >
              Iniciar sesión
            </a>
            <a
              href="/register"
              className="tablet-button touch-feedback"
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
        className="tablet-container"
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
          className="text-responsive-h1 font-extrabold leading-tight"
          style={{
            color: '#2563eb',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          Bienvenido a la Plataforma de Control Sanitario
        </h1>
        <p
          className="text-responsive-lead leading-relaxed measure-normal"
          style={{
            color: '#334155',
            marginBottom: '2rem',
            textAlign: 'center',
          }}
        >
          Reporta animales en situación de calle, consulta focos sanitarios y participa en la comunidad.
        </p>
        <UserMetricsCards />
        
        {/* Sección de Prueba de Notificaciones - MÁS VISIBLE */}
        <div className="my-12 p-8 border-4 border-teal-500 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 shadow-xl">
          <div className="text-center mb-6">
            <h3 className="text-responsive-h3 font-bold leading-snug mb-2 text-teal-700">
              🔔 Prueba las Notificaciones Toast
            </h3>
            <p className="text-responsive-body leading-relaxed text-gray-600">
              Haz clic en los botones para ver las notificaciones con fondo verde aqua ⬆️
            </p>
            <div className="mt-2 inline-block px-4 py-2 bg-teal-100 rounded-lg">
              <span className="text-sm font-semibold text-teal-800">
                Las notificaciones aparecerán en la esquina superior derecha →
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {/* Migración: Se reemplazan los botones nativos por el componente Button UI estándar. */}
            <Button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              onClick={() => addToast('¡Operación exitosa! ✅', 'success')}
            >
              ✅ Éxito
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              onClick={() => addToast('❌ Ocurrió un error. Intenta de nuevo.', 'error')}
            >
              ❌ Error
            </Button>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              onClick={() => addToast('⚠️ Advertencia: Revisa los datos.', 'warning')}
            >
              ⚠️ Advertencia
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              onClick={() => addToast('ℹ️ Esta es información importante.', 'info')}
            >
              ℹ️ Información
            </Button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              👆 Haz clic en cualquier botón y mira la esquina superior derecha de la pantalla
            </p>
          </div>
        </div>
        
        {/* Mapa eliminado, solo disponible en /mapa */}
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
