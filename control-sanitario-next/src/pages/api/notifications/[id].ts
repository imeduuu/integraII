import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const idNum = Number(id);
  if (Number.isNaN(idNum)) return res.status(400).json({ error: 'ID inválido' });

  if (req.method === 'GET') {
    try {
      const mensaje = await prisma.mensaje.findUnique({
        where: { id_mensaje: idNum },
        include: { remitente: true, destinatario: true },
      });
      if (!mensaje) return res.status(404).json({ error: 'Notificación no encontrada' });
      return res.status(200).json(mensaje);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener notificación', details: error });
    }
  }

  if (req.method === 'PUT') {
    const { contenido, id_remitente, id_destinatario } = req.body;
    try {
      const updateData: any = {};
      if (contenido !== undefined) updateData.contenido = contenido;
      if (id_remitente !== undefined) updateData.id_remitente = Number(id_remitente);
      if (id_destinatario !== undefined) updateData.id_destinatario = Number(id_destinatario);

      const updated = await prisma.mensaje.update({
        where: { id_mensaje: idNum },
        data: updateData,
      });
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar notificación', details: error });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.mensaje.delete({ where: { id_mensaje: idNum } });
      return res.status(200).json({ message: 'Notificación eliminada' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar notificación', details: error });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
