import { useEffect, useState } from "react";

export interface Especie {
  id_especie: number;
  especie: string | null;
}

export function useSpecies() {
  const [species, setSpecies] = useState<Especie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // GET: obtener todas las especies
  const fetchSpecies = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/species");
      if (!res.ok) throw new Error("Error al obtener especies");
      const data = await res.json();
      setSpecies(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // POST: crear especie
  const createSpecies = async (nombre: string) => {
    try {
      const res = await fetch("/api/species", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ especie: nombre }),
      });

      if (!res.ok) throw new Error("Error al crear especie");

      const newSpecie = await res.json();
      setSpecies((prev) => [...prev, newSpecie]);

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  // PUT: actualizar especie
  const updateSpecies = async (id: number, nombre: string) => {
    try {
      const res = await fetch(`/api/species/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ especie: nombre }),
      });

      if (!res.ok) throw new Error("Error al actualizar especie");

      const updated = await res.json();

      setSpecies((prev) =>
        prev.map((s) => (s.id_especie === id ? updated : s))
      );

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  // DELETE: eliminar especie
  const deleteSpecies = async (id: number) => {
    try {
      const res = await fetch(`/api/species/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar especie");

      setSpecies((prev) => prev.filter((s) => s.id_especie !== id));

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  // Obtener especies automáticamente al cargar
  useEffect(() => {
    fetchSpecies();
  }, []);

  return {
    species,
    loading,
    error,
    fetchSpecies,
    createSpecies,
    updateSpecies,
    deleteSpecies,
  };
}

export default useSpecies;
