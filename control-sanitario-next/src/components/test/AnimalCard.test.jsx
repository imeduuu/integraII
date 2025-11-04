// __tests__/AnimalCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import AnimalCard from '../components/AnimalCard';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';

// Mock de useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock de next/image para evitar errores en tests
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

describe('AnimalCard', () => {
  const pushMock = jest.fn();
  beforeEach(() => {
    useRouter.mockReturnValue({ push: pushMock });
  });

  const props = {
    nombre: 'Fido',
    estado_general: 'Disponible',
    zona: 'Santiago',
    age: '2 años',
    images: ['test-image.jpg'],
    animalId: '123',
  };

  test('renderiza nombre, estado, zona y edad', () => {
    render(<AnimalCard {...props} />);
    expect(screen.getByText('Fido')).toBeInTheDocument();
    expect(screen.getByText(/Estado:/i)).toHaveTextContent('Estado: Disponible');
    expect(screen.getByText(/Ubicación:/i)).toHaveTextContent('Ubicación: Santiago');
    expect(screen.getByText(/Edad:/i)).toHaveTextContent('Edad: 2 años');
  });

  test('usa la imagen correcta', () => {
    render(<AnimalCard {...props} />);
    const img = screen.getByAltText('Fido');
    expect(img.src).toContain('test-image.jpg');
  });

  test('click en la imagen hace push al detalle', () => {
    render(<AnimalCard {...props} />);
    const img = screen.getByAltText('Fido');
    const imgDiv = img.parentElement;
    if (!imgDiv) {
      throw new Error('Image wrapper not found');
    }
    fireEvent.click(imgDiv);
    expect(pushMock).toHaveBeenCalledWith('/animals/123');
  });

  test('click en botón Adoptar hace push a adopción', () => {
    render(<AnimalCard {...props} />);
    const btn = screen.getByText(/Adoptar/i);
    fireEvent.click(btn);
    expect(pushMock).toHaveBeenCalledWith('/adopcion');
  });

  test('renderiza CommentSection', () => {
    render(<AnimalCard {...props} />);
    expect(screen.getByText(/Comentarios/i)).toBeInTheDocument(); // suponiendo que CommentSection renderiza algo con "Comentarios"
  });
});
