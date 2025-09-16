import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear roles
  const adminRole = await prisma.rol.upsert({
    where: { id_rol: 1 },
    update: {},
    create: { nombre_rol: 'Admin' },
  });
  const userRole = await prisma.rol.upsert({
    where: { id_rol: 2 },
    update: {},
    create: { nombre_rol: 'Usuario' },
  });

  // Crear usuarios
  // El modelo usuario no tiene clave única en email, solo id_usuario
  // Por lo tanto, solo se puede crear usuarios de prueba (no upsert por email)
  const user1 = await prisma.usuario.create({
    data: {
      nombre_usuario: 'Admin',
      apellido_paterno: 'Demo',
      apellido_materno: 'Test',
      fecha_nacimiento: new Date('1990-01-01'),
      telefono: '1234567890',
      email: 'admin@demo.com',
      password_hash: 'admin123',
      sexo: 'M',
      activo: true,
      id_rol: adminRole.id_rol,
    },
  });
  const user2 = await prisma.usuario.create({
    data: {
      nombre_usuario: 'User',
      apellido_paterno: 'Demo',
      apellido_materno: 'Test',
      fecha_nacimiento: new Date('1995-05-05'),
      telefono: '0987654321',
      email: 'user@demo.com',
      password_hash: 'user123',
      sexo: 'F',
      activo: true,
      id_rol: userRole.id_rol,
    },
  });

  // Crear especie, categoría y estado_salud mínimos para animales
  const especie = await prisma.especie.upsert({
    where: { id_especie: 1 },
    update: {},
    create: { nombre_especie: 'Perro' },
  });
  const categoria = await prisma.categoria.upsert({
    where: { id_categoria: 1 },
    update: {},
    create: { nombre_categoria: 'Doméstico' },
  });
  const estadoSalud = await prisma.estado_salud.upsert({
    where: { id_estado_salud: 1 },
    update: {},
    create: { nombre_estado_salud: 'Sano' },
  });

  // Crear animales
  await prisma.animal.createMany({
    data: [
      {
        nombre_animal: 'Firulais',
        edad_animal: '2 años',
        id_estado_salud: estadoSalud.id_estado_salud,
        id_categoria: categoria.id_categoria,
        id_especie: especie.id_especie,
      },
      {
        nombre_animal: 'Michi',
        edad_animal: '1 año',
        id_estado_salud: estadoSalud.id_estado_salud,
        id_categoria: categoria.id_categoria,
        id_especie: especie.id_especie,
      },
    ],
    skipDuplicates: true,
  });

  // Puedes agregar más datos de prueba aquí
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Para validar los datos puedes usar Prisma Studio:
// npx prisma studio
