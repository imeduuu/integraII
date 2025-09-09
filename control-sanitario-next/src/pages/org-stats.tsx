import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/org-stats.module.css";

const OrgStats = () => (
  <>
    <Navbar />
    <main className={styles.container}>
      <h1 className={styles.title}>Estadísticas de la Organización</h1>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <p className={styles.statNumber}>120</p>
          <p>Adopciones</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statNumber}>15</p>
          <p>Campañas</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statNumber}>300</p>
          <p>Voluntarios</p>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default OrgStats;
