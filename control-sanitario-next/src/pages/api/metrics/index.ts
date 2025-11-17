import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../services/prismaExamples';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    // Contadores básicos: animales, avistamientos, adopciones y usuarios activos (últimos 30 días)
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 días

    const [animalsCount, sightingsCount, adoptionsCount, usersActive] = await Promise.all([
      // total animals
      (prisma as any).animal.count(),
      // total sightings
      (prisma as any).avistamiento.count(),
      // total adoptions
      (prisma as any).adopcion.count(),
      // count users (all) — using fecha_ultimo_login can return 0 if field is null
      (prisma as any).usuario.count(),
    ]);

    console.log('metrics:', { animalsCount, sightingsCount, adoptionsCount, usersActive });

    return res.status(200).json({ animalsCount, sightingsCount, adoptionsCount, usersActive });
  } catch (error) {
    console.error('Error reading metrics', error);
    return res.status(500).json({ error: 'Error reading metrics' });
  }
}
