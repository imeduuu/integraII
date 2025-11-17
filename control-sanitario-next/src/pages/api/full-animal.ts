import type { NextApiRequest, NextApiResponse } from "next";

interface Animal {
  id: number;
  nombre: string;
  especie: string;
  estado_general: string;
  zona: string;
}

let animals: Animal[] = [];
let nextId = 1;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(animals);
  }

  if (req.method === "POST") {
    const { nombre, especie, estado_general, zona } = req.body;

    if (!nombre || !especie || !estado_general || !zona) {
      return res.status(400).json({ message: "Faltan datos del animal" });
    }

    const nuevoAnimal: Animal = {
      id: nextId++,
      nombre,
      especie,
      estado_general,
      zona,
    };

    animals.push(nuevoAnimal);
    return res.status(201).json({ message: "Animal registrado", data: nuevoAnimal });
  }

  return res.status(405).json({ message: "Método no permitido" });
}
