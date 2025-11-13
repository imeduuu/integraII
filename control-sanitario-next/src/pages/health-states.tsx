import React, { useEffect, useMemo, useState } from 'react';

type HealthState = {
  id_estado_salud: number;
  nombre_estado_salud: string;
};

type ApiListResponse = {
  success: boolean;
  data: HealthState[];
  count: number;
  error?: string;
};

type ApiItemResponse = {
  success: boolean;
  data: HealthState;
  error?: string;
};

export default function HealthStatesPage() {
  const [items, setItems] = useState<HealthState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const baseUrl = '/api/health-states';

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(baseUrl);
      const json: ApiListResponse = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Error al cargar');
      setItems(json.data);
    } catch (e: any) {
      setError(e?.message ?? 'Error al cargar');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCreate = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_estado_salud: name.trim() }),
      });
      const json: ApiItemResponse = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'No se pudo crear');
      setName('');
      await load();
    } catch (e: any) {
      alert(e?.message ?? 'Error creando');
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (item: HealthState) => {
    setEditingId(item.id_estado_salud);
    setEditingName(item.nombre_estado_salud);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const confirmEdit = async () => {
    if (editingId == null) return;
    if (!editingName.trim()) return alert('El nombre no puede estar vacío');
    setSaving(true);
    try {
      const res = await fetch(`${baseUrl}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_estado_salud: editingName.trim() }),
      });
      const json: ApiItemResponse = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'No se pudo actualizar');
      cancelEdit();
      await load();
    } catch (e: any) {
      alert(e?.message ?? 'Error actualizando');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: number) => {
    if (!confirm('¿Eliminar este estado?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || 'No se pudo eliminar');
      }
      await load();
    } catch (e: any) {
      alert(e?.message ?? 'Error eliminando');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold">Estados de salud</h1>
          <p className="text-sm text-neutral-400">CRUD simple consumiendo /api/health-states</p>
        </header>

        <section className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
          <form onSubmit={onCreate} className="flex gap-2 items-center">
            <input
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600"
              placeholder="Nombre del estado (ej. Sano, En tratamiento)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              disabled={saving}
              className="bg-sky-600 hover:bg-sky-500 disabled:opacity-50 rounded px-4 py-2"
            >
              {saving ? 'Guardando…' : 'Crear'}
            </button>
          </form>
        </section>

        <section className="bg-neutral-900 border border-neutral-800 rounded-lg">
          <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
            <h2 className="font-medium">Listado</h2>
            {loading && <span className="text-xs text-neutral-400">Cargando…</span>}
          </div>
          {error && (
            <div className="p-4 text-red-300 text-sm">{error}</div>
          )}
          {!loading && !error && (
            <ul className="divide-y divide-neutral-800">
              {items.map((it) => (
                <li key={it.id_estado_salud} className="p-4 flex items-center gap-3">
                  {editingId === it.id_estado_salud ? (
                    <>
                      <input
                        className="flex-1 bg-neutral-800 border border-neutral-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                      <button
                        onClick={confirmEdit}
                        disabled={saving}
                        className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded px-3 py-2"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-neutral-700 hover:bg-neutral-600 rounded px-3 py-2"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                        <div className="font-medium">{it.nombre_estado_salud}</div>
                        <div className="text-xs text-neutral-400">ID: {it.id_estado_salud}</div>
                      </div>
                      <button
                        onClick={() => startEdit(it)}
                        className="bg-sky-700 hover:bg-sky-600 rounded px-3 py-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(it.id_estado_salud)}
                        disabled={deletingId === it.id_estado_salud}
                        className="bg-red-700 hover:bg-red-600 disabled:opacity-50 rounded px-3 py-2"
                      >
                        {deletingId === it.id_estado_salud ? 'Eliminando…' : 'Eliminar'}
                      </button>
                    </>
                  )}
                </li>
              ))}
              {items.length === 0 && (
                <li className="p-4 text-sm text-neutral-400">No hay estados registrados.</li>
              )}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
