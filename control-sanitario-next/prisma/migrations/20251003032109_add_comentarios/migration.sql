-- CreateTable
CREATE TABLE "public"."comentario" (
    "id_comentario" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario" INTEGER NOT NULL,
    "id_animal" INTEGER NOT NULL,

    CONSTRAINT "comentario_pkey" PRIMARY KEY ("id_comentario")
);

-- AddForeignKey
ALTER TABLE "public"."comentario" ADD CONSTRAINT "comentario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comentario" ADD CONSTRAINT "comentario_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "public"."animal"("id_animal") ON DELETE RESTRICT ON UPDATE CASCADE;
