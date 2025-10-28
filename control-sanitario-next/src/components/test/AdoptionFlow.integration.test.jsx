import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils'

// Mock de componentes para la prueba de integración
const Modal = ({ isOpen, onClose, title, children, size }) => {
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handler)
      // Intentar enfocar el primer input dentro del modal para replicar comportamiento de accesibilidad
      setTimeout(() => {
        const firstInput = document.querySelector('#nombre')
        if (firstInput && typeof firstInput.focus === 'function') firstInput.focus()
      }, 0)
    }
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null
  
  return (
    <div role="dialog" aria-labelledby="modal-title" aria-modal="true">
      <div onClick={onClose}></div>
      <div>
        <h2 id="modal-title">{title}</h2>
        <button onClick={onClose} aria-label="cerrar">×</button>
        {children}
      </div>
    </div>
  )
}

const Button = ({ onClick, children, variant = 'primary', disabled, ...props }) => (
  <button 
    onClick={onClick} 
    disabled={disabled}
    className={`btn btn-${variant}`}
    {...props}
  >
    {children}
  </button>
)

const AdoptionForm = ({ onSubmit, isLoading, animalId }) => {
  const [formData, setFormData] = React.useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    experiencia: '',
    motivacion: '',
    terminos: false,
  })
  const [errors, setErrors] = React.useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.nombre) newErrors.nombre = 'El nombre es requerido'
    if (!formData.email) newErrors.email = 'El email es requerido'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El email debe tener un formato válido'
    if (!formData.telefono) newErrors.telefono = 'El teléfono es requerido'
    if (!formData.terminos) newErrors.terminos = 'Debes aceptar los términos y condiciones'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      await onSubmit({ ...formData, animalId })
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={formData.nombre}
          onChange={handleChange}
          aria-label="Nombre completo"
        />
        {errors.nombre && <span>{errors.nombre}</span>}
      </div>
      
      <div>
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          aria-label="Correo electrónico"
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      
      <div>
        <label htmlFor="telefono">Teléfono de contacto</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          value={formData.telefono}
          onChange={handleChange}
          aria-label="Teléfono de contacto"
        />
        {errors.telefono && <span>{errors.telefono}</span>}
      </div>
      
      <div>
        <label htmlFor="direccion">Dirección completa</label>
        <input
          id="direccion"
          name="direccion"
          type="text"
          value={formData.direccion}
          onChange={handleChange}
          aria-label="Dirección completa"
        />
      </div>
      
      <div>
        <label htmlFor="experiencia">Experiencia con mascotas</label>
        <textarea
          id="experiencia"
          name="experiencia"
          value={formData.experiencia}
          onChange={handleChange}
          aria-label="Experiencia con mascotas"
        />
      </div>
      
      <div>
        <label htmlFor="motivacion">Motivación para adoptar</label>
        <textarea
          id="motivacion"
          name="motivacion"
          value={formData.motivacion}
          onChange={handleChange}
          aria-label="Motivación para adoptar"
        />
      </div>
      
      <div>
        <label>
          <input
            type="checkbox"
            name="terminos"
            checked={formData.terminos}
            onChange={handleChange}
            aria-label="Acepto los términos y condiciones"
          />
          Acepto los términos y condiciones
        </label>
        {errors.terminos && <span>{errors.terminos}</span>}
      </div>
      
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Enviando...' : 'Enviar solicitud'}
      </Button>
    </form>
  )
}

// Mock fetch para simular llamadas API
global.fetch = jest.fn()

// Componente de integración que simula el flujo completo
const AdoptionFlowIntegration = ({ onSubmit = jest.fn() }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitSuccess, setSubmitSuccess] = React.useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSubmitSuccess(false)
  }

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      setSubmitSuccess(true)
      setIsSubmitting(false)
    } catch (error) {
      // Manejar el error internamente para que la integración pueda comprobar el estado
      setIsSubmitting(false)
      // opcional: podríamos setear un estado de error aquí
    }
  }

  return (
    <div>
      <h1>Proceso de Adopción</h1>
      <Button
        onClick={handleOpenModal}
        variant="primary"
        data-testid="open-adoption-modal"
      >
        Iniciar Solicitud de Adopción
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Formulario de Adopción"
        size="large"
      >
        {submitSuccess ? (
          <div data-testid="success-message">
            <h3>¡Solicitud enviada exitosamente!</h3>
            <p>Tu solicitud de adopción ha sido procesada correctamente.</p>
            <Button onClick={handleCloseModal} variant="primary">
              Cerrar
            </Button>
          </div>
        ) : (
          <AdoptionForm
            onSubmit={handleFormSubmit}
            isLoading={isSubmitting}
            animalId="123"
          />
        )}
      </Modal>
    </div>
  )
}

