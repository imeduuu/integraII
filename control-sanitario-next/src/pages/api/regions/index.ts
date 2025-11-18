import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      // get all regions (with cities if you want)
      const regions = await prisma.region.findMany({
        include: { ciudades: true }, // quita esto si no quieres las ciudades
      });

      return res.status(200).json(regions);
    }

    if (req.method === "POST") {
      const { nombre_region } = req.body;

      if (!nombre_region || typeof nombre_region !== "string") {
        return res
          .status(400)
          .json({ error: "nombre_region is required and must be string" });
      }

      const newRegion = await prisma.region.create({
        data: {
          nombre_region,
          // si quieres crear ciudades anidadas, aqui se puede usar create: [...]
        },
      });

      return res.status(201).json(newRegion);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res
      .status(405)
      .json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    console.error("ERROR /api/regions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
