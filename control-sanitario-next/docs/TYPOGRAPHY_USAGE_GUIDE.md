# 📚 Guía de Uso - Sistema de Tipografía Responsiva

## 🎯 Introducción

Este documento explica cómo usar el nuevo sistema de tipografía responsiva implementado en el proyecto Huella Segura. El sistema garantiza legibilidad óptima en todos los dispositivos usando escalado fluido con `clamp()`.

---

## 🚀 Inicio Rápido

### Importación Automática

El sistema ya está importado en `globals.css`:

```css
@import './typography-responsive.css';
```

No necesitas hacer nada adicional. Todos los elementos HTML (`h1`, `h2`, `p`, etc.) ya tienen los estilos aplicados automáticamente.

---

## 📝 Uso en HTML/JSX

### Títulos

Los títulos se ajustan automáticamente según el viewport:

```jsx
<h1>Título Principal</h1>         {/* 28px → 48px */}
<h2>Subtítulo Importante</h2>     {/* 24px → 36px */}
<h3>Sección</h3>                  {/* 20px → 30px */}
<h4>Subsección</h4>               {/* 18px → 24px */}
<h5>Encabezado Menor</h5>         {/* 16px → 20px */}
<h6>Encabezado Mínimo</h6>        {/* 15px → 18px */}
```

### Párrafos y Texto

```jsx
{/* Texto normal */}
<p>Este es un párrafo con tamaño responsivo óptimo para lectura.</p>

{/* Texto destacado / Lead */}
<p className="lead">Texto introductorio más grande para llamar atención.</p>

{/* Texto pequeño */}
<small>Nota adicional o texto secundario.</small>

{/* Texto extra pequeño */}
<span className="text-xs">Información muy secundaria.</span>
```

### Énfasis

```jsx
{/* Negrita */}
<strong>Texto importante</strong>
<span className="font-bold">Texto en negrita</span>

{/* Peso medio */}
<span className="font-medium">Texto con peso medio</span>

{/* Peso semibold */}
<span className="font-semibold">Texto semibold</span>

{/* Peso ligero */}
<span className="font-light">Texto ligero</span>
```

---

## 🎨 Uso con Tailwind CSS

### Clases de Tamaño Responsivo (NUEVAS)

```jsx
{/* Usar las nuevas clases responsive */}
<h1 className="text-responsive-h1">Título Dinámico</h1>
<h2 className="text-responsive-h2">Subtítulo Dinámico</h2>
<p className="text-responsive-body">Párrafo con tamaño óptimo</p>
<p className="text-responsive-lead">Texto destacado</p>
<small className="text-responsive-small">Texto pequeño</small>
```

### Pesos de Fuente

```jsx
<p className="font-light">Ligero (300)</p>
<p className="font-regular">Regular (400)</p>
<p className="font-medium">Medio (500)</p>
<p className="font-semibold">Semibold (600)</p>
<p className="font-bold">Bold (700)</p>
<p className="font-extrabold">Extra Bold (800)</p>
```

### Interlineado (Line Height)

```jsx
<p className="leading-tight">Interlineado compacto (1.1)</p>
<p className="leading-snug">Interlineado ajustado (1.2)</p>
<p className="leading-normal">Interlineado normal (1.4)</p>
<p className="leading-relaxed">Interlineado relajado (1.6)</p>
<p className="leading-loose">Interlineado amplio (1.8)</p>
```

### Espaciado de Letras (Letter Spacing)

```jsx
<h1 className="tracking-tight">Apretado</h1>
<p className="tracking-normal">Normal</p>
<h6 className="tracking-wide">Amplio</h6>
<h6 className="tracking-wider">Más amplio</h6>
```

### Ancho Óptimo de Línea

Para mejorar la lectura, limita el ancho de texto largo:

```jsx
<p className="measure-normal">
  Este párrafo no excederá 65 caracteres por línea,
  lo cual es óptimo para lectura confortable.
</p>

<p className="measure-narrow">Máximo 45 caracteres (texto denso)</p>
<p className="measure-wide">Máximo 80 caracteres (textos amplios)</p>
```

