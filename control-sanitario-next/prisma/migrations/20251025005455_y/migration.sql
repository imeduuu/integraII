/*
  Warnings:

  - You are about to drop the column `edad_animal` on the `animal` table. All the data in the column will be lost.
  - You are about to drop the column `estado_general` on the `animal` table. All the data in the column will be lost.
  - You are about to drop the column `id_categoria` on the `animal` table. All the data in the column will be lost.
  - You are about to drop the column `id_especie` on the `animal` table. All the data in the column will be lost.
  - You are about to drop the column `zona` on the `animal` table. All the data in the column will be lost.
  - You are about to drop the column `estado_general` on the `avistamiento` table. All the data in the column will be lost.
  - You are about to drop the column `fotos` on the `avistamiento` table. All the data in the column will be lost.
  - You are about to drop the column `id_animal` on the `avistamiento` table. All the data in the column will be lost.
  - You are about to drop the column `latitud` on the `avistamiento` table. All the data in the column will be lost.
  - You are about to drop the column `longitud` on the `avistamiento` table. All the data in the column will be lost.
  - You are about to drop the column `zona` on the `avistamiento` table. All the data in the column will be lost.
  - You are about to drop the column `nombre_especie` on the `especie` table. All the data in the column will be lost.
  - You are about to drop the column `nombre_estado_salud` on the `estado_salud` table. All the data in the column will be lost.
  - You are about to drop the column `estado_adopcion` on the `solicitud_adopcion` table. All the data in the column will be lost.
  - You are about to drop the column `estado_solicitud` on the `solicitud_adopcion` table. All the data in the column will be lost.
  - You are about to drop the column `id_animal` on the `solicitud_adopcion` table. All the data in the column will be lost.
  - You are about to drop the column `sexo` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `aporte` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `campania` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `caso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comentario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `faq` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favorito` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `historial_reporte` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mensaje` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `voluntario` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email_organizacion]` on the table `organizacion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."animal" DROP CONSTRAINT "animal_id_categoria_fkey";

-- DropForeignKey
ALTER TABLE "public"."animal" DROP CONSTRAINT "animal_id_especie_fkey";

-- DropForeignKey
ALTER TABLE "public"."aporte" DROP CONSTRAINT "aporte_id_campania_fkey";

-- DropForeignKey
ALTER TABLE "public"."aporte" DROP CONSTRAINT "aporte_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "public"."avistamiento" DROP CONSTRAINT "avistamiento_id_animal_fkey";

-- DropForeignKey
ALTER TABLE "public"."comentario" DROP CONSTRAINT "comentario_id_animal_fkey";

-- DropForeignKey
ALTER TABLE "public"."comentario" DROP CONSTRAINT "comentario_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "public"."favorito" DROP CONSTRAINT "favorito_id_animal_fkey";

-- DropForeignKey
ALTER TABLE "public"."favorito" DROP CONSTRAINT "favorito_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "public"."historial_reporte" DROP CONSTRAINT "historial_reporte_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "public"."mensaje" DROP CONSTRAINT "mensaje_id_destinatario_fkey";

-- DropForeignKey
ALTER TABLE "public"."mensaje" DROP CONSTRAINT "mensaje_id_remitente_fkey";

-- DropForeignKey
ALTER TABLE "public"."solicitud_adopcion" DROP CONSTRAINT "solicitud_adopcion_estado_solicitud_fkey";

-- DropForeignKey
ALTER TABLE "public"."solicitud_adopcion" DROP CONSTRAINT "solicitud_adopcion_id_animal_fkey";

-- DropForeignKey
ALTER TABLE "public"."usuario" DROP CONSTRAINT "usuario_id_rol_fkey";

-- DropForeignKey
ALTER TABLE "public"."voluntario" DROP CONSTRAINT "voluntario_id_usuario_fkey";

-- AlterTable
ALTER TABLE "public"."animal" DROP COLUMN "edad_animal",
DROP COLUMN "estado_general",
DROP COLUMN "id_categoria",
DROP COLUMN "id_especie",
DROP COLUMN "zona",
ADD COLUMN     "fecha_nacimiento" TIMESTAMP(3),
ADD COLUMN     "id_raza" INTEGER,
ADD COLUMN     "id_usuario_propietario" INTEGER,
ADD COLUMN     "is_edad_aproximada" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "nombre_animal" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."avistamiento" DROP COLUMN "estado_general",
DROP COLUMN "fotos",
DROP COLUMN "id_animal",
DROP COLUMN "latitud",
DROP COLUMN "longitud",
DROP COLUMN "zona";

-- AlterTable
ALTER TABLE "public"."especie" DROP COLUMN "nombre_especie",
ADD COLUMN     "especie" VARCHAR(20);

-- AlterTable
ALTER TABLE "public"."estado_salud" DROP COLUMN "nombre_estado_salud",
ADD COLUMN     "estado_salud" VARCHAR(20);

-- AlterTable
ALTER TABLE "public"."organizacion" ADD COLUMN     "id_ciudad" INTEGER,
ALTER COLUMN "nombre_organizacion" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "email_organizacion" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "direccion" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "public"."solicitud_adopcion" DROP COLUMN "estado_adopcion",
DROP COLUMN "estado_solicitud",
DROP COLUMN "id_animal",
ADD COLUMN     "id_adopcion" INTEGER,
ADD COLUMN     "id_estado_solicitud" INTEGER,
ALTER COLUMN "fecha_termino_solicitud" DROP NOT NULL,
ALTER COLUMN "fecha_termino_solicitud" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."usuario" DROP COLUMN "sexo",
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "id_ciudad" INTEGER,
ADD COLUMN     "id_sexo" INTEGER,
ALTER COLUMN "nombre_usuario" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "apellido_paterno" DROP NOT NULL,
ALTER COLUMN "apellido_paterno" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "apellido_materno" DROP NOT NULL,
ALTER COLUMN "apellido_materno" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "fecha_nacimiento" DROP NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "activo" SET DEFAULT true,
ALTER COLUMN "id_rol" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."aporte";

-- DropTable
DROP TABLE "public"."campania";

-- DropTable
DROP TABLE "public"."caso";

-- DropTable
DROP TABLE "public"."categoria";

-- DropTable
DROP TABLE "public"."comentario";

-- DropTable
DROP TABLE "public"."faq";

-- DropTable
DROP TABLE "public"."favorito";

-- DropTable
DROP TABLE "public"."historial_reporte";

-- DropTable
DROP TABLE "public"."mensaje";

-- DropTable
DROP TABLE "public"."voluntario";

-- DropEnum
DROP TYPE "public"."Estado";

-- DropEnum
DROP TYPE "public"."EstadoCaso";

-- CreateTable
CREATE TABLE "public"."sexo" (
    "id_sexo" SERIAL NOT NULL,
    "sexo" VARCHAR(15) NOT NULL,

    CONSTRAINT "sexo_pkey" PRIMARY KEY ("id_sexo")
);

-- CreateTable
CREATE TABLE "public"."region" (
    "id_region" SERIAL NOT NULL,
    "nombre_region" VARCHAR(50) NOT NULL,

    CONSTRAINT "region_pkey" PRIMARY KEY ("id_region")
);

-- CreateTable
CREATE TABLE "public"."ciudad" (
    "id_ciudad" SERIAL NOT NULL,
    "id_region" INTEGER NOT NULL,
    "nombre_ciudad" VARCHAR(50) NOT NULL,

    CONSTRAINT "ciudad_pkey" PRIMARY KEY ("id_ciudad")
);

-- CreateTable
CREATE TABLE "public"."dispositivo" (
    "id_dispositivo" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "plataforma" VARCHAR(20) NOT NULL,
    "token" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "dispositivo_pkey" PRIMARY KEY ("id_dispositivo")
);

-- CreateTable
CREATE TABLE "public"."raza" (
    "id_raza" SERIAL NOT NULL,
    "id_especie" INTEGER NOT NULL,
    "raza" VARCHAR(20) NOT NULL,

    CONSTRAINT "raza_pkey" PRIMARY KEY ("id_raza")
);

-- CreateTable
CREATE TABLE "public"."animal_foto" (
    "id_foto" SERIAL NOT NULL,
    "id_animal" INTEGER NOT NULL,
    "url" VARCHAR(255) NOT NULL,

    CONSTRAINT "animal_foto_pkey" PRIMARY KEY ("id_foto")
);

-- CreateTable
CREATE TABLE "public"."historial_medico" (
    "id_historial_medico" SERIAL NOT NULL,
    "id_animal" INTEGER NOT NULL,
    "fecha_evento" TIMESTAMP(3) NOT NULL,
    "tipo_evento" VARCHAR(25) NOT NULL,
    "diagnostico" TEXT,
    "detalles" TEXT,
    "nombre_veterinario" VARCHAR(50),

    CONSTRAINT "historial_medico_pkey" PRIMARY KEY ("id_historial_medico")
);

-- CreateTable
CREATE TABLE "public"."adopcion" (
    "id_adopcion" SERIAL NOT NULL,
    "id_animal" INTEGER NOT NULL,
    "id_usuario_rescatista" INTEGER NOT NULL,
    "fecha_publicacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario_adoptante" INTEGER,
    "fecha_adopcion" TIMESTAMP(3),
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "descripcion" TEXT,

    CONSTRAINT "adopcion_pkey" PRIMARY KEY ("id_adopcion")
);

-- CreateTable
CREATE TABLE "public"."avistamiento_foto" (
    "id_foto" SERIAL NOT NULL,
    "id_avistamiento" INTEGER NOT NULL,
    "url" VARCHAR(255) NOT NULL,

    CONSTRAINT "avistamiento_foto_pkey" PRIMARY KEY ("id_foto")
);

-- CreateTable
CREATE TABLE "public"."alerta" (
    "id_alerta" SERIAL NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "id_usuario" INTEGER NOT NULL,
    "id_tipo_alerta" INTEGER NOT NULL,
    "id_nivel_riesgo" INTEGER NOT NULL,
    "ubicacion" VARCHAR(255),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_expiracion" TIMESTAMP(3),
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "reportes" INTEGER DEFAULT 0,

    CONSTRAINT "alerta_pkey" PRIMARY KEY ("id_alerta")
);

-- CreateTable
CREATE TABLE "public"."tipo_alerta" (
    "id_tipo_alerta" SERIAL NOT NULL,
    "tipo_alerta" VARCHAR(50) NOT NULL,

    CONSTRAINT "tipo_alerta_pkey" PRIMARY KEY ("id_tipo_alerta")
);

-- CreateTable
CREATE TABLE "public"."nivel_riesgo" (
    "id_nivel_riesgo" SERIAL NOT NULL,
    "nivel_riesgo" VARCHAR(50) NOT NULL,

    CONSTRAINT "nivel_riesgo_pkey" PRIMARY KEY ("id_nivel_riesgo")
);

-- CreateTable
CREATE TABLE "public"."password_reset" (
    "id_reset" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_pkey" PRIMARY KEY ("id_reset")
);

-- CreateTable
CREATE TABLE "public"."audit_log" (
    "id_audit_log" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "action" VARCHAR(10) NOT NULL,
    "table_name" VARCHAR(50) NOT NULL,
    "record_id" INTEGER NOT NULL,
    "old_values" JSONB,
    "new_values" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id_audit_log")
);

-- CreateIndex
CREATE UNIQUE INDEX "dispositivo_token_key" ON "public"."dispositivo"("token");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_token_key" ON "public"."password_reset"("token");

-- CreateIndex
CREATE UNIQUE INDEX "organizacion_email_organizacion_key" ON "public"."organizacion"("email_organizacion");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "public"."usuario"("email");

-- AddForeignKey
ALTER TABLE "public"."usuario" ADD CONSTRAINT "usuario_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "public"."rol"("id_rol") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."usuario" ADD CONSTRAINT "usuario_id_sexo_fkey" FOREIGN KEY ("id_sexo") REFERENCES "public"."sexo"("id_sexo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."usuario" ADD CONSTRAINT "usuario_id_ciudad_fkey" FOREIGN KEY ("id_ciudad") REFERENCES "public"."ciudad"("id_ciudad") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."organizacion" ADD CONSTRAINT "organizacion_id_ciudad_fkey" FOREIGN KEY ("id_ciudad") REFERENCES "public"."ciudad"("id_ciudad") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ciudad" ADD CONSTRAINT "ciudad_id_region_fkey" FOREIGN KEY ("id_region") REFERENCES "public"."region"("id_region") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dispositivo" ADD CONSTRAINT "dispositivo_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."raza" ADD CONSTRAINT "raza_id_especie_fkey" FOREIGN KEY ("id_especie") REFERENCES "public"."especie"("id_especie") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."animal" ADD CONSTRAINT "animal_id_usuario_propietario_fkey" FOREIGN KEY ("id_usuario_propietario") REFERENCES "public"."usuario"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."animal" ADD CONSTRAINT "animal_id_raza_fkey" FOREIGN KEY ("id_raza") REFERENCES "public"."raza"("id_raza") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."animal_foto" ADD CONSTRAINT "animal_foto_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "public"."animal"("id_animal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."historial_medico" ADD CONSTRAINT "historial_medico_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "public"."animal"("id_animal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."adopcion" ADD CONSTRAINT "adopcion_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "public"."animal"("id_animal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."adopcion" ADD CONSTRAINT "adopcion_id_usuario_rescatista_fkey" FOREIGN KEY ("id_usuario_rescatista") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."adopcion" ADD CONSTRAINT "adopcion_id_usuario_adoptante_fkey" FOREIGN KEY ("id_usuario_adoptante") REFERENCES "public"."usuario"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."solicitud_adopcion" ADD CONSTRAINT "solicitud_adopcion_id_adopcion_fkey" FOREIGN KEY ("id_adopcion") REFERENCES "public"."adopcion"("id_adopcion") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."solicitud_adopcion" ADD CONSTRAINT "solicitud_adopcion_id_estado_solicitud_fkey" FOREIGN KEY ("id_estado_solicitud") REFERENCES "public"."estado_solicitud"("id_estado_solicitud") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."avistamiento_foto" ADD CONSTRAINT "avistamiento_foto_id_avistamiento_fkey" FOREIGN KEY ("id_avistamiento") REFERENCES "public"."avistamiento"("id_avistamiento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."alerta" ADD CONSTRAINT "alerta_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."alerta" ADD CONSTRAINT "alerta_id_tipo_alerta_fkey" FOREIGN KEY ("id_tipo_alerta") REFERENCES "public"."tipo_alerta"("id_tipo_alerta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."alerta" ADD CONSTRAINT "alerta_id_nivel_riesgo_fkey" FOREIGN KEY ("id_nivel_riesgo") REFERENCES "public"."nivel_riesgo"("id_nivel_riesgo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."password_reset" ADD CONSTRAINT "password_reset_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."audit_log" ADD CONSTRAINT "audit_log_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
