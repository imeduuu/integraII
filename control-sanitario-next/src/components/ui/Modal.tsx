import React, { useEffect, useState } from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setVisible(true);
    else {
      // esperar la duración de la animación antes de desmontar
      const t = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!visible) return null;

  const closing = !isOpen; // when true, apply exit styles

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo oscuro */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-200 ${closing ? 'opacity-0' : 'opacity-100'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Contenido modal */}
      <div
        className={`relative bg-white rounded-lg shadow-lg p-6 z-10 w-96 transform transition-all duration-200 ${closing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute top-2 right-2">
          <Button variant="secondary" onClick={onClose}>
            \u2715
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
