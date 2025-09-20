import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const mockOrgs = [
  { id: 1, name: "Simon", email: "hola123@gmail.com", address: "Av. Central 123", status: "Activa" },
  { id: 2, name: "Huella Segura", email: "contacto@huella.com", address: "Calle Norte 456", status: "Inactiva" },
  { id: 3, name: "Refugio Animal", email: "refugio@correo.cl", address: "Ruta 78 KM 12", status: "Activa" },
];

const AdminOrgDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [org, setOrg] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    status: "",
  });
  const [message, setMessage] = useState("");

  const backgroundUrl = "/perrito.png";

  useEffect(() => {
    if (id) {
      const foundOrg = mockOrgs.find((o) => o.id === Number(id));
      if (foundOrg) {
        setOrg(foundOrg);
        setFormData(foundOrg);
      }
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos guardados:", formData);
    setMessage("Cambios guardados correctamente");
    setTimeout(() => setMessage(""), 3000);
  };

  if (!org) return <p className="text-center mt-10">Cargando organización...</p>;

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
        <section className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl p-8 w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
            Editar Organización
          </h1>

          {message && (
            <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Dirección</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

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

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => router.push("/admin-orgs")}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AdminOrgDetail;
