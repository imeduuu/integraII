// pages/api/sightings.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface Sighting {
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  breed_id?: number | null;
  date?: string;
}

// 🧠 Base de datos temporal en memoria
let sightings: Sighting[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // 📋 Listar todos los avistamientos
    return res.status(200).json(sightings);
  }

  if (req.method === 'POST') {
    const data = req.body as Sighting;

    // 🛑 Validación básica
    if (!data.description || !data.location) {
      return res.status(400).json({ message: 'Faltan datos del avistamiento' });
    }

    // Agregar fecha si no viene
    if (!data.date) {
      data.date = new Date().toISOString();
    }

    // Guardar en memoria
    sightings.push(data);

    return res.status(201).json({ message: 'Avistamiento registrado', data });
  }

  // ❌ Método no permitido
  return res.status(405).json({ message: 'Método no permitido' });
}
