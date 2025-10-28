/**
 * Página de edición detallada de organizaciones para administradores
 */
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { userMock } from "../../context/userMock";

// Datos mock de organizaciones para desarrollo
const mockOrgs = [
  { id: 1, name: "Simon", email: "hola123@gmail.com", address: "Av. Central 123", status: "Activa" },
  { id: 2, name: "Huella Segura", email: "contacto@huella.com", address: "Calle Norte 456", status: "Inactiva" },
  { id: 3, name: "Refugio Animal", email: "refugio@correo.cl", address: "Ruta 78 KM 12", status: "Activa" },
];

/**
 * Página de edición de organización individual (ruta dinámica /admin-orgs/[id])
 * Permite a administradores editar datos de organizaciones: nombre, email, dirección y estado
 */
const AdminOrgDetail = () => {
  const router = useRouter();
  const { id } = router.query; // ID de la organización desde la URL

  const [org, setOrg] = useState<any>(null); // Organización actual
  // Estado del formulario editable
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    status: "",
  });
  const [message, setMessage] = useState(""); // Mensaje de confirmación

  const backgroundUrl = "/backgrounds/perrito.webp";

  useEffect(() => {
    // Verificar permisos de administrador
    if (userMock.role !== "admin") {
      router.replace("/denied");
      return;
    }
    // Cargar datos de la organización según ID de la URL
    if (id) {
      const foundOrg = mockOrgs.find((o) => o.id === Number(id));
      if (foundOrg) {
        setOrg(foundOrg);
        setFormData(foundOrg); // Pre-llenar formulario con datos existentes
      }
    }
  }, [id]);

  // Actualizar campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Guardar cambios (simulado - sin backend)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos guardados:", formData);
    setMessage("Cambios guardados correctamente");
    setTimeout(() => setMessage(""), 3000); // Auto-ocultar mensaje
  };

  // Mostrar loading mientras carga la organización
  if (!org) return <p className="text-center mt-10">Cargando organización...</p>;

  return (
    <>
      <Navbar />
      {/* Contenedor principal con fondo de imagen */}
      <div
        className="min-h-[75vh] flex items-center justify-center px-4 py-12"
        style={{
          backgroundImage: `linear-gradient(rgba(37,99,235,0.15),rgba(255,255,255,0.8)), url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Formulario de edición con fondo translúcido */}
        <section className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl p-8 w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
            Editar Organización
          </h1>

          {/* Mensaje de confirmación */}
          {message && (
            <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            {/* Campo: Nombre de la organización */}
            <div>
              <label className="block font-semibold text-gray-700">Nombre</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Campo: Email de contacto */}
            <div>
              <label className="block font-semibold text-gray-700">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Campo: Dirección física */}
            <div>
              <label className="block font-semibold text-gray-700">Dirección</label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Campo: Estado de la organización */}
            <div>
              <label className="block font-semibold text-gray-700">Estado</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="Activa">Activa</option>
                <option value="Inactiva">Inactiva</option>
              </select>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                variant="secondary"
                className="bg-gray-300 hover:bg-gray-400"
                onClick={() => router.push("/admin-orgs")}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Guardar Cambios
              </Button>
            </div>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AdminOrgDetail;
