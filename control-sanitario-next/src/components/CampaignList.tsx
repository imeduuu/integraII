import React from "react";
import { campaigns } from "../services/mockCampaigns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CampaignList = () => {
  const handleRegister = (title: string, active: boolean) => {
    if (!active) {
      toast.error(`La campaña "${title}" está inactiva, no puedes inscribirte.`);
      return;
    }
    toast.success(`Te has inscrito en la campaña "${title}" con éxito.`);
  };

  return (
    <div>
      <h2>Campañas Disponibles</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {campaigns.map((c) => (
          <li
            key={c.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "8px",
            }}
          >
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <p>
              <strong>Fecha:</strong> {c.date}
            </p>
            <p>
              <strong>Estado:</strong> {c.active ? "Activa ✅" : "Inactiva ❌"}
            </p>
            <button
              onClick={() => handleRegister(c.title, c.active)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#0070f3", 
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Inscribirse
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignList;
