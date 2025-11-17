/**
 * Página de prueba para visualizar las funciones de useSpecies
 * Solo para desarrollo - NO USAR EN PRODUCCIÓN
 */

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import useSpecies from "../hooks/useSpecies";

const SpeciesTestPage: React.FC = () => {
  const {
    species,
    loading,
    error,
    createSpecies,
    deleteSpecies,
    updateSpecies,
  } = useSpecies();

  const [newName, setNewName] = useState("");

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🐾 Prueba del Hook useSpecies
            </h1>

            <p className="text-gray-600 mb-8">
              Esta página te permite probar todas las funciones del hook <b>useSpecies</b>:
              obtener, crear, editar y eliminar especies desde tu API.
            </p>

            {/* Error */}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                ⚠️ Error: {error}
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="text-center text-gray-700 mb-4">Cargando...</div>
            )}

            {/* Lista actual de especies */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                📋 Especies en la base de datos
              </h2>

              <div className="space-y-4">
                {species.map((sp) => (
                  <div
                    key={sp.id_especie}
                    className="p-4 bg-gray-50 border rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {sp.especie}
                      </p>
                      <p className="text-sm text-gray-500">
                        ID: {sp.id_especie}
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        onClick={() =>
                          updateSpecies(sp.id_especie, sp.especie + " ✔")
                        }
                      >
                        Editar
                      </Button>

                      <Button
                        onClick={() => deleteSpecies(sp.id_especie)}
                        variant="secondary"
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Crear nueva especie */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-900 mb-3">
                ➕ Agregar nueva especie
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nombre de la especie"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-400"
                />

                <Button
                  onClick={() => {
                    if (newName.trim() === "") return;
                    createSpecies(newName);
                    setNewName("");
                  }}
                >
                  Crear especie
                </Button>
              </div>
            </div>

            {/* Características */}
            <div className="mt-10 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ✨ Funciones del hook implementadas:
              </h3>

              <ul className="space-y-2 text-gray-700">
                <li>✓ Obtener lista de especies (GET)</li>
                <li>✓ Crear nueva especie (POST)</li>
                <li>✓ Actualizar especie (PUT)</li>
                <li>✓ Eliminar especie (DELETE)</li>
                <li>✓ Manejo de errores</li>
                <li>✓ Manejo de loading</li>
                <li>✓ Estado sincronizado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SpeciesTestPage;
