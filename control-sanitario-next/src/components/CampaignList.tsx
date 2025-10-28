/**
 * Lista de campañas con tarjetas informativas y opción de inscripción
 * Muestra información básica, estado y permite inscribirse con notificación
 */
import React from "react";
import { campaigns as defaultCampaigns } from "../services/mockCampaigns";
import { useNotification } from "./NotificationProvider";

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
  const { addToast } = useNotification();
  
  const handleRegister = (title: string, active: boolean) => {
    if (!active) {
      addToast(`La campaña "${title}" está inactiva, no puedes inscribirte.`, 'error');
      return;
    }
    addToast(`Te has inscrito en la campaña "${title}" con éxito.`, 'success');
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 tablet-portrait:grid-cols-2 tablet-landscape:grid-cols-3">
      {campaigns.map((campaign) => (
        <div
          key={campaign.id}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-blue-300 dark:border-gray-700 hover:shadow-lg transition tablet:p-7"
        >
          <p className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2 tablet:text-2xl">
            📌 Nombre: {campaign.title}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2 tablet:text-lg">{campaign.description}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 tablet:text-base">
            📅 Fecha: <span className="font-semibold text-blue-700 dark:text-blue-200">{new Date(campaign.date).toLocaleDateString()}</span>
          </p>
          <p className={`mt-2 text-md font-bold tablet:text-lg ${campaign.active ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            Estado: {campaign.active ? "Activa ✅" : "Inactiva ❌"}
          </p>
          <button
            onClick={() => handleRegister(campaign.title, campaign.active)}
            className="mt-4 px-4 py-2 bg-blue-600 dark:bg-blue-800 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-900 transition tablet-button touch-feedback tablet:text-lg tablet:px-5 tablet:py-3 tablet:min-h-[48px]"
          >
            Inscribirse
          </button>
        </div>
      ))}
    </div>
  );
};

export default CampaignList;
