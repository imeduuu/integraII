import { useEffect, useState } from 'react';
import { HistorialMedico, MedicalHistoryInput } from '../services/medicalHistory';

interface UseMedicalHistoryReturn {
  historiales: HistorialMedico[];
  loading: boolean;
  error: string | null;
  crear: (data: MedicalHistoryInput) => Promise<void>;
  actualizar: (historyId: number, data: Partial<MedicalHistoryInput>) => Promise<void>;
  eliminar: (historyId: number) => Promise<void>;
  recargar: () => Promise<void>;
}

export function useMedicalHistory(animalId: number | null): UseMedicalHistoryReturn {
  const [historiales, setHistoriales] = useState<HistorialMedico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar historiales
  const recargar = async () => {
    if (!animalId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/medicalHistory/${animalId}`);
      if (!response.ok) throw new Error('Error al cargar historiales');
      const data = await response.json();
      setHistoriales(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar historiales');
      console.error('Error en useMedicalHistory:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar al montar o cuando cambie animalId
  useEffect(() => {
    recargar();
  }, [animalId]);

  // Crear nuevo historial
  const crear = async (data: MedicalHistoryInput) => {
    if (!animalId) throw new Error('Animal ID es requerido');
    
    try {
      const response = await fetch(`/api/medicalHistory/${animalId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error al crear historial');
      const nuevoHistorial = await response.json();
      setHistoriales([nuevoHistorial, ...historiales]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear historial';
      setError(message);
      throw err;
    }
  };

  // Actualizar historial
  const actualizar = async (historyId: number, data: Partial<MedicalHistoryInput>) => {
    if (!animalId) throw new Error('Animal ID es requerido');
    
    try {
      const response = await fetch(`/api/medicalHistory/${animalId}/${historyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error al actualizar historial');
      const actualizado = await response.json();
      setHistoriales(historiales.map(h => h.id_historial_medico === historyId ? actualizado : h));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar historial';
      setError(message);
      throw err;
    }
  };

  // Eliminar historial
  const eliminar = async (historyId: number) => {
    if (!animalId) throw new Error('Animal ID es requerido');
    
    try {
      const response = await fetch(`/api/medicalHistory/${animalId}/${historyId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar historial');
      setHistoriales(historiales.filter(h => h.id_historial_medico !== historyId));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar historial';
      setError(message);
      throw err;
    }
  };

  return {
    historiales,
    loading,
    error,
    crear,
    actualizar,
    eliminar,
    recargar,
  };
}
