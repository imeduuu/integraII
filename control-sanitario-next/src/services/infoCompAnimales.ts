// services/infoCompAnimales.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getFullAnimals() {
  const animals = await prisma.animal.findMany({
    include: {
      estado_salud: {
        select: {
          id_estado_salud: true,
          estado_salud: true,
        },
      },
      raza: {
        select: {
          id_raza: true,
          raza: true,
        },
      },
      propietario: {
        select: {
          id_usuario: true,
          nombre_usuario: true,
          apellido_paterno: true,
          apellido_materno: true,
          email: true,
        },
      },
    },
  });

  return animals;
}

export default { getFullAnimals };