---

## 🧩 Ejemplos de Componentes

### Card con Título y Descripción

```jsx
function AnimalCard({ nombre, descripcion, estado }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-responsive-h3 font-bold mb-2 text-blue-700">
        {nombre}
      </h3>
      <p className="text-responsive-body leading-relaxed text-gray-600 mb-4 measure-normal">
        {descripcion}
      </p>
      <span className="text-responsive-small font-medium text-green-600">
        Estado: {estado}
      </span>
    </div>
  );
}
```

### Formulario con Labels

```jsx
function ContactForm() {
  return (
    <form>
      <div className="mb-4">
        <label 
          htmlFor="name" 
          className="block font-semibold text-responsive-body mb-2"
        >
          Nombre Completo
        </label>
        <input
          id="name"
          type="text"
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Ingresa tu nombre"
        />
      </div>
      
      <button 
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg
                   hover:bg-blue-700 transition"
      >
        Enviar
      </button>
    </form>
  );
}
```

### Hero Section

```jsx
function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-responsive-h1 font-extrabold mb-4 tracking-tight">
          Protegiendo a Nuestros Amigos Peludos
        </h1>
        <p className="text-responsive-lead leading-relaxed mb-8 measure-normal mx-auto">
          Sistema integral de control sanitario para animales en situación de calle.
        </p>
        <button className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full
                         hover:bg-blue-50 transition">
          Comenzar Ahora
        </button>
      </div>
    </section>
  );
}
```

### Lista de Información

```jsx
function InfoList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="text-blue-600 mr-3">✓</span>
          <span className="text-responsive-body leading-relaxed">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
```

---

## 📐 Tabla de Referencia Rápida

### Tamaños por Dispositivo

| Elemento | Móvil (< 640px) | Tablet (768-1024px) | Desktop (> 1024px) |
|----------|----------------|---------------------|-------------------|
| **Body** | 14px | 16px | 17px |
| **H1** | 28px | ~38px (fluido) | 48px |
| **H2** | 24px | ~30px (fluido) | 36px |
| **H3** | 20px | ~25px (fluido) | 30px |
| **H4** | 18px | ~21px (fluido) | 24px |
| **Lead** | 16px | ~18px (fluido) | 20px |
| **Small** | 12px | ~13px (fluido) | 14px |

### Pesos de Fuente

| Clase Tailwind | Valor | Uso Recomendado |
|----------------|-------|-----------------|
| `font-light` | 300 | Texto decorativo, secundario |
| `font-regular` | 400 | Texto de cuerpo principal |
| `font-medium` | 500 | Énfasis suave, labels |
| `font-semibold` | 600 | Subtítulos, encabezados menores |
| `font-bold` | 700 | Títulos principales, CTAs |
| `font-extrabold` | 800 | Hero text, headlines impactantes |

### Interlineado

| Clase | Valor | Uso |
|-------|-------|-----|
| `leading-tight` | 1.1 | Títulos grandes (h1, h2) |
| `leading-snug` | 1.2 | Títulos medianos (h3, h4) |
| `leading-normal` | 1.4 | Elementos UI, botones |
| `leading-relaxed` | 1.6 | Texto de cuerpo, párrafos |
| `leading-loose` | 1.8 | Texto espacioso, citas |

---

## ✅ Buenas Prácticas

### ✓ Hacer

```jsx
// ✅ Usar clases responsivas para escalado fluido
<h1 className="text-responsive-h1">Título</h1>

// ✅ Combinar con interlineado apropiado
<p className="text-responsive-body leading-relaxed">Párrafo legible</p>

// ✅ Limitar ancho de línea para lectura
<p className="measure-normal">Texto largo...</p>

// ✅ Usar pesos semánticos
<button className="font-semibold">Acción</button>

// ✅ Mantener jerarquía visual clara
<h2 className="font-bold">Sección</h2>
<h3 className="font-semibold">Subsección</h3>
<p className="font-regular">Contenido</p>
```

### ✗ Evitar

