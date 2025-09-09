import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/org-campaigns.module.css";

const campaigns = [
  { id: 1, nombre: "Rescate Felino", estado: "Activa" },
  { id: 2, nombre: "Adopción Responsable", estado: "En curso" }
];

const OrgCampaigns = () => (
  <>
    <Navbar />
    <main className={styles.container}>
      <h1 className={styles.title}>Campañas de la Organización</h1>
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

export default OrgCampaigns;
