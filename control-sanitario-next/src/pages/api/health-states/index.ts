import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET': {
        const items = await prisma.estado_salud.findMany({
          orderBy: { id_estado_salud: 'asc' },
        });
        return res.status(200).json({ success: true, data: items, count: items.length });
      }
      case 'POST': {
        const { nombre_estado_salud } = req.body ?? {};
        if (!nombre_estado_salud || typeof nombre_estado_salud !== 'string' || !nombre_estado_salud.trim()) {
          return res.status(400).json({ success: false, error: 'nombre_estado_salud es requerido' });
        }
        const created = await prisma.estado_salud.create({
          data: { nombre_estado_salud: String(nombre_estado_salud).trim() },
        });
        return res.status(201).json({ success: true, data: created });
      }
      default:
        return res.status(405).json({ success: false, error: 'Método no permitido' });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error?.message ?? 'Error inesperado' });
  }
}
