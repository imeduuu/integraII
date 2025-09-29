-- CreateTable
CREATE TABLE "public"."historial_reporte" (
    "id_historial" SERIAL NOT NULL,
    "id_reporte" INTEGER NOT NULL,
    "fecha_evento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario" INTEGER NOT NULL,
    "estado" VARCHAR(30) NOT NULL,
    "observaciones" TEXT,

    CONSTRAINT "historial_reporte_pkey" PRIMARY KEY ("id_historial")
);

-- AddForeignKey
ALTER TABLE "public"."historial_reporte" ADD CONSTRAINT "historial_reporte_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
