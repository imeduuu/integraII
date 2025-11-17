import { useEffect, useState } from "react";

export interface Race {
  id_raza: number;
  id_especie: number;
  raza: string;
}

export function useRaces() {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRaces = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/races");
      if (!res.ok) throw new Error("Error fetching races");
      const data = await res.json();
      setRaces(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRaces();
  }, []);

  return {
    races,
    loading,
    error,
    refresh: fetchRaces,
  };
}
