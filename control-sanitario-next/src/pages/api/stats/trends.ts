import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/stats/trends (User specified /api/stats/trend; using plural file name. If singular needed, create trend.ts likewise.)
// Query params: interval=day|week (default day), limit (number of intervals, default 14), fromDate, toDate
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
  try {
    const { interval = 'day', limit = '14', fromDate, toDate } = req.query;
    const limitNum = typeof limit === 'string' ? Math.min(Math.max(parseInt(limit, 10) || 14, 1), 180) : 14;

    let from: Date | undefined; let to: Date | undefined;
    if (typeof fromDate === 'string') { const d = new Date(fromDate); if (!isNaN(d.getTime())) from = d; }
    if (typeof toDate === 'string') { const d = new Date(toDate); if (!isNaN(d.getTime())) to = d; }

    const dateFilter = (from || to) ? { fecha_creacion: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) } } : {};

    const sightings = await prisma.avistamiento.findMany({
      where: dateFilter,
      select: { fecha_creacion: true }
    });

    const bucketMap = new Map<string, number>();

    for (const s of sightings) {
      const d = s.fecha_creacion;
      let key: string;
      if (interval === 'week') {
        // ISO week key: YYYY-Www
        const tmp = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
        // Thursday algorithm for ISO week
        const dayNum = (tmp.getUTCDay() + 6) % 7;
        tmp.setUTCDate(tmp.getUTCDate() - dayNum + 3);
        const firstThursday = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 4));
        const weekNum = 1 + Math.round(((tmp.getTime() - firstThursday.getTime()) / 86400000 - 3) / 7);
        key = `${tmp.getUTCFullYear()}-W${weekNum.toString().padStart(2,'0')}`;
      } else {
        key = d.toISOString().slice(0,10);
      }
      bucketMap.set(key, (bucketMap.get(key) || 0) + 1);
    }

    const sortedKeys = Array.from(bucketMap.keys()).sort((a,b) => a.localeCompare(b));
    const slicedKeys = sortedKeys.slice(-limitNum);
    const data = slicedKeys.map(k => ({ period: k, count: bucketMap.get(k) || 0 }));

    return res.status(200).json({ success: true, data, interval, limit: limitNum });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('[stats trends] error', error);
    return res.status(500).json({ error: 'Error obteniendo tendencias' });
  }
}
