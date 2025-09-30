/**
 * Historias de Storybook para el componente Modal
 * 
 * Documentación y ejemplos visuales del componente Modal con 
 * diferentes contenidos, tamaños y casos de uso.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HiInformationCircle, HiExclamationCircle, HiCheckCircle, HiXCircle } from 'react-icons/hi';

import Modal from './Modal';
import Button from './Button';
import Input from './Input';

const meta = {
  title: 'UI Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Componente Modal reutilizable para mostrar contenido superpuesto. Incluye fondo oscuro, botón de cierre y manejo de eventos de teclado.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
      description: 'Controla si el modal está visible'
    },
    onClose: {
      action: 'closed',
      description: 'Función que se ejecuta al cerrar el modal'
    },
    children: {
      control: false,
      description: 'Contenido del modal'
    }
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Historia básica
export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: (
      <div>
        <h2 className="text-xl font-bold mb-4">Modal Básico</h2>
        <p className="text-gray-600 mb-4">
          Este es un ejemplo de modal básico con contenido simple.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary">Cancelar</Button>
          <Button variant="primary">Aceptar</Button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal básico con título, texto descriptivo y botones de acción.'
      }
    }
  }
};

// Historia interactiva
export const Interactive: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: null,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="p-8">
        <Button 
          variant="primary" 
          onClick={() => setIsOpen(true)}
        >
          Abrir Modal
        </Button>
        
        <Modal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        >
          <div>
            <h2 className="text-xl font-bold mb-4">Modal Interactivo</h2>
            <p className="text-gray-600 mb-4">
              Puedes cerrar este modal haciendo clic en la X, en el fondo oscuro, 
              o en el botón Cerrar.
            </p>
            <div className="flex justify-end">
              <Button 
                variant="primary" 
                onClick={() => setIsOpen(false)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal completamente funcional con botón para abrir y múltiples formas de cerrarlo.'
      }
    }
  }
};

// Historia con formulario
export const WithForm: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: null,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      setIsOpen(false);
      setFormData({ name: '', email: '' });
    };
    
    return (
      <div className="p-8">
        <Button 
          variant="primary" 
          onClick={() => setIsOpen(true)}
        >
          Abrir Formulario
        </Button>
        
        <Modal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        >
          <div>
            <h2 className="text-xl font-bold mb-4">Información Personal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <Input
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  type="button"
                  variant="secondary" 
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  Guardar
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal con formulario completo incluyendo validación y manejo de estado.'
      }
    }
  }
};

// Historia de confirmación
export const Confirmation: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: null,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleConfirm = () => {
      console.log('Acción confirmada');
      setIsOpen(false);
    };
    
    return (
      <div className="p-8">
        <Button 
          variant="primary" 
          onClick={() => setIsOpen(true)}
          className="bg-red-600 hover:bg-red-700"
        >
          Eliminar Elemento
        </Button>
        
        <Modal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        >
          <div className="text-center">
            <HiExclamationCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Confirmar Eliminación</h2>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que quieres eliminar este elemento? 
              Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-center gap-3">
              <Button 
                variant="secondary" 
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={handleConfirm}
                className="bg-red-600 hover:bg-red-700"
              >
                Eliminar
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal de confirmación para acciones destructivas con iconografía clara y botones destacados.'
      }
    }
  }
};

// Historia de diferentes tipos de alertas
export const AlertTypes: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: null,
  },
  render: (args) => {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    
    return (
      <div className="p-8">
        <div className="flex gap-4 flex-wrap">
          <Button 
            variant="primary" 
            onClick={() => setActiveModal('success')}
            className="bg-green-600 hover:bg-green-700"
          >
            Éxito
          </Button>
          <Button 
            variant="primary" 
            onClick={() => setActiveModal('error')}
            className="bg-red-600 hover:bg-red-700"
          >
            Error
          </Button>
          <Button 
            variant="primary" 
            onClick={() => setActiveModal('warning')}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            Advertencia
          </Button>
          <Button 
            variant="primary" 
            onClick={() => setActiveModal('info')}
          >
            Información
          </Button>
        </div>
        
        {/* Modal de Éxito */}
        <Modal 
          isOpen={activeModal === 'success'} 
          onClose={() => setActiveModal(null)}
        >
          <div className="text-center">
            <HiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-green-700 mb-2">¡Operación Exitosa!</h2>
            <p className="text-gray-600 mb-6">
              Los datos se han guardado correctamente.
            </p>
            <Button 
              variant="primary" 
              onClick={() => setActiveModal(null)}
              className="bg-green-600 hover:bg-green-700"
            >
              Continuar
            </Button>
          </div>
        </Modal>
        
        {/* Modal de Error */}
        <Modal 
          isOpen={activeModal === 'error'} 
          onClose={() => setActiveModal(null)}
        >
          <div className="text-center">
            <HiXCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">
              Hubo un problema al procesar la solicitud. Por favor intenta nuevamente.
            </p>
            <Button 
              variant="primary" 
              onClick={() => setActiveModal(null)}
              className="bg-red-600 hover:bg-red-700"
            >
              Entendido
            </Button>
          </div>
        </Modal>
        
        {/* Modal de Advertencia */}
        <Modal 
          isOpen={activeModal === 'warning'} 
          onClose={() => setActiveModal(null)}
        >
          <div className="text-center">
            <HiExclamationCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-yellow-700 mb-2">Advertencia</h2>
            <p className="text-gray-600 mb-6">
              Algunos campos no están completos. ¿Deseas continuar de todos modos?
            </p>
            <div className="flex justify-center gap-3">
              <Button 
                variant="secondary" 
                onClick={() => setActiveModal(null)}
              >
                Revisar
              </Button>
              <Button 
                variant="primary" 
                onClick={() => setActiveModal(null)}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                Continuar
              </Button>
            </div>
          </div>
        </Modal>
        
        {/* Modal de Información */}
        <Modal 
          isOpen={activeModal === 'info'} 
          onClose={() => setActiveModal(null)}
        >
          <div className="text-center">
            <HiInformationCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-blue-700 mb-2">Información</h2>
            <p className="text-gray-600 mb-6">
              Esta función estará disponible en la próxima versión de la aplicación.
            </p>
            <Button 
              variant="primary" 
              onClick={() => setActiveModal(null)}
            >
              OK
            </Button>
          </div>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Diferentes tipos de modales para comunicar estados: éxito, error, advertencia e información.'
      }
    }
  }
};

