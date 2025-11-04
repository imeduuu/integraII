import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getSightings } from '../services/sightings';
import styles from '../styles/report.module.css';

interface Sighting {
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  breed_id?: number | null;
  date?: string;
}

const Avistamientos = () => {
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarAvistamientos = async () => {
      try {
        const data = await getSightings();
        setSightings(data as Sighting[]);
      } catch (err) {
        console.error('Error al obtener los avistamientos:', err);
        setError('No se pudieron cargar los avistamientos.');
      } finally {
        setLoading(false);
      }
    };
    cargarAvistamientos();
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <h2 className={styles.title}>Avistamientos registrados</h2>
        <h3 className={styles.subtitle}>
          Listado de animales reportados por la comunidad
        </h3>

        {loading && <p>Cargando avistamientos...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!loading && sightings.length === 0 && (
          <p>No hay reportes registrados todavía.</p>
        )}

        {sightings.map((s, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '1rem',
              marginBottom: '1.5rem',
              backgroundColor: '#fafafa',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            }}
          >
            <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>
              🆔 Reporte #{index + 1}
            </h3>
            <p>
              📍 <strong>Ubicación:</strong>{' '}
              {s.location || 'No especificada'}
            </p>
            <p>
              🌍 <strong>Latitud:</strong>{' '}
              {s.latitude ?? 'No especificada'}
            </p>
            <p>
              🌎 <strong>Longitud:</strong>{' '}
              {s.longitude ?? 'No especificada'}
            </p>
            <p>
              🐾 <strong>ID de raza:</strong>{' '}
              {s.breed_id ?? 'No especificada'}
            </p>
            <p>
              📝 <strong>Descripción:</strong>{' '}
              {s.description || 'Sin descripción'}
            </p>
            <p>
              📅 <strong>Fecha de creación:</strong>{' '}
              {s.date
                ? new Date(s.date).toLocaleString()
                : 'No especificada'}
            </p>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
};

export default Avistamientos;
