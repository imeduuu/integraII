import React, { useState } from 'react';
import Head from 'next/head';
// Migración: Se reemplazaron todos los inputs y botones nativos por componentes UI estándar
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNotification } from '../components/NotificationProvider';
import { getRazas } from '../services/razaAnimalesAdop';
import { useEffect } from 'react';
import { createSighting } from '../services/sightings';

// ...import eliminado: Map...

import styles from '../styles/report.module.css';

const Report = () => {
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [direccion, setDireccion] = useState(''); // ← nuevo estado
  const [mensaje, setMensaje] = useState('');
  const { addToast } = useNotification();
  // ...eliminado showMap para mapa antiguo...
  const [razas, setRazas] = useState<any[]>([]);
  const [selectedRaza, setSelectedRaza] = useState<number | ''>('');
  const [loadingRazas, setLoadingRazas] = useState(false);

  useEffect(() => {
    const cargarRazas = async () => {
      setLoadingRazas(true);
      try {
        const data = await getRazas();
        console.log('Razas recibidas del backend:', data);
        if (Array.isArray(data)) {
          setRazas(data);
        } else {
          console.warn('getRazas did not return an array:', data);
          setRazas([]);
        }
      } catch (err) {
        console.error('Error cargando razas:', err);
        addToast('No se pudieron cargar las razas', 'error');
        setRazas([]);
      } finally {
        setLoadingRazas(false);
      }
    };
    cargarRazas();
  }, []);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    
    // Validación de campos
    if (!descripcion.trim()) {
      addToast('Por favor ingresa una descripción del animal.', 'warning');
      return;
    }
    
    if (!ubicacion.trim()) {
      addToast('Por favor ingresa la ubicación donde se encuentra el animal.', 'warning');
      return;
    }
    
    if (!latitud || !longitud) {
      addToast('Por favor ingresa las coordenadas o busca por dirección.', 'warning');
      return;
    }
    
    try {
  await createSighting({
    description: descripcion,
    location: ubicacion,
    latitude: parseFloat(latitud),
    longitude: parseFloat(longitud),
    breed_id: selectedRaza ? Number(selectedRaza) : null,
  });

  setMensaje('Reporte enviado correctamente');
  addToast('✓ Reporte enviado exitosamente. Gracias por ayudar a los animales.', 'success');

  // Limpiar formulario
  setDescripcion('');
  setUbicacion('');
  setLatitud('');
  setLongitud('');
  setDireccion('');
  setSelectedRaza('');
} catch (error: any) {
  console.error('Error al crear avistamiento:', error);
  addToast(error.message || 'Error al enviar el reporte. Intenta nuevamente.', 'error');
}
  };

  // Nueva función: buscar coordenadas desde dirección
  const buscarCoordenadas = async () => {
    if (!direccion.trim()) {
      addToast('Por favor ingresa una dirección para buscar.', 'warning');
      return;
    }
    
    try {
      addToast('Buscando coordenadas...', 'info');
      const resp = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`,
        { headers: { "User-Agent": "MiApp/1.0 (tuemail@ejemplo.com)" } }
      );
      const data = await resp.json();
      
      if (data.length > 0) {
        setLatitud(data[0].lat);
        setLongitud(data[0].lon);
        setUbicacion(direccion); // opcional: rellenar ubicación también
        addToast('✓ Coordenadas encontradas correctamente.', 'success');
      } else {
        addToast('No se encontraron coordenadas para esa dirección. Intenta con otra.', 'warning');
      }
    } catch (err) {
      console.error(err);
      addToast('Error al buscar coordenadas. Verifica tu conexión.', 'error');
    }
  };

  return (
    <>
    <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Reportar Animal - Control Sanitario",
              "url": "https://HuellaSegura.vercel.app/reportar-animales",
              "description": "Formulario para reportar animales en situación de calle, con ubicación y coordenadas.",
              "publisher": {
                "@type": "Organization",
                "name": "Control Sanitario",
                "logo": "https://HuellaSegura.vercel.app/logo.png"
              },
              "mainEntity": {
                "@type": "Thing",
                "name": "Reporte de Animal",
                "description": "Animal reportado en situación de calle",
                "additionalProperty": [
                  { "@type": "PropertyValue", "name": "Ubicación", "value": ubicacion || "No especificada" },
                  { "@type": "PropertyValue", "name": "Latitud", "value": latitud || "No especificada" },
                  { "@type": "PropertyValue", "name": "Raza", "value": (selectedRaza === '' ? "No especificada" : (razas.find(r => Number(r.id_raza ?? r.id) === Number(selectedRaza))?.raza ?? "No especificada")) },
                  { "@type": "PropertyValue", "name": "Longitud", "value": longitud || "No especificada" },
                  { "@type": "PropertyValue", "name": "Descripción", "value": descripcion || "No especificada" }
                ]
              }
            })
          }}
        />
      </Head>
      
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
            {/* Selector de razas */}
            <label className={styles.label}>Raza</label>
            <select
              className={styles.input}
              value={selectedRaza}
              onChange={(e) => setSelectedRaza(e.target.value ? Number(e.target.value) : '')}
              required
            >
              <option value="">Selecciona una raza</option>
              {loadingRazas && <option value="">Cargando razas...</option>}
              {razas.map((r, idx) => (
                // key único: combina id y idx para evitar warning si hay ids duplicados
                <option key={`${r.id_raza ?? r.id ?? idx}-${r.raza ?? r.nombre ?? idx}`} value={r.id_raza ?? r.id ?? idx}>
                  {(r.raza)}
                </option>
              ))}
            </select>

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
