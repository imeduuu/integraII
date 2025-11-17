import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../services/prismaExamples';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Obtener lista de todos los animales
      const animales = await (prisma as any).animal.findMany({
        select: {
          id_animal: true,
          nombre_animal: true,
          estado_general: true,
          zona: true,
          id_estado_salud: true,
          estado_salud: {
            select: {
              estado_salud: true
            }
          }
        },
        orderBy: {
          nombre_animal: 'asc'
        }
      });

      return res.status(200).json(animales);
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ error: 'Método no permitido' });
    }
  } catch (error) {
    console.error('Error en API animals:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Error interno del servidor' 
    });
  }
}
