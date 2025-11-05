import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../../services/api';
import styles from '../../../styles/medical-history-test.module.css';

export default function MedicalHistoryCreatePage() {
  const router = useRouter();
  const { animalId } = router.query as { animalId?: string };
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    fecha_evento: '',
    tipo_evento: '',
    diagnostico: '',
    detalles: '',
    nombre_veterinario: '',
  });

  const onCreate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!animalId) return;
    if (!form.tipo_evento || !form.fecha_evento) {
      alert('Campos requeridos: fecha_evento y tipo_evento');
      return;
    }
    setSaving(true);
    try {
      await api.post(`/medicalHistory/${animalId}`, {
        ...form,
        diagnostico: form.diagnostico || null,
        detalles: form.detalles || null,
        nombre_veterinario: form.nombre_veterinario || null,
      });
      router.push(`/medicalHistory/${animalId}`);
    } catch (e) {
      console.error(e);
      alert('Error creando historial');
    } finally {
      setSaving(false);
    }
  }, [animalId, form]);

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <h1 className={styles.title}>Nuevo historial médico</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className={styles.button} onClick={() => router.back()}>Volver</button>
          {animalId && (
            <button className={styles.button} onClick={() => router.push(`/medicalHistory/${animalId}`)}>Ver historial</button>
          )}
        </div>
      </div>

      <form onSubmit={onCreate} className={styles.form}>
        <label className={styles.label}>
          <span>Fecha evento</span>
          <input
            className={styles.input}
            type="datetime-local"
            value={form.fecha_evento}
            onChange={(e) => setForm({ ...form, fecha_evento: e.target.value })}
          />
        </label>
        <label className={styles.label}>
          <span>Tipo evento</span>
          <input
            className={styles.input}
            type="text"
            placeholder="vacuna, control, cirugía..."
            value={form.tipo_evento}
            onChange={(e) => setForm({ ...form, tipo_evento: e.target.value })}
          />
        </label>
        <label className={styles.label}>
          <span>Diagnóstico</span>
          <input
            className={styles.input}
            type="text"
            value={form.diagnostico}
            onChange={(e) => setForm({ ...form, diagnostico: e.target.value })}
          />
        </label>
        <label className={styles.label}>
          <span>Detalles</span>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            value={form.detalles}
            onChange={(e) => setForm({ ...form, detalles: e.target.value })}
          />
        </label>
        <label className={styles.label}>
          <span>Nombre veterinario</span>
          <input
            className={styles.input}
            type="text"
            value={form.nombre_veterinario}
            onChange={(e) => setForm({ ...form, nombre_veterinario: e.target.value })}
          />
        </label>
        <button className={styles.button} type="submit" disabled={!animalId || saving}>
          {saving ? 'Guardando...' : 'Crear'}
        </button>
      </form>
    </div>
  );
}
