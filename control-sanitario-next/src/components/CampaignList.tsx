/**
 * Lista de campañas con tarjetas informativas y opción de inscripción
 * Muestra información básica, estado y permite inscribirse con notificación
 */
import React from "react";
import { campaigns as defaultCampaigns } from "../services/mockCampaigns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Campaign {
  id: number;
  title: string; // Nombre de la campaña
  description: string; // Descripción detallada
  date: string; // Fecha de inicio
  active: boolean; // Estado activo/inactivo
}
interface CampaignListProps {
  campaigns?: Campaign[];
}

const CampaignList: React.FC<CampaignListProps> = ({ campaigns = defaultCampaigns }) => {
  const handleRegister = (title: string, active: boolean) => {
    if (!active) {
      toast.error(`La campaña "${title}" está inactiva, no puedes inscribirte.`);
      return;
    }
    toast.success(`Te has inscrito en la campaña "${title}" con éxito.`);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => (
        <div
          key={campaign.id}
          className="bg-white rounded-xl shadow-md p-6 border border-blue-300 hover:shadow-lg transition"
        >
          <p className="text-xl font-bold text-blue-800 mb-2">
            📌 Nombre: {campaign.title}
          </p>
          <p className="text-gray-700 mb-2">{campaign.description}</p>
          <p className="text-sm text-gray-600 mb-1">
            📅 Fecha: <span className="font-semibold text-blue-700">{new Date(campaign.date).toLocaleDateString()}</span>
          </p>
          <p className={`mt-2 text-md font-bold ${campaign.active ? "text-green-600" : "text-red-600"}`}>
            Estado: {campaign.active ? "Activa ✅" : "Inactiva ❌"}
          </p>
          <button
            onClick={() => handleRegister(campaign.title, campaign.active)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Inscribirse
          </button>
        </div>
      ))}
    </div>
  );
};

export default CampaignList;
