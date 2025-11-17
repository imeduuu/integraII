import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    // GET /api/regions/:id -> Obtener región
    if (req.method === 'GET') {
      const region = await prisma.region.findUnique({
        where: { id_region: id },
      });

      if (!region) {
        return res.status(404).json({ error: 'Región no encontrada' });
      }

      return res.status(200).json(region);
    }

    // PUT /api/regions/:id -> Actualizar región
    if (req.method === 'PUT') {
      const { nombre_region } = req.body;

      if (!nombre_region) {
        return res.status(400).json({ error: 'nombre_region es requerido' });
      }

      const updatedRegion = await prisma.region.update({
        where: { id_region: id },
        data: { nombre_region },
      });

      return res.status(200).json(updatedRegion);
    }

    // DELETE /api/regions/:id -> Eliminar región
    if (req.method === 'DELETE') {
      await prisma.region.delete({
        where: { id_region: id },
      });

      return res.status(200).json({ message: 'Región eliminada' });
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (error) {
    console.error('Error Regions ID API:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
