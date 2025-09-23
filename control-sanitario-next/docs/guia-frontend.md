# Guía rápida de desarrollo Frontend

## 1. Levantar el proyecto localmente

1. Clona el repositorio:
   ```bash
   git clone https://github.com/imeduuu/integraII.git
   ```
2. Instala dependencias:
   ```bash
   cd integraII/control-sanitario-next
   npm install
   ```
3. Ejecuta el proyecto:
   ```bash
   npm run dev
   ```
   El proyecto estará disponible en `http://localhost:3000`.

## 2. Estructura de carpetas y archivos principales

- `src/components/`: Componentes reutilizables.
  - `ui/`: Componentes UI estándar (`Button`, `Input`, `Modal`).
- `src/pages/`: Páginas principales del sistema.
- `src/services/`: Lógica de servicios y API.
- `src/styles/`: Archivos CSS y temas.
- `prisma/`: Esquema y migraciones de base de datos.
- `public/`: Recursos estáticos (imágenes, etc).

## 3. Crear nuevos componentes y páginas

- Componentes: Ubícalos en `src/components/`.
- Páginas: Crea archivos `.tsx` en `src/pages/`.
- Usa los componentes UI estándar para botones, inputs y modales.

## 4. Ejemplo de uso de componentes UI estándar

```tsx
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";

<Button variant="primary">Guardar</Button>
<Input type="text" placeholder="Nombre" />
<Modal isOpen={true} onClose={() => {}}>Contenido del modal</Modal>
```

## 5. Convenciones de nombres y estilos

- Archivos y carpetas en minúsculas y kebab-case (`mi-componente.tsx`).
- Usa Tailwind CSS para estilos rápidos y consistentes.
- Componentes UI deben recibir `props` para personalización.
- Separa la lógica de negocio de la presentación.
- Comenta el código donde se modifique lógica relevante.

## 6. Tips para mantener el código limpio y consistente

- Usa los componentes UI estándar, no elementos nativos.
- Mantén los componentes pequeños y reutilizables.
- Evita lógica compleja en el render, usa funciones auxiliares.
- Documenta cambios importantes directamente en el código.
- Revisa y prueba cada página tras cambios.

## 7. Enlaces útiles

- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev/learn)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Prisma](https://www.prisma.io/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

---

Esta guía busca facilitar la incorporación de nuevos integrantes y mantener la calidad y consistencia del código frontend.
