import type { NextApiRequest, NextApiResponse } from 'next';
import { listAllMedicalHistories } from '../../../services/medicalHistory';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const data = await listAllMedicalHistories();
      return res.status(200).json(data);
    }

    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error: any) {
    console.error('GET /api/medicalHistory error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error?.message });
  }
}
