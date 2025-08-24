import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function getUsers() {
  return await prisma.user.findMany();
}

// Crear un usuario nuevo
export async function createUser(email: string, name: string) {
  return await prisma.user.create({
    data: { email, name },
  });
}

// Ejemplo de uso (puedes borrar esto en producción)
// (async () => {
//   const user = await createUser('test@email.com', 'Test User');
//   console.log(user);
//   const users = await getUsers();
//   console.log(users);
// })();
