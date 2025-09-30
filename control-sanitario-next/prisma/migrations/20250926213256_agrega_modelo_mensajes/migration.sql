-- CreateTable
CREATE TABLE "public"."mensaje" (
    "id_mensaje" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "fecha_envio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_remitente" INTEGER NOT NULL,
    "id_destinatario" INTEGER NOT NULL,

    CONSTRAINT "mensaje_pkey" PRIMARY KEY ("id_mensaje")
);

-- AddForeignKey
ALTER TABLE "public"."mensaje" ADD CONSTRAINT "mensaje_id_remitente_fkey" FOREIGN KEY ("id_remitente") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mensaje" ADD CONSTRAINT "mensaje_id_destinatario_fkey" FOREIGN KEY ("id_destinatario") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
