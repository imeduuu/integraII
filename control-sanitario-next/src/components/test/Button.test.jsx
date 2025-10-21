import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Button from '../ui/Button'

describe('Button Component', () => {
  describe('Renderizado', () => {
    test('renderiza correctamente con texto', () => {
      render(<Button>Test Button</Button>)
      expect(screen.getByRole('button', { name: /test button/i })).toBeInTheDocument()
    })

    test('aplica la variante primary por defecto', () => {
      render(<Button>Primary Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-blue-600', 'text-white')
    })

    test('aplica la variante secondary correctamente', () => {
      render(<Button variant="secondary">Secondary Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-gray-200', 'text-gray-800')
    })

    test('aplica clases CSS personalizadas', () => {
      render(<Button className="custom-class">Custom Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    test('mantiene las clases base', () => {
      render(<Button>Base Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-4', 'py-2', 'rounded-lg', 'font-semibold')
    })
  })

  describe('Estados', () => {
    test('se puede deshabilitar', () => {
      render(<Button disabled>Disabled Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    test('mantiene el atributo type', () => {
      render(<Button type="submit">Submit Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'submit')
    })
  })

  describe('Interacciones', () => {
    test('ejecuta onClick cuando se hace clic', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()
      
      render(<Button onClick={handleClick}>Clickable Button</Button>)
      const button = screen.getByRole('button')
      
      await user.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test('no ejecuta onClick cuando está deshabilitado', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()
      
      render(<Button onClick={handleClick} disabled>Disabled Button</Button>)
      const button = screen.getByRole('button')
      
      await user.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })

    test('maneja eventos de teclado', () => {
      const handleClick = jest.fn()
      
      render(<Button onClick={handleClick}>Keyboard Button</Button>)
      const button = screen.getByRole('button')
      
      // Simular Enter
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
      button.focus()
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
    })
  })

  describe('Accesibilidad', () => {
    test('tiene el rol button por defecto', () => {
      render(<Button>Accessible Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    test('soporta aria-label personalizado', () => {
      render(<Button aria-label="Custom Label">🔘</Button>)
      const button = screen.getByLabelText('Custom Label')
      expect(button).toBeInTheDocument()
    })

    test('es focuseable', async () => {
      const user = userEvent.setup()
      render(<Button>Focusable Button</Button>)
      const button = screen.getByRole('button')
      
      await user.tab()
      expect(button).toHaveFocus()
    })
  })

  describe('Contenido', () => {
    test('renderiza texto simple', () => {
      render(<Button>Simple Text</Button>)
      expect(screen.getByText('Simple Text')).toBeInTheDocument()
    })

    test('renderiza contenido JSX complejo', () => {
      render(
        <Button>
          <span>Complex</span> <strong>Content</strong>
        </Button>
      )
      expect(screen.getByText('Complex')).toBeInTheDocument()
      expect(screen.getByText('Content')).toBeInTheDocument()
    })
  })

  describe('Props HTML', () => {
    test('pasa propiedades adicionales', () => {
      render(<Button data-testid="test-btn" title="Test Title">Props Button</Button>)
      const button = screen.getByTestId('test-btn')
      expect(button).toHaveAttribute('title', 'Test Title')
    })
  })
})