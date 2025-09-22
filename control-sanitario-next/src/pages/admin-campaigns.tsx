import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/admin-campaigns.module.css";

const CampaignList = () => {
  const [campaigns, setCampaigns] = React.useState([
    { id: 1, nombre: "Esterilización 2025", estado: "pendiente" },
    { id: 2, nombre: "Adopta un Amigo", estado: "pendiente" },
    { id: 3, nombre: "Vacunación Masiva", estado: "pendiente" }
  ]);
   
  const handleApprove = (id: number) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === id ? { ...c, estado: "aprobada" } : c))
    );
    alert("Campaña aprobada ✅");
  };
  
  const handleReject = (id: number) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === id ? { ...c, estado: "rechazada" } : c))
    );
    alert("Campaña rechazada ❌");
  };

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <h1 className={styles.title}>Campañas</h1>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>Nombre</th>
              <th className={styles.th}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(campaign => (
              <tr key={campaign.id} className={styles.tr}>
                <td className={styles.td}>{campaign.nombre}</td>
                <td className={styles.td}>{campaign.estado}</td>
                <td className={styles.td}>
                  {campaign.estado === "pendiente" && (
                    <div className={styles.actions}>
                      <button onClick={() => handleApprove(campaign.id)}>Aprobar</button>
                      <button onClick={() => handleReject(campaign.id)}>Rechazar</button>
                    </div>
            )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </>
  );
};

export default CampaignList;
