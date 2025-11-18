import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import { getUserFromToken } from "../../../utils/auth";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getUserFromToken(req);
  if (!user) {
    return res.status(401).json({ error: "Token inválido o faltante" });
  }

  try {
    // GET → listar favoritos
    if (req.method === "GET") {
      const favoritos = await prisma.favorito.findMany({
        where: { id_usuario: user.id_usuario },
        include: { animal: true }
      });

      return res.status(200).json(favoritos);
    }

    // POST → agregar a favoritos
    if (req.method === "POST") {
      const { id_animal } = req.body;

      if (!id_animal) {
        return res.status(400).json({ error: "Falta id_animal" });
      }

      const fav = await prisma.favorito.upsert({
        where: {
          id_usuario_id_animal: {
            id_usuario: user.id_usuario,
            id_animal
          }
        },
        update: {},
        create: {
          id_usuario: user.id_usuario,
          id_animal
        }
      });

      return res.status(201).json(fav);
    }

    return res.status(405).json({ error: "Método no permitido" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en favoritos" });
  }
}
