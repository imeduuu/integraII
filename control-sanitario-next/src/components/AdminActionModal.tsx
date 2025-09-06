import React from "react";

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
  if (!isOpen) return null; // no renderiza si isOpen es false

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "12px",
          minWidth: "320px",
          maxWidth: "400px",
          textAlign: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "12px" }}>
          {title}
        </h2>
        <p style={{ marginBottom: "24px", color: "#374151" }}>{message}</p>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#f3f4f6",
              cursor: "pointer",
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminActionModal;
