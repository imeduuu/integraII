// src/hooks/useAdoptions.ts
import { useState, useCallback } from "react";

type Adoption = {
  id_adopcion: number;
  id_animal: number;
  id_usuario_rescatista: number;
  id_usuario_adoptante?: number | null;
  fecha_publicacion: string;
  fecha_adopcion?: string | null;
  disponible: boolean;
  descripcion?: string | null;
};

function getAuthHeaderAd() {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (e) {
    return {};
  }
}

export function useAdoptions() {
  const [items, setItems] = useState<Adoption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const list = useCallback(async (filters?: { animalId?: number; available?: boolean }) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters?.animalId) params.set("animalId", String(filters.animalId));
      if (typeof filters?.available !== "undefined") params.set("available", String(filters.available));

      const url = `/api/adoptions${params.toString() ? `?${params.toString()}` : ""}`;
      const res = await fetch(url, { headers: { "Content-Type": "application/json", ...getAuthHeaderAd() } });
      if (!res.ok) throw new Error(await res.text());
      const data: Adoption[] = await res.json();
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
      const res = await fetch(`/api/adoptions/${id}`, { headers: { ...getAuthHeaderAd() } });
      if (!res.ok) throw new Error(await res.text());
      const data: Adoption = await res.json();
      return data;
    } catch (err: any) {
      setError(err.message || String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (payload: Partial<Adoption>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/adoptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaderAd() },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      const created: Adoption = await res.json();
      setItems((prev) => [created, ...prev]);
      return created;
    } catch (err: any) {
      setError(err.message || String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: number, payload: Partial<Adoption>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/adoptions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaderAd() },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      const updated: Adoption = await res.json();
      setItems((prev) => prev.map((it) => (it.id_adopcion === id ? updated : it)));
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
      const res = await fetch(`/api/adoptions/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeaderAd() },
      });
      if (!(res.status === 200 || res.status === 204)) throw new Error(await res.text());
      setItems((prev) => prev.filter((it) => it.id_adopcion !== id));
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
