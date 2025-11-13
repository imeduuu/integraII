import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const idNum = Number(Array.isArray(id) ? id[0] : id);

  if (!id || Number.isNaN(idNum)) {
    return res.status(400).json({ success: false, error: 'ID inválido' });
  }

  try {
    switch (req.method) {
      case 'GET': {
        const item = await prisma.estado_salud.findUnique({ where: { id_estado_salud: idNum } });
        if (!item) return res.status(404).json({ success: false, error: 'No encontrado' });
        return res.status(200).json({ success: true, data: item });
      }
      case 'PUT':
      case 'PATCH': {
        const { nombre_estado_salud } = req.body ?? {};
        if (nombre_estado_salud !== undefined && (!nombre_estado_salud || typeof nombre_estado_salud !== 'string')) {
          return res.status(400).json({ success: false, error: 'nombre_estado_salud debe ser string no vacío' });
        }
        const updated = await prisma.estado_salud.update({
          where: { id_estado_salud: idNum },
          data: {
            ...(nombre_estado_salud !== undefined
              ? { nombre_estado_salud: String(nombre_estado_salud).trim() }
              : {}),
          },
        });
        return res.status(200).json({ success: true, data: updated });
      }
      case 'DELETE': {
        try {
          const deleted = await prisma.estado_salud.delete({ where: { id_estado_salud: idNum } });
          return res.status(200).json({ success: true, data: deleted });
        } catch (err: any) {
          // Prisma foreign key violation
          if (err && (err.code === 'P2003' || err.code === 'P2014')) {
            return res.status(409).json({ success: false, error: 'No se puede eliminar: tiene referencias en uso' });
          }
          throw err;
        }
      }
      default:
        return res.status(405).json({ success: false, error: 'Método no permitido' });
    }
  } catch (error: any) {
    if (error?.code === 'P2025') {
      // Record not found on update/delete
      return res.status(404).json({ success: false, error: 'No encontrado' });
    }
    return res.status(500).json({ success: false, error: error?.message ?? 'Error inesperado' });
  }
}
