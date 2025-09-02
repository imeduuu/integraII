import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const QuienesSomos = () => (
  <>
    <Navbar />
    <main
      style={{
        padding: "2rem",
        minHeight: "60vh",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "2.2rem",
          fontWeight: 800,
          color: "#2563eb",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Quiénes Somos
      </h1>

      <p
        style={{
          fontSize: "1.1rem",
          color: "#334155",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        En <strong>Huella Segura</strong> creemos en el compromiso con la comunidad y
        la innovación tecnológica para el cuidado sanitario y el bienestar animal.
      </p>

      <section style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "#2563eb",
          }}
        >
          Nuestra Misión
        </h2>
        <p style={{ color: "#475569" }}>
          Brindar herramientas accesibles y seguras para apoyar el control sanitario y la
          participación ciudadana en beneficio de todos.
        </p>
      </section>

      <section>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "#2563eb",
          }}
        >
          Nuestros Valores
        </h2>
        <ul style={{ color: "#475569", lineHeight: "1.8" }}>
          <li>✔ Seguridad</li>
          <li>✔ Transparencia</li>
          <li>✔ Innovación</li>
          <li>✔ Compromiso social</li>
        </ul>
      </section>
    </main>
    <Footer />
  </>
);

export default QuienesSomos;
