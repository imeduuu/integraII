import React from "react";

export default function PublishAdoptionDesign() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 via-yellow-50 to-green-50 flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Publicar Adopción
      </h1>
      <form className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 w-full max-w-lg flex flex-col gap-6">
        {/* Nombre de la mascota */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Nombre de la mascota
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="Ejemplo: Luna"
          />
        </div>
        {/* Edad */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Edad
          </label>
          <input
            type="number"
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
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300">
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
          <input
            type="file"
            accept="image/*"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
          />
        </div>
        {/* Botón (sin funcionalidad) */}
        <button
          type="button"
          className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-400 to-green-400 text-white rounded-lg font-bold shadow-md hover:brightness-110 transition"
        >
          Publicar
        </button>
      </form>
    </div>
  );
}