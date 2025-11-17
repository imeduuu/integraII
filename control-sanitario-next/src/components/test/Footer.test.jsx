// __tests__/Footer.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../Footer';
import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Icon from '../ui/Icon';

// Mock de componentes UI
jest.mock('../ui/Modal', () => ({ isOpen, children, onClose }) => (
  <div data-testid="modal" style={{ display: isOpen ? 'block' : 'none' }}>
    <button onClick={onClose}>Cerrar</button>
    {children}
  </div>
));

jest.mock('../ui/Button', () => (props) => <button {...props}>{props.children}</button>);
jest.mock('../ui/Input', () => (props) => <input {...props} />);
jest.mock('../ui/Icon', () => (props) => <span data-testid={props.name}>{props.name}</span>);

describe('Footer', () => {
  test('renderiza correctamente el footer', () => {
    render(<Footer />);
    expect(screen.getByText('Huella Segura')).toBeInTheDocument();
    expect(screen.getByText('Quiénes Somos')).toBeInTheDocument();
    expect(screen.getByText('+56 9 1234 5678')).toBeInTheDocument();
    expect(screen.getByText('contacto@huellasegura.cl')).toBeInTheDocument();
  });

  test('abre modal al hacer click en correo', () => {
    render(<Footer />);
    const correo = screen.getByText('contacto@huellasegura.cl');
    fireEvent.click(correo);
    const modal = screen.getByTestId('modal');
    expect(modal).toHaveStyle('display: block');
    expect(screen.getByText('Envíanos tu Feedback')).toBeInTheDocument();
  });

  test('cierra modal al hacer click en cancelar', () => {
    render(<Footer />);
    const correo = screen.getByText('contacto@huellasegura.cl');
    fireEvent.click(correo);
    const cancelar = screen.getByText('Cancelar');
    fireEvent.click(cancelar);
    const modal = screen.getByTestId('modal');
    expect(modal).toHaveStyle('display: none');
  });

  test('renderiza iconos de redes sociales', () => {
    render(<Footer />);
    expect(screen.getByTestId('facebook')).toBeInTheDocument();
    expect(screen.getByTestId('twitter')).toBeInTheDocument();
    expect(screen.getByTestId('instagram')).toBeInTheDocument();
  });
});
