# Storybook - Documentación y Testeo Visual de Componentes

## ¿Qué es Storybook?

Storybook es una herramienta para el desarrollo de componentes de UI de forma aislada. Permite:

- **Visualizar componentes** fuera del contexto de la aplicación principal
- **Testear diferentes estados** y propiedades de los componentes
- **Documentar componentes** con ejemplos interactivos
- **Facilitar la colaboración** entre desarrolladores y diseñadores
- **Detectar regresiones visuales** en el diseño

## 🚀 Instalación y Configuración

Storybook ya está configurado en este proyecto. La instalación incluye:

```bash
# Dependencias principales (ya instaladas)
npm install @storybook/react-vite @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-links @storybook/addon-onboarding @storybook/blocks @storybook/test
```

### Estructura de archivos:

```
.storybook/
├── main.ts          # Configuración principal
└── preview.ts       # Configuración global de historias

src/components/ui/
├── Button.stories.tsx    # Historias del botón
├── Input.stories.tsx     # Historias del input
├── Modal.stories.tsx     # Historias del modal
└── ...
```

## 🎮 Comandos Disponibles

### Iniciar Storybook
```bash
npm run storybook
```
Esto abrirá Storybook en [http://localhost:6006](http://localhost:6006)

### Construir Storybook para producción
```bash
npm run build-storybook
```

## 📚 Componentes Documentados

### 1. Button (`Button.stories.tsx`)
Ejemplos disponibles:
- **Primary**: Botón principal con estilo destacado
- **Secondary**: Botón secundario para acciones alternativas  
- **Danger**: Botón para acciones destructivas
- **Sizes**: Diferentes tamaños (small, medium, large)
- **Disabled**: Estados deshabilitados
- **With Icons**: Botones con iconos

### 2. Input (`Input.stories.tsx`)
Ejemplos disponibles:
- **Default**: Input básico con label
- **With Placeholder**: Input con texto de ayuda
- **Required**: Campo obligatorio con validación
- **With Error**: Estados de error con mensajes
- **Disabled**: Estado deshabilitado
- **Different Types**: Email, password, number, etc.

### 3. Modal (`Modal.stories.tsx`)
Ejemplos disponibles:
- **Default**: Modal básico con contenido
- **Interactive**: Modal que se puede abrir/cerrar
- **With Form**: Modal con formulario completo
- **Confirmation**: Modal de confirmación destructiva
- **Alert Types**: Diferentes tipos de alertas
- **Custom Size**: Tamaños personalizados

## 📝 Cómo Crear Nuevas Historias

### 1. Estructura Básica

Crea un archivo `.stories.tsx` junto a tu componente:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { TuComponente } from './TuComponente';

const meta: Meta<typeof TuComponente> = {
  title: 'Categoría/TuComponente',
  component: TuComponente,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define los controles para las props
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Historia básica
export const Default: Story = {
  args: {
    // Props por defecto
    variant: 'primary',
    children: 'Texto del componente',
  },
};

// Historia con estado interactivo
export const Interactive: Story = {
  args: {
    // Props necesarias por TypeScript
  },
  render: (args) => {
    const [estado, setEstado] = useState(false);
    
    return (
      <TuComponente 
        {...args}
        onClick={() => setEstado(!estado)}
      >
        Estado: {estado ? 'Activo' : 'Inactivo'}
      </TuComponente>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo interactivo que muestra cambios de estado.',
      },
    },
  },
};
```

### 2. Mejores Prácticas

#### Naming Convention
```
src/components/ui/ComponentName.stories.tsx
```

#### Organización por Categorías
- `UI/Button` - Componentes básicos de UI
- `Forms/Input` - Elementos de formulario
- `Navigation/Navbar` - Componentes de navegación
- `Layout/Modal` - Componentes de layout

#### Props Documentation
```tsx
argTypes: {
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg'],
    description: 'Tamaño del componente',
  },
  disabled: {
    control: 'boolean',
    description: 'Deshabilita el componente',
  },
  onClick: {
    action: 'clicked',
    description: 'Función ejecutada al hacer click',
  },
},
```

## 🎨 Configuración Avanzada

### Tailwind CSS
Storybook está configurado para usar Tailwind CSS automáticamente. Los estilos se cargan desde:
```typescript
// .storybook/preview.ts
import '../src/styles/globals.css';
```

### Addons Incluidos

1. **@storybook/addon-essentials**: Controles, acciones, viewport, background
2. **@storybook/addon-interactions**: Testing de interacciones
3. **@storybook/addon-links**: Enlaces entre historias
4. **@storybook/addon-a11y**: Testing de accesibilidad

### Viewport Testing
Prueba tus componentes en diferentes tamaños:
- Mobile: 375px
- Tablet: 768px  
- Desktop: 1024px
- Large Desktop: 1440px

## 🧪 Testing Visual

### Interacciones Automáticas
```tsx
export const TestInteractions: Story = {
  args: { ... },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Buscar elementos
    const button = canvas.getByRole('button');
    
    // Simular clicks
    await userEvent.click(button);
    
    // Verificar estados
    await expect(canvas.getByText('Clicked')).toBeInTheDocument();
  },
};
```

### Accessibilidad
Storybook incluye automáticamente un addon de accesibilidad que verifica:
- Contraste de colores
- Etiquetas ARIA
- Navegación por teclado
- Roles semánticos

## 🔄 Flujo de Trabajo Recomendado

### 1. Desarrollo de Componentes
1. Crear el componente base
2. Escribir las historias básicas
3. Iterar el diseño en Storybook
4. Implementar el componente en la aplicación

### 2. Review de Código
1. Verificar historias en Storybook antes del PR
2. Probar diferentes estados y props
3. Verificar accesibilidad
4. Documentar casos de uso

### 3. Documentación de Equipo
1. Actualizar historias cuando cambien componentes
2. Agregar ejemplos de casos de uso reales
3. Documentar props y comportamientos especiales

## 🚨 Solución de Problemas Comunes

### Error: "Module not found"
```bash
# Instalar dependencias faltantes
npm install @storybook/addon-essentials @storybook/react-vite
```

### Estilos no se cargan
Verificar que `globals.css` esté importado en `.storybook/preview.ts`

### TypeScript Errors
Asegurar que todas las props requeridas estén en `args`:
```tsx
args: {
  requiredProp: 'value',
  onRequiredCallback: () => {},
}
```

### Hot Reload no funciona
Reiniciar Storybook:
```bash
npm run storybook
```

## 📖 Recursos Adicionales

- [Documentación Oficial de Storybook](https://storybook.js.org/docs)
- [Best Practices](https://storybook.js.org/docs/writing-stories/best-practices)
- [Testing with Storybook](https://storybook.js.org/docs/writing-tests)
- [Accessibility Testing](https://storybook.js.org/addons/@storybook/addon-a11y)

---

*Este archivo es parte del sistema de documentación del proyecto Control Sanitario. Mantener actualizado conforme se agreguen nuevos componentes.*