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
      <h2 className="text-xl font-bold mb-2">Historial de eventos</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Tipo</th>
            <th className="py-2 px-4 border-b">Descripción</th>
            <th className="py-2 px-4 border-b">Usuario</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((evento) => (
            <tr key={evento.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{evento.fecha}</td>
              <td className="py-2 px-4 border-b">{evento.tipo}</td>
              <td className="py-2 px-4 border-b">{evento.descripcion}</td>
              <td className="py-2 px-4 border-b">{evento.usuario || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialList;
