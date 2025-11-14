import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.usuario.findMany();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener usuarios', details: String(error) });
    }
  }

  if (req.method === 'POST') {
    const {
      nombre_usuario,
      email,
      password,
      apellido_paterno,
      apellido_materno,
      fecha_nacimiento,
      telefono,
      id_rol,
      id_sexo,
      id_organizacion,
      id_ciudad,
    } = req.body;

    // Validaciones básicas
    if (!nombre_usuario || String(nombre_usuario).trim() === '') {
      return res.status(400).json({ error: 'nombre_usuario es requerido' });
    }
    if (!email || String(email).trim() === '') {
      return res.status(400).json({ error: 'email es requerido' });
    }
    // El esquema requiere password_hash; seguir patrón del código existente
    if (!password || String(password).trim() === '') {
      return res.status(400).json({ error: 'password es requerido' });
    }

    try {
      const password_hash = await bcrypt.hash(password, 10);
      const user = await prisma.usuario.create({
        data: {
          nombre_usuario,
          email,
          password_hash,
          apellido_paterno,
          apellido_materno,
          fecha_nacimiento: fecha_nacimiento ? new Date(fecha_nacimiento) : undefined,
          telefono,
          id_rol,
          id_sexo,
          id_organizacion,
          id_ciudad,
          fecha_creacion: new Date(),
          activo: true,
        },
      });
      return res.status(201).json(user);
    } catch (error: any) {
      const msg = String(error.message || error);
      // Manejar error de constraint único en email (P2002)
      if (msg.includes('unique') || msg.includes('P2002')) {
        return res.status(400).json({ error: 'Email ya registrado' });
      }
      return res.status(500).json({ error: 'Error al crear usuario', details: msg });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
