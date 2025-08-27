/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."RolUsuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "RolUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EstadoAnimal" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "EstadoAnimal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Especie" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Especie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Raza" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Raza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sexo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Sexo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EstadoReporte" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "EstadoReporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TipoReporte" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "TipoReporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NivelZona" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "NivelZona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TipoDonacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "TipoDonacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefono" TEXT,
    "rolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Animal" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "especieId" INTEGER NOT NULL,
    "razaId" INTEGER,
    "sexoId" INTEGER,
    "edad" INTEGER,
    "estadoId" INTEGER NOT NULL,
    "ubicacion" TEXT,
    "fotos" TEXT[],
    "zonaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Reporte" (
    "id" SERIAL NOT NULL,
    "tipoId" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "estadoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "animalId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Alerta" (
    "id" SERIAL NOT NULL,
    "mensaje" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "zonaId" INTEGER,
    "animalId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alerta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ZonaSanitaria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nivelId" INTEGER NOT NULL,
    "descripcion" TEXT,
    "ubicacion" TEXT NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ZonaSanitaria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Donacion" (
    "id" SERIAL NOT NULL,
    "tipoId" INTEGER NOT NULL,
    "monto" DOUBLE PRECISION,
    "descripcion" TEXT,
    "usuarioId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Voluntariado" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "actividad" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Voluntariado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HistorialSanitario" (
    "id" SERIAL NOT NULL,
    "animalId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "observacion" TEXT,
    "veterinario" TEXT,

    CONSTRAINT "HistorialSanitario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RolUsuario_nombre_key" ON "public"."RolUsuario"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "EstadoAnimal_nombre_key" ON "public"."EstadoAnimal"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Especie_nombre_key" ON "public"."Especie"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Raza_nombre_key" ON "public"."Raza"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Sexo_nombre_key" ON "public"."Sexo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "EstadoReporte_nombre_key" ON "public"."EstadoReporte"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "TipoReporte_nombre_key" ON "public"."TipoReporte"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "NivelZona_nombre_key" ON "public"."NivelZona"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "TipoDonacion_nombre_key" ON "public"."TipoDonacion"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- AddForeignKey
ALTER TABLE "public"."Usuario" ADD CONSTRAINT "Usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "public"."RolUsuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Animal" ADD CONSTRAINT "Animal_especieId_fkey" FOREIGN KEY ("especieId") REFERENCES "public"."Especie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Animal" ADD CONSTRAINT "Animal_razaId_fkey" FOREIGN KEY ("razaId") REFERENCES "public"."Raza"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Animal" ADD CONSTRAINT "Animal_sexoId_fkey" FOREIGN KEY ("sexoId") REFERENCES "public"."Sexo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Animal" ADD CONSTRAINT "Animal_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "public"."EstadoAnimal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Animal" ADD CONSTRAINT "Animal_zonaId_fkey" FOREIGN KEY ("zonaId") REFERENCES "public"."ZonaSanitaria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reporte" ADD CONSTRAINT "Reporte_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "public"."TipoReporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reporte" ADD CONSTRAINT "Reporte_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "public"."EstadoReporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reporte" ADD CONSTRAINT "Reporte_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reporte" ADD CONSTRAINT "Reporte_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "public"."Animal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Alerta" ADD CONSTRAINT "Alerta_zonaId_fkey" FOREIGN KEY ("zonaId") REFERENCES "public"."ZonaSanitaria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Alerta" ADD CONSTRAINT "Alerta_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "public"."Animal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ZonaSanitaria" ADD CONSTRAINT "ZonaSanitaria_nivelId_fkey" FOREIGN KEY ("nivelId") REFERENCES "public"."NivelZona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Donacion" ADD CONSTRAINT "Donacion_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "public"."TipoDonacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Donacion" ADD CONSTRAINT "Donacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Voluntariado" ADD CONSTRAINT "Voluntariado_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HistorialSanitario" ADD CONSTRAINT "HistorialSanitario_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "public"."Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
