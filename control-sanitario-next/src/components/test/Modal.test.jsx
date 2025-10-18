import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Modal from '../ui/Modal'

describe('Modal Component', () => {
  const mockOnClose = jest.fn()
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    children: <div>Modal Content</div>,
  }

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  describe('Renderizado', () => {
    test('renderiza cuando isOpen es true', () => {
      render(<Modal {...defaultProps} />)
      expect(screen.getByText('Modal Content')).toBeInTheDocument()
    })

    test('no renderiza cuando isOpen es false', () => {
      render(<Modal {...defaultProps} isOpen={false} />)
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
    })

    test('renderiza el botón de cerrar', () => {
      render(<Modal {...defaultProps} />)
      const closeButton = screen.getByRole('button', { name: /✕/i })
      expect(closeButton).toBeInTheDocument()
    })

    test('aplica las clases CSS correctas', () => {
      const { container } = render(<Modal {...defaultProps} />)
      const modalContainer = container.querySelector('.fixed.inset-0')
      expect(modalContainer).toHaveClass('fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'z-50')
    })

    test('renderiza el backdrop', () => {
      const { container } = render(<Modal {...defaultProps} />)
      const backdrop = container.querySelector('.bg-black.bg-opacity-50')
      expect(backdrop).toBeInTheDocument()
    })
  })

  describe('Contenido', () => {
    test('renderiza children correctamente', () => {
      const customContent = (
        <div>
          <h2>Custom Title</h2>
          <p>Custom description</p>
        </div>
      )
      
      render(<Modal isOpen={true} onClose={mockOnClose}>{customContent}</Modal>)
      
      expect(screen.getByText('Custom Title')).toBeInTheDocument()
      expect(screen.getByText('Custom description')).toBeInTheDocument()
    })

    test('renderiza contenido JSX complejo', () => {
      const complexContent = (
        <form>
          <label htmlFor="test-input">Test Input:</label>
          <input id="test-input" type="text" />
          <button type="submit">Submit</button>
        </form>
      )
      
      render(<Modal isOpen={true} onClose={mockOnClose}>{complexContent}</Modal>)
      
      expect(screen.getByLabelText('Test Input:')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    })
  })

  describe('Interacciones de Cerrar', () => {
    test('ejecuta onClose al hacer clic en el botón X', async () => {
      const user = userEvent.setup()
      render(<Modal {...defaultProps} />)
      
      const closeButton = screen.getByRole('button', { name: /✕/i })
      await user.click(closeButton)
      
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    test('ejecuta onClose al hacer clic en el backdrop', async () => {
      const user = userEvent.setup()
      const { container } = render(<Modal {...defaultProps} />)
      
      const backdrop = container.querySelector('.bg-black.bg-opacity-50')
      await user.click(backdrop)
      
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    test('no ejecuta onClose al hacer clic en el contenido', async () => {
      const user = userEvent.setup()
      const { container } = render(<Modal {...defaultProps} />)
      
      const modalContent = container.querySelector('.relative.bg-white')
      await user.click(modalContent)
      
      expect(mockOnClose).not.toHaveBeenCalled()
    })

    test('no interfiere con clics internos', async () => {
      const buttonClick = jest.fn()
      const user = userEvent.setup()
      
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <button onClick={buttonClick}>Internal Button</button>
        </Modal>
      )
      
      const internalButton = screen.getByRole('button', { name: /internal button/i })
      await user.click(internalButton)
      
      expect(buttonClick).toHaveBeenCalledTimes(1)
      expect(mockOnClose).not.toHaveBeenCalled()
    })
  })

  describe('Comportamiento de Estado', () => {
    test('cambia de cerrado a abierto', () => {
      const { rerender } = render(<Modal {...defaultProps} isOpen={false} />)
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
      
      rerender(<Modal {...defaultProps} isOpen={true} />)
      expect(screen.getByText('Modal Content')).toBeInTheDocument()
    })

    test('cambia de abierto a cerrado', () => {
      const { rerender } = render(<Modal {...defaultProps} isOpen={true} />)
      expect(screen.getByText('Modal Content')).toBeInTheDocument()
      
      rerender(<Modal {...defaultProps} isOpen={false} />)
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
    })
  })

  describe('Focus y Teclado', () => {
    test('el botón de cerrar es focuseable', async () => {
      const user = userEvent.setup()
      render(<Modal {...defaultProps} />)
      
      const closeButton = screen.getByRole('button', { name: /✕/i })
      await user.tab()
      
      expect(closeButton).toHaveFocus()
    })

    test('elementos internos son focuseables', async () => {
      const user = userEvent.setup()
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <input type="text" data-testid="modal-input" />
          <button data-testid="modal-button">Button</button>
        </Modal>
      )
      
      const input = screen.getByTestId('modal-input')
      await user.click(input)
      expect(input).toHaveFocus()
    })

    test('botón X responde a Enter', async () => {
      const user = userEvent.setup()
      render(<Modal {...defaultProps} />)
      
      const closeButton = screen.getByRole('button', { name: /✕/i })
      closeButton.focus()
      await user.keyboard('{Enter}')
      
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Casos Edge', () => {
    test('maneja múltiples llamadas a onClose', async () => {
      const user = userEvent.setup()
      render(<Modal {...defaultProps} />)
      
      const closeButton = screen.getByRole('button', { name: /✕/i })
      await user.click(closeButton)
      await user.click(closeButton)
      
      expect(mockOnClose).toHaveBeenCalledTimes(2)
    })

    test('maneja contenido null', () => {
      expect(() => {
        render(<Modal isOpen={true} onClose={mockOnClose} children={null} />)
      }).not.toThrow()
    })
  })

  describe('Accesibilidad', () => {
    test('tiene el z-index correcto', () => {
      const { container } = render(<Modal {...defaultProps} />)
      const modalContainer = container.querySelector('.fixed.inset-0')
      expect(modalContainer).toHaveClass('z-50')
      
      const modalContent = container.querySelector('.relative.bg-white')
      expect(modalContent).toHaveClass('z-10')
    })

    test('mantiene orden de tabs', async () => {
      const user = userEvent.setup()
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <input data-testid="input-1" />
          <button data-testid="button-1">Button</button>
        </Modal>
      )
      
      // Tab navigation
      await user.tab()
      expect(screen.getByRole('button', { name: /✕/i })).toHaveFocus()
      
      await user.tab()
      expect(screen.getByTestId('input-1')).toHaveFocus()
    })
  })
})