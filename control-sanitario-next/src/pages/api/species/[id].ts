import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  // GET: una especie
  if (req.method === 'GET') {
    try {
      const especie = await prisma.especie.findUnique({
        where: { id_especie: id }
      });

      if (!especie) {
        return res.status(404).json({ error: 'Especie no encontrada.' });
      }

      return res.status(200).json(especie);
    } catch (error) {
      return res.status(500).json({
        error: 'Error al obtener especie',
        details: String(error)
      });
    }
  }

  // PUT: actualizar
  if (req.method === 'PUT') {
    const { especie } = req.body;

    if (especie !== undefined && especie.trim() === '') {
      return res.status(400).json({ error: 'El campo "especie" no puede estar vacío.' });
    }

    try {
      const updated = await prisma.especie.update({
        where: { id_especie: id },
        data: { especie }
      });

      return res.status(200).json(updated);
    } catch (error) {
      return res.status(500).json({
        error: 'Error al actualizar especie',
        details: String(error)
      });
    }
  }

  // DELETE: eliminar
  if (req.method === 'DELETE') {
    try {
      await prisma.especie.delete({
        where: { id_especie: id }
      });

      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({
        error: 'Error al eliminar especie',
        details: String(error)
      });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
