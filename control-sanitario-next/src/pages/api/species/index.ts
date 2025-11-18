import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET: listar todas
  if (req.method === 'GET') {
    try {
      const especies = await prisma.especie.findMany();
      return res.status(200).json(especies);
    } catch (error) {
      return res.status(500).json({
        error: 'Error al obtener especies',
        details: String(error)
      });
    }
  }

  // POST: crear
  if (req.method === 'POST') {
    const { especie } = req.body;

    if (!especie || especie.trim() === '') {
      return res.status(400).json({ error: 'El campo "especie" es obligatorio.' });
    }

    try {
      const nueva = await prisma.especie.create({
        data: { especie }
      });

      return res.status(201).json(nueva);
    } catch (error) {
      return res.status(500).json({
        error: 'Error al crear especie',
        details: String(error)
      });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
