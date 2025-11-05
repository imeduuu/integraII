import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';
import styles from '../styles/medical-history-test.module.css';

type HistorialMedico = {
  id_historial_medico: number;
  id_animal: number;
  fecha_evento: string | Date;
  tipo_evento: string;
  diagnostico: string | null;
  detalles: string | null;
  nombre_veterinario: string | null;
};

export default function MedicalHistoryTestPage() {
  const router = useRouter();
  const [animalId, setAnimalId] = useState<string>('');
  const [items, setItems] = useState<HistorialMedico[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fecha_evento: '',
    tipo_evento: '',
    diagnostico: '',
    detalles: '',
    nombre_veterinario: '',
  });

  const fetchItems = useCallback(async () => {
    if (!animalId) return;
    setLoading(true);
    try {
  const { data } = await api.get(`/medicalHistory/${animalId}`);
  setItems(data as HistorialMedico[]);
    } catch (e) {
      console.error(e);
      alert('Error cargando historiales');
    } finally {
      setLoading(false);
    }
  }, [animalId]);

  // Prefill animalId from query string
  useEffect(() => {
    const id = router.query.animalId as string | undefined;
    if (id && id !== animalId) {
      setAnimalId(id);
    }
  }, [router.query.animalId]);

  const onCreate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!animalId) return alert('Ingresa un animalId');
    if (!form.tipo_evento || !form.fecha_evento) return alert('tipo_evento y fecha_evento son obligatorios');
    try {
      await api.post(`/medicalHistory/${animalId}`, {
        ...form,
        fecha_evento: form.fecha_evento,
        diagnostico: form.diagnostico || null,
        detalles: form.detalles || null,
        nombre_veterinario: form.nombre_veterinario || null,
      });
      await fetchItems();
      setForm({ fecha_evento: '', tipo_evento: '', diagnostico: '', detalles: '', nombre_veterinario: '' });
    } catch (e) {
      console.error(e);
      alert('Error creando historial');
    }
  }, [animalId, form, fetchItems]);

  const onDelete = useCallback(async (id_historial_medico: number) => {
    if (!animalId) return;
    if (!confirm('¿Eliminar este historial?')) return;
    try {
      await api.delete(`/medicalHistory/${animalId}/${id_historial_medico}`);
      await fetchItems();
    } catch (e) {
      console.error(e);
      alert('Error eliminando historial');
    }
  }, [animalId, fetchItems]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Prueba de Historial Médico</h1>

      <section className={styles.toolbar}>
        <label className={styles.label} style={{ margin: 0 }}>
          <span>Animal ID</span>
          <input
            className={`${styles.input} ${styles.inputSmall}`}
            type="number"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
          />
        </label>
        <button className={styles.button} onClick={fetchItems} disabled={!animalId || loading}>
          {loading ? 'Cargando...' : 'Cargar historiales'}
        </button>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Crear nuevo historial</h2>
        <form onSubmit={onCreate} className={styles.form}>
          <label className={styles.label}>
            <span>Fecha evento</span>
            <input className={styles.input} type="datetime-local" value={form.fecha_evento}
              onChange={(e) => setForm({ ...form, fecha_evento: e.target.value })} />
          </label>
          <label className={styles.label}>
            <span>Tipo evento</span>
            <input className={styles.input} type="text" value={form.tipo_evento}
              placeholder="vacuna, control, cirugía..."
              onChange={(e) => setForm({ ...form, tipo_evento: e.target.value })} />
          </label>
          <label className={styles.label}>
            <span>Diagnóstico</span>
            <input className={styles.input} type="text" value={form.diagnostico}
              onChange={(e) => setForm({ ...form, diagnostico: e.target.value })} />
          </label>
          <label className={styles.label}>
            <span>Detalles</span>
            <textarea className={`${styles.input} ${styles.textarea}`} value={form.detalles}
              onChange={(e) => setForm({ ...form, detalles: e.target.value })} />
          </label>
          <label className={styles.label}>
            <span>Nombre veterinario</span>
            <input className={styles.input} type="text" value={form.nombre_veterinario}
              onChange={(e) => setForm({ ...form, nombre_veterinario: e.target.value })} />
          </label>
          <button className={styles.button} type="submit" disabled={!animalId}>Crear</button>
        </form>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 className={styles.sectionTitle}>Lista</h2>
        {!items.length ? (
          <p className={styles.muted}>No hay registros.</p>
        ) : (
          <ul className={styles.list}>
            {items.map((h) => (
              <li key={h.id_historial_medico} className={styles.card}>
                <div className={styles.cardHeader}>
                  #{h.id_historial_medico} – {h.tipo_evento}
                </div>
                <div className={styles.cardMeta}>{new Date(h.fecha_evento).toLocaleString()}</div>
                <div>Veterinario: {h.nombre_veterinario || '—'}</div>
                <div>Diagnóstico: {h.diagnostico || '—'}</div>
                <div>Detalles: {h.detalles || '—'}</div>
                <button className={`${styles.button} ${styles.dangerButton}`} onClick={() => onDelete(h.id_historial_medico)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
