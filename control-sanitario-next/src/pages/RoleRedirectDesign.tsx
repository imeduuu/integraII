import React from "react";

const roles = [
  {
    name: "Administrador",
    description: "Acceso total al sistema, gestión de usuarios y configuración.",
    icon: <span className="text-4xl mr-2">🛡️</span>,
    actions: ["Panel de administración", "Gestión de usuarios", "Configuración"],
    color: "bg-blue-50 border-blue-300",
  },
  {
    name: "Usuario",
    description: "Acceso a funcionalidades básicas y consulta de información.",
    icon: <span className="text-4xl mr-2">👤</span>,
    actions: ["Dashboard", "Consultar datos", "Perfil"],
    color: "bg-green-50 border-green-300",
  },
  {
    name: "Organización",
    description: "Gestión de datos organizacionales y reportes.",
    icon: <span className="text-4xl mr-2">🏢</span>,
    actions: ["Panel de organización", "Reportes", "Miembros"],
    color: "bg-yellow-50 border-yellow-300",
  },
];

export default function RoleRedirectDesign() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
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
            className={`border rounded-2xl p-8 flex flex-col items-center shadow-lg ${role.color}`}
          >
            <div className="flex items-center mb-4">
              {role.icon}
              <span className="text-2xl font-semibold">{role.name}</span>
            </div>
            <p className="text-gray-700 mb-6 text-center">{role.description}</p>
            <ul className="w-full mb-6">
              {role.actions.map((action) => (
                <li
                  key={action}
                  className="bg-white rounded-lg px-4 py-2 mb-3 text-gray-800 border border-gray-200 shadow-sm flex items-center"
                >
                  <span className="mr-2 text-indigo-500">✔️</span>
                  {action}
                </li>
              ))}
            </ul>
            <button className="mt-auto px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
              Ir al panel de {role.name.toLowerCase()}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}