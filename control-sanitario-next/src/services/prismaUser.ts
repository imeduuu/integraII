import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function getUsers() {
  return await prisma.usuario.findMany();
}

// Crear un usuario nuevo
export async function createUser(email: string, nombres: string, apellidos: string, password: string, rolId: number, telefono?: string) {
  return await prisma.usuario.create({
    data: { email, nombres, apellidos, password, rolId, telefono },
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
