import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/stats/heatmap (User requested /api/stats/heatmap-data: we assume this file serves that purpose)
// Optional query params: fromDate, toDate
// Returns simplified heatmap points [{ lat, lng, count }]
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
      const d = new Date(fromDate);
      if (!isNaN(d.getTime())) from = d;
    }
    if (typeof toDate === 'string') {
      const d = new Date(toDate);
      if (!isNaN(d.getTime())) to = d;
    }

    const sightings = await prisma.avistamiento.findMany({
      where: {
        ...(from || to ? {
          fecha_creacion: {
            ...(from ? { gte: from } : {}),
            ...(to ? { lte: to } : {})
          }
        } : {})
      }
    });

    // Aggregate counts by coordinate pair (rounded to 4 decimals to cluster close points)
    const map = new Map<string, { lat: number; lng: number; count: number }>();
    for (const s of sightings as any[]) {
      // Algunos registros pueden tener campos latitud/longitud (según esquema consolidado) o estar ausentes
      const latRaw = (s as any).latitud ?? (s as any).lat ?? null;
      const lngRaw = (s as any).longitud ?? (s as any).lng ?? null;
      const lat = typeof latRaw === 'number' ? Number(latRaw.toFixed(4)) : null;
      const lng = typeof lngRaw === 'number' ? Number(lngRaw.toFixed(4)) : null;
      if (lat == null || lng == null) continue;
      const key = `${lat},${lng}`;
      const existing = map.get(key);
      if (existing) existing.count += 1; else map.set(key, { lat, lng, count: 1 });
    }

    return res.status(200).json({ success: true, data: Array.from(map.values()) });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('[stats heatmap] error', error);
    return res.status(500).json({ error: 'Error generando heatmap' });
  }
}
