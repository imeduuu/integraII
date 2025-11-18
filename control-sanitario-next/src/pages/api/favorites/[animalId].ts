import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getUserFromToken } from "../../../utils/auth";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getUserFromToken(req);
  if (!user) return res.status(401).json({ error: "Token inválido o faltante" });

  const { animalId } = req.query;

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const deleted = await prisma.favorito.delete({
      where: {
        id_usuario_id_animal: {
          id_usuario: user.id_usuario,
          id_animal: Number(animalId)
        }
      }
    });

    return res.status(200).json({ ok: true, deleted });
  } catch (error) {
    console.error("DELETE FAVORITO ERROR:", error);
    return res.status(500).json({ error: "Error eliminando favorito" });
  }
}
