import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { validateAuthToken } from '../../../utils/jwtUtils';

const prisma = new PrismaClient();

// GET /api/stats/user-impact (requires JWT)
// Optional query: fromDate, toDate filter by avistamiento.fecha_creacion & adopcion.fecha_publicacion
// Returns metrics per user: { id_usuario, nombre, sightings, adoptionsRescue, adoptionsCompleted }
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }

  const auth = req.headers.authorization;
  const payload = validateAuthToken(auth);
  if (!payload) {
    return res.status(401).json({ error: 'Token inválido o ausente' });
  }

  try {
    const { fromDate, toDate } = req.query;
    let from: Date | undefined; let to: Date | undefined;
    if (typeof fromDate === 'string') { const d = new Date(fromDate); if (!isNaN(d.getTime())) from = d; }
    if (typeof toDate === 'string') { const d = new Date(toDate); if (!isNaN(d.getTime())) to = d; }

    const sightingDateFilter = (from || to) ? { fecha_creacion: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) } } : {};
    const adoptionDateFilter = (from || to) ? { fecha_publicacion: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) } } : {};

    const [sightingsGrouped, adoptionsRescueGrouped, adoptionsCompletedGrouped] = await Promise.all([
      prisma.avistamiento.groupBy({ by: ['id_usuario'], _count: { _all: true }, where: sightingDateFilter }),
      prisma.adopcion.groupBy({ by: ['id_usuario_rescatista'], _count: { _all: true }, where: adoptionDateFilter }),
      prisma.adopcion.groupBy({ by: ['id_usuario_adoptante'], _count: { _all: true }, where: { ...adoptionDateFilter, id_usuario_adoptante: { not: null } } })
    ]);

    const userIds = Array.from(new Set([
      ...sightingsGrouped.map(g => g.id_usuario),
      ...adoptionsRescueGrouped.map(g => g.id_usuario_rescatista),
      ...adoptionsCompletedGrouped.map(g => g.id_usuario_adoptante as number)
    ].filter(Boolean)));

    const users = await prisma.usuario.findMany({ where: { id_usuario: { in: userIds } }, select: { id_usuario: true, nombre_usuario: true } });

    const data = userIds.map(id => {
      const name = users.find(u => u.id_usuario === id)?.nombre_usuario || 'Usuario';
      const sightings = sightingsGrouped.find(g => g.id_usuario === id)?._count._all || 0;
      const adoptionsRescue = adoptionsRescueGrouped.find(g => g.id_usuario_rescatista === id)?._count._all || 0;
      const adoptionsCompleted = adoptionsCompletedGrouped.find(g => g.id_usuario_adoptante === id)?._count._all || 0;
      return { id_usuario: id, nombre: name, sightings, adoptionsRescue, adoptionsCompleted };
    }).sort((a,b) => b.sightings - a.sightings);

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('[stats user-impact] error', error);
    return res.status(500).json({ error: 'Error calculando impacto de usuario' });
  }
}
