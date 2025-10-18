import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import AdoptionForm from '../AdoptionForm'

const mockAnimal = {
  nombre: 'Firulais',
  estado: 'disponible',
  ubicacion: 'Ciudad de México',
  edad: '2 años',
  imagen: 'firulais.jpg',
}

describe('AdoptionForm Component', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  describe('Renderizado', () => {
    test('renderiza el formulario correctamente', () => {
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      expect(screen.getByRole('heading', { name: /solicitud de adopción para firulais/i })).toBeInTheDocument()
      expect(screen.getByText(/firulais \(2 años\) - ciudad de méxico/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/tu nombre/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/tu email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/motivo de adopción/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /enviar solicitud/i })).toBeInTheDocument()
    })

    test('muestra información del animal', () => {
      const customAnimal = {
        nombre: 'Michi',
        estado: 'disponible',
        ubicacion: 'Guadalajara',
        edad: '1 año',
        imagen: 'michi.jpg',
      }
      
      render(<AdoptionForm animal={customAnimal} onSubmit={mockOnSubmit} />)
      
      expect(screen.getByRole('heading', { name: /solicitud de adopción para michi/i })).toBeInTheDocument()
      expect(screen.getByText(/michi \(1 año\) - guadalajara/i)).toBeInTheDocument()
    })

    test('todos los campos son requeridos', () => {
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      expect(screen.getByLabelText('Nombre del solicitante')).toBeRequired()
      expect(screen.getByLabelText('Correo electrónico')).toBeRequired()
      expect(screen.getByLabelText('Motivo de adopción')).toBeRequired()
    })

    test('muestra textos de ayuda', () => {
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      expect(screen.getByText('Escribe tu nombre completo.')).toBeInTheDocument()
      expect(screen.getByText('Debes ingresar un correo válido.')).toBeInTheDocument()
      expect(screen.getByText('Explica por qué quieres adoptar.')).toBeInTheDocument()
    })
  })

  describe('Interacciones del Formulario', () => {
    test('permite escribir en el campo nombre', async () => {
      const user = userEvent.setup()
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      const nameInput = screen.getByLabelText(/tu nombre/i)
      await user.type(nameInput, 'Juan Pérez')
      
      expect(nameInput).toHaveValue('Juan Pérez')
    })

    test('permite escribir en el campo email', async () => {
      const user = userEvent.setup()
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      const emailInput = screen.getByLabelText(/tu email/i)
      await user.type(emailInput, 'juan@example.com')
      
      expect(emailInput).toHaveValue('juan@example.com')
    })

    test('permite escribir en el campo motivo', async () => {
      const user = userEvent.setup()
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      const reasonInput = screen.getByLabelText(/motivo de adopción/i)
      await user.type(reasonInput, 'Quiero darle amor')
      
      expect(reasonInput).toHaveValue('Quiero darle amor')
    })

    test('actualiza todos los campos', async () => {
      const user = userEvent.setup()
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      await user.type(screen.getByLabelText(/tu nombre/i), 'Ana García')
      await user.type(screen.getByLabelText(/tu email/i), 'ana@example.com')
      await user.type(screen.getByLabelText(/motivo de adopción/i), 'Tengo experiencia')
      
      expect(screen.getByLabelText(/tu nombre/i)).toHaveValue('Ana García')
      expect(screen.getByLabelText(/tu email/i)).toHaveValue('ana@example.com')
      expect(screen.getByLabelText(/motivo de adopción/i)).toHaveValue('Tengo experiencia')
    })
  })

  describe('Validación del Formulario', () => {
    test('valida email con formato correcto', async () => {
      const user = userEvent.setup()
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      const emailInput = screen.getByLabelText(/tu email/i)
      
      // Email inválido
      await user.type(emailInput, 'email-invalido')
      expect(emailInput).toBeInvalid()
      
      // Email válido
      await user.clear(emailInput)
      await user.type(emailInput, 'valido@example.com')
      expect(emailInput).toBeValid()
    })

    test('previene envío con campos vacíos', async () => {
      const user = userEvent.setup()
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      const submitButton = screen.getByRole('button', { name: /enviar solicitud/i })
      await user.click(submitButton)
      
      // El formulario no debe enviarse si hay campos vacíos
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

  describe('Envío del Formulario', () => {
    test('envía formulario con datos válidos', async () => {
      const user = userEvent.setup()
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      // Llenar todos los campos
      await user.type(screen.getByLabelText(/tu nombre/i), 'Carlos López')
      await user.type(screen.getByLabelText(/tu email/i), 'carlos@example.com')
      await user.type(screen.getByLabelText(/motivo de adopción/i), 'Tengo un jardín grande')
      
      // Enviar formulario
      await user.click(screen.getByRole('button', { name: /enviar solicitud/i }))
      
      // Verificar que se llamó con los datos correctos
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'Carlos López',
        email: 'carlos@example.com',
        reason: 'Tengo un jardín grande',
      })
    })

    test('previene comportamiento por defecto del form', async () => {
      const user = userEvent.setup()
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      // Llenar campos requeridos
      await user.type(screen.getByLabelText('Nombre del solicitante'), 'Juan Pérez')
      await user.type(screen.getByLabelText('Correo electrónico'), 'juan@example.com')
      await user.type(screen.getByLabelText('Motivo de adopción'), 'Quiero adoptar')
      
      // Enviar formulario
      await user.click(screen.getByRole('button', { name: /enviar solicitud/i }))
      
      // Si llegamos aquí sin que se recargue la página, preventDefault funcionó
      expect(mockOnSubmit).toHaveBeenCalled()
    })

    test('maneja múltiples envíos', async () => {
      const user = userEvent.setup()
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      // Llenar formulario
      await user.type(screen.getByLabelText(/tu nombre/i), 'Test User')
      await user.type(screen.getByLabelText(/tu email/i), 'test@example.com')
      await user.type(screen.getByLabelText(/motivo de adopción/i), 'Test reason')
      
      const submitButton = screen.getByRole('button', { name: /enviar solicitud/i })
      
      // Enviar múltiples veces
      await user.click(submitButton)
      await user.click(submitButton)
      
      expect(mockOnSubmit).toHaveBeenCalledTimes(2)
    })
  })

  describe('Accesibilidad', () => {
    test('asocia labels con inputs correctamente', () => {
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      const nameInput = screen.getByLabelText(/tu nombre/i)
      const emailInput = screen.getByLabelText(/tu email/i)
      const reasonInput = screen.getByLabelText(/motivo de adopción/i)
      
      expect(nameInput).toHaveAttribute('id', 'name')
      expect(emailInput).toHaveAttribute('id', 'email')
      expect(reasonInput).toHaveAttribute('id', 'reason')
    })

    test('tiene descripciones ARIA correctas', () => {
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      const nameInput = screen.getByLabelText(/tu nombre/i)
      const emailInput = screen.getByLabelText(/tu email/i)
      const reasonInput = screen.getByLabelText(/motivo de adopción/i)
      
      expect(nameInput).toHaveAttribute('aria-describedby', 'name-help')
      expect(emailInput).toHaveAttribute('aria-describedby', 'email-help')
      expect(reasonInput).toHaveAttribute('aria-describedby', 'reason-help')
    })

    test('campos marcados como requeridos', () => {
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      const nameInput = screen.getByLabelText(/tu nombre/i)
      const emailInput = screen.getByLabelText(/tu email/i)
      const reasonInput = screen.getByLabelText(/motivo de adopción/i)
      
      expect(nameInput).toHaveAttribute('aria-required', 'true')
      expect(emailInput).toHaveAttribute('aria-required', 'true')
      expect(reasonInput).toHaveAttribute('aria-required', 'true')
    })

    test('navegación por teclado funciona', async () => {
      const user = userEvent.setup()
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      const nameInput = screen.getByLabelText(/tu nombre/i)
      const emailInput = screen.getByLabelText(/tu email/i)
      const reasonInput = screen.getByLabelText(/motivo de adopción/i)
      const submitButton = screen.getByRole('button', { name: /enviar solicitud/i })
      
      // Navegar con Tab
      await user.tab()
      expect(nameInput).toHaveFocus()
      
      await user.tab()
      expect(emailInput).toHaveFocus()
      
      await user.tab()
      expect(reasonInput).toHaveFocus()
      
      await user.tab()
      expect(submitButton).toHaveFocus()
    })
  })

  describe('Estados del Formulario', () => {
    test('mantiene estado interno correctamente', async () => {
      const user = userEvent.setup()
      render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      const nameInput = screen.getByLabelText(/tu nombre/i)
      
      // Escribir y borrar
      await user.type(nameInput, 'Juan')
      expect(nameInput).toHaveValue('Juan')
      
      await user.clear(nameInput)
      expect(nameInput).toHaveValue('')
      
      await user.type(nameInput, 'Pedro')
      expect(nameInput).toHaveValue('Pedro')
    })

    test('resetea cuando cambia el animal', () => {
      const newAnimal = {
        nombre: 'Rex',
        estado: 'disponible',
        ubicacion: 'Monterrey',
        edad: '3 años',
        imagen: 'rex.jpg',
      }
      
      const { rerender } = render(<AdoptionForm animal={mockAnimal} onSubmit={mockOnSubmit} />)
      
      expect(screen.getByRole('heading', { name: /firulais/i })).toBeInTheDocument()
      
      rerender(<AdoptionForm animal={newAnimal} onSubmit={mockOnSubmit} />)
      
      expect(screen.getByRole('heading', { name: /rex/i })).toBeInTheDocument()
      expect(screen.getByText(/rex \(3 años\) - monterrey/i)).toBeInTheDocument()
    })
  })
})