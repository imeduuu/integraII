# Mejoras en Modales - AdminActionModal y Modal

## 📋 Resumen de Mejoras

Se han implementado mejoras significativas en los componentes de modales para mejorar la experiencia de usuario, accesibilidad y diseño visual.

## ✨ Características Implementadas

### 1. **Animaciones Suaves**
- ✅ Animación de entrada (fade in + slide in)
- ✅ Animación de salida (fade out + slide out)
- ✅ Transiciones suaves en hover y focus
- ✅ Respeto por `prefers-reduced-motion` para accesibilidad

### 2. **Gestión de Focus**
- ✅ **Focus automático**: El modal recibe el focus al abrirse
- ✅ **Focus trap**: El focus se mantiene dentro del modal (navegación con Tab)
- ✅ **Restauración de focus**: Al cerrar, el focus vuelve al elemento que abrió el modal
- ✅ Indicadores visuales de focus para navegación por teclado

### 3. **Accesibilidad (a11y)**
- ✅ Atributos ARIA apropiados (`role="dialog"`, `aria-modal`, `aria-labelledby`)
- ✅ Soporte completo de teclado (ESC para cerrar, Tab para navegar)
- ✅ Etiquetas ARIA en botones (`aria-label`)
- ✅ Focus visible para usuarios de teclado
- ✅ Prevención de scroll del body cuando el modal está abierto

### 4. **Diseño Visual Mejorado**
- ✅ Iconos contextuales según el tipo de acción
- ✅ Variantes de estilo: `warning`, `danger`, `info`, `success`
- ✅ Tamaños de modal: `small`, `medium`, `large`
- ✅ Sombras y efectos visuales mejorados
- ✅ Backdrop blur para mejor separación visual
- ✅ Diseño responsive (móvil y desktop)

## 🎨 Uso del AdminActionModal

### Ejemplo Básico
```tsx
import AdminActionModal from "@/components/AdminActionModal";

function MyComponent() {
  const [showModal, setShowModal] = useState(false);

  return (
    <AdminActionModal
      isOpen={showModal}
      title="¿Eliminar usuario?"
      message="Esta acción no se puede deshacer. ¿Estás seguro?"
      onConfirm={() => {
        // Lógica de confirmación
        setShowModal(false);
      }}
      onCancel={() => setShowModal(false)}
      confirmText="Eliminar"
      cancelText="Cancelar"
      variant="danger" // 🆕 Nueva prop
    />
  );
}
```

### Variantes Disponibles

#### Warning (Advertencia) - Por defecto
```tsx
<AdminActionModal
  variant="warning"
  title="Cambiar rol de usuario"
  message="Esto modificará los permisos del usuario."
  // ...
/>
```

#### Danger (Peligro)
```tsx
<AdminActionModal
  variant="danger"
  title="Eliminar cuenta"
  message="Esta acción es permanente y no se puede deshacer."
  // ...
/>
```

#### Info (Información)
```tsx
<AdminActionModal
  variant="info"
  title="Información importante"
  message="Por favor, revisa los siguientes detalles antes de continuar."
  // ...
/>
```

#### Success (Éxito)
```tsx
<AdminActionModal
  variant="success"
  title="Acción completada"
  message="La operación se realizó exitosamente."
  // ...
/>
```

## 🔧 Uso del Modal Base

El componente `Modal` también ha sido mejorado y puede usarse directamente:

```tsx
import Modal from "@/components/ui/Modal";

function CustomModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)}
      size="medium" // small | medium | large
      showCloseButton={true} // opcional, por defecto true
    >
      <div>
        <h2 id="modal-title">Mi Modal Personalizado</h2>
        <p>Contenido del modal...</p>
      </div>
    </Modal>
  );
}
```

## 📐 Estructura de Estilos

Los estilos están organizados en `src/styles/modal.module.css`:

### Clases Disponibles
- `.overlay` - Fondo oscuro del modal
- `.modalContainer` - Contenedor principal del modal
- `.closeButton` - Botón de cierre (X)
- `.modalHeader` - Encabezado del modal
- `.modalTitle` - Título del modal
- `.modalBody` - Cuerpo/contenido del modal
- `.modalFooter` - Pie del modal (para botones)
- `.adminModal` - Estilos específicos para AdminActionModal
- `.iconWarning`, `.iconDanger`, `.iconInfo`, `.iconSuccess` - Iconos según variante

