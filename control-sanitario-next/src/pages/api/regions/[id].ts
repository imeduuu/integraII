// control-sanitario-next/src/pages/api/regions/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  // Si el id en Prisma es Int:
  const regionId = Number(id);
  if (Number.isNaN(regionId)) {
    return res.status(400).json({ message: "Id must be a number" });
  }

  // Si tu modelo usa id string, cambia where: { id: regionId } por where: { id }

  try {
    if (req.method === "GET") {
      const region = await prisma.region.findUnique({
        where: { id: regionId },
      });

      if (!region) {
        return res.status(404).json({ message: "Region not found" });
      }

      return res.status(200).json(region);
    }

    if (req.method === "PUT" || req.method === "PATCH") {
      const data = req.body;

      const updated = await prisma.region.update({
        where: { id: regionId },
        data,
      });

      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      await prisma.region.delete({
        where: { id: regionId },
      });

      // 204 sin body
      return res.status(204).end();
    }

    res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  } catch (error) {
    console.error("Error in /api/regions/[id]:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
