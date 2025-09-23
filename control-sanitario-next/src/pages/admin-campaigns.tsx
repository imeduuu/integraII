
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { userMock } from "../context/userMock";
import { HiCheckCircle, HiXCircle, HiClock, HiSpeakerphone } from "react-icons/hi"; // Iconos para estados y campañas

const estados = {
  pendiente: {
    text: "Pendiente",
    color: "bg-yellow-100 text-yellow-800",
    icon: <HiClock className="w-4 h-4 mr-1" />,
  },
  aprobada: {
    text: "Aprobada",
    color: "bg-green-100 text-green-700",
    icon: <HiCheckCircle className="w-4 h-4 mr-1" />,
  },
  rechazada: {
    text: "Rechazada",
    color: "bg-red-100 text-red-700",
    icon: <HiXCircle className="w-4 h-4 mr-1" />,
  },
};

const CampaignList = () => {
  const [campaigns, setCampaigns] = React.useState([
    { id: 1, nombre: "Esterilización 2025", estado: "pendiente" },
    { id: 2, nombre: "Adopta un Amigo", estado: "pendiente" },
    { id: 3, nombre: "Vacunación Masiva", estado: "pendiente" }
  ]);

  useEffect(() => {
    if (userMock.role !== "admin") {
      window.location.replace("/denied");
    }
  }, []);

  const handleApprove = (id: number) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === id ? { ...c, estado: "aprobada" } : c))
    );
    // Feedback visual
    window.alert("Campaña aprobada ✅");
  };

  const handleReject = (id: number) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === id ? { ...c, estado: "rechazada" } : c))
    );
    window.alert("Campaña rechazada ❌");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] w-full flex flex-col items-center justify-start px-2 py-8 bg-gradient-to-br from-green-50 via-white to-blue-100">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-6 text-center animate-fadeIn">Campañas</h1>
        <div className="w-full max-w-3xl overflow-x-auto shadow-lg rounded-xl bg-white p-4 animate-fadeIn">
          <table className="w-full text-sm md:text-base border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-green-100">
                <th className="px-4 py-2 text-left font-bold text-green-700 rounded-tl-xl">Nombre</th>
                <th className="px-4 py-2 text-left font-bold text-green-700">Estado</th>
                <th className="px-4 py-2 text-left font-bold text-green-700 rounded-tr-xl">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(campaign => (
                <tr
                  key={campaign.id}
                  className="hover:bg-green-50 transition-colors duration-200 group rounded-xl"
                >
                  <td className="px-4 py-3 font-medium text-gray-800 flex items-center gap-2">
                    <HiSpeakerphone className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                    {campaign.nombre}
                  </td>
                  <td className={`px-4 py-3 font-semibold flex items-center gap-1 ${estados[campaign.estado].color} rounded-full`}>
                    {estados[campaign.estado].icon}
                    {estados[campaign.estado].text}
                  </td>
                  <td className="px-4 py-3">
                    {campaign.estado === "pendiente" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(campaign.id)}
                          aria-label={`Aprobar campaña ${campaign.nombre}`}
                          tabIndex={0}
                          className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
                        >
                          <HiCheckCircle className="inline w-4 h-4 mr-1" /> Aprobar
                        </button>
                        <button
                          onClick={() => handleReject(campaign.id)}
                          aria-label={`Rechazar campaña ${campaign.nombre}`}
                          tabIndex={0}
                          className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200"
                        >
                          <HiXCircle className="inline w-4 h-4 mr-1" /> Rechazar
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Sin acciones</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Feedback visual y navegación clara */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 w-full max-w-3xl justify-center">
          <a
            href="/admin-home"
            className="inline-block px-6 py-3 rounded-lg bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-colors duration-200 text-center"
          >
            Volver al Panel
          </a>
          <a
            href="/admin-users"
            className="inline-block px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition-colors duration-200 text-center"
          >
            Ver Usuarios
          </a>
        </div>
      </main>
      <Footer />
      {/* Animación fadeIn personalizada */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s;
        }
      `}</style>
      {/* Comentario: Se utiliza Tailwind CSS y animación fadeIn para mejorar la experiencia visual y responsividad. */}
    </>
  );
};

export default CampaignList;
