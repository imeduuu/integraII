-- CreateEnum
CREATE TYPE "public"."Estado" AS ENUM ('Activo', 'Inactivo', 'Pendiente');

-- AlterTable
ALTER TABLE "public"."animal" ADD COLUMN     "estado_general" "public"."Estado" NOT NULL DEFAULT 'Activo',
ADD COLUMN     "zona" VARCHAR(50);

-- AlterTable
ALTER TABLE "public"."avistamiento" ADD COLUMN     "estado_general" "public"."Estado",
ADD COLUMN     "zona" VARCHAR(50);
