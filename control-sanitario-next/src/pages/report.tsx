import React, { useState } from 'react';
// Migración: Se reemplazaron todos los inputs y botones nativos por componentes UI estándar
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// ...import eliminado: Map...

import styles from '../styles/report.module.css';

const Report = () => {
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [direccion, setDireccion] = useState(''); // ← nuevo estado
  const [mensaje, setMensaje] = useState('');
  // ...eliminado showMap para mapa antiguo...

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          descripcion,
          ubicacion,
          latitud: parseFloat(latitud),
          longitud: parseFloat(longitud)
        })
      });
      if (res.ok) {
        setMensaje('Reporte enviado correctamente');
        setDescripcion('');
        setUbicacion('');
        setLatitud('');
        setLongitud('');
        setDireccion('');
      } else {
        setMensaje('Error al enviar el reporte');
      }
    } catch {
      setMensaje('Error de conexión');
    }
  };

  // Nueva función: buscar coordenadas desde dirección
  const buscarCoordenadas = async () => {
    if (!direccion) return;
    try {
      const resp = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`,
        { headers: { "User-Agent": "MiApp/1.0 (tuemail@ejemplo.com)" } }
      );
      const data = await resp.json();
      if (data.length > 0) {
        setLatitud(data[0].lat);
        setLongitud(data[0].lon);
        setUbicacion(direccion); // opcional: rellenar ubicación también
      } else {
        alert('No se encontraron coordenadas para esa dirección');
      }
    } catch (err) {
      console.error(err);
      alert('Error al buscar coordenadas');
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
            Es una plataforma digital web diseñada para identificar, monitorear y gestionar casos de animales en situación de calle, con un enfoque en la prevención sanitaria y la colaboración comunitaria.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>Descripción</label>
            <textarea
              className={styles.input}
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              required
              rows={3}
              style={{ resize: 'vertical' }}
            />

            <label className={styles.label}>Ubicación</label>
            <textarea
              className={styles.input}
              value={ubicacion}
              onChange={e => setUbicacion(e.target.value)}
              required
              rows={2}
              style={{ resize: 'vertical' }}
            />

            {/* NUEVO: Buscar por dirección */}
            <label className={styles.label}>Buscar por Dirección</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Input
                type="text"
                value={direccion}
                onChange={e => setDireccion(e.target.value)}
                placeholder="Ej: Av. Siempre Viva 742"
                style={{ flex: 1 }}
              />
              <Button type="button" onClick={buscarCoordenadas} className={styles.btn}>
                Buscar
              </Button>
            </div>

            <label className={styles.label}>Latitud</label>
            <Input
              type="text"
              value={latitud}
              onChange={e => setLatitud(e.target.value)}
              required
            />

            <label className={styles.label}>Longitud</label>
            <Input
              type="text"
              value={longitud}
              onChange={e => setLongitud(e.target.value)}
              required
            />

            <Button className={styles.btn} type="submit">Enviar reporte</Button>
          </form>

          {mensaje && <p className={styles.message}>{mensaje}</p>}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Report;
