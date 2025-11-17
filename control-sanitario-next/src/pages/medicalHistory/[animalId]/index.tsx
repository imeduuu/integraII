import React from 'react';
import { useRouter } from 'next/router';
import { useMedicalHistory } from '../../../hooks/useMedicalHistory';
import styles from '../../../styles/medical-history-test.module.css';

export default function MedicalHistoryViewPage() {
  const router = useRouter();
  const { animalId } = router.query as { animalId?: string };
  const animalIdNum = animalId ? Number(animalId) : null;
  
  // Usar el custom hook
  const { historiales, loading, error } = useMedicalHistory(animalIdNum);

  return (
    <div className={`${styles.container} ${styles.darkContainer}`}>
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
      ) : error ? (
        <p className={styles.muted} style={{ color: 'red' }}>Error: {error}</p>
      ) : historiales.length === 0 ? (
        <p className={styles.muted}>Sin registros.</p>
      ) : (
        <ul className={styles.list}>
          {historiales.map((h) => (
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
