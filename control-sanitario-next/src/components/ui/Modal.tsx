import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  size = "medium",
  showCloseButton = true 
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Manejar cierre con animación
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200); // Duración de la animación de salida
  };

  // Manejar tecla ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Gestión del focus
  useEffect(() => {
    if (isOpen) {
      // Guardar el elemento activo antes de abrir el modal
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus en el botón de cierre o en el modal
      setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        } else if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 100);
    } else {
      // Restaurar el focus al cerrar
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  // Focus trap: mantener el focus dentro del modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <div 
      className={`${styles.overlay} ${isClosing ? styles.closing : ""}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Contenido modal */}
      <div
        ref={modalRef}
        className={`${styles.modalContainer} ${styles[size]} ${isClosing ? styles.closing : ""}`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {showCloseButton && (
          <button
            ref={closeButtonRef}
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Cerrar modal"
            type="button"
          >
            ✕
          </button>
        )}
        <div className={styles.modalContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
