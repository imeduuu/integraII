// src/components/CampaignList.tsx
import React from "react";

interface Campaign {
  id: number;
  title: string;
  description: string;
  date: string;
  active: boolean;
}

interface CampaignListProps {
  campaigns: Campaign[];
}

const CampaignList: React.FC<CampaignListProps> = ({ campaigns }) => {
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
            📅 Fecha:{" "}
            <span className="font-semibold text-blue-700">
              {new Date(campaign.date).toLocaleDateString()}
            </span>
          </p>
          <p
            className={`mt-2 text-md font-bold ${
              campaign.active ? "text-green-600" : "text-red-600"
            }`}
          >
            📊 Estado: {campaign.active ? "Activa ✅" : "Inactiva ❌"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CampaignList;
