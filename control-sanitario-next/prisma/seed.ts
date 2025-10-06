import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const db: any = prisma;

async function main() {
  // Roles
  await prisma.rol.upsert({ where: { id_rol: 1 }, update: {}, create: { id_rol: 1, nombre_rol: 'Admin' } });
  await prisma.rol.upsert({ where: { id_rol: 2 }, update: {}, create: { id_rol: 2, nombre_rol: 'Usuario' } });
  await prisma.rol.upsert({ where: { id_rol: 3 }, update: {}, create: { id_rol: 3, nombre_rol: 'Organización' } });
  await prisma.rol.upsert({ where: { id_rol: 4 }, update: {}, create: { id_rol: 4, nombre_rol: 'Voluntario' } });

  // Organización
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

  // Usuarios
  await prisma.usuario.upsert({ where: { id_usuario: 1 }, update: {}, create: { id_usuario: 1, nombre_usuario: 'Admin', apellido_paterno: 'Demo', apellido_materno: 'Test', fecha_nacimiento: new Date('1990-01-01'), telefono: '123456789', email: 'admin@demo.com', password_hash: 'admin123', sexo: 'M', activo: true, id_rol: 1 } });
  await prisma.usuario.upsert({ where: { id_usuario: 2 }, update: {}, create: { id_usuario: 2, nombre_usuario: 'User', apellido_paterno: 'Demo', apellido_materno: 'Test', fecha_nacimiento: new Date('1995-05-05'), telefono: '987654321', email: 'user@demo.com', password_hash: 'user123', sexo: 'F', activo: true, id_rol: 2 } });
  await prisma.usuario.upsert({ where: { id_usuario: 3 }, update: {}, create: { id_usuario: 3, nombre_usuario: 'Fundación', apellido_paterno: 'Animal', apellido_materno: 'Protectora', fecha_nacimiento: new Date('2000-01-01'), telefono: '222222222', email: 'org@demo.com', password_hash: 'org123', sexo: 'F', activo: true, id_rol: 3, id_organizacion: org.id_organizacion } });
  await prisma.usuario.upsert({ where: { id_usuario: 4 }, update: {}, create: { id_usuario: 4, nombre_usuario: 'Juan', apellido_paterno: 'Perez', apellido_materno: 'Ayuda', fecha_nacimiento: new Date('1998-03-15'), telefono: '333333333', email: 'volunt@demo.com', password_hash: 'volunt123', sexo: 'M', activo: true, id_rol: 4 } });

  // Voluntario (may not exist in all schemas)
  try {
    if (db.voluntario && typeof db.voluntario.upsert === 'function') {
      await db.voluntario.upsert({ where: { id_voluntario: 1 }, update: {}, create: { id_voluntario: 1, id_usuario: 4, fecha_registro: new Date() } });
    }
  } catch (e) {
    // ignore if model not present
  }

  // Catálogos y estados
  const especie = await prisma.especie.upsert({ where: { id_especie: 1 }, update: {}, create: { id_especie: 1, nombre_especie: 'Perro' } });
  const categoria = await prisma.categoria.upsert({ where: { id_categoria: 1 }, update: {}, create: { id_categoria: 1, nombre_categoria: 'Doméstico' } });
  const estadoSalud = await prisma.estado_salud.upsert({ where: { id_estado_salud: 1 }, update: {}, create: { id_estado_salud: 1, nombre_estado_salud: 'Sano' } });

  await prisma.animal.upsert({ where: { id_animal: 1 }, update: {}, create: { id_animal: 1, nombre_animal: 'Firulais', edad_animal: '2 años', id_estado_salud: estadoSalud.id_estado_salud, id_categoria: categoria.id_categoria, id_especie: especie.id_especie } });
  await prisma.animal.upsert({ where: { id_animal: 2 }, update: {}, create: { id_animal: 2, nombre_animal: 'Michi', edad_animal: '1 año', id_estado_salud: estadoSalud.id_estado_salud, id_categoria: categoria.id_categoria, id_especie: especie.id_especie } });

  await prisma.estado_solicitud.upsert({ where: { id_estado_solicitud: 1 }, update: {}, create: { id_estado_solicitud: 1, estado_solicitud: 'Pendiente' } });
  await prisma.estado_solicitud.upsert({ where: { id_estado_solicitud: 2 }, update: {}, create: { id_estado_solicitud: 2, estado_solicitud: 'Aprobada' } });
  await prisma.estado_solicitud.upsert({ where: { id_estado_solicitud: 3 }, update: {}, create: { id_estado_solicitud: 3, estado_solicitud: 'Rechazada' } });

  await prisma.solicitud_adopcion.upsert({ where: { id_solicitud_adopcion: 1 }, update: {}, create: { id_solicitud_adopcion: 1, id_usuario: 2, id_animal: 1, estado_adopcion: 'Revisión inicial', fecha_ingreso_solicitud: new Date(), estado_solicitud: 1 } });

  await prisma.estado_avistamiento.upsert({ where: { id_estado_avistamiento: 1 }, update: {}, create: { id_estado_avistamiento: 1, estado_avistamiento: 'Activo' } });
  await prisma.estado_avistamiento.upsert({ where: { id_estado_avistamiento: 2 }, update: {}, create: { id_estado_avistamiento: 2, estado_avistamiento: 'Resuelto' } });

  await prisma.avistamiento.upsert({ where: { id_avistamiento: 1 }, update: {}, create: { id_avistamiento: 1, id_usuario: 4, id_estado_avistamiento: 1, id_estado_salud: estadoSalud.id_estado_salud, id_especie: especie.id_especie, descripcion: 'Cachorro encontrado en la calle, necesita atención.', direccion: 'Parque Central' } });

  // Google account, comentarios, favoritos, faqs
  try {
    // Some prisma clients may not have these models depending on schema; wrap in try/catch to be safe
    if (db.google_accounts && typeof db.google_accounts.upsert === 'function') {
      await db.google_accounts.upsert({ where: { id_google_account: 1 }, update: {}, create: { id_google_account: 1, id_usuario: 2, google_account_id: 'fake-google-id', google_email: 'user@demo.com', refresh_token: 'fake-refresh-token', access_token: 'fake-access-token' } });
    }
  } catch (e) {
    // ignore if model not present
  }

  try {
    if (db.comentario && typeof db.comentario.upsert === 'function') {
      await db.comentario.upsert({ where: { id_comentario: 1 }, update: {}, create: { id_comentario: 1, contenido: 'Firulais es muy amigable y juguetón.', id_usuario: 2, id_animal: 1 } });
      await db.comentario.upsert({ where: { id_comentario: 2 }, update: {}, create: { id_comentario: 2, contenido: 'Michi parece tímido pero saludable.', id_usuario: 3, id_animal: 2 } });
      await db.comentario.upsert({ where: { id_comentario: 3 }, update: {}, create: { id_comentario: 3, contenido: 'Encontré al cachorro en buen estado, necesita seguimiento.', id_usuario: 4, id_animal: 1 } });
    }
  } catch (e) {
    // ignore
  }

  try {
    if (db.favorito && typeof db.favorito.upsert === 'function') {
      await db.favorito.upsert({ where: { id_favorito: 1 }, update: {}, create: { id_favorito: 1, id_usuario: 2, id_animal: 1 } });
      await db.favorito.upsert({ where: { id_favorito: 2 }, update: {}, create: { id_favorito: 2, id_usuario: 2, id_animal: 2 } });
    }
  } catch (e) {
    // ignore
  }

  try {
    if (db.faq && typeof db.faq.upsert === 'function') {
      await db.faq.upsert({ where: { id_faq: 1 }, update: {}, create: { id_faq: 1, pregunta: '¿Cómo puedo reportar un animal en la calle?', respuesta: 'Puedes reportar un animal desde la sección "Reportar" en el menú principal. Deberás proporcionar una descripción del animal, su ubicación y, si es posible, una foto.' } });
      await db.faq.upsert({ where: { id_faq: 2 }, update: {}, create: { id_faq: 2, pregunta: '¿Qué necesito para adoptar una mascota?', respuesta: 'Para adoptar, debes ir a la sección "Adopciones", elegir una mascota y completar el formulario de solicitud. Se te pedirá información sobre tu experiencia con mascotas y las condiciones de tu hogar.' } });
      await db.faq.upsert({ where: { id_faq: 3 }, update: {}, create: { id_faq: 3, pregunta: '¿Cómo puedo ser voluntario?', respuesta: '¡Gracias por tu interés! Puedes registrarte como voluntario en la sección de "Voluntariado". Una vez registrado, una organización se pondrá en contacto contigo para coordinar actividades.' } });
    }
  } catch (e) {
    // ignore
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
