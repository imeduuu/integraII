import type { NextApiRequest, NextApiResponse } from 'next';
import { getMedicalHistoryDetail, updateMedicalHistory, deleteMedicalHistory, MedicalHistoryInput } from '../../../../services/medicalHistory';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { animalId, historyId } = req.query;
  const aId = Number(animalId);
  const hId = Number(historyId);
  if (!animalId || Number.isNaN(aId) || !historyId || Number.isNaN(hId)) {
    return res.status(400).json({ message: 'animalId o historyId inválido' });
  }

  try {
    if (req.method === 'GET') {
      const detail = await getMedicalHistoryDetail(aId, hId);
      if (!detail) return res.status(404).json({ message: 'Historial no encontrado' });
      return res.status(200).json(detail);
    }

    if (req.method === 'PUT') {
      try {
        const body = req.body as Partial<MedicalHistoryInput>;
        const updated = await updateMedicalHistory(aId, hId, body);
        return res.status(200).json(updated);
      } catch (e: any) {
        if (String(e?.message || '').includes('no encontrado')) {
          return res.status(404).json({ message: 'Historial no encontrado' });
        }
        throw e;
      }
    }

    if (req.method === 'DELETE') {
      const result = await deleteMedicalHistory(aId, hId);
      if (!result.deleted) return res.status(404).json({ message: 'Historial no encontrado' });
      return res.status(200).json(result);
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error: any) {
    console.error(`API /medicalHistory/${aId}/${hId} error:`, error);
    return res.status(500).json({ message: 'Internal Server Error', error: error?.message });
  }
}
