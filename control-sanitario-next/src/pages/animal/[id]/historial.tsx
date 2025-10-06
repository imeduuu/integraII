import React from "react";
import { useRouter } from "next/router";
import HistorialList from "../../../components/HistorialList";

const HistorialAnimalPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Aquí podrías filtrar los datos mock por id si lo deseas
  // Por ahora, se muestran todos los eventos mock

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Historial del animal #{id}</h1>
      <HistorialList />
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => router.back()}
      >
        Volver
      </button>
    </div>
  );
};

export default HistorialAnimalPage;
