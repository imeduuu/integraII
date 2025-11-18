/**
 * Página de prueba para el hook useFavorites
 * Solo para desarrollo - NO USAR EN PRODUCCIÓN
 */

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useFavorites } from "../hooks/useFavorites";

const TestFavoritesHookPage: React.FC = () => {
  const [token, setToken] = useState("");
  const [animalId, setAnimalId] = useState<number | "">("");

  const { favorites, loading, error, list, add, remove } = useFavorites(token);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ⭐ Prueba del Hook useFavorites
            </h1>

            <p className="text-gray-600 mb-6">
              Esta página prueba <strong>list(), add(), remove()</strong> del hook.
            </p>

            {/* TOKEN */}
            <div className="mb-6">
              <label className="font-semibold text-gray-700">Token JWT:</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Pega tu token JWT"
                className="w-full mt-1 p-2 border rounded bg-gray-50"
              />
            </div>

            {/* ANIMAL ID */}
            <div className="mb-6">
              <label className="font-semibold text-gray-700">ID del Animal:</label>
              <input
                type="number"
                value={animalId}
                onChange={(e) => setAnimalId(Number(e.target.value))}
                placeholder="Ej: 1"
                className="w-full mt-1 p-2 border rounded bg-gray-50"
              />
            </div>

            {/* BOTONES */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => list()}
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              >
                list()
              </button>

              <button
                onClick={() => animalId && add(animalId)}
                className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
              >
                add()
              </button>

              <button
                onClick={() => animalId && remove(animalId)}
                className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700"
              >
                remove()
              </button>
            </div>

            {/* ESTADOS */}
            {loading && <p className="text-yellow-600 mb-3">Cargando...</p>}
            {error && <p className="text-red-600 mb-3">{error}</p>}

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Favoritos actuales:
            </h2>

            <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto min-h-[200px]">
{JSON.stringify(favorites, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TestFavoritesHookPage;
