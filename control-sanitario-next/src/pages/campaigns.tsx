// src/pages/campaigns.tsx
import React from "react";
import CampaignList from "../components/CampaignList";
import { campaigns } from "../services/mockCampaigns";

const CampaignsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-200"> {/* 👈 Fondo celeste */}
      <div className="p-10 max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-8 text-center">
          📢 Campañas
        </h1>
        <CampaignList campaigns={campaigns} />
      </div>
    </div>
  );
};

export default CampaignsPage;
