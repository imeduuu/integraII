import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/stats/summary
// Optional: fromDate, toDate to filter by avistamiento.fecha_creacion
// Returns summary metrics
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }

  try {
    const { fromDate, toDate } = req.query;
    let from: Date | undefined;
    let to: Date | undefined;
    if (typeof fromDate === 'string') {
      const d = new Date(fromDate); if (!isNaN(d.getTime())) from = d;
    }
    if (typeof toDate === 'string') {
      const d = new Date(toDate); if (!isNaN(d.getTime())) to = d;
    }

    const dateFilter = (from || to) ? { fecha_creacion: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) } } : {};

    const [totalSightings, totalSpecies, healthStatesRaw, speciesCountsRaw] = await Promise.all([
      prisma.avistamiento.count({ where: dateFilter }),
      prisma.especie.count(),
      prisma.avistamiento.groupBy({ by: ['id_estado_salud'], _count: { _all: true }, where: dateFilter }),
      prisma.avistamiento.groupBy({ by: ['id_especie'], _count: { _all: true }, where: dateFilter })
    ]);

    // Health state distribution
    const healthStateIds = healthStatesRaw.map(h => h.id_estado_salud);
  const healthStateNames = await prisma.estado_salud.findMany({ where: { id_estado_salud: { in: healthStateIds } }, select: { id_estado_salud: true, nombre_estado_salud: true } });
    const healthStateDistribution = healthStatesRaw.map(h => ({
      id: h.id_estado_salud,
  nombre: healthStateNames.find(n => n.id_estado_salud === h.id_estado_salud)?.nombre_estado_salud || 'Desconocido',
      count: h._count._all
    }));

    // Species distribution
    const speciesIds = speciesCountsRaw.map(s => s.id_especie);
    const speciesNames = await prisma.especie.findMany({ where: { id_especie: { in: speciesIds } }, select: { id_especie: true, especie: true } });
    const speciesDistribution = speciesCountsRaw.map(s => ({
      id: s.id_especie,
      nombre: speciesNames.find(n => n.id_especie === s.id_especie)?.especie || 'Desconocida',
      count: s._count._all
    })).sort((a,b) => b.count - a.count);

    const mostCommonSpecies = speciesDistribution[0] || null;

    // Trend (last 7 days)
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
    const trendSightings = await prisma.avistamiento.findMany({
      where: {
        fecha_creacion: { gte: sevenDaysAgo }
      },
      select: { fecha_creacion: true }
    });
    const trendMap = new Map<string, number>();
    for (const s of trendSightings) {
      const day = s.fecha_creacion.toISOString().slice(0,10);
      trendMap.set(day, (trendMap.get(day) || 0) + 1);
    }
    const recentTrend = Array.from(trendMap.entries()).sort((a,b) => a[0].localeCompare(b[0])).map(([date, count]) => ({ date, count }));

    return res.status(200).json({
      success: true,
      data: {
        totalSightings,
        totalSpecies,
        mostCommonSpecies,
        healthStateDistribution,
        speciesDistribution,
        recentTrend
      }
    });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('[stats summary] error', error);
    return res.status(500).json({ error: 'Error generando resumen' });
  }
}
