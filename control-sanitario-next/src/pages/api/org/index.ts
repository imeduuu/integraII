import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// /api/org → GET (listar), POST (crear)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const organizaciones = await prisma.organizacion.findMany();
      return res.status(200).json(organizaciones);
    }

    if (req.method === "POST") {
      const { nombre_organizacion, telefono_organizacion, email_organizacion, id_ciudad, direccion } = req.body;

      if (!nombre_organizacion || !telefono_organizacion || !email_organizacion || !direccion) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const nueva = await prisma.organizacion.create({
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

      return res.status(201).json(nueva);
    }

    return res.status(405).json({ error: "Método no permitido" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Error interno del servidor" });
  }
}