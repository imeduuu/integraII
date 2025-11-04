// __tests__/AnimalDetail.test.tsx
import { render, screen } from '@testing-library/react';
import AnimalDetail from '../AnimalDetail';
import AnimalGallery from '../AnimalGallery';
import React from 'react';

// Mock de AnimalGallery para aislar el test
jest.mock('../AnimalGallery', () => ({
  __esModule: true,
  default: ({ images }: { images: string[] }) => (
    <div data-testid="animal-gallery">{images.join(',')}</div>
  ),
}));

describe('AnimalDetail', () => {
  const props = {
    name: 'Firulais',
    status: 'En tratamiento',
    location: 'Centro',
    age: '3 años',
    images: ['/img1.jpg', '/img2.jpg'],
  };

  test('renderiza el nombre, estado, ubicación y edad', () => {
    render(<AnimalDetail {...props} />);
    expect(screen.getByText('Firulais')).toBeInTheDocument();
    expect(screen.getByText(/Estado:/i)).toHaveTextContent('Estado: En tratamiento');
    expect(screen.getByText(/Ubicación:/i)).toHaveTextContent('Ubicación: Centro');
    expect(screen.getByText(/Edad:/i)).toHaveTextContent('Edad: 3 años');
  });

  test('renderiza AnimalGallery con las imágenes correctas', () => {
    render(<AnimalDetail {...props} />);
    const gallery = screen.getByTestId('animal-gallery');
    expect(gallery).toHaveTextContent('/img1.jpg,/img2.jpg');
  });

  test('no muestra edad si no se pasa la prop', () => {
    const { queryByText } = render(<AnimalDetail {...props} age={undefined} />);
    expect(queryByText(/Edad:/i)).toBeNull();
  });
});
