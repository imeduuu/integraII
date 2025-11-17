import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { 
      nombre_animal, 
      edad_animal, 
      id_estado_salud, 
      id_categoria, 
      id_especie, 
      zona 
    } = req.body;

    // Validación básica
    if (!nombre_animal || !edad_animal || !id_estado_salud || !id_categoria || !id_especie) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // Inserción en la base de datos
    const nuevoAnimal = await prisma.animal.create({
      data: {
        nombre_animal,
        edad_animal,
        id_estado_salud: Number(id_estado_salud),
        id_categoria: Number(id_categoria),
        id_especie: Number(id_especie),
        zona,
      },
      include: {
        estado_salud: true,
        raza: true,
      },
    });

    return res.status(201).json({ message: "Animal registrado correctamente", animal: nuevoAnimal });
  } catch (error: any) {
    console.error("Error al registrar el animal:", error);
    return res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
}
