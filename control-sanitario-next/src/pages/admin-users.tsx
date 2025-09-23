import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

const UserList = () => {
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <h1 className={styles.title}>Usuarios</h1>

        {}
        <UserTable users={users} usersPerPage={3} />
      </main>
      <Footer />
    </>
  );
};

export default UserList;
