import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../Navbar';
import { userMock } from '../../context/userMock';

// El jest.setup.js ya provee un mock de useRouter con pathname='/'

describe('Navbar', () => {
  afterEach(() => {
    // Restaurar el rol por defecto tras cada test
    userMock.role = 'user';
  });

  test('renderiza enlaces base (Inicio, Mapa, Ver perfil, Test Orgs)', () => {
    render(<Navbar />);
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Mapa')).toBeInTheDocument();
    expect(screen.getByText('Ver perfil')).toBeInTheDocument();
    expect(screen.getByText('Test Orgs')).toBeInTheDocument();
  });

  test('resalta el enlace activo según pathname "/"', () => {
    render(<Navbar />);
    const inicio = screen.getByText('Inicio');
    // identity-obj-proxy mapea las clases CSS modules al nombre de la clave
    expect(inicio).toHaveClass('navLinkActive');
  });

  test('muestra enlaces para rol admin', () => {
    userMock.role = 'admin';
    render(<Navbar />);
    expect(screen.getByText('Panel Admin')).toBeInTheDocument();
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
    expect(screen.getByText('Campañas')).toBeInTheDocument();
    expect(screen.getByText('Bandeja de Entrada')).toBeInTheDocument();
  });

  test('muestra enlaces para rol user', () => {
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

  test('muestra enlaces para rol org', () => {
    userMock.role = 'org';
    render(<Navbar />);
    expect(screen.getByText('Campañas')).toBeInTheDocument();
    expect(screen.getByText('Publicar Adopción')).toBeInTheDocument();
    expect(screen.getByText('Estadísticas')).toBeInTheDocument();
  });

  test('toggle del menú hamburguesa cambia el contenedor de enlaces', () => {
    render(<Navbar />);
    const toggle = screen.getByRole('button', { name: /toggle menu/i });
    // Al iniciar en mobile, el contenedor no debe tener la clase "navbarLinksOpen"
    const linksContainer = document.querySelector('.navbarLinks');
    expect(linksContainer).toBeInTheDocument();
    expect(linksContainer).not.toHaveClass('navbarLinksOpen');

    fireEvent.click(toggle);
    expect(linksContainer).toHaveClass('navbarLinksOpen');

    fireEvent.click(toggle);
    expect(linksContainer).not.toHaveClass('navbarLinksOpen');
  });
});
