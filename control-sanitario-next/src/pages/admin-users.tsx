import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/admin-users.module.css";

const users = [
  { id: 1, nombre: "Ana Pérez", email: "ana@correo.com", rol: "admin" },
  { id: 2, nombre: "Luis Gómez", email: "luis@correo.com", rol: "user" },
  { id: 3, nombre: "Org Animal", email: "org@correo.com", rol: "org" }
];

const UserList = () => {
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <h1 className={styles.title}>Usuarios</h1>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>Nombre</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className={styles.tr}>
                <td className={styles.td}>{user.nombre}</td>
                <td className={styles.td}>{user.email}</td>
                <td className={styles.td}>{user.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </>
  );
};

export default UserList;
