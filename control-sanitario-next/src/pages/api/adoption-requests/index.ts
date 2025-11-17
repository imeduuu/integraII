// src/pages/api/adoption-requests/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;

const createSchema = z.object({
  id_usuario: z.number().int().positive(),
  id_adopcion: z.number().int().positive().nullable().optional(),
  mensaje: z.string().min(1).optional(),
  id_estado_solicitud: z.number().int().positive().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const { status, animalId } = req.query;
      const where: any = {};

      // filter by estado (either numeric id or name)
      if (status) {
        const s = String(status);
        if (/^\d+$/.test(s)) {
          where.id_estado_solicitud = Number(s);
        } else {
          where.estadoSolicitud = { is: { estado_solicitud: s } };
        }
      }

      // filter by animalId via relation adopcion -> id_animal
      if (animalId) {
        const a = Number(animalId);
        if (!Number.isNaN(a)) {
          where.adopcion = { is: { id_animal: a } };
        }
      }

      const list = await prisma.solicitud_adopcion.findMany({
        where,
        orderBy: { fecha_ingreso_solicitud: "desc" },
        select: {
          id_solicitud_adopcion: true,
          id_usuario: true,
          id_adopcion: true,
          fecha_ingreso_solicitud: true,
          fecha_termino_solicitud: true,
          id_estado_solicitud: true,
          usuario: { select: { id_usuario: true, nombre_usuario: true, email: true } },
          adopcion: { select: { id_adopcion: true, id_animal: true, disponible: true } },
          estadoSolicitud: { select: { id_estado_solicitud: true, estado_solicitud: true } },
        },
      });

      return res.status(200).json(list);
    }

    if (req.method === "POST") {
      const parsed = createSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid payload", details: parsed.error.format() });

      const created = await prisma.solicitud_adopcion.create({
        data: {
          id_usuario: parsed.data.id_usuario,
          id_adopcion: parsed.data.id_adopcion ?? undefined,
          mensaje: parsed.data.mensaje ?? undefined,
          fecha_ingreso_solicitud: new Date(),
          id_estado_solicitud: parsed.data.id_estado_solicitud ?? undefined,
        },
      });

      return res.status(201).json(created);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error("adoption-requests index error:", err);
    return res.status(500).json({ error: err.message ?? "Internal error" });
  }
}
