import { PrismaClient } from '@prisma/client';

// Previene que se creen múltiples instancias de PrismaClient en el hot-reload de desarrollo
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Opcional: para ver las consultas SQL en la consola
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;