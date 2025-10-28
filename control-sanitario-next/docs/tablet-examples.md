# 💻 Ejemplos Prácticos: Layouts para Tablets

## 📚 Guía de Referencia Rápida

Este archivo contiene ejemplos prácticos de cómo usar las nuevas clases y breakpoints para tablets en tus componentes.

---

## 1️⃣ Uso Básico de Breakpoints Tailwind

### Ejemplo 1: Padding Adaptativo
```tsx
// El padding se ajusta automáticamente según el dispositivo
<div className="
  p-4          /* Móvil: 1rem */
  tablet:p-6   /* Tablet (834px+): 1.5rem */
  lg:p-8       /* Laptop (1024px+): 2rem */
">
  Contenido
</div>
```

### Ejemplo 2: Texto Responsivo
```tsx
// Los tamaños de texto escalan para mejor legibilidad
<h1 className="
  text-xl          /* Móvil: 1.25rem */
  tablet:text-2xl  /* Tablet: 1.5rem */
  lg:text-3xl      /* Desktop: 1.875rem */
">
  Título Principal
</h1>

<p className="
  text-sm          /* Móvil: 0.875rem */
  tablet:text-base /* Tablet: 1rem */
">
  Descripción del contenido
</p>
```

### Ejemplo 3: Ancho de Elementos
```tsx
// Los elementos crecen en tablets para aprovechar el espacio
<div className="
  w-full         /* Móvil: 100% */
  tablet:w-80    /* Tablet: 320px (20rem) */
  lg:w-96        /* Desktop: 384px (24rem) */
">
  Tarjeta
</div>
```

---

## 2️⃣ Grids Adaptativos

### Ejemplo 1: Grid Simple (1 → 2 → 3 columnas)
```tsx
// Grid que se adapta perfectamente a cada tamaño de pantalla
<div className="
  grid
  grid-cols-1           /* Móvil: 1 columna */
  md:grid-cols-2        /* Tablet vertical: 2 columnas */
  lg:grid-cols-3        /* Tablet horizontal/Desktop: 3 columnas */
  gap-6                 /* Espacio entre elementos */
">
  <div>Tarjeta 1</div>
  <div>Tarjeta 2</div>
  <div>Tarjeta 3</div>
</div>
```

### Ejemplo 2: Grid por Orientación
```tsx
// Grid que cambia según la orientación del tablet
<div className="
  grid
  grid-cols-1                     /* Móvil: 1 columna */
  tablet-portrait:grid-cols-2     /* Tablet vertical: 2 columnas */
  tablet-landscape:grid-cols-3    /* Tablet horizontal: 3 columnas */
  xl:grid-cols-4                  /* Desktop grande: 4 columnas */
  gap-4
  tablet:gap-6                    /* Gap más grande en tablets */
">
  {items.map(item => (
    <Card key={item.id} data={item} />
  ))}
</div>
```

### Ejemplo 3: Grid de Métricas (1 → 2 → 3 → 4 columnas)
```tsx
// Grid para métricas que aprovecha al máximo cada breakpoint
<div className="
  grid
  grid-cols-1                     /* Móvil: 1 columna */
  sm:grid-cols-2                  /* Tablet pequeña: 2 columnas */
  md:grid-cols-3                  /* Tablet estándar: 3 columnas */
  tablet-landscape:grid-cols-4    /* Tablet horizontal: 4 columnas */
  gap-4
  metrics-grid                    /* Clase CSS personalizada */
">
  <MetricCard value={42} label="Animales" />
  <MetricCard value={15} label="Reportes" />
  <MetricCard value={8} label="Adopciones" />
  <MetricCard value={23} label="Voluntarios" />
</div>
```

---

## 3️⃣ Componentes de Tarjetas

### Ejemplo 1: Tarjeta de Animal
```tsx
const AnimalCard = ({ animal }) => (
  <div className="
    bg-white 
    rounded-xl 
    shadow-md 
    p-4 
    sm:p-6 
    tablet:p-5          /* Padding óptimo para tablets */
    w-full 
    max-w-xs 
    sm:w-72 
    tablet:w-80         /* Más ancha en tablets */
    flex 
    flex-col 
    items-center 
    hover:shadow-lg 
    transition-shadow 
    tablet-card         /* Clase CSS personalizada */
  ">
    <Image
      src={animal.image}
      alt={animal.nombre}
      className="
        w-24 h-24           /* Móvil: 96x96px */
        tablet:w-28 tablet:h-28  /* Tablet: 112x112px */
        object-cover 
        rounded-full 
        mb-3
      "
    />
    <h2 className="
      text-xl             /* Móvil: 1.25rem */
      tablet:text-2xl     /* Tablet: 1.5rem */
      font-bold 
      mb-2
    ">
      {animal.nombre}
    </h2>
    <p className="
      text-sm             /* Móvil: 0.875rem */
      tablet:text-base    /* Tablet: 1rem */
      text-gray-600
    ">
      {animal.descripcion}
    </p>
    <button className="
      mt-4 
      tablet-button       /* Clase CSS: min-height 48px en tablets */
      touch-feedback      /* Clase CSS: animación al tocar */
    ">
      Adoptar
    </button>
  </div>
);
```

