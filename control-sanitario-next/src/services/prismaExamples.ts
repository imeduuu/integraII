import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Ejemplo: obtener todos los avistamientos con datos de usuario y animal
export async function getAvistamientosEjemplo() {
  return await prisma.avistamiento.findMany({
    include: {
      usuario: true,
      animal: true,
      especie: true,
      estado_avistamiento: true,
      estado_salud: true,
    },
    take: 5,
  });
}

// Ejemplo: obtener todas las solicitudes de adopción con datos de usuario y animal
export async function getSolicitudesAdopcionEjemplo() {
  return await prisma.solicitud_adopcion.findMany({
    include: {
      usuario: true,
      animal: true,
      estadoSolicitud: true,
    },
    take: 5,
  });
}

// Puedes agregar más queries de ejemplo según lo que necesites consultar

export default prisma;
