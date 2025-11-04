// __tests__/AnimalGallery.test.tsx
import { render, screen } from '@testing-library/react';
import AnimalGallery from '../AnimalGallery';
import React from 'react';

// Mock de react-image-gallery
jest.mock('react-image-gallery', () => {
  return ({ items }: { items: { original: string; thumbnail: string }[] }) => (
    <div data-testid="mock-gallery">
      {items.map((i) => (
        <span key={i.original}>{i.original}</span>
      ))}
    </div>
  );
});

describe('AnimalGallery', () => {
  const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg'];

  test('renderiza contenedor de galería', () => {
    render(<AnimalGallery images={images} />);
    const gallery = screen.getByTestId('mock-gallery');
    expect(gallery).toBeInTheDocument();
  });

  test('renderiza todas las imágenes pasadas en props', () => {
    render(<AnimalGallery images={images} />);
    images.forEach((img) => {
      expect(screen.getByText(img)).toBeInTheDocument();
    });
  });

  test('no rompe si recibe array vacío', () => {
    render(<AnimalGallery images={[]} />);
    const gallery = screen.getByTestId('mock-gallery');
    expect(gallery).toBeInTheDocument();
    expect(gallery).toBeEmptyDOMElement();
  });
});