### Ejemplo 2: Tarjeta Informativa
```tsx
const InfoCard = ({ title, value, icon }) => (
  <div className="
    bg-gradient-to-br 
    from-blue-500 
    to-purple-600
    text-white
    rounded-lg
    p-6
    tablet:p-8          /* Más espaciosa en tablets */
    text-center
    shadow-lg
    hover:scale-105
    transition-transform
    tablet-card
  ">
    <div className="
      text-4xl 
      tablet:text-5xl   /* Ícono más grande */
      mb-4
    ">
      {icon}
    </div>
    <div className="
      text-3xl 
      tablet:text-4xl   /* Valor más visible */
      font-bold 
      mb-2
    ">
      {value}
    </div>
    <div className="
      text-base 
      tablet:text-lg    /* Texto más legible */
      opacity-90
    ">
      {title}
    </div>
  </div>
);
```

---

## 4️⃣ Botones y Elementos Interactivos

### Ejemplo 1: Botones Táctiles
```tsx
// Botones optimizados para touch con tamaños mínimos
<button className="
  px-6 
  py-3 
  tablet:px-8           /* Más ancho en tablets */
  tablet:py-4           /* Más alto en tablets */
  bg-blue-600 
  text-white 
  rounded-lg 
  font-semibold
  min-h-[44px]          /* Mínimo táctil móvil: 44px */
  tablet:min-h-[48px]   /* Mínimo táctil tablet: 48px */
  tablet-button         /* Clase CSS personalizada */
  touch-feedback        /* Animación al presionar */
  hover:bg-blue-700
  transition-colors
">
  Botón de Acción
</button>
```

### Ejemplo 2: Grupo de Botones
```tsx
// Grupo de botones con espacio adaptativo
<div className="
  flex 
  gap-3 
  tablet:gap-6          /* Más espacio en tablets */
  flex-wrap 
  justify-center
">
  <button className="tablet-button touch-feedback">
    Aceptar
  </button>
  <button className="tablet-button touch-feedback">
    Cancelar
  </button>
  <button className="tablet-button touch-feedback">
    Guardar
  </button>
</div>
```

### Ejemplo 3: Links Táctiles
```tsx
// Links con área táctil suficiente
<a 
  href="/detalle" 
  className="
    inline-block
    px-4 
    py-2 
    tablet:px-6 
    tablet:py-3
    text-blue-600 
    font-medium
    touch-target        /* Clase CSS: min 44x44px */
    hover:underline
  "
>
  Ver más detalles
</a>
```

---

## 5️⃣ Formularios Responsivos

### Ejemplo 1: Input de Texto
```tsx
// Inputs más grandes y cómodos en tablets
<input
  type="text"
  className="
    w-full 
    px-4 
    py-2 
    tablet:px-5 
    tablet:py-3         /* Más espacioso */
    text-base 
    tablet:text-lg      /* Texto más grande */
    border 
    border-gray-300 
    rounded-lg
    focus:ring-2 
    focus:ring-blue-500
    min-h-[44px]
    tablet:min-h-[48px]
  "
  placeholder="Ingresa tu nombre"
/>
```

### Ejemplo 2: Formulario Completo
```tsx
// Formulario que se adapta a tablets
<form className="
  space-y-4 
  tablet:space-y-6    /* Más espacio entre campos */
  max-w-md 
  tablet:max-w-2xl    /* Más ancho en tablets */
  mx-auto
">
  <div>
    <label className="
      block 
      text-sm 
      tablet:text-base 
      font-medium 
      mb-2
    ">
      Nombre del Animal
    </label>
    <input 
      type="text" 
      className="w-full tablet:text-lg" 
    />
  </div>
  
  <div>
    <label className="block text-sm tablet:text-base font-medium mb-2">
      Descripción
    </label>
    <textarea 
      className="
        w-full 
        px-4 
        py-3 
        tablet:px-5 
        tablet:py-4
        text-base 
        tablet:text-lg
        border 
        rounded-lg
        min-h-[120px]
        tablet:min-h-[160px]
      "
      rows="4"
    />
  </div>
  
  <button 
    type="submit" 
    className="
      w-full 
      tablet:w-auto       /* Auto-width en tablets */
      tablet-button 
      touch-feedback
    "
  >
    Enviar Formulario
  </button>
</form>
```

