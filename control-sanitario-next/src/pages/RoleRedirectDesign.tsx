import React from "react";
import Button from '../components/ui/Button'; // Migración: Usar botón UI estándar

const roles = [
  {
    name: "Administrador",
    description: "Acceso total al sistema, gestión de usuarios y configuración.",
    icon: <span className="text-4xl mr-2">🛡️</span>,
    actions: ["Panel de administración", "Gestión de usuarios", "Configuración"],
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Usuario",
    description: "Acceso a funcionalidades básicas y consulta de información.",
    icon: <span className="text-4xl mr-2">👤</span>,
    actions: ["Dashboard", "Consultar datos", "Perfil"],
    color: "from-green-500 to-green-700",
  },
  {
    name: "Organización",
    description: "Gestión de datos organizacionales y reportes.",
    icon: <span className="text-4xl mr-2">🏢</span>,
    actions: ["Panel de organización", "Reportes", "Miembros"],
    color: "from-yellow-400 to-yellow-600",
  },
];

export default function RoleRedirectDesign() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-green-50 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Redireccionamiento por Rol
      </h1>
      <p className="mb-10 text-gray-600 max-w-xl text-center">
        Según el rol del usuario, se mostrará una interfaz personalizada y se redireccionará a las funcionalidades correspondientes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {roles.map((role) => (
          <div
            key={role.name}
            className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col items-center hover:scale-105 transition`}
          >
            <div className="flex items-center mb-4">
              {role.icon}
              <span className="text-2xl font-semibold text-gray-700">{role.name}</span>
            </div>
            <p className="text-gray-700 mb-6 text-center">{role.description}</p>
            <ul className="w-full mb-6">
              {role.actions.map((action) => (
                <li
                  key={action}
                  className="bg-gray-100 rounded px-4 py-2 mb-2 text-gray-800 border border-gray-200 flex items-center"
                >
                  <span className="mr-2 text-indigo-500">✔️</span>
                  {action}
                </li>
              ))}
            </ul>
            {/* Migración: Se reemplaza el botón nativo por el componente Button UI estándar. */}
            <Button
              className={`mt-auto px-5 py-2 bg-gradient-to-r ${role.color} text-white rounded-lg font-bold shadow-md hover:brightness-110 transition`}
            >
              Ir al panel de {role.name.toLowerCase()}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}