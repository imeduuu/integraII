import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/org-publish-adoption.module.css";

const OrgPublishAdoption = () => (
  <>
    <Navbar />
    <main className={styles.container}>
      <h1 className={styles.title}>Publicar Adopción</h1>
      <form className={styles.form}>
        <div>
          <label className={styles.label}>Nombre de la mascota</label>
          <input className={styles.input} type="text" placeholder="Ejemplo: Luna" />
        </div>
        <div>
          <label className={styles.label}>Edad</label>
          <input className={styles.input} type="number" placeholder="Ejemplo: 2" />
        </div>
        <div>
          <label className={styles.label}>Descripción</label>
          <textarea className={styles.textarea} rows={3} placeholder="Describe la mascota..." />
        </div>
        <button className={styles.button} type="submit">Publicar</button>
      </form>
    </main>
    <Footer />
  </>
);

export default OrgPublishAdoption;
