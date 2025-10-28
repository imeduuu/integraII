// __tests__/AdminView.test.tsx
import { render, screen } from '@testing-library/react';
import AdminView from '../AdminView';

describe('AdminView', () => {
  test('renderiza correctamente el título y el párrafo', () => {
    render(<AdminView />);

    // Verificar que el título está en el documento
    const title = screen.getByText(/Vista Administrador \(AdminView\)/i);
    expect(title).toBeInTheDocument();

    // Verificar que el párrafo está en el documento
    const paragraph = screen.getByText(/Componente provisional para el rol administrador/i);
    expect(paragraph).toBeInTheDocument();
  });
});
