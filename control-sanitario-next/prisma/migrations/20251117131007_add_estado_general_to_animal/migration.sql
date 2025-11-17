-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('Activo', 'Inactivo', 'Pendiente');

-- AlterTable
ALTER TABLE "animal" ADD COLUMN     "edad_animal" VARCHAR(50),
ADD COLUMN     "estado_general" VARCHAR(20) DEFAULT 'Activo',
ADD COLUMN     "id_categoria" INTEGER,
ADD COLUMN     "id_especie" INTEGER,
ADD COLUMN     "zona" VARCHAR(100);

-- AlterTable
ALTER TABLE "avistamiento" ADD COLUMN     "estado_general" "Estado" DEFAULT 'Activo',
ADD COLUMN     "id_animal" INTEGER,
ADD COLUMN     "latitud" DOUBLE PRECISION,
ADD COLUMN     "longitud" DOUBLE PRECISION,
ADD COLUMN     "zona" VARCHAR(50);

-- AlterTable
ALTER TABLE "solicitud_adopcion" ADD COLUMN     "estado_adopcion" VARCHAR(30),
ADD COLUMN     "id_animal" INTEGER;

-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "emailVerificado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tokenVerificacion" VARCHAR(255);

-- CreateTable
CREATE TABLE "categoria" (
    "id_categoria" SERIAL NOT NULL,
    "nombre_categoria" VARCHAR(50) NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "mensaje" (
    "id_mensaje" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "fecha_envio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_remitente" INTEGER NOT NULL,
    "id_destinatario" INTEGER NOT NULL,

    CONSTRAINT "mensaje_pkey" PRIMARY KEY ("id_mensaje")
);

-- CreateTable
CREATE TABLE "historial_reporte" (
    "id_historial" SERIAL NOT NULL,
    "id_reporte" INTEGER NOT NULL,
    "fecha_evento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario" INTEGER NOT NULL,
    "estado" VARCHAR(30) NOT NULL,
    "observaciones" TEXT,

    CONSTRAINT "historial_reporte_pkey" PRIMARY KEY ("id_historial")
);

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_id_especie_fkey" FOREIGN KEY ("id_especie") REFERENCES "especie"("id_especie") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categoria"("id_categoria") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitud_adopcion" ADD CONSTRAINT "solicitud_adopcion_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "animal"("id_animal") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avistamiento" ADD CONSTRAINT "avistamiento_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "animal"("id_animal") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensaje" ADD CONSTRAINT "mensaje_id_remitente_fkey" FOREIGN KEY ("id_remitente") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensaje" ADD CONSTRAINT "mensaje_id_destinatario_fkey" FOREIGN KEY ("id_destinatario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_reporte" ADD CONSTRAINT "historial_reporte_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
