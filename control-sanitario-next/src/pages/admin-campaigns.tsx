import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/admin-campaigns.module.css";

const campaigns = [
  { id: 1, nombre: "Esterilización 2025", estado: "Activa" },
  { id: 2, nombre: "Adopta un Amigo", estado: "Finalizada" },
  { id: 3, nombre: "Vacunación Masiva", estado: "Activa" }
];

const CampaignList = () => {
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
