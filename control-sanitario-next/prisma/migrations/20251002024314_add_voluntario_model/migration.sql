-- CreateTable
CREATE TABLE "public"."voluntario" (
    "id_voluntario" SERIAL NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "voluntario_pkey" PRIMARY KEY ("id_voluntario")
);

-- CreateIndex
CREATE UNIQUE INDEX "voluntario_id_usuario_key" ON "public"."voluntario"("id_usuario");

-- AddForeignKey
ALTER TABLE "public"."voluntario" ADD CONSTRAINT "voluntario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
