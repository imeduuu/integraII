
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { userMock } from "../context/userMock";
import { HiUser, HiUserGroup, HiShieldCheck } from "react-icons/hi"; // Iconos para roles
import styles from "../styles/admin-users.module.css";
import UserTable from "../components/UserTable";

const users = [
  { id: 1, nombre: "Ana Pérez", email: "ana@correo.com", rol: "admin" },
  { id: 2, nombre: "Luis Gómez", email: "luis@correo.com", rol: "user" },
  { id: 3, nombre: "Org Animal", email: "org@correo.com", rol: "org" },
  { id: 4, nombre: "Pedro López", email: "pedro@correo.com", rol: "user" },
  { id: 5, nombre: "María Torres", email: "maria@correo.com", rol: "admin" },
  { id: 6, nombre: "Carlos Ruiz", email: "carlos@correo.com", rol: "user" },
  { id: 7, nombre: "Sofía Díaz", email: "sofia@correo.com", rol: "org" },
  { id: 8, nombre: "Andrés Muñoz", email: "andres@correo.com", rol: "user" },
  { id: 9, nombre: "Andrea Muñoz", email: "andrea@correo.com", rol: "user" },
  { id: 10, nombre: "Andy Muñoz", email: "andy@correo.com", rol: "user" },
];

const roleBadge = (rol: string) => {
  // Badge visual para cada rol
  switch (rol) {
    case "admin":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold animate-fadeIn">
          <HiShieldCheck className="w-4 h-4" /> Admin
        </span>
      );
    case "org":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold animate-fadeIn">
          <HiUserGroup className="w-4 h-4" /> Organización
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold animate-fadeIn">
          <HiUser className="w-4 h-4" /> Usuario
        </span>
      );
  }
};

const UserList = () => {
  useEffect(() => {
    if (userMock.role !== "admin") {
      window.location.replace("/denied");
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <h1 className={styles.title}>Usuarios</h1>
        {/* Puedes alternar entre la tabla personalizada y el componente UserTable según lo que prefieras */}
        <div className="w-full max-w-3xl overflow-x-auto shadow-lg rounded-xl bg-white p-4 animate-fadeIn">
          <table className="w-full text-sm md:text-base border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-2 text-left font-bold text-blue-700 rounded-tl-xl">Nombre</th>
                <th className="px-4 py-2 text-left font-bold text-blue-700">Email</th>
                <th className="px-4 py-2 text-left font-bold text-blue-700 rounded-tr-xl">Rol</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr
                  key={user.id}
                  className="hover:bg-blue-50 transition-colors duration-200 group rounded-xl"
                >
                  <td className="px-4 py-3 font-medium text-gray-800 flex items-center gap-2">
                    <HiUser className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    {user.nombre}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3">{roleBadge(user.rol)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Alternativamente, puedes mostrar el UserTable paginado */}
        <div className="mt-8">
          <UserTable users={users} usersPerPage={3} />
        </div>
        {/* Feedback visual y navegación clara */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 w-full max-w-3xl justify-center">
          <a
            href="/admin-home"
            className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors duration-200 text-center"
          >
            Volver al Panel
          </a>
          <a
            href="/admin-campaigns"
            className="inline-block px-6 py-3 rounded-lg bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition-colors duration-200 text-center"
          >
            Ver Campañas
          </a>
        </div>
      </main>
      <Footer />
      {/* Animación fadeIn personalizada */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s;
        }
      `}</style>
      {/* Comentario: Se utiliza Tailwind CSS y animación fadeIn para mejorar la experiencia visual y responsividad. */}
    </>
  );
};

export default UserList;
