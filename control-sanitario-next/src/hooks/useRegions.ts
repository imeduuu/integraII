import { useState, useEffect, useRef } from "react";
import axios from "axios";

export interface Region {
  id_region: number;
  nombre_region: string;
}

export function useRegions() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const fetchRegions = async () => {
      try {
        const res = await axios.get<Region[]>("/api/regions");

        if (isMounted.current) {
          setRegions(res.data);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted.current) {
          setError(err.message ?? "Error al obtener regiones");
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchRegions();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return { regions, loading, error };
}
