import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id, organization } = req.query;
    try {
      if (id) {
        const animal = await prisma.animal.findUnique({
          where: { id_animal: Number(id) }
        });
        return res.status(200).json(animal);
      }
      if (organization) {
        const animals = await prisma.animal.findMany({
          where: {
            id_usuario_propietario: Number(organization)
          }
        });
        return res.status(200).json(animals);
      }
      const animals = await prisma.animal.findMany();
      return res.status(200).json(animals);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener animales', details: error });
    }
  }

  if (req.method === 'POST') {
    const { nombre_animal, fecha_nacimiento, is_edad_aproximada, id_estado_salud, id_raza, id_usuario_propietario } = req.body;
    try {
      const animal = await prisma.animal.create({
        data: {
          nombre_animal,
          fecha_nacimiento: fecha_nacimiento ? new Date(fecha_nacimiento) : undefined,
          is_edad_aproximada,
          id_estado_salud,
          id_raza,
          id_usuario_propietario,
        },
      });
      return res.status(201).json(animal);
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear animal', details: error });
    }
  }

  if (req.method === 'PUT') {
    const { id, ...updatedData } = req.body;
    try {
      const animal = await prisma.animal.update({
        where: { id_animal: Number(id) },
        data: {
          ...updatedData,
          fecha_nacimiento: updatedData.fecha_nacimiento ? new Date(updatedData.fecha_nacimiento) : undefined,
        },
      });
      return res.status(200).json(animal);
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar animal', details: error });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}