---

## 6️⃣ Hero Sections y Banners

### Ejemplo 1: Hero Section Adaptativo
```tsx
// Hero que se optimiza para cada dispositivo
<div className="
  hero-section              /* Clase CSS personalizada */
  min-h-[60vh]
  tablet:min-h-[70vh]       /* Más alto en tablets */
  bg-cover 
  bg-center
  flex 
  items-center 
  justify-center
  px-4 
  tablet:px-8               /* Más padding lateral */
">
  <div className="
    hero-content            /* Clase CSS personalizada */
    tablet-fade-in          /* Animación CSS */
    bg-white 
    bg-opacity-90
    rounded-2xl
    p-6 
    tablet:p-10             /* Más espacioso */
    max-w-md 
    tablet:max-w-2xl        /* Más ancho */
    text-center
  ">
    <h1 className="
      text-3xl 
      tablet:text-4xl 
      lg:text-5xl 
      font-bold 
      mb-4
    ">
      Bienvenido
    </h1>
    <p className="
      text-base 
      tablet:text-lg 
      mb-6
    ">
      Descripción breve del sitio
    </p>
    <div className="
      flex 
      gap-4 
      tablet:gap-6 
      justify-center
    ">
      <button className="tablet-button touch-feedback">
        Empezar
      </button>
      <button className="tablet-button touch-feedback">
        Explorar
      </button>
    </div>
  </div>
</div>
```

---

## 7️⃣ Listas y Tablas

### Ejemplo 1: Lista Adaptativa
```tsx
// Lista que cambia de diseño según el dispositivo
<ul className="
  space-y-2 
  tablet:space-y-4        /* Más espacio en tablets */
">
  {items.map(item => (
    <li 
      key={item.id}
      className="
        flex 
        items-center 
        p-3 
        tablet:p-4
        bg-white 
        rounded-lg 
        shadow-sm
        hover:shadow-md
        transition-shadow
      "
    >
      <div className="
        w-12 h-12 
        tablet:w-16 tablet:h-16
        mr-3 
        tablet:mr-4
      ">
        <img src={item.icon} alt="" />
      </div>
      <div className="flex-1">
        <h3 className="
          text-base 
          tablet:text-lg 
          font-semibold
        ">
          {item.title}
        </h3>
        <p className="
          text-sm 
          tablet:text-base 
          text-gray-600
        ">
          {item.description}
        </p>
      </div>
    </li>
  ))}
</ul>
```

---

## 8️⃣ Modales y Diálogos

### Ejemplo 1: Modal Responsivo
```tsx
// Modal que se adapta al tamaño de la pantalla
<div className="
  fixed 
  inset-0 
  bg-black 
  bg-opacity-50 
  flex 
  items-center 
  justify-center 
  p-4 
  tablet:p-8
  z-50
">
  <div className="
    modal-content          /* Clase CSS personalizada */
    bg-white 
    rounded-2xl 
    p-6 
    tablet:p-8
    max-w-sm 
    tablet:max-w-2xl      /* Más ancho en tablets */
    w-full
    max-h-[90vh]
    overflow-y-auto
    shadow-2xl
  ">
    <h2 className="
      text-2xl 
      tablet:text-3xl 
      font-bold 
      mb-4
    ">
      Título del Modal
    </h2>
    <p className="
      text-base 
      tablet:text-lg 
      mb-6
    ">
      Contenido del modal...
    </p>
    <div className="
      flex 
      gap-3 
      tablet:gap-4 
      justify-end
    ">
      <button className="tablet-button touch-feedback">
        Cancelar
      </button>
      <button className="tablet-button touch-feedback">
        Confirmar
      </button>
    </div>
  </div>
</div>
```

---

## 9️⃣ Clases CSS Personalizadas

### Cómo Usar las Clases Personalizadas

```tsx
// Contenedor optimizado para tablets
<div className="tablet-container">
  Contenido con padding y max-width óptimos
</div>

// Grid de 2 columnas en tablets
<div className="tablet-grid-2">
  <div>Col 1</div>
  <div>Col 2</div>
</div>

// Grid de 3 columnas en tablets
<div className="tablet-grid-3">
  <div>Col 1</div>
  <div>Col 2</div>
  <div>Col 3</div>
</div>

// Tarjeta optimizada para tablets
<div className="tablet-card">
  Contenido de la tarjeta
</div>

// Botón táctil optimizado
<button className="tablet-button touch-feedback">
  Hacer clic
</button>

// Imagen responsiva
<img src="..." className="tablet-image" />

// Mostrar solo en tablets
<div className="tablet-only">
  Solo visible en tablets
</div>

// Ocultar en tablets
<div className="tablet-hidden">
  Oculto en tablets
</div>
```

