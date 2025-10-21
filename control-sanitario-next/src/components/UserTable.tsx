
/**
 * Tabla de usuarios con filtrado y paginación para panel administrativo
 */
import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/admin-users.module.css";

// Estructura de datos de usuario
type User = {
  id: number;
  nombre: string;
  email: string;
  rol: string;
};

type Props = {
  users: User[]; // Lista de usuarios a mostrar
  usersPerPage?: number; // Cantidad por página (default: 5)
};

/**
 * Tabla interactiva con filtros por nombre, email y rol + paginación
 * Utilizada principalmente en /admin-users para gestión de usuarios
 */
const UserTable: React.FC<Props> = ({ users, usersPerPage = 5 }) => {
  // Control de paginación
  const [currentPage, setCurrentPage] = useState(1);
  // Estados de filtros de búsqueda
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterRol, setFilterRol] = useState("");

  // Aplicar filtros según criterios de búsqueda
  const filteredUsers = users.filter((user) => {
    return (
      user.nombre.toLowerCase().includes(filterName.toLowerCase()) &&
      user.email.toLowerCase().includes(filterEmail.toLowerCase()) &&
      (filterRol ? user.rol === filterRol : true) // si no hay rol, muestra todos
    );
  });

  // 🔹 Paginación: calculamos cuántas páginas totales hay
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  // Función para cambiar de página
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div>
      {/* 🔹 Sección de Filtros */}
      <div className={styles.filters}>
        {/* Filtro por nombre */}
        <input
          type="text"
          placeholder="Filtrar por nombre"
          value={filterName}
          onChange={(e) => { setFilterName(e.target.value); setCurrentPage(1); }}
        />
        {/* Filtro por email */}
        <input
          type="text"
          placeholder="Filtrar por email"
          value={filterEmail}
          onChange={(e) => { setFilterEmail(e.target.value); setCurrentPage(1); }}
        />
        {/* Filtro por rol */}
        <select
          value={filterRol}
          onChange={(e) => { setFilterRol(e.target.value); setCurrentPage(1); }}
        >
          <option value="">Todos los roles</option>
          <option value="admin">Admin</option>
          <option value="user">user</option>
          <option value="editor">Editor</option>
        </select>
      </div>

      {/* 🔹 Tabla de usuarios */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            // Recorremos los usuarios de la página actual
            currentUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  {/* Cada nombre es un enlace a la página del usuario */}
                  <Link href={`/admin-users/${user.id}`}>
                    {user.nombre}
                  </Link>
                </td>
                <td>{user.email}</td>
                <td>{user.rol}</td>
              </tr>
            ))
          ) : (
            // Si no encuentra nada, se muestra este mensaje
            <tr>
              <td colSpan={3}>No se encontraron usuarios</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🔹 Controles de Paginación */}
      <div className={styles.pagination}>
        {/* Botón anterior */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-95'}`}
        >Anterior</button>
        
        {/* Números de páginas */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            className={`${currentPage === i + 1 ? styles.activePage : ""} px-3 py-1 rounded-md hover:brightness-95`}
          >
            {i + 1}
          </button>
        ))}

        {/* Botón siguiente */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`${currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-95'}`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default UserTable;
