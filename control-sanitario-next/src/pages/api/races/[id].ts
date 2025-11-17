// src/pages/api/races/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;

const updateSchema = z.object({
  id_especie: z.number().int().positive().optional(),
  raza: z.string().min(1).optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const idNum = Number(id);
    if (Number.isNaN(idNum) || idNum <= 0) {
      return res.status(400).json({ error: "Invalid id" });
    }

    if (req.method === "GET") {
      const record = await prisma.raza.findUnique({
        where: { id_raza: idNum },
        select: {
          id_raza: true,
          id_especie: true,
          raza: true,
        },
      });
      if (!record) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(record);
    }

    if (req.method === "PATCH") {
      const parsed = updateSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid payload", details: parsed.error.format() });
      }

      const exists = await prisma.raza.findUnique({ where: { id_raza: idNum } });
      if (!exists) return res.status(404).json({ error: "Not found" });

      const updated = await prisma.raza.update({
        where: { id_raza: idNum },
        data: {
          id_especie: parsed.data.id_especie ?? undefined,
          raza: parsed.data.raza ?? undefined,
        },
        select: {
          id_raza: true,
          id_especie: true,
          raza: true,
        },
      });

      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      const exists = await prisma.raza.findUnique({ where: { id_raza: idNum } });
      if (!exists) return res.status(404).json({ error: "Not found" });

      await prisma.raza.delete({ where: { id_raza: idNum } });
      return res.status(204).end();
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error("races [id] error:", err);
    return res.status(500).json({ error: err.message ?? "Internal error" });
  }
}
