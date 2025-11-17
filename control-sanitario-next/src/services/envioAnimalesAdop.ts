
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function registrarAnimalCompleto({
  nombre_animal,
  edad_animal,
  id_estado_salud,
  id_categoria,
  id_especie,
  estado_general = "Activo",
  zona,
}: {
  nombre_animal: string;
  edad_animal: string;
  id_estado_salud: number;
  id_categoria: number;
  id_especie: number;
  estado_general?: "Activo" | "Inactivo" | "Pendiente";
  zona?: string;
}) {
  try {
    const nuevoAnimal = await prisma.animal.create({
      data: {
        nombre_animal,
        edad_animal,
        id_estado_salud,
        id_categoria,
        id_especie,
        estado_general,
        zona,
      },
      include: {
        estado_salud: true,
        raza: true,
      },
    });

    return { success: true, data: nuevoAnimal };
  } catch (error) {
    console.error("Error al registrar animal completo:", error);
    return { success: false, error: "Error al registrar el animal." };
  }
}
