import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { remitente, destinatario } = req.query;
    try {
      // Permitir filtros opcionales por remitente o destinatario
      const where: any = {};
      if (remitente) where.id_remitente = Number(remitente);
      if (destinatario) where.id_destinatario = Number(destinatario);

      const mensajes = await prisma.mensaje.findMany({
        where: Object.keys(where).length ? where : undefined,
        include: { remitente: true, destinatario: true },
        orderBy: { fecha_envio: 'desc' },
      });
      return res.status(200).json(mensajes);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener notificaciones', details: error });
    }
  }

  if (req.method === 'POST') {
    const { contenido, id_remitente, id_destinatario } = req.body;
    if (!contenido || !id_remitente || !id_destinatario) {
      return res.status(400).json({ error: 'Faltan datos requeridos: contenido, id_remitente, id_destinatario' });
    }
    try {
      const mensaje = await prisma.mensaje.create({
        data: {
          contenido,
          id_remitente: Number(id_remitente),
          id_destinatario: Number(id_destinatario),
        },
      });
      return res.status(201).json(mensaje);
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear notificación', details: error });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
