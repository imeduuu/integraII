// src/hooks/useAdoptionRequests.ts
import { useState, useCallback } from "react";

type AdoptionRequest = {
  id_solicitud_adopcion: number;
  id_usuario: number;
  id_adopcion?: number | null;
  fecha_ingreso_solicitud: string;
  fecha_termino_solicitud?: string | null;
  id_estado_solicitud?: number | null;
  usuario?: any;
  adopcion?: any;
  estadoSolicitud?: any;
};

type ListFilters = { status?: number; animalId?: number };

function getAuthHeader() {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (e) {
    return {};
  }
}

export function useAdoptionRequests() {
  const [items, setItems] = useState<AdoptionRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const list = useCallback(async (filters?: ListFilters) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters?.status) params.set("status", String(filters.status));
      if (filters?.animalId) params.set("animalId", String(filters.animalId));

      const url = `/api/adoption-requests${params.toString() ? `?${params.toString()}` : ""}`;
      const res = await fetch(url, { headers: { "Content-Type": "application/json", ...getAuthHeader() } });
      if (!res.ok) throw new Error(await res.text());
      const data: AdoptionRequest[] = await res.json();
      setItems(data);
      return data;
    } catch (err: any) {
      setError(err.message || String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/adoption-requests/${id}`, { headers: { ...getAuthHeader() } });
      if (!res.ok) throw new Error(await res.text());
      const data: AdoptionRequest = await res.json();
      return data;
    } catch (err: any) {
      setError(err.message || String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (payload: Partial<AdoptionRequest>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/adoption-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      const created: AdoptionRequest = await res.json();
      setItems((prev) => [created, ...prev]);
      return created;
    } catch (err: any) {
      setError(err.message || String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: number, payload: Partial<AdoptionRequest>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/adoption-requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      const updated: AdoptionRequest = await res.json();
      setItems((prev) => prev.map((it) => (it.id_solicitud_adopcion === id ? updated : it)));
      return updated;
    } catch (err: any) {
      setError(err.message || String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/adoption-requests/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() },
      });
      if (!(res.status === 200 || res.status === 204)) throw new Error(await res.text());
      setItems((prev) => prev.filter((it) => it.id_solicitud_adopcion !== id));
      return true;
    } catch (err: any) {
      setError(err.message || String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    items,
    loading,
    error,
    list,
    getById,
    create,
    update,
    remove,
  } as const;
}
