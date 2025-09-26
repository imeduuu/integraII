import React from "react";
import Button from "./ui/Button"; // Migración: Usar botón UI estándar

interface Animal {
  nombre: string;
  estado: string;
  ubicacion: string;
  edad: string;
  imagen: string;
}

interface FormData {
  name: string;
  email: string;
  reason: string;
}

interface Props {
  title: string;
  animal: Animal;
  formData: FormData;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({
  title,
  animal,
  formData,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" role="presentation" aria-modal="true">
      <div className="bg-white rounded p-6 shadow-lg w-96" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1}>
        <h2 id="modal-title" className="text-lg font-bold mb-4">{title}</h2>
        <p>
          ¿Seguro que quieres enviar la solicitud para adoptar a{" "}
          <strong>{animal.nombre}</strong>?
        </p>
        <div className="mt-4 text-sm space-y-1">
          <p><strong>Ubicación:</strong> {animal.ubicacion}</p>
          <p><strong>Edad:</strong> {animal.edad}</p>
          <p><strong>Solicitante:</strong> {formData.name} ({formData.email})</p>
          <p><strong>Motivo:</strong> {formData.reason}</p>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          {/* Migración: Se reemplazan los botones nativos por el componente Button UI estándar. */}
          <Button
            onClick={onCancel}
            variant="secondary"
            className="px-4 py-2 border rounded hover:bg-gray-100 focus:outline focus:outline-2 focus:outline-blue-600"
            aria-label="Cancelar solicitud"
            tabIndex={0}
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline focus:outline-2 focus:outline-blue-600"
            aria-label="Confirmar solicitud"
            tabIndex={0}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
