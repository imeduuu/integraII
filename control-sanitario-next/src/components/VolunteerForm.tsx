import React, { useState } from "react";
import styles from "../styles/volunteer-form.module.css";

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState("");

  // Manejo de cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validaciones
  const validate = () => {
    let newErrors: { [key: string]: string } = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    }

    if (!formData.correo) {
      newErrors.correo = "El correo es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "Formato de correo inválido.";
    }

    if (!formData.telefono) {
      newErrors.telefono = "El teléfono es obligatorio.";
    } else if (!/^[0-9]+$/.test(formData.telefono)) {
      newErrors.telefono = "El teléfono solo puede contener números.";
    } else if (formData.telefono.length < 8 || formData.telefono.length > 12) {
      newErrors.telefono = "El teléfono debe tener entre 8 y 12 dígitos.";
    }

    return newErrors;
  };

  // Envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage("");
    } else {
      setErrors({});
      setMessage("✅ Registro exitoso. ¡Gracias por ser voluntario!");
      console.log("Datos enviados:", formData);
      setFormData({ nombre: "", correo: "", telefono: "" });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Registro de Voluntarios</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Nombre */}
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
        />
        {errors.nombre && <p className={styles.error}>{errors.nombre}</p>}

        {/* Correo */}
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
        />
        {errors.correo && <p className={styles.error}>{errors.correo}</p>}

        {/* Teléfono */}
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
        />
        {errors.telefono && <p className={styles.error}>{errors.telefono}</p>}

        <button type="submit">Registrarse</button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default VolunteerForm;
