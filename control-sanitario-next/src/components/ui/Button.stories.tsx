/**
 * Historias de Storybook para el componente Button
 * 
 * Estas historias documentan y permiten probar las diferentes variantes 
 * y estados del componente Button de manera visual e interactiva.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { HiUser, HiStar, HiHeart } from 'react-icons/hi';

import Button from './Button';

const meta = {
  title: 'UI Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Button reutilizable con variantes primary y secondary. Soporta todos los props estándar de un botón HTML.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Variante visual del botón'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilitar el botón'
    },
    children: {
      control: { type: 'text' },
      description: 'Contenido del botón'
    }
  },
  args: { onClick: () => console.log('Button clicked!') },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Historia básica - Botón primario
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Botón Primario',
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón principal usado para acciones importantes como enviar formularios o confirmar acciones.'
      }
    }
  }
};

// Historia secundaria - Botón secundario
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Botón Secundario',
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón secundario usado para acciones menos importantes como cancelar o acciones alternativas.'
      }
    }
  }
};

// Historia de botón deshabilitado
export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Botón Deshabilitado',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado deshabilitado del botón. Previene interacciones del usuario.'
      }
    }
  }
};

// Historia de botón con ícono
export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <HiUser className="w-4 h-4 mr-2" />
        Usuario
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón con ícono utilizando react-icons. El ícono se posiciona antes del texto.'
      }
    }
  }
};

// Historia de botón solo con ícono
export const IconOnly: Story = {
  args: {
    variant: 'primary',
    className: 'p-3',
    children: <HiHeart className="w-5 h-5" />,
    'aria-label': 'Me gusta',
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón que contiene solo un ícono. Importante incluir aria-label para accesibilidad.'
      }
    }
  }
};

// Historia de botón pequeño
export const Small: Story = {
  args: {
    variant: 'secondary',
    children: 'Pequeño',
    className: 'px-2 py-1 text-sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón con tamaño reducido usando clases CSS personalizadas.'
      }
    }
  }
};

// Historia de botón grande
export const Large: Story = {
  args: {
    variant: 'primary',
    children: 'Botón Grande',
    className: 'px-6 py-3 text-lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón con tamaño aumentado para acciones destacadas.'
      }
    }
  }
};

// Historia de botones en grupo
export const ButtonGroup: Story = {
  render: (args) => (
    <div className="flex gap-2">
      <Button variant="primary">Guardar</Button>
      <Button variant="secondary">Cancelar</Button>
      <Button variant="primary" disabled>Procesando...</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de múltiples botones agrupados, común en formularios y acciones relacionadas.'
      }
    }
  }
};

// Historia con diferentes estados
export const AllVariants: Story = {
  render: (args) => (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="primary" disabled>Primary Disabled</Button>
        <Button variant="secondary" disabled>Secondary Disabled</Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="primary">
          <HiStar className="w-4 h-4 mr-2" />
          Con Ícono
        </Button>
        <Button variant="secondary" className="p-3">
          <HiUser className="w-5 h-5" />
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase completo de todas las variantes y estados del componente Button.'
      }
    }
  }
};