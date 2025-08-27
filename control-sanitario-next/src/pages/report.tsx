import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


import { useState } from 'react';

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
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Reportar Animal</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block">Descripción</label>
            <input className="border p-2 w-full" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
          </div>
          <div>
            <label className="block">Ubicación</label>
            <input className="border p-2 w-full" value={ubicacion} onChange={e => setUbicacion(e.target.value)} required />
          </div>
          <div>
            <label className="block">Latitud</label>
            <input className="border p-2 w-full" value={latitud} onChange={e => setLatitud(e.target.value)} required type="number" step="any" />
          </div>
          <div>
            <label className="block">Longitud</label>
            <input className="border p-2 w-full" value={longitud} onChange={e => setLongitud(e.target.value)} required type="number" step="any" />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Enviar reporte</button>
        </form>
        {mensaje && <p className="mt-4 font-bold">{mensaje}</p>}
      </main>
      <Footer />
    </>
  );
};

export default Report;
