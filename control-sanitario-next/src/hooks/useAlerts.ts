import { useState, useCallback } from "react";

export interface Alert {
  id: number;
  title: string;
  message: string;
  active: boolean;
  created_at?: string;
}

export interface AlertFilters {
  search?: string;
  status?: boolean;
  type?: string;
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "http://localhost:3000/api/alerts";

  // --------------------------
  // 📌 LISTAR ALERTAS (con filtros y signal)
  // --------------------------
  const list = useCallback(
    async (filters?: AlertFilters, signal?: AbortSignal) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        if (filters?.search) params.append("search", filters.search);
        if (filters?.status !== undefined) params.append("status", String(filters.status));
        if (filters?.type) params.append("type", filters.type);

        const res = await fetch(`${API_URL}?${params.toString()}`, { signal });
        if (!res.ok) throw new Error("Error al obtener alertas");

        const data: Alert[] = await res.json();
        setAlerts(data);
        return data;
      } catch (err: any) {
        if (err.name !== "AbortError") setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // --------------------------
  // 📌 OBTENER ALERTA POR ID
  // --------------------------
  const getById = useCallback(
    async (id: number, signal?: AbortSignal) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/${id}`, { signal });
        if (!res.ok) throw new Error("Alerta no encontrada");

        return (await res.json()) as Alert;
      } catch (err: any) {
        if (err.name !== "AbortError") setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // --------------------------
  // 📌 CREAR ALERTA
  // --------------------------
  const create = useCallback(
    async (payload: Partial<Alert>, token: string) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Error al crear alerta");

        const newAlert = (await res.json()) as Alert;
        setAlerts((prev) => [...prev, newAlert]);
        return newAlert;
      } catch (err: any) {
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // --------------------------
  // 📌 ACTUALIZAR ALERTA
  // --------------------------
  const update = useCallback(
    async (id: number, payload: Partial<Alert>, token: string) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Error al actualizar alerta");

        const updatedAlert = (await res.json()) as Alert;
        setAlerts((prev) => prev.map((a) => (a.id === id ? updatedAlert : a)));
        return updatedAlert;
      } catch (err: any) {
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // --------------------------
  // 📌 ELIMINAR ALERTA
  // --------------------------
  const remove = useCallback(
    async (id: number, token: string) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Error al eliminar alerta");

        setAlerts((prev) => prev.filter((a) => a.id !== id));
        return true;
      } catch (err: any) {
        setError(err.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // --------------------------
  // 📌 ENVIAR NOTIFICACIÓN PUSH DE PRUEBA
  // --------------------------
  const sendTestNotification = useCallback(
    async (token: string) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/test-push-notification`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Error al enviar notificación de prueba");

        return await res.json();
      } catch (err: any) {
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    alerts,
    loading,
    error,
    list,
    getById,
    create,
    update,
    remove,
    sendTestNotification,
  };
}

export default useAlerts;
