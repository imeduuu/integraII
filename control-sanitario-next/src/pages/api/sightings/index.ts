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
      // Intentamos obtener avistamientos con relaciones (normal case)
      try {
        const data = await prisma.avistamiento.findMany({
          include: {
            fotos: true,
            usuario: true,
            especie: true,
            estado_salud: true,
            estado_avistamiento: true,
          }
        });

        try {
          const count = await prisma.avistamiento.count();
          console.log('API /api/sightings - count:', count);
          if (Array.isArray(data) && data.length > 0) console.log('API /api/sightings - sample[0]:', data[0]);
        } catch (logErr) {
          console.warn('API /api/sightings - failed to log count/sample', logErr);
        }

        return res.status(200).json(data);
      } catch (err) {
        // Si la consulta falla por columna inexistente (p. ej. "estado_general"), hacemos una consulta fallback
        const msg = err instanceof Error ? err.message : String(err);
        console.warn('Primary sightings query failed, attempting fallback. Error:', msg);

        if (msg.includes('estado_general') || msg.includes('column "estado_general"')) {
          try {
            // Fallback: seleccionar solo campos escalares conocidos (sin estado_general)
            const fallback = await prisma.avistamiento.findMany({
              select: {
                id_avistamiento: true,
                id_usuario: true,
                id_estado_avistamiento: true,
                id_estado_salud: true,
                id_especie: true,
                fecha_creacion: true,
                fecha_actualizacion: true,
                descripcion: true,
                direccion: true,
                ubicacion: true,
                id_animal: true,
                latitud: true,
                longitud: true,
                zona: true
              },
              orderBy: { id_avistamiento: 'asc' },
              take: 50
            });

            console.log('API /api/sightings - fallback result count:', fallback.length);
            return res.status(200).json(fallback);
          } catch (fallbackErr) {
            console.error('Sighting fallback failed:', fallbackErr);
            return res.status(500).json({ error: 'Error al obtener avistamientos (fallback)' });
          }
        }

        // Si no es por estado_general, devolvemos 500 con el error original
        console.error('GET error:', err);
        return res.status(500).json({ error: 'Error al obtener avistamientos' });
      }

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
