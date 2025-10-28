import { render, screen, fireEvent } from "@testing-library/react";
import AdminActionModal from "../AdminActionModal";

describe("AdminActionModal", () => {
  const defaultProps = {
    isOpen: true,
    title: "Eliminar usuario",
    message: "¿Estás seguro de eliminar este usuario?",
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar mocks antes de cada test
  });

  test("renderiza título y mensaje correctamente", () => {
    render(<AdminActionModal {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.message)).toBeInTheDocument();
  });

  test("renderiza icono según la variante", () => {
    const { rerender } = render(<AdminActionModal {...defaultProps} variant="warning" />);
    expect(screen.getByText("⚠️")).toBeInTheDocument();

    rerender(<AdminActionModal {...defaultProps} variant="danger" />);
    expect(screen.getByText("🗑️")).toBeInTheDocument();

    rerender(<AdminActionModal {...defaultProps} variant="info" />);
    expect(screen.getByText("ℹ️")).toBeInTheDocument();

    rerender(<AdminActionModal {...defaultProps} variant="success" />);
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  test("no renderiza si isOpen es false", () => {
    const { container } = render(<AdminActionModal {...defaultProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  test("llama a onCancel al hacer click en el botón cancelar", () => {
    render(<AdminActionModal {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /Cancelar acción/i }));
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  test("llama a onConfirm al hacer click en el botón confirmar", () => {
    render(<AdminActionModal {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /Confirmar acción/i }));
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  test("muestra textos personalizados en los botones", () => {
    render(
      <AdminActionModal
        {...defaultProps}
        confirmText="Sí, eliminar"
        cancelText="No, cancelar"
      />
    );
    expect(screen.getByText("Sí, eliminar")).toBeInTheDocument();
    expect(screen.getByText("No, cancelar")).toBeInTheDocument();
  });
});
