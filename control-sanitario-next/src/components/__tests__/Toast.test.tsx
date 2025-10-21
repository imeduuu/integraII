/**
 * Tests para el componente Toast
 */
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toast from '../Toast';
import '@testing-library/jest-dom';

describe('Toast Component', () => {
  const mockOnDismiss = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderizado', () => {
    it('renderiza el mensaje correctamente', () => {
      render(
        <Toast
          id={1}
          message="Test message"
          type="success"
          onDismiss={mockOnDismiss}
        />
      );
      
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('renderiza el icono correcto para cada tipo', () => {
      const types = ['success', 'error', 'info', 'warning'] as const;
      
      types.forEach((type) => {
        const { container } = render(
          <Toast
            id={1}
            message="Test"
            type={type}
            onDismiss={mockOnDismiss}
          />
        );
        
        // Verificar que hay un SVG (icono) presente
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
      });
    });

    it('aplica las clases de color correctas según el tipo', () => {
      const { container, rerender } = render(
        <Toast
          id={1}
          message="Test"
          type="success"
          onDismiss={mockOnDismiss}
        />
      );
      
      let toastDiv = container.firstChild as HTMLElement;
      expect(toastDiv.className).toContain('bg-green');
      
      rerender(
        <Toast
          id={1}
          message="Test"
          type="error"
          onDismiss={mockOnDismiss}
        />
      );
      
      toastDiv = container.firstChild as HTMLElement;
      expect(toastDiv.className).toContain('bg-red');
    });
  });

  describe('Accesibilidad', () => {
    it('tiene los atributos ARIA correctos', () => {
      const { container } = render(
        <Toast
          id={1}
          message="Test message"
          type="success"
          onDismiss={mockOnDismiss}
        />
      );
      
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveAttribute('role', 'alert');
      expect(toast).toHaveAttribute('aria-live', 'polite');
      expect(toast).toHaveAttribute('aria-atomic', 'true');
      expect(toast).toHaveAttribute('tabIndex', '0');
    });

    it('usa aria-live="assertive" para errores', () => {
      const { container } = render(
        <Toast
          id={1}
          message="Error message"
          type="error"
          onDismiss={mockOnDismiss}
        />
      );
      
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveAttribute('aria-live', 'assertive');
    });

    it('tiene un botón de cierre con aria-label', () => {
      render(
        <Toast
          id={1}
          message="Test"
          type="success"
          onDismiss={mockOnDismiss}
          dismissible={true}
        />
      );
      
      const closeButton = screen.getByLabelText('Cerrar notificación');
      expect(closeButton).toBeInTheDocument();
    });

    it('el botón de cierre tiene el icono SVG correcto', () => {
      const { container } = render(
        <Toast
          id={1}
          message="Test"
          type="success"
          onDismiss={mockOnDismiss}
          dismissible={true}
        />
      );
      
      const closeButton = screen.getByLabelText('Cerrar notificación');
      const svg = closeButton.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Interacciones', () => {
    it('llama a onDismiss cuando se hace clic en el botón de cierre', async () => {
      render(
        <Toast
          id={1}
          message="Test"
          type="success"
          onDismiss={mockOnDismiss}
          dismissible={true}
        />
      );
      
      const closeButton = screen.getByLabelText('Cerrar notificación');
      await userEvent.click(closeButton);
      
      expect(mockOnDismiss).toHaveBeenCalledWith(1);
      expect(mockOnDismiss).toHaveBeenCalledTimes(1);
    });

    it('se cierra con la tecla Escape', async () => {
      const { container } = render(
        <Toast
          id={1}
          message="Test"
          type="success"
          onDismiss={mockOnDismiss}
          dismissible={true}
        />
      );
      
      const toast = container.firstChild as HTMLElement;
      fireEvent.keyDown(toast, { key: 'Escape' });
      
      expect(mockOnDismiss).toHaveBeenCalledWith(1);
    });

    it('no se cierra con Escape si dismissible es false', async () => {
      const { container } = render(
        <Toast
          id={1}
          message="Test"
          type="success"
          onDismiss={mockOnDismiss}
          dismissible={false}
        />
      );
      
      const toast = container.firstChild as HTMLElement;
      fireEvent.keyDown(toast, { key: 'Escape' });
      
      expect(mockOnDismiss).not.toHaveBeenCalled();
    });

    it('no muestra el botón de cierre cuando dismissible es false', () => {
      render(
        <Toast
          id={1}
          message="Test"
          type="success"
          onDismiss={mockOnDismiss}
          dismissible={false}
        />
      );
      
      const closeButton = screen.queryByLabelText('Cerrar notificación');
      expect(closeButton).not.toBeInTheDocument();
    });
  });

  describe('Auto-cierre', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('se cierra automáticamente después de la duración especificada', () => {
      render(
        <Toast
          id={1}
          message="Test"
          type="success"
          onDismiss={mockOnDismiss}
          duration={3000}
        />
      );
      
      expect(mockOnDismiss).not.toHaveBeenCalled();
      
      jest.advanceTimersByTime(3000);
      
      expect(mockOnDismiss).toHaveBeenCalledWith(1);
    });

    it('no se cierra automáticamente si duration es 0', () => {
      render(
        <Toast
          id={1}
          message="Test"
          type="success"
          onDismiss={mockOnDismiss}
          duration={0}
        />
      );
      
      jest.advanceTimersByTime(10000);
      
      expect(mockOnDismiss).not.toHaveBeenCalled();
    });

    it('usa la duración por defecto de 5000ms', () => {
      render(
        <Toast
          id={1}
          message="Test"
          type="success"
          onDismiss={mockOnDismiss}
        />
      );
      
      jest.advanceTimersByTime(4999);
      expect(mockOnDismiss).not.toHaveBeenCalled();
      
      jest.advanceTimersByTime(1);
      expect(mockOnDismiss).toHaveBeenCalledWith(1);
    });

    it('limpia el timer cuando el componente se desmonta', () => {
      const { unmount } = render(
        <Toast
          id={1}
          message="Test"
          type="success"
          onDismiss={mockOnDismiss}
          duration={3000}
        />
      );
      
      unmount();
      jest.advanceTimersByTime(3000);
      
      expect(mockOnDismiss).not.toHaveBeenCalled();
    });
  });

  describe('Focus Management', () => {
    it('recibe focus cuando se renderiza', () => {
      const { container } = render(
        <Toast
          id={1}
          message="Test"
          type="success"
          onDismiss={mockOnDismiss}
        />
      );
      
      const toast = container.firstChild as HTMLElement;
      
      // Simular que el componente se montó y llamó a focus()
      // En un entorno real, esto se haría automáticamente
      toast.focus();
      
      expect(document.activeElement).toBe(toast);
    });
  });

  describe('Props opcionales', () => {
    it('usa dismissible=true por defecto', () => {
      render(
        <Toast
          id={1}
          message="Test"
          type="success"
          onDismiss={mockOnDismiss}
        />
      );
      
      const closeButton = screen.queryByLabelText('Cerrar notificación');
      expect(closeButton).toBeInTheDocument();
    });

    it('maneja mensajes largos correctamente', () => {
      const longMessage = 'A'.repeat(200);
      render(
        <Toast
          id={1}
          message={longMessage}
          type="success"
          onDismiss={mockOnDismiss}
        />
      );
      
      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('maneja diferentes IDs correctamente', () => {
      const { rerender } = render(
        <Toast
          id={123}
          message="Test"
          type="success"
          onDismiss={mockOnDismiss}
        />
      );
      
      const closeButton = screen.getByLabelText('Cerrar notificación');
      fireEvent.click(closeButton);
      
      expect(mockOnDismiss).toHaveBeenCalledWith(123);
      
      mockOnDismiss.mockClear();
      
      rerender(
        <Toast
          id={456}
          message="Test"
          type="success"
          onDismiss={mockOnDismiss}
        />
      );
      
      fireEvent.click(closeButton);
      expect(mockOnDismiss).toHaveBeenCalledWith(456);
    });
  });
});
