import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteOrganization, getOrganizationById, updateOrganization } from '../../../services/organizations';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET': {
      const result = await getOrganizationById({ id });
      if (result.ok) return res.status(result.status).json(result.data);
      return res.status(result.status).json({ error: (result as any).error, issues: (result as any).issues });
    }
    case 'PUT': {
      const result = await updateOrganization({ id }, req.body);
      if (result.ok) return res.status(result.status).json(result.data);
      return res.status(result.status).json({ error: (result as any).error, issues: (result as any).issues });
    }
    case 'DELETE': {
      const result = await deleteOrganization({ id });
      if (result.ok) return res.status(result.status).json(result.data);
      return res.status(result.status).json({ error: (result as any).error, issues: (result as any).issues });
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ error: 'Método no permitido' });
  }
}
