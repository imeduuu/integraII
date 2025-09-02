import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Donations = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',      // tipo de donación (alimento, ropa, etc.)
    quantity: '',  // cantidad
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Donación registrada:', formData);
    alert('¡Gracias por tu donación! (Prueba sin guardar en la base de datos)');
    setFormData({ name: '', email: '', type: '', quantity: '', message: '' });
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Donaciones y Voluntariado</h2>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <div>
            <label className="block font-medium">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Tipo de donación</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            >
              <option value="">Selecciona...</option>
              <option value="alimento">Alimento</option>
              <option value="medicinas">Medicinas</option>
              <option value="ropa">Ropa</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Cantidad</label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Mensaje (opcional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Registrar Donación
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Donations;
