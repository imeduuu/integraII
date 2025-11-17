// src/pages/api/races/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;

const createSchema = z.object({
  id_especie: z.number().int().positive(),
  raza: z.string().min(1),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const list = await prisma.raza.findMany({
        orderBy: { id_raza: "asc" },
        select: {
          id_raza: true,
          id_especie: true,
          raza: true,
        },
      });
      return res.status(200).json(list);
    }

    if (req.method === "POST") {
      const parsed = createSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid payload", details: parsed.error.format() });
      }

      const created = await prisma.raza.create({
        data: {
          id_especie: parsed.data.id_especie,
          raza: parsed.data.raza,
        },
        select: {
          id_raza: true,
          id_especie: true,
          raza: true,
        },
      });

      return res.status(201).json(created);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error("races index error:", err);
    return res.status(500).json({ error: err.message ?? "Internal error" });
  }
}
