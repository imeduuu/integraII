// services/health-states.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getHealthStates() {
  const estados = await prisma.estado_salud.findMany({
    select: {
      id_estado_salud: true,
      estado_salud: true,
    },
  });
  return estados;
}

export default { getHealthStates };
