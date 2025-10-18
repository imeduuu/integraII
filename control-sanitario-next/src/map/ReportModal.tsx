import { useState, useEffect } from 'react';

const options = [
  { value: 'report', label: 'Reportar algo' },
  { value: 'adoption', label: 'Punto de adopción' },
  { value: 'want_adopt', label: 'Quiero adoptar' },
];

export default function ReportModal({ open, onClose, onSubmit }) {
  const [type, setType] = useState('report');
  const [description, setDescription] = useState('');

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    onSubmit(type, description);
    setDescription('');
    setType('report');
  }

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div
      className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-lg shadow-2xl flex flex-col"
      style={{ maxHeight: '90vh', overflowY: 'auto', minWidth: '320px', width: '100%', boxSizing: 'border-box' }}
    >
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 text-center">Agregar marcador</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="block text-sm font-semibold mb-1">Tipo de acción</label>
        <select
          className="w-full p-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <label className="block text-sm font-semibold mb-1">Descripción</label>
        <textarea
          className="w-full p-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          required
          placeholder="Describe el marcador..."
        />
        <div className="flex justify-end gap-2 mt-2">
          <button type="button" className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition" onClick={onClose}>Cancelar</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition">Agregar</button>
        </div>
      </form>
    </div>
  </div>
  );
}
