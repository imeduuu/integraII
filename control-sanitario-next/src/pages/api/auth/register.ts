import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface RegisterRequest {
  nombre_usuario: string;
  apellido_paterno: string;
  apellido_materno: string;
  id_sexo?: number;
  fecha_nacimiento?: string;
  telefono?: string;
  email: string;
  // Accept either `password` (plain) or `password_hash` (plain) from client.
  password?: string;
  password_hash?: string;
  id_ciudad?: number;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  id?: number;
  example?: unknown;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>
) {
  // If someone opens this URL in a browser (GET), return a helpful instruction.
  if (req.method === 'GET') {
    return res.status(200).json({
      success: false,
      message: 'Use POST con JSON para registrar: {nombre_usuario, email, password}',
      example: { method: 'POST', body: { nombre_usuario: 'Pepe', email: 'pepe@ejemplo.com', password: 'miClave123' } },
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  try {
    const {
      nombre_usuario,
      apellido_paterno,
      apellido_materno,
      id_sexo,
      fecha_nacimiento,
      telefono,
      email,
      password,
      password_hash,
      id_ciudad,
    }: RegisterRequest = req.body;

    // Validación de campos requeridos
    const rawPassword = (password as string) || (password_hash as string);

    if (!nombre_usuario || !email || !rawPassword) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos: nombre_usuario, email, password (texto plano)',
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Formato de email inválido',
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.usuario.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'El email ya está registrado',
      });
    }

    // Hash de la contraseña recibida en texto plano
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // Crear el usuario (sin asignar id_rol específico, dejar que sea NULL)
    const user = await prisma.usuario.create({
      data: {
        nombre_usuario,
        apellido_paterno: apellido_paterno || null,
        apellido_materno: apellido_materno || null,
        email,
        password_hash: hashedPassword,
        id_sexo: id_sexo || null,
        fecha_nacimiento: fecha_nacimiento ? new Date(fecha_nacimiento) : null,
        telefono: telefono || null,
        id_ciudad: id_ciudad || null,
        // id_rol se deja NULL (no fuerza foreign key)
        activo: true,
        // emailVerificado será manejado en la BD con valor por defecto
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      id: user.id_usuario,
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al registrar usuario',
    });
  }
}
