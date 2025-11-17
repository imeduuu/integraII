import { useState, useCallback } from "react";

export interface Sighting {
  id_avistamiento: number;
  id_usuario: number;
  id_especie: number;
  id_estado_salud: number;
  id_estado_avistamiento: number;
  descripcion: string;
  direccion: string;
  ubicacion: string | null;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface SightingFilters {
  region?: string;
  especie?: number;
  fechaInicio?: string;
  fechaFin?: string;
  search?: string;
}

export function useSightings() {
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "http://localhost:3000/api/sightings";

  
  //  LISTAR (con filtros opcionales y AbortSignal)
  
  const list = useCallback(
    async (filters?: SightingFilters, signal?: AbortSignal) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        if (filters?.region) params.append("region", filters.region);
        if (filters?.especie) params.append("especie", String(filters.especie));
        if (filters?.fechaInicio) params.append("fechaInicio", filters.fechaInicio);
        if (filters?.fechaFin) params.append("fechaFin", filters.fechaFin);
        if (filters?.search) params.append("search", filters.search);

        const res = await fetch(`${API_URL}?${params.toString()}`, { signal });

        if (!res.ok) throw new Error("Error al obtener avistamientos");

        const data = await res.json();
        setSightings(data);
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

 
  //  OBTENER POR ID
  
  const getById = useCallback(async (id: number, signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/${id}`, { signal });
      if (!res.ok) throw new Error("Avistamiento no encontrado");

      return await res.json();
    } catch (err: any) {
      if (err.name !== "AbortError") setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // CREAR
  const create = useCallback(async (payload: Partial<Sighting>) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al crear avistamiento");

      const created = await res.json();

      // actualizar estado local
      setSightings((prev) => [...prev, created]);

      return created;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  //  ACTUALIZAR
  const update = useCallback(async (id: number, payload: Partial<Sighting>) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al actualizar avistamiento");

      const updated = await res.json();

      // actualizar estado local
      setSightings((prev) =>
        prev.map((s) => (s.id_avistamiento === id ? updated : s))
      );

      return updated;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  //  ELIMINAR
  const remove = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar avistamiento");

      // eliminar del estado local
      setSightings((prev) => prev.filter((s) => s.id_avistamiento !== id));

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // ------------------------------------------------------
  return {
    sightings,
    loading,
    error,

    list,
    getById,
    create,
    update,
    remove,
  };
}
export default useSightings;
