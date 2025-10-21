/**
 * Modal de confirmación para acciones administrativas críticas
 */
import React from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import styles from "../styles/modal.module.css";

interface AdminActionModalProps {
  isOpen: boolean; // controla si se muestra o no
  title: string; // título del modal
  message: string; // mensaje dentro del modal
  onConfirm: () => void; // función al confirmar
  onCancel: () => void; // función al cancelar
  confirmText?: string; // texto del botón confirmar
  cancelText?: string; // texto del botón cancelar
  variant?: "warning" | "danger" | "info" | "success"; // tipo de acción
}

/**
 * Modal reutilizable para confirmar acciones administrativas
 * Uso: eliminación de usuarios, cambios de rol, suspensiones
 */
const AdminActionModal: React.FC<AdminActionModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "warning",
}) => {
  // No renderizar si el modal está cerrado
  if (!isOpen) return null;

  // Iconos según la variante
  const icons = {
    warning: "⚠️",
    danger: "🗑️",
    info: "ℹ️",
    success: "✓",
  };

  // Clase del icono según la variante
  const iconClass = {
    warning: styles.iconWarning,
    danger: styles.iconDanger,
    info: styles.iconInfo,
    success: styles.iconSuccess,
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel} size="small" showCloseButton={false}>
      <div className={styles.adminModal}>
        {/* Icono de la variante */}
        <div className={iconClass[variant]}>
          {icons[variant]}
        </div>

        {/* Título */}
        <div className={styles.modalHeader}>
          <h2 id="modal-title" className={styles.modalTitle}>
            {title}
          </h2>
        </div>

        {/* Mensaje */}
        <div className={styles.modalBody}>
          <p>{message}</p>
        </div>

        {/* Botones de acción: cancelar (secundario) y confirmar (primario) */}
        <div className={styles.modalFooter}>
          <Button 
            variant="secondary" 
            onClick={onCancel}
            aria-label="Cancelar acción"
          >
            {cancelText}
          </Button>
          <Button 
            onClick={onConfirm}
            aria-label="Confirmar acción"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AdminActionModal;
