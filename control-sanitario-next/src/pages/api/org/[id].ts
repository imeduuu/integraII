import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// /api/org/:id → GET, PUT, DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    // GET /api/org/:id → obtener org
    if (req.method === "GET") {
      const organizacion = await prisma.organizacion.findUnique({
        where: { id_organizacion: id },
      });

      if (!organizacion) {
        return res.status(404).json({ error: "Organización no encontrada" });
      }

      return res.status(200).json(organizacion);
    }

    // PUT /api/org/:id → actualizar org
    if (req.method === "PUT") {
      const { nombre_organizacion, telefono_organizacion, email_organizacion, id_ciudad, direccion } = req.body;

      if (!nombre_organizacion || !telefono_organizacion || !email_organizacion || !direccion) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const actualizada = await prisma.organizacion.update({
        where: { id_organizacion: id },
        data: {
          nombre_organizacion,
          telefono_organizacion,
          email_organizacion,
          direccion,
          ...(id_ciudad && {
            ciudad: { connect: { id_ciudad: Number(id_ciudad) } }
          })
        }
      });

      return res.status(200).json(actualizada);
    }

    // DELETE /api/org/:id → eliminar
    if (req.method === "DELETE") {
      await prisma.organizacion.delete({
        where: { id_organizacion: id },
      });

      return res.status(200).json({ message: "Organización eliminada" });
    }

    return res.status(405).json({ error: "Método no permitido" });

  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Error interno" });
  }
}