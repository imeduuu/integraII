import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/stats/health-states
// Returns distribution of health states in sightings within optional date range
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
  try {
    const { fromDate, toDate } = req.query;
    let from: Date | undefined;
    let to: Date | undefined;
    if (typeof fromDate === 'string') { const d = new Date(fromDate); if (!isNaN(d.getTime())) from = d; }
    if (typeof toDate === 'string') { const d = new Date(toDate); if (!isNaN(d.getTime())) to = d; }

    const dateFilter = (from || to) ? { fecha_creacion: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) } } : {};

    const groups = await prisma.avistamiento.groupBy({ by: ['id_estado_salud'], _count: { _all: true }, where: dateFilter });
    const ids = groups.map(g => g.id_estado_salud);
    const names = await prisma.estado_salud.findMany({ where: { id_estado_salud: { in: ids } }, select: { id_estado_salud: true, nombre_estado_salud: true } });

    const distribution = groups.map(g => ({
      id: g.id_estado_salud,
      nombre: names.find(n => n.id_estado_salud === g.id_estado_salud)?.nombre_estado_salud || 'Desconocido',
      count: g._count._all
    })).sort((a,b) => b.count - a.count);

    return res.status(200).json({ success: true, data: distribution });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('[stats health-states] error', error);
    return res.status(500).json({ error: 'Error obteniendo distribución de estados de salud' });
  }
}
