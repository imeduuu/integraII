// __tests__/AnimalList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import AnimalList from '../AnimalList';
import React from 'react';

// Mock de AnimalCard para simplificar
jest.mock('../AnimalCard', () => ({ nombre }: { nombre: string }) => (
  <div data-testid="animal-card">{nombre}</div>
));

describe('AnimalList', () => {
  test('renderiza todos los animales inicialmente', () => {
    render(<AnimalList />);
    const cards = screen.getAllByTestId('animal-card');
    expect(cards.length).toBe(5); // según los datos mock
  });

  test('filtra por estado', () => {
    render(<AnimalList />);
    const selectEstado = screen.getByDisplayValue('Todos los estados');
    fireEvent.change(selectEstado, { target: { value: 'Disponible' } });

    const cards = screen.getAllByTestId('animal-card');
    expect(cards.length).toBe(3); // Luna, Bella, Nina
    expect(screen.getByText('Luna')).toBeInTheDocument();
    expect(screen.getByText('Bella')).toBeInTheDocument();
    expect(screen.getByText('Nina')).toBeInTheDocument();
  });

  test('filtra por ubicación', () => {
    render(<AnimalList />);
    const selectUbicacion = screen.getByDisplayValue('Todas las ubicaciones');
    fireEvent.change(selectUbicacion, { target: { value: 'Centro' } });

    const cards = screen.getAllByTestId('animal-card');
    expect(cards.length).toBe(2); // Bella, Rocky
    expect(screen.getByText('Bella')).toBeInTheDocument();
    expect(screen.getByText('Rocky')).toBeInTheDocument();
  });

  test('filtra por estado y ubicación combinados', () => {
    render(<AnimalList />);
    const selectEstado = screen.getByDisplayValue('Todos los estados');
    const selectUbicacion = screen.getByDisplayValue('Todas las ubicaciones');

    fireEvent.change(selectEstado, { target: { value: 'Disponible' } });
    fireEvent.change(selectUbicacion, { target: { value: 'Norte' } });

    const cards = screen.getAllByTestId('animal-card');
    expect(cards.length).toBe(2); // Luna, Nina
    expect(screen.getByText('Luna')).toBeInTheDocument();
    expect(screen.getByText('Nina')).toBeInTheDocument();
  });

  test('muestra todos si se limpia filtro', () => {
    render(<AnimalList />);
    const selectEstado = screen.getByDisplayValue('Todos los estados');
    fireEvent.change(selectEstado, { target: { value: 'Adoptado' } });
    fireEvent.change(selectEstado, { target: { value: '' } }); // limpiar filtro

    const cards = screen.getAllByTestId('animal-card');
    expect(cards.length).toBe(5);
  });
});
