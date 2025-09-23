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

const AdminActionModal: React.FC<AdminActionModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="text-center min-w-[320px] max-w-[400px]">
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onCancel}>{cancelText}</Button>
          <Button className="flex-1" onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AdminActionModal;
