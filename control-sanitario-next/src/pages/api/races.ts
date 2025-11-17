import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Trae todas las razas junto con el nombre de su especie
      const razas = await prisma.raza.findMany({
        include: { especie: true },
      });
      return res.status(200).json(razas);
    } catch (error) {
      console.error('Error al obtener razas:', error);
      return res.status(500).json({ error: 'Error al obtener razas' });
    }
  }

  // Si se usa un método distinto a GET
  return res.status(405).json({ error: 'Método no permitido' });
}
