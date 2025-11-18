import type { NextApiRequest, NextApiResponse } from 'next';
import { createOrganization, listOrganizations } from '../../../services/organizations';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const result = await listOrganizations();
      if (result.ok) return res.status(result.status).json(result.data);
      return res.status(result.status).json({ error: (result as any).error, issues: (result as any).issues });
    }
    case 'POST': {
      const result = await createOrganization(req.body);
      if (result.ok) return res.status(result.status).json(result.data);
      return res.status(result.status).json({ error: (result as any).error, issues: (result as any).issues });
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: 'Método no permitido' });
  }
}
