
import React, { useState } from "react";
import styles from "../styles/admin-users.module.css";

// Tipo de datos que representa a un usuario
type User = {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  estado: "activo" | "inactivo"; // estado solo puede ser activo o inactivo
};

// Props que recibe este componente (un usuario específico)
type Props = {
  user: User;
};

const UserDetail: React.FC<Props> = ({ user }) => {
  // Estado local del formulario (copia del usuario que se edita)
  const [formData, setFormData] = useState<User>(user);
  // Estado para mostrar mensajes de error o confirmación
  const [message, setMessage] = useState<string | null>(null);

  // 🔹 Validación del formulario antes de guardar
  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      setMessage("El nombre no puede estar vacío");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage("El email no es válido");
      return false;
    }
    return true;
  };

  // 🔹 Guardar cambios (de momento solo simulado con console.log)
  const handleSave = () => {
    if (!validateForm()) return;

    // En el futuro aquí se conectará con la API
    console.log("Datos guardados (mock):", formData);
    setMessage("Cambios guardados correctamente ✅");
  };

  return (
    <div className={styles.detailContainer}>
      <h2>Detalle del Usuario</h2>

      {/* Campo: Nombre */}
      <div className={styles.formGroup}>
        <label>Nombre:</label>
        <input 
          type="text" 
          value={formData.nombre} 
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} 
        />
      </div>

      {/* Campo: Email */}
      <div className={styles.formGroup}>
        <label>Email:</label>
        <input 
          type="email" 
          value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
        />
      </div>

      {/* Campo: Rol */}
      <div className={styles.formGroup}>
        <label>Rol:</label>
        <select 
          value={formData.rol} 
          onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="usuario">Usuario</option>
          <option value="editor">Editor</option>
        </select>
      </div>

      {/* Campo: Estado */}
      <div className={styles.formGroup}>
        <label>Estado:</label>
        <select 
          value={formData.estado} 
          onChange={(e) => setFormData({ ...formData, estado: e.target.value as "activo" | "inactivo" })}
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      {/* Botón para guardar cambios */}
      <button className={styles.saveButton} onClick={handleSave}>
        Guardar cambios
      </button>

      {/* Mensaje de validación o confirmación */}
      {message && <p className={styles.feedback}>{message}</p>}
    </div>
  );
};

export default UserDetail;
