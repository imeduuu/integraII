import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../services/prismaExamples';

// Define los roles autorizados aquí
const ROLES_AUTORIZADOS = ['ADMIN', 'STAFF'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  // Obtener el usuario y su rol
  const userEmail = session.user.email;
  const usuario = await prisma.usuario.findUnique({ where: { email: userEmail } });

  if (!usuario) {
    return res.status(403).json({ error: 'Usuario no encontrado' });
  }

  // Solo permitir método PATCH para cambiar estado
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Obtener el reporte
  const reporte = await prisma.reporte.findUnique({ where: { id: Number(id) } });
  if (!reporte) {
    return res.status(404).json({ error: 'Reporte no encontrado' });
  }

  // Validar permisos: admin, staff o dueño del reporte
  const esAutorizado =
    ROLES_AUTORIZADOS.includes(usuario.rol) || reporte.userId === usuario.id;

  if (!esAutorizado) {
    return res.status(403).json({ error: 'No tienes permisos para cambiar el estado de este reporte' });
  }

  // Cambiar el estado del reporte
  const { nuevoEstado } = req.body;
  if (!nuevoEstado) {
    return res.status(400).json({ error: 'Debes proporcionar el nuevo estado' });
  }

  const reporteActualizado = await prisma.reporte.update({
    where: { id: Number(id) },
    data: { estado: nuevoEstado },
  });

  return res.status(200).json(reporteActualizado);
}
