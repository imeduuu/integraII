import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // GET /api/regions -> Listar regiones
    if (req.method === 'GET') {
      const regions = await prisma.region.findMany();
      return res.status(200).json(regions);
    }

    // POST /api/regions -> Crear región
    if (req.method === 'POST') {
      const { nombre_region } = req.body;

      if (!nombre_region) {
        return res.status(400).json({ error: 'nombre_region es requerido' });
      }

      const newRegion = await prisma.region.create({
        data: { nombre_region },
      });

      return res.status(201).json(newRegion);
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (error) {
    console.error('Error Regions API:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
