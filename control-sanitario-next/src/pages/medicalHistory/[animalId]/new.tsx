import React, { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMedicalHistory } from '../../../hooks/useMedicalHistory';
import styles from '../../../styles/medical-history-test.module.css';

interface Animal {
  id_animal: number;
  nombre_animal: string;
  estado_general?: string;
  zona?: string;
}

export default function MedicalHistoryCreatePage() {
  const router = useRouter();
  const { animalId } = router.query as { animalId?: string };
  const animalIdNum = animalId ? Number(animalId) : null;
  
  // Usar el custom hook para acceder a la función crear
  const { crear } = useMedicalHistory(animalIdNum);
  
  const [saving, setSaving] = useState(false);
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loadingAnimal, setLoadingAnimal] = useState(true);
  const [form, setForm] = useState({
    fecha_evento: '',
    tipo_evento: '',
    diagnostico: '',
    detalles: '',
    nombre_veterinario: '',
  });

  // Cargar información del animal
  useEffect(() => {
    if (!animalIdNum) return;

    const loadAnimal = async () => {
      try {
        setLoadingAnimal(true);
        const response = await fetch(`/api/animals/${animalIdNum}`);
        if (response.ok) {
          const data = await response.json();
          setAnimal(data);
        }
      } catch (err) {
        console.error('Error cargando animal:', err);
      } finally {
        setLoadingAnimal(false);
      }
    };

    loadAnimal();
  }, [animalIdNum]);

  const onCreate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!animalId) return;
    if (!form.tipo_evento || !form.fecha_evento) {
      alert('Campos requeridos: fecha_evento y tipo_evento');
      return;
    }
    setSaving(true);
    try {
      await crear({
        fecha_evento: form.fecha_evento,
        tipo_evento: form.tipo_evento,
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
  }, [animalId, form, crear]);

  return (
    <div className={`${styles.container} ${styles.darkContainer}`}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
        <h1 className={styles.title}>Nuevo historial médico</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className={styles.button} onClick={() => router.push('/medicalHistory/new')}>
            Cambiar animal
          </button>
          <button className={styles.button} onClick={() => router.back()}>
            Volver
          </button>
        </div>
      </div>

      {/* Información del animal seleccionado */}
      {loadingAnimal ? (
        <p className={styles.muted}>Cargando información del animal...</p>
      ) : animal ? (
        <div style={{
          padding: '20px',
          backgroundColor: '#f0f9ff',
          border: '2px solid #3b82f6',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '10px'
          }}>
            🐾 {animal.nombre_animal}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
            <div>
              <span style={{ color: '#6b7280', fontSize: '14px' }}>ID del Animal:</span>
              <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>
                #{animal.id_animal}
              </p>
            </div>
            {animal.estado_general && (
              <div>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Estado General:</span>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>
                  {animal.estado_general}
                </p>
              </div>
            )}
            {animal.zona && (
              <div>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Zona:</span>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>
                  {animal.zona}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}

      <form onSubmit={onCreate} className={styles.form}>
        <label className={styles.label}>
          <span>Fecha evento</span>
          <input
            className={styles.input}
            type="datetime-local"
            value={form.fecha_evento}
            onChange={(e) => setForm({ ...form, fecha_evento: e.target.value })}
            required
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
            required
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
        <button className={styles.button} type="submit" disabled={!animalId || saving || loadingAnimal}>
          {saving ? 'Guardando...' : 'Crear Historial'}
        </button>
      </form>
    </div>
  );
}
