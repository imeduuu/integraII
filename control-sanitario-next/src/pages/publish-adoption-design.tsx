import React, { useState } from "react";
import Input from "../components/ui/Input"; // Migración: Usar input UI estándar
import Button from "../components/ui/Button"; // Migración: Usar botón UI estándar
import { useNotification } from "../components/NotificationProvider";

export default function PublishAdoptionDesign() {
  const { addToast } = useNotification();
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    tipo: '',
    descripcion: '',
    foto: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, foto: file }));
    if (file) {
      addToast('Imagen cargada correctamente.', 'success');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.nombre.trim()) {
      addToast('Por favor ingresa el nombre de la mascota.', 'warning');
      return;
    }
    
    if (!formData.edad || parseInt(formData.edad) < 0) {
      addToast('Por favor ingresa una edad válida.', 'warning');
      return;
    }
    
    if (!formData.tipo) {
      addToast('Por favor selecciona el tipo de mascota.', 'warning');
      return;
    }
    
    if (!formData.descripcion.trim()) {
      addToast('Por favor agrega una descripción de la mascota.', 'warning');
      return;
    }
    
    if (!formData.foto) {
      addToast('Por favor sube una foto de la mascota.', 'warning');
      return;
    }
    
    // Simulación de publicación exitosa
    console.log('Publicación creada:', formData);
    addToast('✓ Publicación creada exitosamente. La mascota está ahora disponible para adopción.', 'success');
    
    // Limpiar formulario
    setFormData({
      nombre: '',
      edad: '',
      tipo: '',
      descripcion: '',
      foto: null
    });
    
    // Reset del input de archivo
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 via-yellow-50 to-green-50 flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Publicar Adopción
      </h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 w-full max-w-lg flex flex-col gap-6">
        {/* Nombre de la mascota */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Nombre de la mascota
          </label>
          {/* Migración: Se reemplaza el input nativo por el componente Input UI estándar. */}
          <Input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="Ejemplo: Luna"
          />
        </div>
        {/* Edad */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Edad
          </label>
          <Input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            min="0"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="Ejemplo: 2"
          />
        </div>
        {/* Tipo */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Tipo
          </label>
          <select 
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <option value="">Selecciona una opción</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
          </select>
        </div>
        {/* Descripción */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            rows={3}
            placeholder="Describe a la mascota..."
          />
        </div>
        {/* Foto */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Foto
          </label>
          <Input
            type="file"
            name="foto"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
          />
        </div>
        {/* Botón (sin funcionalidad) */}
        {/* Migración: Se reemplaza el botón nativo por el componente Button UI estándar. */}
        <Button
          type="submit"
          className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-400 to-green-400 text-white rounded-lg font-bold shadow-md hover:brightness-110 transition"
        >
          Publicar
        </Button>
      </form>
    </div>
  );
}