# Guía de Pruebas# Pruebas automatizadas



Esta guía explica cómo ejecutar y trabajar con las pruebas del proyecto.## Ejecutar pruebas



## 📋 Tabla de Contenidos1. Instala dependencias:

   npm install

- [Configuración](#configuración)

- [Ejecutar Pruebas](#ejecutar-pruebas)2. Ejecuta todas las pruebas:

- [Estructura de Pruebas](#estructura-de-pruebas)   npm test

- [Tipos de Pruebas](#tipos-de-pruebas)

- [Cobertura](#cobertura)Las pruebas cubren componentes UI principales, formularios y flujos de integración. Los archivos de prueba están en `src/components/__tests__/` y `src/components/ui/__tests__/`.

- [Guía para Desarrolladores](#guía-para-desarrolladores)
- [Troubleshooting](#troubleshooting)

## ⚙️ Configuración

### Dependencias Instaladas

El proyecto utiliza las siguientes herramientas de testing:

```json
{
  "jest": "^29.7.0",
  "jest-environment-jsdom": "^29.7.0",
  "@testing-library/react": "^13.4.0",
  "@testing-library/jest-dom": "^6.1.4",
  "@testing-library/user-event": "^14.5.1"
}
```

### Archivos de Configuración

- **`jest.config.js`**: Configuración principal de Jest con integración Next.js
- **`jest.setup.js`**: Setup global y mocks para pruebas
- **`__mocks__/fileMock.js`**: Mock para archivos estáticos

## 🚀 Ejecutar Pruebas

### Comandos Disponibles

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch (recomendado para desarrollo)
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage

# Ejecutar en modo CI (sin watch, con cobertura)
npm run test:ci
```

### Ejemplos de Uso

```bash
# Ejecutar pruebas específicas
npm test Button

# Ejecutar pruebas con patrón
npm test -- --testPathPattern=components/test

# Ejecutar solo pruebas modificadas
npm test -- --onlyChanged

# Modo verbose para más detalles
npm test -- --verbose
```

## 📁 Estructura de Pruebas

```
src/
└── components/
    └── test/
        ├── Button.test.jsx                    # Pruebas del componente Button
        ├── Input.test.jsx                     # Pruebas del componente Input
        ├── Modal.test.jsx                     # Pruebas del componente Modal
        ├── AdoptionForm.test.jsx              # Pruebas del formulario de adopción
        ├── UserTable.test.jsx                 # Pruebas de tabla de usuarios
        └── AdoptionFlow.integration.test.jsx  # Prueba de integración completa
```

### Convenciones de Nombres

- **Pruebas unitarias**: `ComponentName.test.jsx`
- **Pruebas de integración**: `FeatureName.integration.test.jsx`
- **Mocks**: `__mocks__/mockName.js`

## 🧪 Tipos de Pruebas

### 1. Pruebas Unitarias

Prueban componentes individuales de forma aislada.

**Ejemplo**: `Button.test.jsx`
```javascript
test('renderiza correctamente con texto', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
})
```

**Cobertura**:
- ✅ Renderizado básico
- ✅ Props y variantes
- ✅ Eventos de usuario
- ✅ Estados (loading, disabled)
- ✅ Accesibilidad

### 2. Pruebas de Formularios

Verifican validación, envío y manejo de errores.

**Ejemplo**: `AdoptionForm.test.jsx`
```javascript
test('valida campos requeridos', async () => {
  const user = userEvent.setup()
  render(<AdoptionForm onSubmit={jest.fn()} />)
  
  await user.click(screen.getByRole('button', { name: /enviar/i }))
  
  expect(screen.getByText('El nombre es requerido')).toBeInTheDocument()
})
```

### 3. Pruebas de Integración

Prueban flujos completos entre múltiples componentes.

**Ejemplo**: `AdoptionFlow.integration.test.jsx`
- Abre modal ➜ Llena formulario ➜ Envía ➜ Muestra confirmación

### 4. Pruebas de Tabla/Lista

Verifican filtrado, paginación y ordenamiento.

**Ejemplo**: `UserTable.test.jsx`
```javascript
test('filtra usuarios por nombre', async () => {
  const user = userEvent.setup()
  render(<UserTable users={mockUsers} />)
  
  await user.type(screen.getByPlaceholderText('Filtrar por nombre'), 'juan')
  
  expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
})
```

## 📊 Cobertura

### Métricas Objetivo

- **Statements**: ≥ 80%
- **Branches**: ≥ 80%
- **Functions**: ≥ 80%
- **Lines**: ≥ 80%

### Visualizar Cobertura

```bash
# Generar reporte
npm run test:coverage

# Abrir reporte HTML (se genera en coverage/lcov-report/index.html)
```

### Interpretar Reportes

- 🟢 **Verde**: Bien cubierto
- 🟡 **Amarillo**: Parcialmente cubierto
- 🔴 **Rojo**: Sin cobertura

## 👨‍💻 Guía para Desarrolladores

### Escribir Nuevas Pruebas

1. **Crear archivo de prueba**:
   ```bash
   # Ubicación: src/components/test/
   touch src/components/test/NewComponent.test.jsx
   ```

2. **Estructura básica**:
   ```javascript
   import React from 'react'
   import { render, screen } from '@testing-library/react'
   import userEvent from '@testing-library/user-event'
   import '@testing-library/jest-dom'
   import NewComponent from '../NewComponent'
   
   describe('NewComponent', () => {
     test('renderiza correctamente', () => {
       render(<NewComponent />)
       // Assertions...
     })
   })
   ```

3. **Patrones comunes**:
   ```javascript
   // Setup de usuario para eventos
   const user = userEvent.setup()
   
   // Mock de funciones
   const mockFn = jest.fn()
   
   // Limpiar mocks
   beforeEach(() => {
     jest.clearAllMocks()
   })
   ```

### Mejores Prácticas

#### ✅ Hacer

- Usar `screen.getByRole()` para elementos interactivos
- Probar comportamiento, no implementación
- Usar `userEvent` para interacciones realistas
- Agrupar tests relacionados con `describe`
- Limpiar mocks entre pruebas

#### ❌ Evitar

- Probar detalles de implementación
- Usar selectores CSS específicos
- Tests que dependan del orden de ejecución
- Mock excesivo (solo lo necesario)

### Debugging Pruebas

```javascript
// Ver el DOM actual
screen.debug()

// Ver elemento específico
screen.debug(screen.getByRole('button'))

// Usar queries más específicas
screen.logTestingPlaygroundURL()
```

## 🔧 Troubleshooting

### Problemas Comunes

#### 1. "Element not found"
```javascript
// ❌ Elemento no encontrado inmediatamente
expect(screen.getByText('Loading...')).toBeInTheDocument()

// ✅ Esperar elemento asíncrono
await waitFor(() => {
  expect(screen.getByText('Data loaded')).toBeInTheDocument()
})
```

#### 2. "Multiple elements found"
```javascript
// ❌ Múltiples elementos
screen.getByRole('button')

// ✅ Ser más específico
screen.getByRole('button', { name: 'Submit' })
```

#### 3. "Jest did not exit"
- Verificar que no haya timers activos
- Cerrar conexiones abiertas
- Usar `jest.clearAllTimers()` si es necesario

#### 4. Mock no funciona
```javascript
// ❌ Mock después del import
import Component from './Component'
jest.mock('./api')

// ✅ Mock antes del import
jest.mock('./api')
import Component from './Component'
```

### Comandos de Debug

```bash
# Ejecutar con más información
npm test -- --verbose --no-coverage

# Solo un test específico
npm test -- --testNamePattern="renderiza correctamente"

# Ver por qué falló
npm test -- --detectOpenHandles
```

### Logs Útiles

```javascript
// En las pruebas
console.log('Estado actual:', component.debug())

// Ver todas las queries disponibles
console.log(screen.getAllByRole('button'))
```

## 📚 Recursos Adicionales

- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Docs](https://jestjs.io/docs/getting-started)
- [User Event API](https://testing-library.com/docs/user-event/intro)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 🤝 Contribuir

### Antes de hacer un PR

1. Ejecutar todas las pruebas: `npm run test:ci`
2. Verificar cobertura: mínimo 80%
3. Agregar pruebas para nuevas funcionalidades
4. Actualizar esta documentación si es necesario

### Checklist de PR

- [ ] ✅ Todas las pruebas pasan
- [ ] ✅ Cobertura ≥ 80%
- [ ] ✅ Nuevas funcionalidades tienen pruebas
- [ ] ✅ No hay warnings en consola
- [ ] ✅ Documentación actualizada