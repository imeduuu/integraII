import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Método no permitido' });
  }

  try {
    // En el esquema Prisma el campo se llama `especie`; mapeamos a `nombre_especie` para cumplir el contrato esperado
    // Nota: el esquema pudo llamarse `especie` o `nombre_especie` según migraciones previas.
    // Para evitar problemas de tipos entre versiones, usamos `as any` y mapeamos con fallback.
    const rows = (await prisma.especie.findMany({
      select: {
        id_especie: true,
        nombre_especie: true,
        especie: true,
      } as any,
      orderBy: { id_especie: 'asc' },
    })) as any[];

    const data = rows.map((r) => ({
      id_especie: r.id_especie,
      nombre_especie: (r.nombre_especie ?? r.especie ?? '') as string,
    }));
    return res.status(200).json({ success: true, data, count: data.length });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error?.message ?? 'Error inesperado' });
  }
}
