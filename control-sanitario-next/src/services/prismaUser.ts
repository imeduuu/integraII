import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function getUsers() {
  return await prisma.usuario.findMany();
}

// Crear un usuario nuevo
export async function createUser(
  email: string,
  nombre_usuario: string,
  apellido_paterno: string,
  apellido_materno: string,
  password_hash: string,
  id_rol: number,
  activo: boolean,
  telefono?: string,
  sexo?: string,
  fecha_nacimiento?: Date,
  id_organizacion?: number
) {
  return await prisma.usuario.create({
    data: {
      email,
      nombre_usuario,
      apellido_paterno,
      apellido_materno,
      password_hash,
      rol: { connect: { id_rol } },
      activo,
      telefono,
      sexo,
      fecha_nacimiento,
      ...(id_organizacion !== undefined ? { organizacion: { connect: { id_organizacion } } } : {})
    },
  });
}

// Puedes agregar más funciones según los campos y relaciones del modelo Usuario

// Ejemplo de uso (puedes borrar esto en producción)
// (async () => {
//   const user = await createUser('test@email.com', 'Test', 'User', 'password123', 1, '123456789');
//   console.log(user);
//   const users = await getUsers();
//   console.log(users);
// })();
