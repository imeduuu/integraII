import { PrismaClient } from '@prisma/client';

declare global {
  // allow global prisma during dev to avoid too many clients
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ??
  new PrismaClient({
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export interface CreateAdoptionDTO {
  animalId: number;
  userId: number;
  adoptedAt?: Date;
}

/** Utilidades para detectar nombres reales de modelos en el client Prisma */
function lowerFirst(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function getModelNames(): string[] {
  // acceso no tipado al DMMF para aprender los modelos disponibles
  const dmmf = (prisma as any)._dmmf;
  if (!dmmf) return [];
  return Object.keys(dmmf.modelMap || {});
}

function detectModelByKeyword(keyword: string): string | null {
  const models = getModelNames();
  for (const m of models) {
    if (m.toLowerCase().includes(keyword)) {
      return lowerFirst(m); // nombre de propiedad en prisma client
    }
  }
  return null;
}

function detectAdoptionModel(): string | null {
  return detectModelByKeyword('adopt') || detectModelByKeyword('adoption') || detectModelByKeyword('adoptions') || null;
}
function detectAnimalModel(): string | null {
  return detectModelByKeyword('animal') || detectModelByKeyword('pet') || detectModelByKeyword('pets') || null;
}
function detectUserModel(): string | null {
  return detectModelByKeyword('user') || detectModelByKeyword('adopter') || detectModelByKeyword('person') || null;
}

/** Busca adopciones intentando usar el modelo detectado y relaciones comunes */
async function findAdoptionsWithFlexibleInclude() {
  const adoptionModel = detectAdoptionModel();
  if (!adoptionModel) throw new Error('No se detectó un modelo relacionado con adopciones en Prisma.');

  const animalModel = detectAnimalModel();
  const userModel = detectUserModel();

  // opciones de include dinámico
  const includeOptions: any[] = [];
  if (animalModel && userModel) includeOptions.push({ [animalModel]: true, [userModel]: true });
  if (animalModel) includeOptions.push({ [animalModel]: true });
  if (userModel) includeOptions.push({ [userModel]: true });
  includeOptions.push({}); // fallback sin include

  for (const include of includeOptions) {
    try {
      // acceso dinámico al modelo en runtime
      // @ts-ignore
      const result = await (prisma as any)[adoptionModel].findMany({
        include: Object.keys(include).length ? include : undefined,
        orderBy: { adoptedAt: 'desc' } as any,
      });
      return result;
    } catch (e) {
      // intentar siguiente include
    }
  }

  // si todo falla, intentar findMany simple
  // @ts-ignore
  return (prisma as any)[adoptionModel].findMany({ orderBy: { adoptedAt: 'desc' } } as any);
}

export async function getAllAdoptions() {
  try {
    const adoptions = await findAdoptionsWithFlexibleInclude();
    return adoptions;
  } catch (error) {
    throw new Error(`Error obteniendo adopciones: ${(error as Error).message}`);
  }
}

async function findAnimalById(id: number) {
  const animalModel = detectAnimalModel();
  if (!animalModel) return null;
  try {
    // @ts-ignore
    return await (prisma as any)[animalModel].findUnique({ where: { id } });
  } catch {
    return null;
  }
}

async function findUserById(id: number) {
  const userModel = detectUserModel();
  if (!userModel) return null;
  try {
    // @ts-ignore
    return await (prisma as any)[userModel].findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export async function createAdoption(data: CreateAdoptionDTO) {
  const { animalId, userId, adoptedAt } = data;
  const adoptionModel = detectAdoptionModel();
  if (!adoptionModel) throw new Error('Modelo de adopción no detectado en Prisma.');

  try {
    const animal = await findAnimalById(animalId);
    if (!animal) throw new Error('Animal no encontrado');

    const user = await findUserById(userId);
    if (!user) throw new Error('Usuario adoptante no encontrado');

    // crear adopción de forma dinámica (campos suponen animalId/userId/adoptedAt)
    // @ts-ignore
    const adoption = await (prisma as any)[adoptionModel].create({
      data: {
        animalId,
        userId,
        adoptedAt: adoptedAt ?? new Date(),
      },
      include: {
        // intento de incluir relaciones por nombres comunes; si no existen se ignora en runtime
        // @ts-ignore
        [detectAnimalModel() ?? '']: true,
        // @ts-ignore
        [detectUserModel() ?? '']: true,
      } as any,
    });

    return adoption;
  } catch (error) {
    throw new Error(`Error creando adopción: ${(error as Error).message}`);
  }
}

export default {
  getAllAdoptions,
  createAdoption,
};