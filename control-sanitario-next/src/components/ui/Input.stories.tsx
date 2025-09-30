/**
 * Historias de Storybook para el componente Input
 * 
 * Documentación visual e interactiva del componente Input con 
 * diferentes tipos, estados y casos de uso.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { HiUser, HiMail, HiSearch, HiEye, HiEyeOff } from 'react-icons/hi';
import { useState } from 'react';

import Input from './Input';

const meta = {
  title: 'UI Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Input reutilizable que extiende las propiedades estándar de input HTML. Incluye estilos predefinidos y soporte para focus y validación.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      description: 'Tipo de input HTML'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Texto placeholder'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilitar el input'
    },
    required: {
      control: { type: 'boolean' },
      description: 'Campo requerido'
    }
  },
  args: {
    onChange: (e) => console.log('Input value:', e.target.value)
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Historia básica - Input de texto
export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Escribe algo...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input básico de texto con placeholder. Es la variante más común utilizada en formularios.'
      }
    }
  }
};

// Historia de email
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'correo@ejemplo.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input específico para emails. Proporciona validación automática del formato de email en navegadores compatibles.'
      }
    }
  }
};

// Historia de contraseña
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Contraseña',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input de contraseña que oculta el texto ingresado por seguridad.'
      }
    }
  }
};

// Historia de búsqueda
export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Buscar...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input de búsqueda con estilos específicos y funcionalidad de borrado automático en algunos navegadores.'
      }
    }
  }
};

// Historia de número
export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '123',
    min: 0,
    max: 100,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input numérico con controles de incremento/decremento y validación de rango.'
      }
    }
  }
};

// Historia deshabilitado
export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'Campo deshabilitado',
    disabled: true,
    value: 'Texto de ejemplo',
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado deshabilitado del input. Útil para campos de solo lectura o condicionalmente editables.'
      }
    }
  }
};

// Historia con error
export const WithError: Story = {
  args: {
    type: 'email',
    placeholder: 'correo@ejemplo.com',
    className: 'border-red-500 focus:ring-red-500',
    value: 'email-invalido',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input con estado de error utilizando clases CSS personalizadas para resaltar problemas de validación.'
      }
    }
  }
};

// Historia con éxito
export const WithSuccess: Story = {
  args: {
    type: 'email',
    placeholder: 'correo@ejemplo.com',
    className: 'border-green-500 focus:ring-green-500',
    value: 'correo@valido.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input con estado de éxito para indicar validación correcta.'
      }
    }
  }
};

// Historia con tamaños personalizados
export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block text-sm font-medium mb-1">Pequeño</label>
        <Input 
          {...args} 
          placeholder="Input pequeño" 
          className="px-2 py-1 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Normal</label>
        <Input 
          {...args} 
          placeholder="Input normal" 
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Grande</label>
        <Input 
          {...args} 
          placeholder="Input grande" 
          className="px-4 py-3 text-lg"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes tamaños de input utilizando clases CSS personalizadas.'
      }
    }
  }
};

// Historia de formulario completo
export const FormExample: Story = {
  render: (args) => (
    <form className="space-y-4 w-80">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Nombre completo *
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Juan Pérez"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email *
        </label>
        <Input
          id="email"
          type="email"
          placeholder="juan@ejemplo.com"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="phone">
          Teléfono
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="+56 9 1234 5678"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="age">
          Edad
        </label>
        <Input
          id="age"
          type="number"
          placeholder="25"
          min="18"
          max="100"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="password">
          Contraseña *
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de formulario completo con diferentes tipos de input y labels apropiados para accesibilidad.'
      }
    }
  }
};

// Historia con validación en tiempo real
export const WithValidation: Story = {
  render: (args) => {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    
    const validateEmail = (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      setIsValid(value === '' || validateEmail(value));
    };
    
    return (
      <div className="w-80">
        <label className="block text-sm font-medium mb-1" htmlFor="validated-email">
          Email con validación
        </label>
        <Input
          id="validated-email"
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={handleChange}
          className={`${!isValid ? 'border-red-500 focus:ring-red-500' : email && isValid ? 'border-green-500 focus:ring-green-500' : ''}`}
        />
        {!isValid && (
          <p className="text-red-500 text-sm mt-1">
            Por favor ingresa un email válido
          </p>
        )}
        {email && isValid && (
          <p className="text-green-500 text-sm mt-1">
            Email válido ✓
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Input con validación en tiempo real que muestra feedback visual inmediato al usuario.'
      }
    }
  }
};