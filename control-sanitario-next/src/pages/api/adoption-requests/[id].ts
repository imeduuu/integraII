// src/pages/api/adoption-requests/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;

const updateSchema = z.object({
  id_estado_solicitud: z.number().int().positive().optional(),
  fecha_termino_solicitud: z.string().optional(),
  id_adopcion: z.number().int().positive().optional().nullable(),
  mensaje: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const idNum = Number(id);
    if (!idNum || Number.isNaN(idNum)) return res.status(400).json({ error: "Invalid id" });

    if (req.method === "GET") {
      const rec = await prisma.solicitud_adopcion.findUnique({
        where: { id_solicitud_adopcion: idNum },
        include: {
          usuario: { select: { id_usuario: true, nombre_usuario: true, email: true } },
          adopcion: { select: { id_adopcion: true, id_animal: true, disponible: true } },
          estadoSolicitud: { select: { id_estado_solicitud: true, estado_solicitud: true } },
        },
      });
      if (!rec) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(rec);
    }

    if (req.method === "PATCH" || req.method === "PUT") {
      const parsed = updateSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid payload", details: parsed.error.format() });

      const updateData: any = {};
      if (parsed.data.id_estado_solicitud !== undefined) updateData.id_estado_solicitud = parsed.data.id_estado_solicitud;
      if (parsed.data.fecha_termino_solicitud) updateData.fecha_termino_solicitud = new Date(parsed.data.fecha_termino_solicitud);
      if (parsed.data.id_adopcion !== undefined) updateData.id_adopcion = parsed.data.id_adopcion;
      if (parsed.data.mensaje !== undefined) updateData.mensaje = parsed.data.mensaje;

      const updated = await prisma.solicitud_adopcion.update({
        where: { id_solicitud_adopcion: idNum },
        data: updateData,
      });
      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      await prisma.solicitud_adopcion.delete({ where: { id_solicitud_adopcion: idNum } });
      return res.status(204).end();
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error("adoption-requests [id] error:", err);
    return res.status(500).json({ error: err.message ?? "Internal error" });
  }
}
