import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Listar todos los usuarios
    try {
      const users = await prisma.usuario.findMany();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener usuarios', details: error });
    }
  }

  if (req.method === 'POST') {
    // Crear usuario
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

  if (req.method === 'PUT') {
    // Actualizar usuario
    const { id_usuario, ...updateData } = req.body;
    if (!id_usuario) {
      return res.status(400).json({ error: 'Falta id_usuario' });
    }
    try {
      if (updateData.password) {
        updateData.password_hash = await bcrypt.hash(updateData.password, 10);
        delete updateData.password;
      }
      const user = await prisma.usuario.update({
        where: { id_usuario: Number(id_usuario) },
        data: updateData,
      });
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar usuario', details: error });
    }
  }

  if (req.method === 'DELETE') {
    // Eliminar usuario
    const { id_usuario } = req.body;
    if (!id_usuario) {
      return res.status(400).json({ error: 'Falta id_usuario' });
    }
    try {
      await prisma.usuario.delete({
        where: { id_usuario: Number(id_usuario) },
      });
      return res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar usuario', details: error });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
