import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../services/prismaExamples';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID del animal requerido' });
  }

  const animalId = Number(id);

  if (isNaN(animalId)) {
    return res.status(400).json({ error: 'ID del animal inválido' });
  }

  try {
    if (req.method === 'GET') {
      const animal = await prisma.animal.findUnique({
        where: { id_animal: animalId },
      });

      if (!animal) {
        return res.status(404).json({ error: 'Animal no encontrado' });
      }

      return res.status(200).json(animal);
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (error) {
    console.error('Error en API:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
