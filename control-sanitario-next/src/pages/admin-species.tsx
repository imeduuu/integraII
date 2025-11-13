import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getSpecies, type Species } from '../services/species_form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import styles from '../styles/admin-species.module.css';

const AdminSpeciesPage = () => {
  const [species, setSpecies] = useState<Species[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newSpecies, setNewSpecies] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const list = await getSpecies();
        if (mounted) setSpecies(list);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error desconocido';
        console.error('Error cargando especies:', err);
        if (mounted) setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleCreate = () => {
    // Placeholder de creación (a la espera del endpoint POST)
    alert('Crear especie pendiente de backend (POST /api/species).');
  };

  const handleEdit = (sp: Species) => {
    // Placeholder de edición (a la espera del endpoint PUT)
    alert(`Editar especie ${sp.nombre_especie} pendiente de backend (PUT /api/species/:id).`);
  };

  const handleDelete = (sp: Species) => {
    // Placeholder de eliminación (a la espera del endpoint DELETE)
    alert(`Eliminar especie ${sp.nombre_especie} pendiente de backend (DELETE /api/species/:id).`);
  };

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <h1 className={styles.title}>CRUD Especies</h1>
        <p className={styles.subtitle}>Administración de especies (diseño de referencia)</p>

        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Crear nueva especie</h2>
          <div className={styles.formRow}>
            <Input
              placeholder="Nombre de la especie"
              value={newSpecies}
              onChange={(e) => setNewSpecies(e.target.value)}
            />
            <Button onClick={handleCreate}>Agregar</Button>
          </div>
          <p className={styles.helper}>Nota: acción simulada hasta implementar endpoints POST/PUT/DELETE.</p>
        </section>

        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Listado</h2>
          {loading && <p className={styles.info}>Cargando especies…</p>}
          {error && <p className={styles.error}>Error: {error}</p>}
          {!loading && !error && (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {species.length === 0 ? (
                    <tr>
                      <td colSpan={3} className={styles.empty}>No hay especies registradas</td>
                    </tr>
                  ) : (
                    species.map((sp) => (
                      <tr key={sp.id_especie}>
                        <td>{sp.id_especie}</td>
                        <td>{sp.nombre_especie}</td>
                        <td className={styles.actions}>
                          <Button variant="secondary" onClick={() => handleEdit(sp)}>Editar</Button>
                          <Button variant="secondary" onClick={() => handleDelete(sp)}>Eliminar</Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AdminSpeciesPage;
