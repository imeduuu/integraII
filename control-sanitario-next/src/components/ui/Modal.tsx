import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import styles from "../../styles/modal.module.css";
import { motion } from "framer-motion";

const MotionDiv: any = motion.div;

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
  showCloseButton = true,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // --- Cierre con animación ---
  const handleClose = () => {
    setIsClosing(true);
  };

  // --- Manejar tecla ESC y scroll ---
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) handleClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // --- Gestión del focus ---
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        if (closeButtonRef.current) closeButtonRef.current.focus();
        else if (modalRef.current) modalRef.current.focus();
      }, 100);
    } else if (previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  }, [isOpen]);

  // --- Focus trap ---
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Fondo oscuro */}
      <MotionDiv
        className="absolute inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 0.5 }}
        transition={{ duration: 0.18 }}
      />

      {/* Contenido del modal */}
      <MotionDiv
        ref={modalRef}
        className={`relative bg-white rounded-lg shadow-lg p-4 sm:p-6 z-10 transform transition-all duration-200 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        } w-full max-w-md mx-4 sm:mx-0 max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        role="document"
        onAnimationComplete={() => {
          if (isClosing) {
            setIsClosing(false);
            onClose();
          }
        }}
      >
        {showCloseButton && (
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className="absolute top-2 right-2 p-1 bg-transparent rounded hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        )}
        <div>{children}</div>
      </MotionDiv>
    </MotionDiv>
  );
};

export default Modal;
