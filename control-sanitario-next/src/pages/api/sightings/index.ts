// src/pages/api/sightings/index.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ===========================
  // GET → LISTAR TODOS
  // ===========================
  if (req.method === "GET") {
    try {
      const data = await prisma.avistamiento.findMany({
        include: {
          avistamiento_foto: true,
          usuario: true,
          especie: true,
          estado_salud: true,
          estado_avistamiento: true,
        }
      });

      return res.status(200).json(data);

    } catch (error) {
      console.error("GET error:", error);
      return res.status(500).json({ error: "Error al obtener avistamientos" });
    }
  }

  // ===========================
  // POST → CREAR
  // ===========================
  if (req.method === "POST") {
    const {
      id_usuario,
      id_especie,
      id_estado_salud,
      id_estado_avistamiento,
      descripcion,
      direccion,
      ubicacion
    } = req.body;

    // Validación de campos obligatorios
    if (
      !id_usuario ||
      !id_especie ||
      !id_estado_salud ||
      !id_estado_avistamiento
    ) {
      return res.status(400).json({
        error: "Faltan campos obligatorios"
      });
    }

    try {
      const newSighting = await prisma.avistamiento.create({
        data: {
          id_usuario: Number(id_usuario),
          id_especie: Number(id_especie),
          id_estado_salud: Number(id_estado_salud),
          id_estado_avistamiento: Number(id_estado_avistamiento),
          descripcion,
          direccion,
          ubicacion
        }
      });

      return res.status(201).json(newSighting);

    } catch (error) {
      console.error("POST error:", error);
      return res.status(500).json({ error: "Error al crear avistamiento" });
    }
  }

 
  // MÉTODO NO PERMITIDO
  // ===========================
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Método ${req.method} no permitido` });
}
