# Skeleton Loading — Implementaciones

Este documento lista los lugares donde se implementó skeleton loading y cómo funciona.

Implementaciones realizadas:

- `control-sanitario-next/src/components/ui/Skeleton.tsx`
  - Componente reutilizable `Skeleton`, `SkeletonCard` y `SkeletonList`.
  - Basado en utilidades de Tailwind (clases `animate-pulse`, `bg-gray-*`).

- `control-sanitario-next/src/components/AnimalList.tsx`
  - Añadido prop opcional `isLoading?: boolean`.
  - Cuando `isLoading` es true se renderiza `SkeletonList` en lugar de las tarjetas reales.

- `control-sanitario-next/src/components/AnimalDetail.tsx`
  - Añadido prop opcional `isLoading?: boolean` y `SkeletonCard` mientras carga.

- `control-sanitario-next/src/components/CommentSection.tsx`
  - Añadido prop opcional `isLoading?: boolean` y placeholders para comentarios mientras carga.

- `control-sanitario-next/src/components/UserMetricsCards.tsx`
  - Añadido prop opcional `isLoading?: boolean` para mostrar placeholders de métricas.

- `control-sanitario-next/src/components/CampaignList.tsx`
  - Añadido prop opcional `isLoading?: boolean` y uso de `SkeletonCard` para placeholders.

- `control-sanitario-next/src/pages/user/[id].tsx`
  - Reemplazado spinner por placeholders basados en skeletons (imagen, nombre y stats).

Pruebas:

- Se añadió un test básico para `AnimalList` que verifica que el skeleton se renderiza cuando `isLoading` = true.

Notas y siguientes pasos:

- Integrar `isLoading` real en componentes que usen llamadas remotas: cuando se migre a SWR/React Query o fetch + useEffect, pasar el flag `isLoading` a `AnimalList`.
- Considerar añadir variantes de skeleton para tablas y galerías.
