import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Sexos
  const sexoM = await prisma.sexo.upsert({
    where: { id_sexo: 1 },
    update: {},
    create: { sexo: 'Masculino' },
  });
  const sexoF = await prisma.sexo.upsert({
    where: { id_sexo: 2 },
    update: {},
    create: { sexo: 'Femenino' },
  });

  // Roles base
  const adminRole = await prisma.rol.upsert({
    where: { id_rol: 1 },
    update: {},
    create: { nombre_rol: 'ADMIN' },
  });
  const userRole = await prisma.rol.upsert({
    where: { id_rol: 2 },
    update: {},
    create: { nombre_rol: 'USUARIO' },
  });
  const orgRole = await prisma.rol.upsert({
    where: { id_rol: 3 },
    update: {},
    create: { nombre_rol: 'ORGANIZACION' },
  });
  const volRole = await prisma.rol.upsert({
    where: { id_rol: 4 },
    update: {},
    create: { nombre_rol: 'VOLUNTARIO' },
  });

  // Organización de prueba
  const org = await prisma.organizacion.upsert({
    where: { id_organizacion: 1 },
    update: {},
    create: {
      nombre_organizacion: 'Fundación Animal Demo',
      telefono_organizacion: '111111111',
      email_organizacion: 'contacto@fundaciondemo.com',
      direccion: 'Av. Siempre Viva 123',
    },
  });

  // Usuarios de prueba
  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      nombre_usuario: 'Admin',
      apellido_paterno: 'Demo',
      apellido_materno: 'Test',
      fecha_nacimiento: new Date('1990-01-01'),
      telefono: '123456789',
      email: 'admin@demo.com',
      password_hash: 'admin123',
      id_sexo: sexoM.id_sexo,
      activo: true,
      id_rol: adminRole.id_rol,
    },
  });

  const user = await prisma.usuario.upsert({
    where: { email: 'user@demo.com' },
    update: {},
    create: {
      nombre_usuario: 'User',
      apellido_paterno: 'Demo',
      apellido_materno: 'Test',
      fecha_nacimiento: new Date('1995-05-05'),
      telefono: '987654321',
      email: 'user@demo.com',
      password_hash: 'user123',
      id_sexo: sexoF.id_sexo,
      activo: true,
      id_rol: userRole.id_rol,
    },
  });

  const orgUser = await prisma.usuario.upsert({
    where: { email: 'org@demo.com' },
    update: {},
    create: {
      nombre_usuario: 'Fundación',
      apellido_paterno: 'Animal',
      apellido_materno: 'Protectora',
      fecha_nacimiento: new Date('2000-01-01'),
      telefono: '222222222',
      email: 'org@demo.com',
      password_hash: 'org123',
      id_sexo: sexoF.id_sexo,
      activo: true,
      id_rol: orgRole.id_rol,
      id_organizacion: org.id_organizacion,
    },
  });

  const volunteer = await prisma.usuario.upsert({
    where: { email: 'volunt@demo.com' },
    update: {},
    create: {
      nombre_usuario: 'Juan',
      apellido_paterno: 'Perez',
      apellido_materno: 'Ayuda',
      fecha_nacimiento: new Date('1998-03-15'),
      telefono: '333333333',
      email: 'volunt@demo.com',
      password_hash: 'volunt123',
      id_sexo: sexoM.id_sexo,
      activo: true,
      id_rol: volRole.id_rol,
    },
  });

  // Catálogos base - Especies
  const especie = await prisma.especie.upsert({
    where: { id_especie: 1 },
    update: {},
    create: { especie: 'Perro' },
  });
  const especieGato = await prisma.especie.upsert({
    where: { id_especie: 2 },
    update: {},
    create: { especie: 'Gato' },
  });

  // Estados de salud
  const estadoSalud = await prisma.estado_salud.upsert({
    where: { id_estado_salud: 1 },
    update: {},
    create: { estado_salud: 'Sano' },
  });
  const estadoEnfermo = await prisma.estado_salud.upsert({
    where: { id_estado_salud: 2 },
    update: {},
    create: { estado_salud: 'Enfermo' },
  });

  // Razas
  const razaLabrador = await prisma.raza.upsert({
    where: { id_raza: 1 },
    update: {},
    create: {
      id_especie: especie.id_especie,
      raza: 'Labrador',
    },
  });

  // Crear animales de prueba
  const animal1 = await prisma.animal.upsert({
    where: { id_animal: 1 },
    update: {},
    create: {
      nombre_animal: 'Firulais',
      id_estado_salud: estadoSalud.id_estado_salud,
      id_raza: razaLabrador.id_raza,
      id_usuario_propietario: admin.id_usuario,
    },
  });

  const animal2 = await prisma.animal.upsert({
    where: { id_animal: 2 },
    update: {},
    create: {
      nombre_animal: 'Michi',
      id_estado_salud: estadoSalud.id_estado_salud,
      id_raza: razaLabrador.id_raza,
      id_usuario_propietario: user.id_usuario,
    },
  });

  // Estados de adopción
  await prisma.estado_solicitud.upsert({
    where: { id_estado_solicitud: 1 },
    update: {},
    create: { estado_solicitud: 'Pendiente' },
  });
  await prisma.estado_solicitud.upsert({
    where: { id_estado_solicitud: 2 },
    update: {},
    create: { estado_solicitud: 'Aprobada' },
  });
  await prisma.estado_solicitud.upsert({
    where: { id_estado_solicitud: 3 },
    update: {},
    create: { estado_solicitud: 'Rechazada' },
  });

  // Adopción de ejemplo
  const adopcion = await prisma.adopcion.upsert({
    where: { id_adopcion: 1 },
    update: {},
    create: {
      id_animal: animal1.id_animal,
      id_usuario_rescatista: admin.id_usuario,
      id_usuario_adoptante: user.id_usuario,
      disponible: false,
      descripcion: 'Adopción completada',
    },
  });

  // Solicitud de adopción de ejemplo
  await prisma.solicitud_adopcion.upsert({
    where: { id_solicitud_adopcion: 1 },
    update: {},
    create: {
      id_usuario: user.id_usuario,
      id_adopcion: adopcion.id_adopcion,
      fecha_ingreso_solicitud: new Date(),
      id_estado_solicitud: 2, // Aprobada
    },
  });

  // Estados de avistamiento
  const estadoActivo = await prisma.estado_avistamiento.upsert({
    where: { id_estado_avistamiento: 1 },
    update: {},
    create: { estado_avistamiento: 'Activo' },
  });
  await prisma.estado_avistamiento.upsert({
    where: { id_estado_avistamiento: 2 },
    update: {},
    create: { estado_avistamiento: 'Resuelto' },
  });

  // Avistamiento de ejemplo
  await prisma.avistamiento.upsert({
    where: { id_avistamiento: 1 },
    update: {},
    create: {
      id_usuario: volunteer.id_usuario,
      id_estado_avistamiento: estadoActivo.id_estado_avistamiento,
      id_estado_salud: estadoSalud.id_estado_salud,
      id_especie: especie.id_especie,
      descripcion: 'Cachorro encontrado en la calle, necesita atención.',
      direccion: 'Parque Central',
    },
  });

  // Google account ficticia
  await prisma.google_accounts.upsert({
    where: { id_google_account: 1 },
    update: {},
    create: {
      id_usuario: user.id_usuario,
      google_account_id: 'fake-google-id',
      google_email: 'user@demo.com',
      refresh_token: 'fake-refresh-token',
      access_token: 'fake-access-token',
    },
  });

  console.log('✅ Seed ejecutado correctamente');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
