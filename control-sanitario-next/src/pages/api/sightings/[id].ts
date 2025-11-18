// src/pages/api/sightings/[id].ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Verificar que el ID sea un número válido
  const sightingId = Number(id);
  if (isNaN(sightingId)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  // -------------------
  // GET por ID
  // -------------------
  if (req.method === "GET") {
    try {
      const avistamiento = await prisma.avistamiento.findUnique({
        where: { id_avistamiento: sightingId },
        include: {
          avistamiento_foto: true,
          usuario: true,
          especie: true,
          estado_salud: true,
          estado_avistamiento: true,
        }
      });

      if (!avistamiento) {
        return res.status(404).json({ error: "Avistamiento no encontrado" });
      }

      return res.status(200).json(avistamiento);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener avistamiento" });
    }
  }

  // -------------------
  // PUT → ACTUALIZAR
  // -------------------
  if (req.method === "PUT") {
    try {
      const updated = await prisma.avistamiento.update({
        where: { id_avistamiento: sightingId },
        data: {
          ...req.body,
          fecha_actualizacion: new Date(),
        }
      });

      return res.status(200).json(updated);
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar avistamiento" });
    }
  }

  // -------------------
  // DELETE → ELIMINAR
  // -------------------
  if (req.method === "DELETE") {
    try {
      await prisma.avistamiento.delete({
        where: { id_avistamiento: sightingId }
      });

      return res.status(200).json({ message: "Avistamiento eliminado correctamente" });
    } catch (error) {
      return res.status(500).json({ error: "Error al eliminar avistamiento" });
    }
  }

  // Métodos no permitidos
  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).json({ error: `Método ${req.method} no permitido` });
}
