// __tests__/Navbar.test.tsx
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import React from 'react';
import { userMock } from '../context/userMock';
import '@testing-library/jest-dom';

// Mock de next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
  }),
}));

// Mock de Tooltip para simplificar
jest.mock('../components/Tooltip', () => ({ text, children }) => (
  <div data-testid="tooltip" title={text}>{children}</div>
));

describe('Navbar', () => {
  afterEach(() => {
    jest.resetModules(); // resetea los módulos para cambiar userMock.role
  });

  test('renderiza links para rol admin', () => {
    userMock.role = 'admin';
    render(<Navbar />);
    expect(screen.getByText('Panel Admin')).toBeInTheDocument();
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
    expect(screen.getByText('Campañas')).toBeInTheDocument();
    expect(screen.getByText('Bandeja de Entrada')).toBeInTheDocument();
  });

  test('renderiza links para rol user', () => {
    userMock.role = 'user';
    render(<Navbar />);
    expect(screen.getByText('Perfil')).toBeInTheDocument();
    expect(screen.getByText('Adopciones')).toBeInTheDocument();
    expect(screen.getByText('Reportar')).toBeInTheDocument();
    expect(screen.getByText('Animales')).toBeInTheDocument();
    expect(screen.getByText('Donaciones')).toBeInTheDocument();
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
    expect(screen.getByText('Organizaciones')).toBeInTheDocument();
    expect(screen.getByText('FAQs')).toBeInTheDocument();
  });

  test('renderiza links para rol org', () => {
    userMock.role = 'org';
    render(<Navbar />);
    expect(screen.getByText('Campañas')).toBeInTheDocument();
    expect(screen.getByText('Publicar Adopción')).toBeInTheDocument();
    expect(screen.getByText('Estadísticas')).toBeInTheDocument();
  });

  test('muestra tooltips', () => {
    userMock.role = 'user';
    render(<Navbar />);
    const tooltips = screen.getAllByTestId('tooltip');
    expect(tooltips.length).toBeGreaterThan(0);
    // El primer tooltip debería ser "Ir al inicio 🏠"
    expect(tooltips[0]).toHaveAttribute('title', 'Ir al inicio 🏠');
  });

  test('renderiza imagen de perfil y link de perfil', () => {
    userMock.role = 'user';
    render(<Navbar />);
    const img = screen.getByAltText('Perfil');
    expect(img).toBeInTheDocument();
    expect(screen.getByText('Ver perfil')).toBeInTheDocument();
  });
});
