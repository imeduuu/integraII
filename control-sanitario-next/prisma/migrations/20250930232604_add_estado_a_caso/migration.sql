-- CreateEnum
CREATE TYPE "public"."EstadoCaso" AS ENUM ('Abierto', 'Cerrado', 'EnProceso');

-- CreateTable
CREATE TABLE "public"."caso" (
    "id_caso" SERIAL NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "public"."EstadoCaso" NOT NULL DEFAULT 'Abierto',

    CONSTRAINT "caso_pkey" PRIMARY KEY ("id_caso")
);
