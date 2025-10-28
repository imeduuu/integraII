import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Log para verificar la URL de conexión
  console.log('DATABASE_URL:', process.env.DATABASE_URL);

  const {
    email,
    password,
    nombre_usuario,
    apellido_paterno,
    apellido_materno,
    fecha_nacimiento,
    telefono,
    id_rol,
    id_sexo,
    id_organizacion,
    id_ciudad
  } = req.body;

  if (!email || !password || !nombre_usuario) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const password_hash = await bcrypt.hash(password, 10);
    const user = await prisma.usuario.create({
      data: {
        email,
        password_hash,
        nombre_usuario,
        apellido_paterno,
        apellido_materno,
        fecha_nacimiento: fecha_nacimiento ? new Date(fecha_nacimiento) : undefined,
        telefono,
        id_rol,
        id_sexo,
        id_organizacion,
        id_ciudad
      },
    });
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error: 'Error al crear usuario', details: error });
  }
}
