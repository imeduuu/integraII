import type { NextApiRequest, NextApiResponse } from 'next';
import { listMedicalHistoryByAnimal, createMedicalHistory, MedicalHistoryInput } from '../../../../services/medicalHistory';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { animalId } = req.query;
  const id = Number(animalId);
  if (!animalId || Number.isNaN(id)) {
    return res.status(400).json({ message: 'animalId inválido' });
  }

  try {
    if (req.method === 'GET') {
      const data = await listMedicalHistoryByAnimal(id);
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const body = req.body as MedicalHistoryInput;
      if (!body || !body.tipo_evento || !body.fecha_evento) {
        return res.status(400).json({ message: 'Campos requeridos: fecha_evento, tipo_evento' });
      }
      const created = await createMedicalHistory(id, body);
      return res.status(201).json(created);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error: any) {
    console.error(`API /medicalHistory/${id} error:`, error);
    return res.status(500).json({ message: 'Internal Server Error', error: error?.message });
  }
}
