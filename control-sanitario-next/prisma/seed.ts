import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Casos de ejemplo
  await prisma.caso.createMany({
    data: [
      {
        titulo: 'Caso de rescate animal',
        descripcion: 'Animal encontrado en situación de calle, requiere atención médica.',
        estado: 'Abierto',
      },
      {
        titulo: 'Seguimiento post-adopción',
        descripcion: 'Verificación del estado del animal tras adopción.',
        estado: 'EnProceso',
      },
      {
        titulo: 'Caso cerrado por recuperación',
        descripcion: 'El animal fue recuperado y dado de alta.',
        estado: 'Cerrado',
      },
    ],
    skipDuplicates: true,
  });
  // Roles base
  await prisma.rol.upsert({
    where: { id_rol: 1 },
    update: {},
    create: { id_rol: 1, nombre_rol: 'Admin' },
  });
  await prisma.rol.upsert({
    where: { id_rol: 2 },
    update: {},
    create: { id_rol: 2, nombre_rol: 'Usuario' },
  });
  await prisma.rol.upsert({
    where: { id_rol: 3 },
    update: {},
    create: { id_rol: 3, nombre_rol: 'Organización' },
  });
  await prisma.rol.upsert({
    where: { id_rol: 4 },
    update: {},
    create: { id_rol: 4, nombre_rol: 'Voluntario' },
  });

  // Organización de prueba
  const org = await prisma.organizacion.upsert({
    where: { id_organizacion: 1 },
    update: {},
    create: {
      id_organizacion: 1,
      nombre_organizacion: 'Fundación Animal Demo',
      telefono_organizacion: '111111111',
      email_organizacion: 'contacto@fundaciondemo.com',
      direccion: 'Av. Siempre Viva 123',
    },
  });

  // Usuarios de prueba
  await prisma.usuario.upsert({
    where: { id_usuario: 1 },
    update: {},
    create: {
      id_usuario: 1,
      nombre_usuario: 'Admin',
      apellido_paterno: 'Demo',
      apellido_materno: 'Test',
      fecha_nacimiento: new Date('1990-01-01'),
      telefono: '123456789',
      email: 'admin@demo.com',
      password_hash: 'admin123',
      sexo: 'M',
      activo: true,
      id_rol: 1,
    },
  });
  await prisma.usuario.upsert({
    where: { id_usuario: 2 },
    update: {},
    create: {
      id_usuario: 2,
      nombre_usuario: 'User',
      apellido_paterno: 'Demo',
      apellido_materno: 'Test',
      fecha_nacimiento: new Date('1995-05-05'),
      telefono: '987654321',
      email: 'user@demo.com',
      password_hash: 'user123',
      sexo: 'F',
      activo: true,
      id_rol: 2,
    },
  });


  await prisma.usuario.upsert({
    where: { id_usuario: 4 },
    update: {},
    create: {
      id_usuario: 4,
      nombre_usuario: 'Jorge',
      apellido_paterno: 'Perez',
      apellido_materno: 'Ayuda',
      fecha_nacimiento: new Date('1998-03-15'),
      telefono: '333333333',
      email: 'volunt@demo.com',
      password_hash: 'volunt123',
      sexo: 'M',
      activo: true,
      id_rol: 4,
    },
  });

  // Asociar a tabla voluntario
  await prisma.voluntario.upsert({
    where: { id_voluntario: 1 },
    update: {},
    create: {
      id_voluntario: 1,
      id_usuario: 4, 
      fecha_registro: new Date(),
    },
  });

  
  await prisma.usuario.upsert({
    where: { id_usuario: 3 },
    update: {},
    create: {
      id_usuario: 3,
      nombre_usuario: 'Fundación',
      apellido_paterno: 'Animal',
      apellido_materno: 'Protectora',
      fecha_nacimiento: new Date('2000-01-01'),
      telefono: '222222222',
      email: 'org@demo.com',
      password_hash: 'org123',
      sexo: 'F',
      activo: true,
      id_rol: 3,
      id_organizacion: org.id_organizacion,
    },
  });
  await prisma.usuario.upsert({
    where: { id_usuario: 4 },
    update: {},
    create: {
      id_usuario: 4,
      nombre_usuario: 'Juan',
      apellido_paterno: 'Perez',
      apellido_materno: 'Ayuda',
      fecha_nacimiento: new Date('1998-03-15'),
      telefono: '333333333',
      email: 'volunt@demo.com',
      password_hash: 'volunt123',
      sexo: 'M',
      activo: true,
      id_rol: 4,
    },
  });

  // Catálogos base
  const especie = await prisma.especie.upsert({
    where: { id_especie: 1 },
    update: {},
    create: { id_especie: 1, nombre_especie: 'Perro' },
  });
  const categoria = await prisma.categoria.upsert({
    where: { id_categoria: 1 },
    update: {},
    create: { id_categoria: 1, nombre_categoria: 'Doméstico' },
  });
  const estadoSalud = await prisma.estado_salud.upsert({
    where: { id_estado_salud: 1 },
    update: {},
    create: { id_estado_salud: 1, nombre_estado_salud: 'Sano' },
  });

  // Crear animales de prueba
  await prisma.animal.upsert({
    where: { id_animal: 1 },
    update: {},
    create: {
      id_animal: 1,
      nombre_animal: 'Firulais',
      edad_animal: '2 años',
      id_estado_salud: estadoSalud.id_estado_salud,
      id_categoria: categoria.id_categoria,
      id_especie: especie.id_especie
    },
  });
  await prisma.animal.upsert({
    where: { id_animal: 2 },
    update: {},
    create: {
      id_animal: 2,
      nombre_animal: 'Michi',
      edad_animal: '1 año',
      id_estado_salud: estadoSalud.id_estado_salud,
      id_categoria: categoria.id_categoria,
      id_especie: especie.id_especie
    },
  });

  // Estados de solicitud
  await prisma.estado_solicitud.upsert({
    where: { id_estado_solicitud: 1 },
    update: {},
    create: { id_estado_solicitud: 1, estado_solicitud: 'Pendiente' },
  });
  await prisma.estado_solicitud.upsert({
    where: { id_estado_solicitud: 2 },
    update: {},
    create: { id_estado_solicitud: 2, estado_solicitud: 'Aprobada' },
  });
  await prisma.estado_solicitud.upsert({
    where: { id_estado_solicitud: 3 },
    update: {},
    create: { id_estado_solicitud: 3, estado_solicitud: 'Rechazada' },
  });
  

  //Solicitud de adopción de ejemplo
  await prisma.solicitud_adopcion.upsert({
    where: { id_solicitud_adopcion: 1 },
    update: {},
    create: {
      id_solicitud_adopcion: 1,
      id_usuario: 2, // user
      id_animal: 1,  // Firulais
      estado_adopcion: 'Revisión inicial',
      fecha_ingreso_solicitud: new Date(),
      estado_solicitud: 1, // Pendiente
    },
  });

  //Estados de avistamiento
  await prisma.estado_avistamiento.upsert({
    where: { id_estado_avistamiento: 1 },
    update: {},
    create: { id_estado_avistamiento: 1, estado_avistamiento: 'Activo' },
  });
  await prisma.estado_avistamiento.upsert({
    where: { id_estado_avistamiento: 2 },
    update: {},
    create: { id_estado_avistamiento: 2, estado_avistamiento: 'Resuelto' },
  });

  //Avistamiento de ejemplo
  await prisma.avistamiento.upsert({
    where: { id_avistamiento: 1 },
    update: {},
    create: {
      id_avistamiento: 1,
      id_usuario: 4, //voluntario
      id_estado_avistamiento: 1,
      id_estado_salud: estadoSalud.id_estado_salud,
      id_especie: especie.id_especie,
      descripcion: 'Cachorro encontrado en la calle, necesita atención.',
      direccion: 'Parque Central',
    },
  });

  //Google account ficticia
  await prisma.google_accounts.upsert({
    where: { id_google_account: 1 },
    update: {},
    create: {
      id_google_account: 1,
      id_usuario: 2, // user
      google_account_id: 'fake-google-id',
      google_email: 'user@demo.com',
      refresh_token: 'fake-refresh-token',
      access_token: 'fake-access-token',
    },
  });
  
  await prisma.comentario.upsert({
    where: { id_comentario: 1 },
    update: {},
    create: {
      contenido: 'Firulais es muy amigable y juguetón.',
      id_usuario: 2,
      id_animal: 1,
    },
  });

  await prisma.comentario.upsert({
    where: { id_comentario: 2 },
    update: {},
    create: {
      contenido: 'Michi parece tímido pero saludable.',
      id_usuario: 3,
      id_animal: 2,
    },
  });

  await prisma.comentario.upsert({
    where: { id_comentario: 3 },
    update: {},
    create: {
      contenido: 'Encontré al cachorro en buen estado, necesita seguimiento.',
      id_usuario: 4,
      id_animal: 1,
    },
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

  