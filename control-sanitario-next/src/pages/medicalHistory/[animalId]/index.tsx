import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../../services/api';
import styles from '../../../styles/medical-history-test.module.css';

type HistorialMedico = {
  id_historial_medico: number;
  id_animal: number;
  fecha_evento: string | Date;
  tipo_evento: string;
  diagnostico: string | null;
  detalles: string | null;
  nombre_veterinario: string | null;
};

export default function MedicalHistoryViewPage() {
  const router = useRouter();
  const { animalId } = router.query as { animalId?: string };
  const [items, setItems] = useState<HistorialMedico[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!animalId) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/medicalHistory/${animalId}`);
        if (!mounted) return;
        setItems(data as HistorialMedico[]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [animalId]);

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <h1 className={styles.title}>Historial Médico</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className={styles.button} onClick={() => router.back()}>Volver</button>
          {animalId && (
            <button
              className={styles.button}
              onClick={() => router.push(`/medicalHistory/${animalId}/new`)}
            >
              Crear historial
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p className={styles.muted}>Cargando...</p>
      ) : items.length === 0 ? (
        <p className={styles.muted}>Sin registros.</p>
      ) : (
        <ul className={styles.list}>
          {items.map((h) => (
            <li key={h.id_historial_medico} className={styles.card}>
              <div className={styles.cardHeader}>#{h.id_historial_medico} – {h.tipo_evento}</div>
              <div className={styles.cardMeta}>{new Date(h.fecha_evento).toLocaleString()}</div>
              <div>Veterinario: {h.nombre_veterinario || '—'}</div>
              <div>Diagnóstico: {h.diagnostico || '—'}</div>
              <div>Detalles: {h.detalles || '—'}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