---

## 🔟 Patrones Comunes

### Patrón 1: Página de Listado
```tsx
const ListingPage = () => (
  <div className="tablet-container">
    <h1 className="text-2xl tablet:text-3xl lg:text-4xl font-bold mb-6">
      Lista de Animales
    </h1>
    
    {/* Filtros */}
    <div className="flex gap-3 tablet:gap-4 mb-6 flex-wrap tablet:justify-center">
      <select className="px-3 py-2 tablet:px-4 tablet:py-3 tablet:text-base">
        <option>Filtro 1</option>
      </select>
      <select className="px-3 py-2 tablet:px-4 tablet:py-3 tablet:text-base">
        <option>Filtro 2</option>
      </select>
    </div>
    
    {/* Grid de tarjetas */}
    <div className="
      grid 
      grid-cols-1 
      tablet-portrait:grid-cols-2 
      tablet-landscape:grid-cols-3 
      gap-6 
      animal-grid
    ">
      {animals.map(animal => (
        <AnimalCard key={animal.id} data={animal} />
      ))}
    </div>
  </div>
);
```

### Patrón 2: Dashboard con Métricas
```tsx
const Dashboard = () => (
  <div className="tablet-container py-6 tablet:py-8">
    <h1 className="text-2xl tablet:text-3xl font-bold mb-6">
      Dashboard
    </h1>
    
    {/* Métricas */}
    <div className="metrics-grid mb-8">
      <MetricCard icon="🐕" value={42} label="Animales" />
      <MetricCard icon="📊" value={15} label="Reportes" />
      <MetricCard icon="❤️" value={8} label="Adopciones" />
      <MetricCard icon="👥" value={23} label="Voluntarios" />
    </div>
    
    {/* Contenido adicional */}
    <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
      <div className="tablet-card">
        <h2 className="text-xl tablet:text-2xl font-bold mb-4">
          Recientes
        </h2>
        {/* Lista */}
      </div>
      <div className="tablet-card">
        <h2 className="text-xl tablet:text-2xl font-bold mb-4">
          Populares
        </h2>
        {/* Lista */}
      </div>
    </div>
  </div>
);
```

---

## 🎯 Consejos y Mejores Prácticas

### ✅ DO (Hacer)
```tsx
// ✅ Usar clases de Tailwind primero
<div className="p-4 tablet:p-6 lg:p-8">

// ✅ Combinar con clases CSS personalizadas cuando sea necesario
<div className="tablet-container tablet:grid-cols-3">

// ✅ Asegurar áreas táctiles mínimas (44px móvil, 48px tablet)
<button className="min-h-[44px] tablet:min-h-[48px]">

// ✅ Usar grids adaptativos por orientación
<div className="tablet-portrait:grid-cols-2 tablet-landscape:grid-cols-3">

// ✅ Escalar tipografía para mejor legibilidad
<p className="text-sm tablet:text-base lg:text-lg">
```

### ❌ DON'T (No Hacer)
```tsx
// ❌ No usar tamaños fijos que no escalan
<div style={{ width: '300px' }}>

// ❌ No olvidar el feedback táctil en elementos interactivos
<button>  // Falta touch-feedback

// ❌ No usar muchas columnas en tablet vertical
<div className="tablet:grid-cols-5">  // Demasiadas columnas

// ❌ No ignorar la orientación del dispositivo
<div className="md:grid-cols-3">  // Igual en portrait y landscape
```

---

## 📱 Testing en Diferentes Dispositivos

### Chrome DevTools
```
1. F12 → Abrir DevTools
2. Ctrl+Shift+M → Modo Responsive
3. Seleccionar:
   - iPad (768x1024)
   - iPad Pro (1024x1366)
   - Surface Pro (912x1368)
4. Probar ambas orientaciones
```

### Firefox Responsive Mode
```
1. Ctrl+Shift+M → Modo Responsive
2. Elegir dispositivo
3. Rotar: Ctrl+Shift+R
4. Simular touch events
```

---

**Última actualización**: 28 de octubre de 2025  
**Versión**: 1.0.0  
**Para más info**: Ver `TABLET_LAYOUT_README.md` y `docs/tablet-layout.md`
