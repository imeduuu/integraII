# Sistema de Animales en Adopción y Rescatados

## Descripción
Este proyecto permite mostrar una lista de animales disponibles para adopción o que han sido rescatados, con información relevante como nombre, especie, estado general y ubicación. La aplicación incluye filtros interactivos por estado, especie y zona, y una opción para mostrar un mapa de la ubicación de los animales.

## Estructura de Datos
Se utiliza un arreglo de datos simulados (`animalsData`) que contiene los animales con los siguientes campos:

```ts
export const animalsData = [
  { id: 1, nombre: 'Firulais', especie: 'Perro', estado_general: 'Rescatado', zona: 'Norte' },
  { id: 2, nombre: 'Mishi', especie: 'Gato', estado_general: 'En adopción', zona: 'Sur' },
  { id: 3, nombre: 'Luna', especie: 'Perro', estado_general: 'En adopción', zona: 'Centro' },
  { id: 4, nombre: 'Tom', especie: 'Gato', estado_general: 'Rescatado', zona: 'Norte' },
];

Componentes Principales
AnimalCard

Muestra la información de un animal: nombre, estado, ubicación, edad (opcional) e imágenes (opcional).

Botón para ir a la página de adopción.

Si no hay imágenes, se muestra una imagen por defecto.

Animals

Página principal que lista todos los animales.

Filtros interactivos:

Estado (estado_general)

Zona (zona)

Especie (especie)

Los filtros funcionan de manera dinámica y combinada.

Funcionalidades

Listado de animales: Se muestran todos los animales disponibles usando datos simulados.

Filtros dinámicos: Permite filtrar los animales por estado, especie y zona.

Tecnologías Usadas

Frontend: React, Next.js, TypeScript

Estilos: Tailwind CSS

Gestión de datos: Array de datos simulados (animalsData)

Navegación: next/router para redirección en botones