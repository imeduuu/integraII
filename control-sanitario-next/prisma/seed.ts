import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear roles base
  const roles = [
    { id_rol: 1, nombre_rol: 'Admin' },
    { id_rol: 2, nombre_rol: 'Usuario' },
    { id_rol: 3, nombre_rol: 'Organizacion' },
    { id_rol: 4, nombre_rol: 'Voluntario' },
  ];

  for (const rol of roles) {
    await prisma.rol.upsert({
      where: { id_rol: rol.id_rol },
      update: {},
      create: { nombre_rol: rol.nombre_rol },
    });
  }

  // --- Los demás datos de prueba puedes mantenerlos igual si los necesitas ---
  // Usuarios de prueba
  const adminRole = await prisma.rol.findFirst({ where: { nombre_rol: 'Admin' } });
  const userRole = await prisma.rol.findFirst({ where: { nombre_rol: 'Usuario' } });

  if (adminRole && userRole) {
    await prisma.usuario.create({
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

    await prisma.usuario.create({
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
  }

  // Especie, categoría y estado_salud mínimos
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

  // Animales de prueba
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
