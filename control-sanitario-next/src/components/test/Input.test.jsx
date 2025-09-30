import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Input from '../ui/Input'

describe('Input Component', () => {
  describe('Renderizado', () => {
    test('renderiza correctamente', () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
    })

    test('aplica clases CSS por defecto', () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('w-full', 'px-3', 'py-2', 'border', 'rounded-lg')
    })

    test('aplica clases CSS personalizadas', () => {
      render(<Input className="custom-input" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('custom-input', 'w-full')
    })

    test('renderiza con placeholder', () => {
      render(<Input placeholder="Enter text here" />)
      const input = screen.getByPlaceholderText('Enter text here')
      expect(input).toBeInTheDocument()
    })

    test('renderiza con valor inicial', () => {
      render(<Input value="Initial value" readOnly />)
      const input = screen.getByDisplayValue('Initial value')
      expect(input).toBeInTheDocument()
    })
  })

  describe('Tipos de Input', () => {
    test('renderiza como input de texto por defecto', () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      // Verificar que el input existe y no es de otro tipo específico
      expect(input).toBeInTheDocument()
      expect(input.tagName).toBe('INPUT')
    })

    test('renderiza como input de email', () => {
      render(<Input type="email" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'email')
    })

    test('renderiza como input de password', () => {
      render(<Input type="password" />)
      // Los inputs de password no tienen rol "textbox" por seguridad
      const input = document.querySelector('input[type="password"]')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'password')
    })

    test('renderiza como input numérico', () => {
      render(<Input type="number" />)
      const input = screen.getByRole('spinbutton')
      expect(input).toHaveAttribute('type', 'number')
    })
  })

  describe('Estados', () => {
    test('se puede deshabilitar', () => {
      render(<Input disabled />)
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
    })

    test('se puede hacer readonly', () => {
      render(<Input readOnly />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('readonly')
    })

    test('se puede hacer requerido', () => {
      render(<Input required />)
      const input = screen.getByRole('textbox')
      expect(input).toBeRequired()
    })
  })

  describe('Interacciones', () => {
    test('permite escribir texto', async () => {
      const user = userEvent.setup()
      render(<Input />)
      const input = screen.getByRole('textbox')
      
      await user.type(input, 'Hello World')
      expect(input).toHaveValue('Hello World')
    })

    test('ejecuta onChange cuando el valor cambia', async () => {
      const handleChange = jest.fn()
      const user = userEvent.setup()
      
      render(<Input onChange={handleChange} />)
      const input = screen.getByRole('textbox')
      
      await user.type(input, 'Test')
      expect(handleChange).toHaveBeenCalled()
    })

    test('ejecuta onFocus cuando recibe foco', async () => {
      const handleFocus = jest.fn()
      const user = userEvent.setup()
      
      render(<Input onFocus={handleFocus} />)
      const input = screen.getByRole('textbox')
      
      await user.click(input)
      expect(handleFocus).toHaveBeenCalledTimes(1)
    })

    test('ejecuta onBlur cuando pierde foco', async () => {
      const handleBlur = jest.fn()
      const user = userEvent.setup()
      
      render(
        <div>
          <Input onBlur={handleBlur} />
          <button>Other element</button>
        </div>
      )
      const input = screen.getByRole('textbox')
      const button = screen.getByRole('button')
      
      await user.click(input)
      await user.click(button)
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    test('no permite escribir cuando está deshabilitado', async () => {
      const user = userEvent.setup()
      render(<Input disabled />)
      const input = screen.getByRole('textbox')
      
      await user.type(input, 'Test text')
      expect(input).toHaveValue('')
    })
  })

  describe('Validaciones', () => {
    test('acepta un patrón de validación', () => {
      render(<Input pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('pattern', '[0-9]{3}-[0-9]{3}-[0-9]{4}')
    })

    test('acepta longitud mínima', () => {
      render(<Input minLength={5} />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('minlength', '5')
    })

    test('acepta longitud máxima', () => {
      render(<Input maxLength={20} />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('maxlength', '20')
    })
  })

  describe('Propiedades HTML', () => {
    test('pasa propiedades adicionales', () => {
      render(<Input data-testid="custom-input" aria-label="Custom Label" />)
      const input = screen.getByTestId('custom-input')
      expect(input).toHaveAttribute('aria-label', 'Custom Label')
    })

    test('maneja múltiples props HTML', () => {
      render(<Input id="test-input" name="testInput" title="Test Title" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('id', 'test-input')
      expect(input).toHaveAttribute('name', 'testInput')
      expect(input).toHaveAttribute('title', 'Test Title')
    })
  })

  describe('Accesibilidad', () => {
    test('soporta aria-label', () => {
      render(<Input aria-label="Search input" />)
      const input = screen.getByLabelText('Search input')
      expect(input).toBeInTheDocument()
    })

    test('soporta aria-describedby', () => {
      render(
        <div>
          <Input aria-describedby="input-help" />
          <div id="input-help">Help text</div>
        </div>
      )
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-describedby', 'input-help')
    })
  })

  describe('Casos de uso especiales', () => {
    test('maneja inputs controlados', async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState('')
        return (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            data-testid="controlled-input"
          />
        )
      }

      const user = userEvent.setup()
      render(<TestComponent />)
      const input = screen.getByTestId('controlled-input')
      
      await user.type(input, 'Controlled')
      expect(input).toHaveValue('Controlled')
    })

    test('maneja clear correctamente', async () => {
      const user = userEvent.setup()
      render(<Input defaultValue="Initial" />)
      const input = screen.getByRole('textbox')
      
      expect(input).toHaveValue('Initial')
      await user.clear(input)
      expect(input).toHaveValue('')
    })
  })
})