import { useState } from 'react';
import { useRouter } from 'next/router';

// Mock de usuario y animal
const mockUser = {
  name: 'Admin User',
  role: 'admin', // Cambia a 'veterinario', 'usuario', etc. para probar
};

const mockAnimal = {
  id: 1,
  nombre: 'Firulais',
  estadoSanitario: 'Sano',
};

const ESTADOS_SANITARIOS = ['Sano', 'Enfermo', 'En tratamiento', 'Recuperado'];

export default function AnimalSanitarioPage() {
  const router = useRouter();
  const { id } = router.query;
  const [estadoSanitario, setEstadoSanitario] = useState(mockAnimal.estadoSanitario);
  const [editando, setEditando] = useState(false);

  const puedeEditar = mockUser.role === 'admin' || mockUser.role === 'veterinario';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEstadoSanitario(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditando(false);
    // Aquí iría la llamada a la API para guardar el cambio
    // Por ahora solo actualiza el estado local
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Estado sanitario de {mockAnimal.nombre}</h1>
      <p className="mb-2">ID animal: {id}</p>
      <div className="mb-4">
        <span className="font-semibold">Estado actual: </span>
        <span>{estadoSanitario}</span>
      </div>
      {puedeEditar && (
        <form onSubmit={handleSubmit} className="mb-4">
          <label className="block mb-2 font-semibold">Modificar estado sanitario:</label>
          <select
            value={estadoSanitario}
            onChange={handleChange}
            className="border rounded px-2 py-1 mb-2"
          >
            {ESTADOS_SANITARIOS.map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
          <br />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </form>
      )}
      {!puedeEditar && (
        <div className="text-gray-500">No tienes permisos para modificar el estado sanitario.</div>
      )}
      <div className="mt-6 text-xs text-gray-400">
        Acceso protegido: solo administradores y veterinarios pueden editar el estado sanitario.
      </div>
    </div>
  );
}
