import React, { useEffect } from 'react';
import { useAdoptions } from '../hooks/useAdoptions';


export default function Demo() {
  const { items, list, create, update, remove, loading, error } = useAdoptions();

  useEffect(() => {
    // Llama a list() para obtener las adopciones. Podés pasar filtros.
    list({ animalId: 1, available: true }).catch(console.error);
  }, [list]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
