/*
  Warnings:

  - You are about to drop the `Alerta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Animal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Donacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Especie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EstadoAnimal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EstadoReporte` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistorialSanitario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NivelZona` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Raza` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reporte` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RolUsuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sexo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TipoDonacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TipoReporte` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Voluntariado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ZonaSanitaria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Alerta" DROP CONSTRAINT "Alerta_animalId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Alerta" DROP CONSTRAINT "Alerta_zonaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Animal" DROP CONSTRAINT "Animal_especieId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Animal" DROP CONSTRAINT "Animal_estadoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Animal" DROP CONSTRAINT "Animal_razaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Animal" DROP CONSTRAINT "Animal_sexoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Animal" DROP CONSTRAINT "Animal_zonaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Donacion" DROP CONSTRAINT "Donacion_tipoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Donacion" DROP CONSTRAINT "Donacion_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."HistorialSanitario" DROP CONSTRAINT "HistorialSanitario_animalId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reporte" DROP CONSTRAINT "Reporte_animalId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reporte" DROP CONSTRAINT "Reporte_estadoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reporte" DROP CONSTRAINT "Reporte_tipoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reporte" DROP CONSTRAINT "Reporte_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Usuario" DROP CONSTRAINT "Usuario_rolId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Voluntariado" DROP CONSTRAINT "Voluntariado_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ZonaSanitaria" DROP CONSTRAINT "ZonaSanitaria_nivelId_fkey";

-- DropTable
DROP TABLE "public"."Alerta";

-- DropTable
DROP TABLE "public"."Animal";

-- DropTable
DROP TABLE "public"."Donacion";

-- DropTable
DROP TABLE "public"."Especie";

-- DropTable
DROP TABLE "public"."EstadoAnimal";

-- DropTable
DROP TABLE "public"."EstadoReporte";

-- DropTable
DROP TABLE "public"."HistorialSanitario";

-- DropTable
DROP TABLE "public"."NivelZona";

-- DropTable
DROP TABLE "public"."Raza";

-- DropTable
DROP TABLE "public"."Reporte";

-- DropTable
DROP TABLE "public"."RolUsuario";

-- DropTable
DROP TABLE "public"."Sexo";

-- DropTable
DROP TABLE "public"."TipoDonacion";

-- DropTable
DROP TABLE "public"."TipoReporte";

-- DropTable
DROP TABLE "public"."Usuario";

-- DropTable
DROP TABLE "public"."Voluntariado";

-- DropTable
DROP TABLE "public"."ZonaSanitaria";

-- CreateTable
CREATE TABLE "public"."organizacion" (
    "id_organizacion" SERIAL NOT NULL,
    "nombre_organizacion" VARCHAR(30) NOT NULL,
    "telefono_organizacion" VARCHAR(20) NOT NULL,
    "email_organizacion" VARCHAR(30) NOT NULL,
    "direccion" VARCHAR(30) NOT NULL,

    CONSTRAINT "organizacion_pkey" PRIMARY KEY ("id_organizacion")
);

-- CreateTable
CREATE TABLE "public"."rol" (
    "id_rol" SERIAL NOT NULL,
    "nombre_rol" VARCHAR(30) NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "public"."usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre_usuario" VARCHAR(30) NOT NULL,
    "apellido_paterno" VARCHAR(20) NOT NULL,
    "apellido_materno" VARCHAR(20) NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "telefono" VARCHAR(20),
    "email" VARCHAR(60) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "sexo" CHAR(1) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_ultimo_login" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL,
    "id_organizacion" INTEGER,
    "id_rol" INTEGER NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "public"."animal" (
    "id_animal" SERIAL NOT NULL,
    "nombre_animal" VARCHAR(30) NOT NULL,
    "edad_animal" VARCHAR(12) NOT NULL,
    "id_estado_salud" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "id_especie" INTEGER NOT NULL,

    CONSTRAINT "animal_pkey" PRIMARY KEY ("id_animal")
);

-- CreateTable
CREATE TABLE "public"."especie" (
    "id_especie" SERIAL NOT NULL,
    "nombre_especie" VARCHAR(20) NOT NULL,

    CONSTRAINT "especie_pkey" PRIMARY KEY ("id_especie")
);

-- CreateTable
CREATE TABLE "public"."categoria" (
    "id_categoria" SERIAL NOT NULL,
    "nombre_categoria" VARCHAR(20) NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "public"."estado_salud" (
    "id_estado_salud" SERIAL NOT NULL,
    "nombre_estado_salud" VARCHAR(20) NOT NULL,

    CONSTRAINT "estado_salud_pkey" PRIMARY KEY ("id_estado_salud")
);

-- CreateTable
CREATE TABLE "public"."solicitud_adopcion" (
    "id_solicitud_adopcion" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_animal" INTEGER NOT NULL,
    "estado_adopcion" VARCHAR(30) NOT NULL,
    "fecha_ingreso_solicitud" TIMESTAMP(3) NOT NULL,
    "fecha_termino_solicitud" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado_solicitud" INTEGER NOT NULL,

    CONSTRAINT "solicitud_adopcion_pkey" PRIMARY KEY ("id_solicitud_adopcion")
);

-- CreateTable
CREATE TABLE "public"."estado_solicitud" (
    "id_estado_solicitud" SERIAL NOT NULL,
    "estado_solicitud" VARCHAR(20) NOT NULL,

    CONSTRAINT "estado_solicitud_pkey" PRIMARY KEY ("id_estado_solicitud")
);

-- CreateTable
CREATE TABLE "public"."avistamiento" (
    "id_avistamiento" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_estado_avistamiento" INTEGER NOT NULL,
    "id_estado_salud" INTEGER NOT NULL,
    "id_especie" INTEGER NOT NULL,
    "id_animal" INTEGER,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT,
    "fotos" JSONB,
    "ubicacion" BYTEA,
    "direccion" VARCHAR(30),

    CONSTRAINT "avistamiento_pkey" PRIMARY KEY ("id_avistamiento")
);

-- CreateTable
CREATE TABLE "public"."estado_avistamiento" (
    "id_estado_avistamiento" SERIAL NOT NULL,
    "estado_avistamiento" VARCHAR(20) NOT NULL,

    CONSTRAINT "estado_avistamiento_pkey" PRIMARY KEY ("id_estado_avistamiento")
);

-- CreateTable
CREATE TABLE "public"."google_accounts" (
    "id_google_account" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "google_account_id" VARCHAR(255) NOT NULL,
    "google_email" VARCHAR(255) NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "token_expiry" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "google_accounts_pkey" PRIMARY KEY ("id_google_account")
);

-- AddForeignKey
ALTER TABLE "public"."usuario" ADD CONSTRAINT "usuario_id_organizacion_fkey" FOREIGN KEY ("id_organizacion") REFERENCES "public"."organizacion"("id_organizacion") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."usuario" ADD CONSTRAINT "usuario_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "public"."rol"("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."animal" ADD CONSTRAINT "animal_id_estado_salud_fkey" FOREIGN KEY ("id_estado_salud") REFERENCES "public"."estado_salud"("id_estado_salud") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."animal" ADD CONSTRAINT "animal_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "public"."categoria"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."animal" ADD CONSTRAINT "animal_id_especie_fkey" FOREIGN KEY ("id_especie") REFERENCES "public"."especie"("id_especie") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."solicitud_adopcion" ADD CONSTRAINT "solicitud_adopcion_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."solicitud_adopcion" ADD CONSTRAINT "solicitud_adopcion_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "public"."animal"("id_animal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."solicitud_adopcion" ADD CONSTRAINT "solicitud_adopcion_estado_solicitud_fkey" FOREIGN KEY ("estado_solicitud") REFERENCES "public"."estado_solicitud"("id_estado_solicitud") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."avistamiento" ADD CONSTRAINT "avistamiento_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."avistamiento" ADD CONSTRAINT "avistamiento_id_estado_avistamiento_fkey" FOREIGN KEY ("id_estado_avistamiento") REFERENCES "public"."estado_avistamiento"("id_estado_avistamiento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."avistamiento" ADD CONSTRAINT "avistamiento_id_estado_salud_fkey" FOREIGN KEY ("id_estado_salud") REFERENCES "public"."estado_salud"("id_estado_salud") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."avistamiento" ADD CONSTRAINT "avistamiento_id_especie_fkey" FOREIGN KEY ("id_especie") REFERENCES "public"."especie"("id_especie") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."avistamiento" ADD CONSTRAINT "avistamiento_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "public"."animal"("id_animal") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."google_accounts" ADD CONSTRAINT "google_accounts_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
