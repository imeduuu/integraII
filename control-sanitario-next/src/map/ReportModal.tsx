import { useState } from 'react';

const options = [
  { value: 'report', label: 'Reportar algo' },
  { value: 'adoption', label: 'Punto de adopción' },
  { value: 'want_adopt', label: 'Quiero adoptar' },
];

export default function ReportModal({ open, onClose, onSubmit }) {
  const [type, setType] = useState('report');
  const [description, setDescription] = useState('');

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
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Agregar marcador</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Tipo de acción</label>
          <select
            className="w-full mb-4 p-2 rounded border dark:bg-gray-800 dark:text-gray-100"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <label className="block mb-2 text-sm font-medium">Descripción</label>
          <textarea
            className="w-full mb-4 p-2 rounded border dark:bg-gray-800 dark:text-gray-100"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
