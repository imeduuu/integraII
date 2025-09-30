/**
 * Modal de confirmación para acciones administrativas críticas
 */
import React from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";

interface AdminActionModalProps {
  isOpen: boolean; // controla si se muestra o no
  title: string; // título del modal
  message: string; // mensaje dentro del modal
  onConfirm: () => void; // función al confirmar
  onCancel: () => void; // función al cancelar
  confirmText?: string; // texto del botón confirmar
  cancelText?: string; // texto del botón cancelar
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
}) => {
  // No renderizar si el modal está cerrado
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="text-center min-w-[320px] max-w-[400px]">
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <p className="mb-6 text-gray-700">{message}</p>
        {/* Botones de acción: cancelar (secundario) y confirmar (primario) */}
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onCancel}>{cancelText}</Button>
          <Button className="flex-1" onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AdminActionModal;
