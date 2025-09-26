import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { userMock } from "../../context/userMock";
import Footer from "../../components/Footer";
import Link from "next/link"; // Importamos Link para navegación
import Button from "../../components/ui/Button"; // Migración: Usar botón UI estándar

const backgroundUrl = "/perrito.png";

// Mock de organizaciones (reemplazar con datos reales de API/BD)
const mockOrgs = [
  { id: 1, name: "Simon", email: "hola123@gmail.com", status: "Activa" },
  { id: 2, name: "Huella Segura", email: "contacto@huella.com", status: "Inactiva" },
  { id: 3, name: "Refugio Animal", email: "refugio@correo.cl", status: "Activa" },
];

import { useEffect } from "react";
const AdminOrgs = () => {
  useEffect(() => {
    if (userMock.role !== "admin" && userMock.role !== "user") {
      window.location.replace("/denied");
    }
  }, []);
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");

  // Filtrar en tiempo real
  const filteredOrgs = mockOrgs.filter((org) => {
    return (
      org.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      org.email.toLowerCase().includes(emailFilter.toLowerCase())
    );
  });

  return (
    <>
      <Navbar />
      <div
        className="min-h-[75vh] flex items-center justify-center px-4 py-12"
        style={{
          backgroundImage: `linear-gradient(rgba(37,99,235,0.15),rgba(255,255,255,0.8)), url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-8 animate-fadeIn">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
            Administración de Organizaciones
          </h1>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Filtrar por nombre..."
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Filtrar por email..."
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Tabla responsiva */}
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full border-collapse bg-white">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Nombre</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Estado</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrgs.length > 0 ? (
                  filteredOrgs.map((org) => (
                    <tr key={org.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">{org.name}</td>
                      <td className="px-6 py-4">{org.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            org.status === "Activa"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {org.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center space-x-2">
                        {/* Solo admin puede ver los botones de editar/eliminar */}
                        {userMock.role === "admin" && (
                          <>
                            {/* Migración: Se reemplazan los botones nativos por el componente Button UI estándar. */}
                            <Link href={`/admin-orgs/${org.id}`}>
                              <Button
                                variant="primary"
                                className="px-3 py-1 bg-blue-500 shadow hover:bg-blue-600"
                              >
                                Editar
                              </Button>
                            </Link>
                            <Button
                              variant="primary"
                              className="px-3 py-1 bg-red-500 shadow hover:bg-red-600"
                            >
                              Eliminar
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-6 text-center text-gray-500">
                      No se encontraron resultados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/*Documentación interna:
              Para agregar una nueva columna:
              1. Agregar un <th> en el <thead>.
              2. Mostrar el valor en el <tbody> usando org["columna"].
              
              Para agregar una nueva acción:
              1. Dentro de la celda de acciones, añadir otro <button>.
              2. Asignar el handler correspondiente (ej. onClick={() => ...}).
          */}
        </div>
      </div>
      <Footer />

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.7s ease-in-out;
          }
        `}
      </style>
    </>
  );
};

export default AdminOrgs;
