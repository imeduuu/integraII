import React, { useEffect } from 'react';
import useStatistics from '../../hooks/useStatistics';
import styles from '../../styles/stats-test.module.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

/**
 * Página de prueba rápida para validar que el enlace del Navbar funciona
 * y que el hook useStatistics recupera datos sin romper.
 */
const AdminStatsTestPage: React.FC = () => {
  const { summary, getSummary, species, getSpecies } = useStatistics();

  useEffect(() => {
    // Carga inicial mínima
    getSummary();
    getSpecies();
  }, [getSummary, getSpecies]);

  return (
  <>
  <Navbar />
  <main className={styles.statsPage}>
      <h1 className={styles.pageTitle}>Test Estadísticas (Navbar)</h1>
      <p className={styles.intro}>Esta página sirve para confirmar que el enlace del navbar redirige correctamente y que el hook funciona.</p>

      <div className={styles.flexGrid}>
        <section className={styles.section} aria-labelledby="resumen-heading">
          <h2 id="resumen-heading" className={styles.sectionTitle}>Resumen rápido</h2>
          {summary.loading && <p className={styles.loadingMsg}>Cargando resumen...</p>}
          {summary.error && <p className={styles.errorMsg}>Error: {summary.error}</p>}
          {summary.data && (
            <ul className={styles.dataList}>
              <li>Total avistamientos: {summary.data.totalSightings}</li>
              <li>Total especies: {summary.data.totalSpecies}</li>
              <li>Especie más común: {summary.data.mostCommonSpecies?.nombre ?? '—'}</li>
            </ul>
          )}
          <div className={styles.actionsRow}>
            <button className={styles.buttonPrimary} onClick={() => getSummary()}>Refrescar resumen</button>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="species-heading">
          <h2 id="species-heading" className={styles.sectionTitle}>Especies (Top 5)</h2>
          {species.loading && <p className={styles.loadingMsg}>Cargando especies...</p>}
          {species.error && <p className={styles.errorMsg}>Error: {species.error}</p>}
          {species.data && (
            <ol className={styles.speciesList}>
              {species.data.slice(0,5).map(s => (
                <li key={s.id}>{s.nombre}: {s.count}</li>
              ))}
            </ol>
          )}
          <div className={styles.actionsRow}>
            <button className={styles.buttonSecondary} onClick={() => getSpecies()}>Refrescar especies</button>
          </div>
        </section>
      </div>

      <p className={styles.footerNote}>Si ves los datos arriba sin errores, la integración del hook y el enlace del navbar están funcionando.</p>
    </main>
    <Footer />
    </>
  );
};

export default AdminStatsTestPage;
