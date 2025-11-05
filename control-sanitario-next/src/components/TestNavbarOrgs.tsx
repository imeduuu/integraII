import React, { useMemo, useState } from 'react';

type Org = {
  id_organizacion: number;
  nombre_organizacion: string;
  telefono_organizacion: string;
  email_organizacion: string;
  direccion: string;
  id_ciudad?: number | null;
};

const randomSuffix = () => Math.random().toString(36).slice(2, 7);

const TestNavbarOrgs: React.FC = () => {
  const [log, setLog] = useState<string>('Listo para probar endpoints...');
  const [id, setId] = useState<string>('');
  const [payload, setPayload] = useState<Partial<Org>>({
    nombre_organizacion: 'Org Demo ' + randomSuffix(),
    telefono_organizacion: '+56 9 1234 5678',
    email_organizacion: `demo-${randomSuffix()}@orgs.test`,
    direccion: 'Calle Falsa 123',
    id_ciudad: 1,
  });

  const base = '/api/organizations';

  const pretty = (obj: any) => JSON.stringify(obj, null, 2);

  const onList = async () => {
    try {
      const res = await fetch(base);
      const data = await res.json();
      setLog(`GET /organizations\nStatus: ${res.status}\n${pretty(data)}`);
    } catch (e) {
      setLog(`Error: ${String(e)}`);
    }
  };

  const onCreate = async () => {
    try {
      const res = await fetch(base, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      setLog(`POST /organizations\nStatus: ${res.status}\n${pretty(data)}`);
      if (res.ok && data?.id_organizacion) setId(String(data.id_organizacion));
    } catch (e) {
      setLog(`Error: ${String(e)}`);
    }
  };

  const onGet = async () => {
    try {
      const res = await fetch(`${base}/${id}`);
      const data = await res.json();
      setLog(`GET /organizations/${id}\nStatus: ${res.status}\n${pretty(data)}`);
    } catch (e) {
      setLog(`Error: ${String(e)}`);
    }
  };

  const onUpdate = async () => {
    try {
      const res = await fetch(`${base}/${id}` , { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ telefono_organizacion: '+56 9 0000 1111' }) });
      const data = await res.json();
      setLog(`PUT /organizations/${id}\nStatus: ${res.status}\n${pretty(data)}`);
    } catch (e) {
      setLog(`Error: ${String(e)}`);
    }
  };

  const onDelete = async () => {
    try {
      const res = await fetch(`${base}/${id}`, { method: 'DELETE' });
      const data = await res.json();
      setLog(`DELETE /organizations/${id}\nStatus: ${res.status}\n${pretty(data)}`);
    } catch (e) {
      setLog(`Error: ${String(e)}`);
    }
  };

  const onUsers = async () => {
    try {
      const res = await fetch(`${base}/${id}/users`);
      const data = await res.json();
      setLog(`GET /organizations/${id}/users\nStatus: ${res.status}\n${pretty(data)}`);
    } catch (e) {
      setLog(`Error: ${String(e)}`);
    }
  };

  const disabledId = useMemo(() => !id || isNaN(Number(id)), [id]);

  return (
    <div className="w-full bg-gray-100 border-b border-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap gap-2 items-center">
        <span className="font-semibold mr-2">Test Orgs:</span>
        <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={onList}>Listar</button>
        <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700" onClick={onCreate}>Crear demo</button>
        <div className="flex items-center gap-2">
          <input className="px-2 py-1 border rounded w-24" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
          <button className="px-3 py-1 bg-slate-600 text-white rounded hover:bg-slate-700 disabled:opacity-50" disabled={disabledId} onClick={onGet}>Ver</button>
          <button className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50" disabled={disabledId} onClick={onUpdate}>Actualizar</button>
          <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50" disabled={disabledId} onClick={onDelete}>Eliminar</button>
          <button className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50" disabled={disabledId} onClick={onUsers}>Usuarios</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-4">
        <h3 className="font-semibold mb-2">Payload de creación</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
          <input className="px-2 py-1 border rounded" placeholder="Nombre" value={payload.nombre_organizacion || ''} onChange={(e) => setPayload(p => ({ ...p, nombre_organizacion: e.target.value }))} />
          <input className="px-2 py-1 border rounded" placeholder="Teléfono" value={payload.telefono_organizacion || ''} onChange={(e) => setPayload(p => ({ ...p, telefono_organizacion: e.target.value }))} />
          <input className="px-2 py-1 border rounded" placeholder="Email" value={payload.email_organizacion || ''} onChange={(e) => setPayload(p => ({ ...p, email_organizacion: e.target.value }))} />
          <input className="px-2 py-1 border rounded" placeholder="Dirección" value={payload.direccion || ''} onChange={(e) => setPayload(p => ({ ...p, direccion: e.target.value }))} />
          <input className="px-2 py-1 border rounded" placeholder="ID Ciudad (opcional)" value={payload.id_ciudad ?? ''} onChange={(e) => setPayload(p => ({ ...p, id_ciudad: e.target.value ? Number(e.target.value) : undefined }))} />
        </div>

        <h3 className="font-semibold mt-2 mb-1">Resultado</h3>
        <pre className="bg-white border rounded p-3 overflow-auto max-h-96 text-sm">{log}</pre>
      </div>
    </div>
  );
};

export default TestNavbarOrgs;
