/**
 * Página de prueba para Favorites API
 * Solo para desarrollo - NO USAR EN PRODUCCIÓN
 */

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TestFavoritesPage: React.FC = () => {
  const [token, setToken] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [response, setResponse] = useState("");

  const apiBase = "http://localhost:3000/api/favorites";

  const pretty = (data: any) =>
    JSON.stringify(data, null, 2);

  // --- GET ---
  const handleGet = async () => {
    try {
      const res = await fetch(apiBase, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResponse(pretty(await res.json()));
    } catch (e: any) {
      setResponse("ERROR: " + e.message);
    }
  };

  // --- POST ---
  const handlePost = async () => {
    try {
      const res = await fetch(apiBase, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_animal: Number(animalId) }),
      });

      setResponse(pretty(await res.json()));
    } catch (e: any) {
      setResponse("ERROR: " + e.message);
    }
  };

  // --- DELETE ---
  const handleDelete = async () => {
    try {
      const res = await fetch(`${apiBase}/${animalId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResponse(pretty(await res.json()));
    } catch (e: any) {
      setResponse("ERROR: " + e.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ⭐ Prueba de API: Favoritos
            </h1>

            <p className="text-gray-600 mb-6">
              Esta página permite probar fácilmente las rutas GET, POST y DELETE de <strong>/api/favorites</strong>.
            </p>

            {/* INPUT TOKEN */}
            <div className="mb-6">
              <label className="font-semibold text-gray-700">
                Token JWT:
              </label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Pega aquí tu JWT"
                className="w-full mt-1 p-2 border rounded bg-gray-50"
              />
            </div>

            {/* INPUT ANIMAL ID */}
            <div className="mb-6">
              <label className="font-semibold text-gray-700">
                ID del Animal:
              </label>
              <input
                type="number"
                value={animalId}
                onChange={(e) => setAnimalId(e.target.value)}
                placeholder="Ej: 1"
                className="w-full mt-1 p-2 border rounded bg-gray-50"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleGet}
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              >
                GET Favoritos
              </button>

              <button
                onClick={handlePost}
                className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
              >
                POST Agregar Favorito
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700"
              >
                DELETE Eliminar Favorito
              </button>
            </div>

            {/* RESPONSE */}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Respuesta:
            </h2>

            <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto min-h-[200px]">
{response || "// Esperando respuesta..."}
            </pre>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TestFavoritesPage;
