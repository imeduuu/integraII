# Transitions & Animaciones

Implementaciones realizadas para mejorar UX con animaciones suaves.

Componentes y vistas animadas:

- `control-sanitario-next/src/components/ui/Modal.tsx`
  - Modal animado con Framer Motion: entrada (fade + scale) y salida coordinada.
  - Cierre espera a que termine la animación antes de notificar al padre.

- `control-sanitario-next/src/components/AnimalList.tsx`
  - Las tarjetas (`AnimalCard`) ahora tienen animación de entrada (fade + translateY) con pequeño stagger.

- `control-sanitario-next/src/components/AnimalDetail.tsx`
  - Soporte para mostrar `SkeletonCard` mientras carga; se puede envolver con Framer Motion si se desea animar entrada.

- `control-sanitario-next/src/components/CampaignList.tsx`, `UserMetricsCards.tsx`, `CommentSection.tsx`
  - Añadidos props `isLoading` y placeholders; se pueden complementar con animaciones de entrada.

Notas:

- Hecho con Framer Motion para modales y animaciones de entrada de tarjetas. Tailwind y utilidades CSS se usan para placeholders.
- Recomendación: pasar `isLoading` real desde los hooks/fetchers y usar `AnimatePresence` para transiciones de ruta si se desea animar navegaciones completas.

Pruebas y rendimiento:

- Verifica visualmente en dev (`npm run dev`) las páginas `/animals`, `/user/1`, y modales (p.ej. modal de adopción) para confirmar que las animaciones son suaves.
- Si notas jank en dispositivos lentos, reducir duración y eliminar stagger amplio.
