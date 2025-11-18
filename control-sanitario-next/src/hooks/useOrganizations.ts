import { useCallback, useEffect, useState } from "react";

export interface Organization {
  id: string;
  name: string;
  // agrega aqui todos los campos que tengas en la entidad Organization
  // example:
  // rut?: string;
  // address?: string;
  // phone?: string;
  [key: string]: any;
}

export interface OrganizationPayload {
  name: string;
  // mismos campos que espera el body de la API para crear / actualizar
  // rut?: string;
  // address?: string;
  // phone?: string;
  [key: string]: any;
}

// ajusta esta base segun tu backend
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

// si tu ruta real es /api/organizations o similar, cambiala aqui
const ORGANIZATIONS_URL = `${API_BASE}/organizations`;

interface UseOrganizationsResult {
  organizations: Organization[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createOrganization: (
    payload: OrganizationPayload
  ) => Promise<Organization>;
  updateOrganization: (
    id: string,
    payload: Partial<OrganizationPayload>
  ) => Promise<Organization>;
  deleteOrganization: (id: string) => Promise<void>;
}

export function useOrganizations(): UseOrganizationsResult {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(ORGANIZATIONS_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Error fetching organizations: ${res.status}`);
      }

      const data: Organization[] = await res.json();
      setOrganizations(data);
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : "Error fetching organizations";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrganization = useCallback(
    async (payload: OrganizationPayload): Promise<Organization> => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(ORGANIZATIONS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error(`Error creating organization: ${res.status}`);
        }

        const created: Organization = await res.json();
        setOrganizations((prev) => [...prev, created]);
        return created;
      } catch (err: unknown) {
        console.error(err);
        const message =
          err instanceof Error
            ? err.message
            : "Error creating organization";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateOrganization = useCallback(
    async (
      id: string,
      payload: Partial<OrganizationPayload>
    ): Promise<Organization> => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${ORGANIZATIONS_URL}/${id}`, {
          method: "PUT", // cambia a "PATCH" si tu API lo usa
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error(`Error updating organization: ${res.status}`);
        }

        const updated: Organization = await res.json();

        setOrganizations((prev) =>
          prev.map((org) => (org.id === id ? updated : org))
        );

        return updated;
      } catch (err: unknown) {
        console.error(err);
        const message =
          err instanceof Error
            ? err.message
            : "Error updating organization";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteOrganization = useCallback(
    async (id: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${ORGANIZATIONS_URL}/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error(`Error deleting organization: ${res.status}`);
        }

        setOrganizations((prev) => prev.filter((org) => org.id !== id));
      } catch (err: unknown) {
        console.error(err);
        const message =
          err instanceof Error
            ? err.message
            : "Error deleting organization";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    void fetchOrganizations();
  }, [fetchOrganizations]);

  return {
    organizations,
    loading,
    error,
    refetch: fetchOrganizations,
    createOrganization,
    updateOrganization,
    deleteOrganization,
  };
}

export default useOrganizations;
