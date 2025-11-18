import type { NextApiRequest, NextApiResponse } from 'next';
import { listUsersByOrganizationId } from '../../../../services/organizations';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET': {
      const result = await listUsersByOrganizationId({ id });
      if (result.ok) return res.status(result.status).json(result.data);
      return res.status(result.status).json({ error: (result as any).error, issues: (result as any).issues });
    }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ error: 'Método no permitido' });
  }
}
