import { useState, useEffect, useCallback } from "react";

export interface FavoriteItem {
  id: number;
  id_usuario: number;
  id_animal: number;
  animal?: any;
}

export function useFavorites(token?: string) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ============================
  // 🔹 LISTAR FAVORITOS
  // ============================
  const list = useCallback(async () => {
    if (!token) {
      setError("Token inválido o faltante");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error listando favoritos");
      }

      setFavorites(data);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // ============================
  // 🔹 AGREGAR FAVORITO
  // ============================
  const add = useCallback(
    async (id_animal: number) => {
      if (!token) {
        setError("Token inválido o faltante");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_animal }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Error agregando favorito");
        }

        // Actualizar estado local
        setFavorites((prev) => [...prev, data]);

        return data;
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // ============================
  // 🔹 ELIMINAR FAVORITO
  // ============================
  const remove = useCallback(
    async (id_animal: number) => {
      if (!token) {
        setError("Token inválido o faltante");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/favorites/${id_animal}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Error eliminando favorito");
        }

        // Quitar del estado local
        setFavorites((prev) =>
          prev.filter((fav) => fav.id_animal !== id_animal)
        );

        return data;
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // ============================
  // 🔹 AUTO-CARGAR FAVORITOS
  // ============================
  useEffect(() => {
    if (token) list();
  }, [token, list]);

  return {
    favorites,
    loading,
    error,
    list,
    add,
    remove,
  };
}