// Historia con tamaño personalizado
export const CustomSize: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: null,
  },
  render: (args) => {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    
    return (
      <div className="p-8">
        <div className="flex gap-4 flex-wrap">
          <Button 
            variant="secondary" 
            onClick={() => setActiveModal('small')}
          >
            Modal Pequeño
          </Button>
          <Button 
            variant="primary" 
            onClick={() => setActiveModal('large')}
          >
            Modal Grande
          </Button>
          <Button 
            variant="primary" 
            onClick={() => setActiveModal('fullwidth')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Modal Ancho Completo
          </Button>
        </div>
        
        {/* Modal Pequeño */}
        <Modal 
          isOpen={activeModal === 'small'} 
          onClose={() => setActiveModal(null)}
        >
          <div style={{width: '250px'}}>
            <h3 className="font-bold mb-2">Modal Compacto</h3>
            <p className="text-sm text-gray-600 mb-4">
              Ideal para confirmaciones rápidas.
            </p>
            <Button 
              variant="primary" 
              onClick={() => setActiveModal(null)}
              className="w-full"
            >
              OK
            </Button>
          </div>
        </Modal>
        
        {/* Modal Grande */}
        <Modal 
          isOpen={activeModal === 'large'} 
          onClose={() => setActiveModal(null)}
        >
          <div style={{width: '600px'}}>
            <h2 className="text-2xl font-bold mb-4">Modal Extenso</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Este modal tiene más espacio para contenido extenso como formularios 
                complejos, tablas de datos o información detallada.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Campo 1</label>
                  <Input placeholder="Ejemplo 1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Campo 2</label>
                  <Input placeholder="Ejemplo 2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea 
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Descripción detallada..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button 
                variant="secondary" 
                onClick={() => setActiveModal(null)}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={() => setActiveModal(null)}
              >
                Guardar
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modales con diferentes tamaños para adaptarse a distintos tipos de contenido.'
      }
    }
  }
};