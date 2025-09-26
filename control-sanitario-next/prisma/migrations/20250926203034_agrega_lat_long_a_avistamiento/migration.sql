/*
  Warnings:

  - The `ubicacion` column on the `avistamiento` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."avistamiento" ADD COLUMN     "latitud" DOUBLE PRECISION,
ADD COLUMN     "longitud" DOUBLE PRECISION,
DROP COLUMN "ubicacion",
ADD COLUMN     "ubicacion" BYTEA;