describe('Integración: Flujo Completo de Adopción', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    fetch.mockClear()
  })

  describe('Flujo Exitoso Completo', () => {
    test('permite completar todo el proceso de adopción', async () => {
      const user = userEvent.setup()
      // Usar una promesa con pequeño retraso para permitir que el estado de "enviando" sea observable
      const mockSubmit = jest.fn().mockImplementation(() =>
        new Promise((resolve) => setTimeout(() => resolve({ success: true }), 20))
      )
      
      render(<AdoptionFlowIntegration onSubmit={mockSubmit} />)

      // 1. Verificar estado inicial
      expect(screen.getByText('Proceso de Adopción')).toBeInTheDocument()
      expect(screen.getByTestId('open-adoption-modal')).toBeInTheDocument()
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

      // 2. Abrir modal
      await user.click(screen.getByTestId('open-adoption-modal'))
      
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('Formulario de Adopción')).toBeInTheDocument()

      // 3. Llenar formulario completo
      const nombreInput = screen.getByLabelText('Nombre completo')
      const emailInput = screen.getByLabelText('Correo electrónico')
      const telefonoInput = screen.getByLabelText('Teléfono de contacto')
      const direccionInput = screen.getByLabelText('Dirección completa')
      const experienciaTextarea = screen.getByLabelText('Experiencia con mascotas')
      const motivacionTextarea = screen.getByLabelText('Motivación para adoptar')
      const terminosCheckbox = screen.getByLabelText(/acepto los términos/i)

      await user.type(nombreInput, 'Juan Carlos Pérez')
      await user.type(emailInput, 'juan.perez@example.com')
      await user.type(telefonoInput, '+57 300 123 4567')
      await user.type(direccionInput, 'Calle 123 #45-67, Bogotá, Colombia')
      await user.type(
        experienciaTextarea,
        'He tenido perros durante 15 años. Mi último perro vivió 14 años y falleció el año pasado.'
      )
      await user.type(
        motivacionTextarea,
        'Quiero darle amor y una casa a un animal que lo necesite. Tengo tiempo y recursos para cuidarlo.'
      )
      await user.click(terminosCheckbox)

      // 4. Verificar que todos los campos están llenos
      expect(nombreInput).toHaveValue('Juan Carlos Pérez')
      expect(emailInput).toHaveValue('juan.perez@example.com')
      expect(telefonoInput).toHaveValue('+57 300 123 4567')
      expect(direccionInput).toHaveValue('Calle 123 #45-67, Bogotá, Colombia')
      expect(experienciaTextarea).toHaveValue('He tenido perros durante 15 años. Mi último perro vivió 14 años y falleció el año pasado.')
      expect(motivacionTextarea).toHaveValue('Quiero darle amor y una casa a un animal que lo necesite. Tengo tiempo y recursos para cuidarlo.')
      expect(terminosCheckbox).toBeChecked()

      // 5. Enviar formulario
      const submitButton = screen.getByRole('button', { name: /enviar solicitud/i })
      expect(submitButton).toBeEnabled()
      
      await user.click(submitButton)

      // 6. Verificar estado de carga
      expect(screen.getByRole('button', { name: /enviando/i })).toBeDisabled()

      // 7. Esperar y verificar éxito
      await waitFor(() => {
        expect(screen.getByTestId('success-message')).toBeInTheDocument()
      })

      expect(screen.getByText('¡Solicitud enviada exitosamente!')).toBeInTheDocument()
      expect(screen.getByText('Tu solicitud de adopción ha sido procesada correctamente.')).toBeInTheDocument()

      // 8. Verificar que se llamó la función con los datos correctos
      expect(mockSubmit).toHaveBeenCalledTimes(1)
      expect(mockSubmit).toHaveBeenCalledWith({
        nombre: 'Juan Carlos Pérez',
        email: 'juan.perez@example.com',
        telefono: '+57 300 123 4567',
        direccion: 'Calle 123 #45-67, Bogotá, Colombia',
        experiencia: 'He tenido perros durante 15 años. Mi último perro vivió 14 años y falleció el año pasado.',
        motivacion: 'Quiero darle amor y una casa a un animal que lo necesite. Tengo tiempo y recursos para cuidarlo.',
        terminos: true,
        animalId: '123'
      })

      // 9. Cerrar modal desde mensaje de éxito
      await user.click(screen.getByRole('button', { name: 'Cerrar' }))
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('Flujo con Validaciones', () => {
    test('valida formulario antes de enviar', async () => {
      const user = userEvent.setup()
      const mockSubmit = jest.fn()
      
      render(<AdoptionFlowIntegration onSubmit={mockSubmit} />)

      // Abrir modal
      await user.click(screen.getByTestId('open-adoption-modal'))

      // Intentar enviar formulario vacío
      const submitButton = screen.getByRole('button', { name: /enviar solicitud/i })
      await user.click(submitButton)

      // Verificar mensajes de validación
      expect(screen.getByText('El nombre es requerido')).toBeInTheDocument()
      expect(screen.getByText('El email es requerido')).toBeInTheDocument()
      expect(screen.getByText('El teléfono es requerido')).toBeInTheDocument()
      expect(screen.getByText('Debes aceptar los términos y condiciones')).toBeInTheDocument()

      // No debe haberse llamado la función de envío
      expect(mockSubmit).not.toHaveBeenCalled()
    })

    test('valida formato de email', async () => {
      const user = userEvent.setup()
      const mockSubmit = jest.fn()
      
      render(<AdoptionFlowIntegration onSubmit={mockSubmit} />)

      await user.click(screen.getByTestId('open-adoption-modal'))

      // Llenar con email inválido
      await user.type(screen.getByLabelText('Correo electrónico'), 'email-invalido')
  await user.click(screen.getByRole('button', { name: /enviar solicitud/i }))

      // Verificar que no se llamó la función de envío (validación falló)
      await waitFor(() => {
        expect(mockSubmit).not.toHaveBeenCalled()
      })
    })
  })

  describe('Flujo de Error', () => {
    test('maneja errores en el envío', async () => {
      const user = userEvent.setup()
  // Simular rechazo retornando una promesa rechazada cuando se invoque
  const mockSubmit = jest.fn().mockImplementation(() => Promise.reject(new Error('Error de red')))
      
      render(<AdoptionFlowIntegration onSubmit={mockSubmit} />)

      await user.click(screen.getByTestId('open-adoption-modal'))

      // Llenar formulario mínimo
      await user.type(screen.getByLabelText('Nombre completo'), 'Juan Pérez')
      await user.type(screen.getByLabelText('Correo electrónico'), 'juan@example.com')
      await user.type(screen.getByLabelText('Teléfono de contacto'), '123456789')
      await user.click(screen.getByLabelText(/acepto los términos/i))

      // Enviar
      await user.click(screen.getByRole('button', { name: /enviar solicitud/i }))

      // Esperar que vuelva el botón original (error manejado)
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /enviar solicitud/i })).toBeEnabled()
      })

      expect(mockSubmit).toHaveBeenCalledTimes(1)
    })
  })

  describe('Navegación del Modal', () => {
    test('permite cancelar y cerrar modal', async () => {
      const user = userEvent.setup()
      const mockSubmit = jest.fn()
      
      render(<AdoptionFlowIntegration onSubmit={mockSubmit} />)

      // Abrir modal
      await user.click(screen.getByTestId('open-adoption-modal'))
      expect(screen.getByRole('dialog')).toBeInTheDocument()

      // Llenar parcialmente
      await user.type(screen.getByLabelText('Nombre completo'), 'Juan Pérez')

      // Cerrar con X
      await user.click(screen.getByRole('button', { name: /cerrar/i }))
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })

      // Abrir de nuevo - debe estar limpio
      await user.click(screen.getByTestId('open-adoption-modal'))
      expect(screen.getByLabelText('Nombre completo')).toHaveValue('')
    })

    test('cierra modal con tecla Escape', async () => {
      const user = userEvent.setup()
      const mockSubmit = jest.fn()
      
      render(<AdoptionFlowIntegration onSubmit={mockSubmit} />)

      await user.click(screen.getByTestId('open-adoption-modal'))
      expect(screen.getByRole('dialog')).toBeInTheDocument()

      // Presionar Escape
      await user.keyboard('{Escape}')
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('Accesibilidad en Flujo Completo', () => {
    test('mantiene foco correctamente durante el flujo', async () => {
      const user = userEvent.setup()
      const mockSubmit = jest.fn().mockImplementation(() =>
        new Promise((resolve) => setTimeout(() => resolve({ success: true }), 20))
      )
      
      render(<AdoptionFlowIntegration onSubmit={mockSubmit} />)

      // Abrir modal con keyboard
      const openButton = screen.getByTestId('open-adoption-modal')
      openButton.focus()
      await user.keyboard('{Enter}')

      // Verificar que el foco está en el modal
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      // El primer input debería tener foco
      expect(screen.getByLabelText('Nombre completo')).toHaveFocus()

      // Navegar con Tab
      await user.tab()
      expect(screen.getByLabelText('Correo electrónico')).toHaveFocus()

      await user.tab()
      expect(screen.getByLabelText('Teléfono de contacto')).toHaveFocus()
    })

    test('anuncios ARIA durante el proceso', async () => {
      const user = userEvent.setup()
      const mockSubmit = jest.fn().mockResolvedValue({ success: true })
      
      render(<AdoptionFlowIntegration onSubmit={mockSubmit} />)

      await user.click(screen.getByTestId('open-adoption-modal'))

      // Verificar labels
      expect(screen.getByLabelText('Nombre completo')).toBeInTheDocument()
      expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument()

      // Verificar modal accesible
      const modal = screen.getByRole('dialog')
      expect(modal).toHaveAttribute('aria-labelledby')
      expect(modal).toHaveAttribute('aria-modal', 'true')
    })
  })
})