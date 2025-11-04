import prisma from '../db';

/**
 * Retorna todas las ciudades que pertenecen a una región específica.
 * @param regionId id de la región (number o string convertible a number)
 */
export async function getCitiesByRegion(regionId: number | string) {
  const id = Number(regionId);
  if (!Number.isInteger(id) || id <= 0) throw new Error('regionId inválido');

  return prisma.$queryRaw`SELECT * FROM ciudad WHERE id_region = ${id} ORDER BY nombre`;
}