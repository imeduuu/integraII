-- CreateTable
CREATE TABLE "public"."favorito" (
    "id_favorito" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_animal" INTEGER NOT NULL,
    "fecha_agregado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorito_pkey" PRIMARY KEY ("id_favorito")
);

-- CreateIndex
CREATE UNIQUE INDEX "favorito_id_usuario_id_animal_key" ON "public"."favorito"("id_usuario", "id_animal");

-- AddForeignKey
ALTER TABLE "public"."favorito" ADD CONSTRAINT "favorito_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."favorito" ADD CONSTRAINT "favorito_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "public"."animal"("id_animal") ON DELETE RESTRICT ON UPDATE CASCADE;
