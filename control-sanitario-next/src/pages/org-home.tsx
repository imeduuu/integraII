
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/org-home.module.css";
import { campaigns } from "../services/mockCampaigns";
import ProtectedRoute from "../components/ProtectedRoute";


const OrgHome = () => {
  return (
    <ProtectedRoute allowedRoles={["org"]}>
      <>
        <Navbar />
        <main className={styles.container}>
          <h1 className={styles.orgTitle}>Página de la Organización</h1>

          {/* Campañas activas */}
          <section className={styles.section}>
            <h2 className="text-2xl font-semibold mb-4">Campañas Activas</h2>
            <div className={styles.campaignGrid}>
              <div className={styles.campaignCard}>Campaña 1</div>
              <div className={styles.campaignCard}>Campaña 2</div>
            </div>
          </section>

          {/* Publicar adopción */}
          <section className={styles.section}>
            <h2 className="text-2xl font-semibold mb-4">Publicar Adopción</h2>
            <div className={styles.campaignCard}>
              <p>
                Aquí irá un formulario para publicar mascotas en adopción (solo
                maquetación).
              </p>
            </div>
          </section>

          {/* Estadísticas */}
          <section className={styles.section}>
            <h2 className="text-2xl font-semibold mb-4">Estadísticas</h2>
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
          </section>
        </main>
        <Footer />
      </>
    </ProtectedRoute>
  );
};

export default OrgHome;
