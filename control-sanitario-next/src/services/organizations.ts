import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Schemas de validación con Zod
export const organizationIdSchema = z.object({
  id: z.preprocess((v) => (typeof v === 'string' ? parseInt(v as string, 10) : v), z.number().int().positive()),
});

export const organizationCreateSchema = z.object({
  nombre_organizacion: z.string().min(1, 'El nombre es requerido').max(50),
  telefono_organizacion: z.string().min(3).max(20),
  email_organizacion: z.string().email().max(100),
  direccion: z.string().min(1).max(100),
  id_ciudad: z.number().int().positive().optional().nullable(),
});

export const organizationUpdateSchema = organizationCreateSchema.partial();

export type OrganizationCreateInput = z.infer<typeof organizationCreateSchema>;
export type OrganizationUpdateInput = z.infer<typeof organizationUpdateSchema>;

function formatZodError(err: unknown) {
  if (err instanceof z.ZodError) {
    return {
      error: 'Validación fallida',
      issues: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message, code: i.code })),
    };
  }
  return { error: 'Error inesperado', details: String(err) };
}

// Listar todas las organizaciones
export async function listOrganizations() {
  try {
    const data = await prisma.organizacion.findMany();
    return { ok: true as const, status: 200, data };
  } catch (err) {
    return { ok: false as const, status: 500, ...formatZodError(err) };
  }
}

// Obtener organización por ID
export async function getOrganizationById(params: { id: unknown }) {
  try {
    const { id } = organizationIdSchema.parse(params);
    const data = await prisma.organizacion.findUnique({ where: { id_organizacion: id } });
    if (!data) return { ok: false as const, status: 404, error: 'Organización no encontrada' };
    return { ok: true as const, status: 200, data };
  } catch (err) {
    const isValidation = err instanceof z.ZodError;
    return { ok: false as const, status: isValidation ? 400 : 500, ...formatZodError(err) };
  }
}

// Crear organización
export async function createOrganization(body: unknown) {
  try {
    const input = organizationCreateSchema.parse(body);
    const exists = await prisma.organizacion.findUnique({ where: { email_organizacion: input.email_organizacion } });
    if (exists) return { ok: false as const, status: 409, error: 'El email ya está registrado' };
    const data = await prisma.organizacion.create({
      data: {
        nombre_organizacion: input.nombre_organizacion,
        telefono_organizacion: input.telefono_organizacion,
        email_organizacion: input.email_organizacion,
        direccion: input.direccion,
        id_ciudad: input.id_ciudad ?? undefined,
      },
    });
    return { ok: true as const, status: 201, data };
  } catch (err) {
    const isValidation = err instanceof z.ZodError;
    return { ok: false as const, status: isValidation ? 400 : 500, ...formatZodError(err) };
  }
}

// Actualizar organización
export async function updateOrganization(params: { id: unknown }, body: unknown) {
  try {
    const { id } = organizationIdSchema.parse(params);
    const input = organizationUpdateSchema.parse(body);

    // Si viene email, verificar unicidad (excluyendo la actual)
    if (input.email_organizacion) {
      const exists = await prisma.organizacion.findFirst({
        where: {
          email_organizacion: input.email_organizacion,
          NOT: { id_organizacion: id },
        },
      });
      if (exists) return { ok: false as const, status: 409, error: 'El email ya está registrado en otra organización' };
    }

    const data = await prisma.organizacion.update({
      where: { id_organizacion: id },
      data: {
        ...input,
        id_ciudad: input.id_ciudad ?? undefined,
      },
    });
    return { ok: true as const, status: 200, data };
  } catch (err) {
    const isValidation = err instanceof z.ZodError;
    // Si no existe, Prisma lanza error; respondemos 404 cuando aplique
    const message = String(err);
    if (message.includes('Record to update not found')) {
      return { ok: false as const, status: 404, error: 'Organización no encontrada' };
    }
    return { ok: false as const, status: isValidation ? 400 : 500, ...formatZodError(err) };
  }
}

// Eliminar organización
export async function deleteOrganization(params: { id: unknown }) {
  try {
    const { id } = organizationIdSchema.parse(params);
    await prisma.organizacion.delete({ where: { id_organizacion: id } });
    return { ok: true as const, status: 200, data: { message: 'Organización eliminada' } };
  } catch (err) {
    const isValidation = err instanceof z.ZodError;
    const message = String(err);
    if (message.includes('Record to delete does not exist')) {
      return { ok: false as const, status: 404, error: 'Organización no encontrada' };
    }
    return { ok: false as const, status: isValidation ? 400 : 500, ...formatZodError(err) };
  }
}

// Listar usuarios de una organización
export async function listUsersByOrganizationId(params: { id: unknown }) {
  try {
    const { id } = organizationIdSchema.parse(params);
    // Verificar que la organización exista
    const org = await prisma.organizacion.findUnique({ where: { id_organizacion: id } });
    if (!org) return { ok: false as const, status: 404, error: 'Organización no encontrada' };

    const data = await prisma.usuario.findMany({ where: { id_organizacion: id } });
    return { ok: true as const, status: 200, data };
  } catch (err) {
    const isValidation = err instanceof z.ZodError;
    return { ok: false as const, status: isValidation ? 400 : 500, ...formatZodError(err) };
  }
}
