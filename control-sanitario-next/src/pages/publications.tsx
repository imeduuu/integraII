import React from 'react';
import Input from '../components/ui/Input'; // Migración: Usar input UI estándar
import Button from '../components/ui/Button'; // Migración: Usar botón UI estándar
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/publications.module.css';

const PublicationsPage = () => {
  return (
    <>
      <Navbar />
      <main className={styles.pageContainer}>
        {/* Área de Controles de Filtro */}
        <div className={styles.filters}>
          {/* Migración: Se reemplaza el input nativo por el componente Input UI estándar. */}
          <Input type="text" placeholder="Buscar por palabra clave..." className={styles.filterInput} />
          <select className={styles.filterInput}>
            <option value="">Todas las categorías</option>
            <option value="avistamientos">Avistamientos</option>
            <option value="adopciones">Adopciones</option>
          </select>
          {/* Migración: Se reemplaza el botón nativo por el componente Button UI estándar. */}
          <Button className={styles.filterButton}>Filtrar</Button>
        </div>

        {/* Contenido Principal (Mapa y Lista) */}
        <div className={styles.mainContent}>
          {/* Columna del Mapa */}
          <div className={styles.mapContainer}>
            <div>Mapa Interactivo</div>
          </div>

          {/* Columna de la Lista de Publicaciones */}
          <div className={styles.publicationsList}>
            {/* Tarjeta de Ejemplo 1 */}
            <div className={styles.publicationCard}>
              <div className={styles.cardImage}></div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Avistamiento en Parque Central</h3>
                <p className={styles.cardDescription}>
                  Se reportó un perro de tamaño mediano, color café, sin collar. Parece asustado.
                </p>
              </div>
            </div>

            {/* Tarjeta de Ejemplo 2 */}
            <div className={styles.publicationCard}>
              <div className={styles.cardImage}></div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Gatito en Adopción</h3>
                <p className={styles.cardDescription}>
                  Pequeño gatito de 2 meses busca un hogar. Es muy juguetón y cariñoso.
                </p>
              </div>
            </div>

            {/* Tarjeta de Ejemplo 3 */}
            <div className={styles.publicationCard}>
              <div className={styles.cardImage}></div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Campaña de Vacunación</h3>
                <p className={styles.cardDescription}>
                  Este fin de semana estaremos vacunando gratuitamente en la plaza principal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PublicationsPage;