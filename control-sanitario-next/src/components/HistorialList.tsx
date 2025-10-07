import React from "react";

export type HistorialEvento = {
  id: number;
  fecha: string;
  tipo: string;
  descripcion: string;
  usuario?: string;
};

// Datos mock de ejemplo
const mockHistorial: HistorialEvento[] = [
  {
    id: 1,
    fecha: "2025-09-20",
    tipo: "Vacunación",
    descripcion: "Vacuna antirrábica aplicada.",
    usuario: "Dr. López",
  },
  {
    id: 2,
    fecha: "2025-08-15",
    tipo: "Adopción",
    descripcion: "El animal fue adoptado por Juan Pérez.",
    usuario: "Admin",
  },
  {
    id: 3,
    fecha: "2025-07-10",
    tipo: "Ingreso",
    descripcion: "Ingreso al refugio.",
    usuario: "Refugio Central",
  },
];

interface HistorialListProps {
  historial?: HistorialEvento[];
}

const HistorialList: React.FC<HistorialListProps> = ({ historial = mockHistorial }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <h2 className="text-xl font-bold mb-2 dark:text-white">Historial de eventos</h2>
      <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="py-2 px-4 border-b dark:border-gray-700 dark:text-gray-200">Fecha</th>
            <th className="py-2 px-4 border-b dark:border-gray-700 dark:text-gray-200">Tipo</th>
            <th className="py-2 px-4 border-b dark:border-gray-700 dark:text-gray-200">Descripción</th>
            <th className="py-2 px-4 border-b dark:border-gray-700 dark:text-gray-200">Usuario</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((evento) => (
            <tr key={evento.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="py-2 px-4 border-b dark:border-gray-700 dark:text-gray-100">{evento.fecha}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700 dark:text-gray-100">{evento.tipo}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700 dark:text-gray-100">{evento.descripcion}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700 dark:text-gray-100">{evento.usuario || '-'} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialList;
