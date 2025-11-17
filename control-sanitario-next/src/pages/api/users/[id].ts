import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const idNum = Number(id);
  if (Number.isNaN(idNum)) return res.status(400).json({ error: 'ID inválido' });

  if (req.method === 'GET') {
    try {
      const user = await prisma.usuario.findUnique({ where: { id_usuario: idNum } });
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener usuario', details: String(error) });
    }
  }

  if (req.method === 'PUT') {
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

    // Validar que, si se entregan, los campos requeridos no estén vacíos
    if (nombre_usuario !== undefined && String(nombre_usuario).trim() === '') {
      return res.status(400).json({ error: 'nombre_usuario no puede estar vacío' });
    }
    if (email !== undefined && String(email).trim() === '') {
      return res.status(400).json({ error: 'email no puede estar vacío' });
    }

    try {
      const existing = await prisma.usuario.findUnique({ where: { id_usuario: idNum } });
      if (!existing) return res.status(404).json({ error: 'Usuario no encontrado' });

      const data: any = {};
      if (nombre_usuario !== undefined) data.nombre_usuario = nombre_usuario;
      if (email !== undefined) data.email = email;
      if (apellido_paterno !== undefined) data.apellido_paterno = apellido_paterno;
      if (apellido_materno !== undefined) data.apellido_materno = apellido_materno;
      if (fecha_nacimiento !== undefined) data.fecha_nacimiento = fecha_nacimiento ? new Date(fecha_nacimiento) : null;
      if (telefono !== undefined) data.telefono = telefono;
      if (id_rol !== undefined) data.id_rol = id_rol;
      if (id_sexo !== undefined) data.id_sexo = id_sexo;
      if (id_organizacion !== undefined) data.id_organizacion = id_organizacion;
      if (id_ciudad !== undefined) data.id_ciudad = id_ciudad;
      if (password !== undefined) data.password_hash = await bcrypt.hash(password, 10);

      const updated = await prisma.usuario.update({ where: { id_usuario: idNum }, data });
      return res.status(200).json(updated);
    } catch (error: any) {
      const msg = String(error.message || error);
      if (msg.includes('unique') || msg.includes('P2002')) {
        return res.status(400).json({ error: 'Email ya registrado' });
      }
      return res.status(500).json({ error: 'Error al actualizar usuario', details: msg });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const existing = await prisma.usuario.findUnique({ where: { id_usuario: idNum } });
      if (!existing) return res.status(404).json({ error: 'Usuario no encontrado' });
      await prisma.usuario.delete({ where: { id_usuario: idNum } });
      return res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar usuario', details: String(error) });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
