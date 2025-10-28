// __tests__/Alert.test.tsx
import { render, screen } from '@testing-library/react';
import Alert from '../Alert';

describe('Alert', () => {
  test('renderiza el mensaje correctamente', () => {
    render(<Alert message="Mensaje de prueba" />);
    const alert = screen.getByText(/Mensaje de prueba/i);
    expect(alert).toBeInTheDocument();
  });

  test('aplica clase correcta para tipo info por defecto', () => {
    render(<Alert message="Info" />);
    const alert = screen.getByText(/Info/i);
    expect(alert).toHaveClass('bg-blue-200 text-blue-800');
  });

  test('aplica clase correcta para tipo success', () => {
    render(<Alert message="Éxito" type="success" />);
    const alert = screen.getByText(/Éxito/i);
    expect(alert).toHaveClass('bg-green-200 text-green-800');
  });

  test('aplica clase correcta para tipo error', () => {
    render(<Alert message="Error" type="error" />);
    const alert = screen.getByText(/Error/i);
    expect(alert).toHaveClass('bg-red-200 text-red-800');
  });
});
