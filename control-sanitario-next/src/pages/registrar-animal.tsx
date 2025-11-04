import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createFullAnimal } from "../services/animal_form";
import { useRouter } from "next/router";

const RegistrarAnimal = () => {
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [estado, setEstado] = useState("");
  const [zona, setZona] = useState("");
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createFullAnimal({
        nombre,
        especie,
        estado_general: estado,
        zona,
      });
      setMensaje("✅ Animal registrado correctamente");
      setNombre("");
      setEspecie("");
      setEstado("");
      setZona("");
    } catch (error) {
      setMensaje("❌ Error al registrar el animal");
    }
  };

  return (
    <>
      <Head>
        <title>Registrar Animal</title>
      </Head>
      <Navbar />
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Registrar Nuevo Animal</h2>
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Especie"
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Estado general"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Zona"
            value={zona}
            onChange={(e) => setZona(e.target.value)}
            required
          />
          <button type="submit" style={{ padding: "10px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
            Enviar
          </button>
          {/* Botón para ir a ver los animales */}
          <button
            type="button"
            onClick={() => router.push("/ver-animales")}
            style={{
              padding: "10px",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Ver Animales
          </button>
        </form>
        {mensaje && <p style={{ marginTop: "10px" }}>{mensaje}</p>}
      </main>
      <Footer />
    </>
  );
};

export default RegistrarAnimal;