### Modificadores de Tamaño
- `.small` - Modal pequeño (400px)
- `.medium` - Modal mediano (600px)
- `.large` - Modal grande (800px)

## ♿ Características de Accesibilidad

### Navegación por Teclado
- **ESC**: Cierra el modal
- **Tab**: Navega entre elementos focuseables dentro del modal
- **Shift + Tab**: Navega hacia atrás

### Focus Trap
El modal implementa un "focus trap" que mantiene el focus dentro del modal:
- Al llegar al último elemento y presionar Tab, vuelve al primero
- Al estar en el primer elemento y presionar Shift+Tab, va al último

### Atributos ARIA
```tsx
<div 
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <h2 id="modal-title">Título del Modal</h2>
  {/* ... */}
</div>
```

## 📱 Responsive Design

Los modales se adaptan automáticamente a diferentes tamaños de pantalla:

- **Desktop**: Tamaños fijos según la prop `size`
- **Móvil**: Ancho adaptativo con márgenes apropiados
- **Botones**: Stack vertical en móvil para mejor usabilidad

## 🎭 Animaciones

### Entrada
1. El overlay hace fade in (0.2s)
2. El modal hace slide in desde arriba con scale (0.3s)

### Salida
1. El modal hace slide out hacia arriba con scale (0.2s)
2. El overlay hace fade out (0.2s)

### Respeto por Preferencias del Usuario
```css
@media (prefers-reduced-motion: reduce) {
  /* Las animaciones se desactivan automáticamente */
}
```

## 🔒 Prevención de Scroll

Cuando el modal está abierto:
- El scroll del body se deshabilita automáticamente
- Al cerrar el modal, el scroll se restaura

## 💡 Mejores Prácticas

1. **Siempre proporciona un título claro**: Usa `id="modal-title"` para accesibilidad
2. **Usa la variante apropiada**: Ayuda a los usuarios a entender la gravedad de la acción
3. **Textos descriptivos**: Los mensajes deben ser claros y concisos
4. **Botones con labels**: Usa textos específicos en lugar de "Aceptar" genérico

### ✅ Bien
```tsx
<AdminActionModal
  title="¿Eliminar usuario Juan Pérez?"
  message="Esta acción eliminará permanentemente la cuenta y todos sus datos asociados."
  confirmText="Sí, eliminar"
  cancelText="No, mantener"
  variant="danger"
/>
```

### ❌ Evitar
```tsx
<AdminActionModal
  title="Confirmación"
  message="¿Estás seguro?"
  confirmText="OK"
  cancelText="Cancel"
/>
```

## 🧪 Testing

Para probar los modales:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import AdminActionModal from "@/components/AdminActionModal";

test("modal se abre y cierra correctamente", () => {
  const handleConfirm = jest.fn();
  const handleCancel = jest.fn();

  const { rerender } = render(
    <AdminActionModal
      isOpen={true}
      title="Test Modal"
      message="Test message"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  expect(screen.getByText("Test Modal")).toBeInTheDocument();

  // Cerrar con ESC
  fireEvent.keyDown(document, { key: "Escape" });
  expect(handleCancel).toHaveBeenCalled();
});
```

## 📝 Notas de Migración

### Cambios No Destructivos
La prop `variant` es opcional, por lo que el código existente seguirá funcionando:

```tsx
// ✅ Código antiguo sigue funcionando
<AdminActionModal
  isOpen={showModal}
  title="Título"
  message="Mensaje"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>

// ✅ Nuevo código con variante
<AdminActionModal
  isOpen={showModal}
  title="Título"
  message="Mensaje"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
  variant="danger" // 🆕 Nueva funcionalidad
/>
```

## 🐛 Troubleshooting

### El modal no se cierra con ESC
- Verifica que `isOpen={true}`
- Asegúrate de que `onCancel` actualiza el estado correctamente

### El focus no se restaura al cerrar
- El componente guarda automáticamente el elemento activo
- Verifica que no hay errores de JavaScript que interrumpan el proceso

### Las animaciones no se muestran
- Verifica que el archivo CSS está importado correctamente
- Revisa la consola para errores de importación

## 📚 Referencias

- [WAI-ARIA Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Focus Management in Modals](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

---

**Última actualización**: 21 de octubre de 2025
**Autor**: Sistema de Desarrollo
**Estado**: ✅ Completado
