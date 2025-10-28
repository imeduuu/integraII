import React, { useEffect, useRef } from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title = 'Modal' }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const el = dialogRef.current;
    if (!el) return;

    // focus first focusable element inside modal
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusable = el.querySelector<HTMLElement>(focusableSelector);
    focusable?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const focusables = Array.from(el.querySelectorAll<HTMLElement>(focusableSelector)).filter(Boolean);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    }

    document.addEventListener('keydown', onKey);
    // prevent background scrolling while modal is open (optional)
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" role="presentation">
      {/* Fondo oscuro */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenido modal */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative bg-white rounded-lg shadow-lg p-6 z-10 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-2 right-2">
          <Button variant="secondary" onClick={onClose} aria-label="Cerrar modal">
            ✕
          </Button>
        </div>

        <h2 id="modal-title" className="sr-only">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