```jsx
// ❌ No usar tamaños fijos que no escalan
<h1 className="text-4xl">Título</h1> // Mejor usar text-responsive-h1

// ❌ No sobrecargar con demasiados estilos
<p className="text-xs leading-tight tracking-wide font-bold">
  Difícil de leer
</p>

// ❌ No ignorar el interlineado
<p className="text-responsive-body">Sin line-height específico</p>
// Mejor: <p className="text-responsive-body leading-relaxed">

// ❌ No usar líneas muy largas sin límite
<p className="w-full">Este texto puede tener 200 caracteres por línea...</p>
// Mejor: <p className="measure-normal">

// ❌ No mezclar unidades inconsistentemente
<h1 style={{ fontSize: '32px' }}>Título</h1>
// Mejor usar clases de Tailwind o variables CSS
```

---

## 🎯 Casos de Uso Específicos

### Blog/Artículos

```jsx
<article className="max-w-3xl mx-auto px-6 py-12">
  <h1 className="text-responsive-h1 font-extrabold mb-4 tracking-tight">
    Título del Artículo
  </h1>
  
  <p className="text-responsive-lead leading-relaxed text-gray-600 mb-8">
    Introducción destacada del artículo.
  </p>
  
  <div className="prose">
    <p className="text-responsive-body leading-loose measure-normal mb-4">
      Contenido del artículo con lectura óptima...
    </p>
    
    <h2 className="text-responsive-h2 font-bold mt-8 mb-4">
      Sección del Artículo
    </h2>
    
    <p className="text-responsive-body leading-loose measure-normal mb-4">
      Más contenido...
    </p>
  </div>
</article>
```

### Dashboard/Panel

```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-responsive-h4 font-semibold mb-2 text-gray-700">
      Total Animales
    </h3>
    <p className="text-responsive-h2 font-bold text-blue-600">
      1,234
    </p>
    <small className="text-responsive-small text-gray-500">
      +12% este mes
    </small>
  </div>
  {/* Más cards... */}
</div>
```

### Modales

```jsx
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
  <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
    <h2 className="text-responsive-h3 font-bold mb-4">
      Confirmar Acción
    </h2>
    <p className="text-responsive-body leading-relaxed text-gray-600 mb-6">
      ¿Estás seguro de que deseas realizar esta acción? 
      Esta operación no se puede deshacer.
    </p>
    <div className="flex gap-3">
      <button className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg">
        Cancelar
      </button>
      <button className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-lg">
        Confirmar
      </button>
    </div>
  </div>
</div>
```

---

## 🔍 Testing y Verificación

### Herramientas de Desarrollo

1. **DevTools Responsive Mode**
   - F12 → Toggle Device Toolbar
   - Probar: 320px, 375px, 768px, 1024px, 1920px

2. **Lighthouse Accessibility Audit**
   - F12 → Lighthouse → Accessibility
   - Verificar contraste y tamaños

3. **axe DevTools Extension**
   - Escaneo automático de problemas de accesibilidad

### Checklist Manual

- [ ] Texto legible en móvil (≥ 14px)
- [ ] Texto legible en tablet (≥ 16px)
- [ ] Títulos tienen jerarquía clara
- [ ] Interlineado cómodo para lectura
- [ ] Botones táctiles (≥ 44px)
- [ ] Inputs 16px mínimo (evita zoom iOS)
- [ ] Contraste adecuado (WCAG AA)
- [ ] Líneas no exceden 80 caracteres
- [ ] Transiciones suaves entre breakpoints

---

## 📚 Referencias

- **Documentación Completa**: Ver `docs/TYPOGRAPHY_RESPONSIVE_AUDIT.md`
- **Variables CSS**: `src/styles/variables.css`
- **Estilos Responsivos**: `src/styles/typography-responsive.css`
- **Config Tailwind**: `tailwind.config.js`

---

## 💬 Soporte

¿Preguntas o problemas? Consulta:
- Documentación del equipo
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Typography](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text)

---

**Última actualización**: 28 de octubre de 2025  
**Versión**: 1.0
