// src/pages/api/adoptions/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;

const createSchema = z.object({
  id_animal: z.number().int().positive(),
  id_usuario_rescatista: z.number().int().positive(),
  descripcion: z.string().optional(),
  disponible: z.boolean().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const { status, animalId } = req.query;
      const where: any = {};
      if (status !== undefined) where.disponible = String(status) === "true";
      if (animalId !== undefined) {
        const a = Number(animalId);
        if (!Number.isNaN(a)) where.id_animal = a;
      }

      const list = await prisma.adopcion.findMany({
        where,
        orderBy: { fecha_publicacion: "desc" },
        select: {
          id_adopcion: true,
          id_animal: true,
          id_usuario_rescatista: true,
          id_usuario_adoptante: true,
          fecha_publicacion: true,
          fecha_adopcion: true,
          disponible: true,
          descripcion: true,
        },
      });

      return res.status(200).json(list);
    }

    if (req.method === "POST") {
      const parsed = createSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid payload", details: parsed.error.format() });

      const created = await prisma.adopcion.create({
        data: {
          id_animal: parsed.data.id_animal,
          id_usuario_rescatista: parsed.data.id_usuario_rescatista,
          descripcion: parsed.data.descripcion ?? undefined,
          disponible: parsed.data.disponible ?? true,
        },
      });

      return res.status(201).json(created);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error("adoptions index error:", err);
    return res.status(500).json({ error: err.message ?? "Internal error" });
  }
}
