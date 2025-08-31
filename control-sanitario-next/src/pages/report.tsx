import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


import { useState } from 'react';

import styles from '../styles/report.module.css';

const Report = () => {
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descripcion, ubicacion, latitud: parseFloat(latitud), longitud: parseFloat(longitud) })
      });
      if (res.ok) {
        setMensaje('Reporte enviado correctamente');
        setDescripcion('');
        setUbicacion('');
        setLatitud('');
        setLongitud('');
      } else {
        setMensaje('Error al enviar el reporte');
      }
    } catch {
      setMensaje('Error de conexión');
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className={styles.container}>
          <h2 className={styles.title}>Reportar Animal</h2>
          <h3 className={styles.subtitle}>Plataforma para la gestión y prevención sanitaria de animales en situación de calle</h3>
          <p className={styles.text}>
            Es una plataforma digital web diseñada para identificar, monitorear y gestionar casos de animales en situación de calle, con un enfoque en la prevención sanitaria y la colaboración comunitaria.<br /><br />
            El sistema permite centralizar reportes ciudadanos, llevar un historial sanitario individual de cada animal, generar alertas tempranas y facilitar la coordinación entre vecinos, veterinarios y autoridades municipales, contribuyendo a mejorar la salud pública, el bienestar animal y la seguridad de la comunidad.
          </p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>Descripción</label>
            <textarea
              className={styles.input}
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              required
              rows={3}
              style={{resize: 'vertical'}}
            />
            <label className={styles.label}>Ubicación</label>
            <textarea
              className={styles.input}
              value={ubicacion}
              onChange={e => setUbicacion(e.target.value)}
              required
              rows={2}
              style={{resize: 'vertical'}}
            />
            <label className={styles.label}>Latitud</label>
            <textarea
              className={styles.input}
              value={latitud}
              onChange={e => setLatitud(e.target.value)}
              required
              rows={1}
              style={{resize: 'vertical'}}
            />
            <label className={styles.label}>Longitud</label>
            <textarea
              className={styles.input}
              value={longitud}
              onChange={e => setLongitud(e.target.value)}
              required
              rows={1}
              style={{resize: 'vertical'}}
            />
            <button className={styles.btn} type="submit">Enviar reporte</button>
          </form>
          {mensaje && <p className={styles.message}>{mensaje}</p>}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Report;
