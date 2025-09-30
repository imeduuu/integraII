import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import { volunteers } from "../services/mockVolunteers";
import styles from "../styles/org-volunteers.module.css";

const OrgVolunteers = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");
  const [selected, setSelected] = useState<any>(null);

  const filteredVolunteers = volunteers.filter((v) => {
    const matchSearch = v.nombre.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "todos" ? true : v.estado === filter;
    return matchSearch && matchFilter;
  });

  return (
    <ProtectedRoute allowedRoles={["org"]}>
      <>
        <Navbar />
        <main className={styles.container}>
          <h1 className={styles.title}>Gestión de Voluntarios</h1>

          {/* Filtros */}
          <div className={styles.filters}>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.search}
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={styles.select}
            >
              <option value="todos">Todos</option>
              <option value="activo">Activos</option>
              <option value="inactivo">Inactivos</option>
            </select>
          </div>

          {/* Lista */}
          <ul className={styles.list}>
            {filteredVolunteers.map((v) => (
              <li
                key={v.id}
                className={styles.item}
                onClick={() => setSelected(v)}
              >
                <p className={styles.name}>{v.nombre}</p>
                <span className={styles.status}>
                  {v.estado === "activo" ? "🟢 Activo" : "🔴 Inactivo"}
                </span>
              </li>
            ))}
          </ul>

          {/* Detalles */}
          {selected && (
            <div className={styles.details}>
              <h2>Detalles de {selected.nombre}</h2>
              <p>Email: {selected.email}</p>
              <p>Estado: {selected.estado}</p>
              <button
                onClick={() => setSelected(null)}
                className={styles.closeBtn}
              >
                Cerrar
              </button>
            </div>
          )}
        </main>
        <Footer />
      </>
    </ProtectedRoute>
  );
};

export default OrgVolunteers;
