
/**
 * Formulario de edición detallada de usuarios para administradores
 */
import React, { useState } from "react";
import styles from "../styles/admin-users.module.css";
import Button from './ui/Button';
import { useNotification } from './NotificationProvider';

// Estructura de datos de usuario
type User = {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  estado: "activo" | "inactivo"; // estado solo puede ser activo o inactivo
};

type Props = {
  user: User; // Usuario a editar
};

/**
 * Componente de edición de usuario con validaciones y estado local
 * Permite modificar: nombre, email, rol y estado del usuario
 */
const UserDetail: React.FC<Props> = ({ user }) => {
  // Estado del formulario editable
  const [formData, setFormData] = useState<User>(user);
  // Mensajes de validación y confirmación
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { addToast } = useNotification();

  // Validaciones de campos requeridos
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

  // Guardar cambios (simulado - sin backend)
  const handleSave = () => {
    if (!validateForm()) return;

    // En el futuro aquí se conectará con la API
    setIsSaving(true);
    // Simular llamada async
    setTimeout(() => {
      console.log("Datos guardados (mock):", formData);
      setMessage("Cambios guardados correctamente ✅");
      addToast('Cambios guardados correctamente', 'success');
      setIsSaving(false);
    }, 400);
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
      <Button className={styles.saveButton} onClick={handleSave} isLoading={isSaving}>
        Guardar cambios
      </Button>

      {/* Mensaje de validación o confirmación */}
      {message && <p className={styles.feedback}>{message}</p>}
    </div>
  );
};

export default UserDetail;
