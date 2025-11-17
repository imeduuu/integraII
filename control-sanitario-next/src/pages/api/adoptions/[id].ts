// src/pages/api/adoptions/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;

const updateSchema = z.object({
  disponible: z.boolean().optional(),
  id_usuario_adoptante: z.number().int().positive().optional().nullable(),
  fecha_adopcion: z.string().optional(),
  descripcion: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const idNum = Number(id);
    if (!idNum || Number.isNaN(idNum)) return res.status(400).json({ error: "Invalid id" });

    if (req.method === "GET") {
      const rec = await prisma.adopcion.findUnique({
        where: { id_adopcion: idNum },
      });
      if (!rec) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(rec);
    }

    if (req.method === "PATCH" || req.method === "PUT") {
      const parsed = updateSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid payload", details: parsed.error.format() });

      const updateData: any = {};
      if (parsed.data.disponible !== undefined) updateData.disponible = parsed.data.disponible;
      if (parsed.data.id_usuario_adoptante !== undefined) updateData.id_usuario_adoptante = parsed.data.id_usuario_adoptante ?? null;
      if (parsed.data.fecha_adopcion) updateData.fecha_adopcion = new Date(parsed.data.fecha_adopcion);
      if (parsed.data.descripcion !== undefined) updateData.descripcion = parsed.data.descripcion;

      const updated = await prisma.adopcion.update({
        where: { id_adopcion: idNum },
        data: updateData,
      });

      return res.status(200).json(updated);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error("adoptions [id] error:", err);
    return res.status(500).json({ error: err.message ?? "Internal error" });
  }
}
