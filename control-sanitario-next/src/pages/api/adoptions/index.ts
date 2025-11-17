import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const limit = Number(req.query.limit || 10);

  try {
    const adoptions = await prisma.adopcion.findMany({
      take: limit,
      orderBy: { fecha_publicacion: 'desc' },
      include: {
        animal: {
          select: { id_animal: true, nombre_animal: true, estado_general: true },
        },
        adoptante: {
          select: { id_usuario: true, nombre_usuario: true, apellido_paterno: true },
        },
        rescatista: {
          select: { id_usuario: true, nombre_usuario: true, apellido_paterno: true },
        },
      },
    });

    return res.status(200).json(adoptions);
  } catch (error) {
    console.error('Error getting adoptions', error);
    return res.status(500).json({ error: 'Error getting adoptions' });
  }
}
