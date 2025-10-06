-- CreateTable
CREATE TABLE "public"."campania" (
    "id_campania" SERIAL NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3),
    "activa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "campania_pkey" PRIMARY KEY ("id_campania")
);

-- CreateTable
CREATE TABLE "public"."aporte" (
    "id_aporte" SERIAL NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "descripcion" VARCHAR(255),
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario" INTEGER NOT NULL,
    "id_campania" INTEGER,

    CONSTRAINT "aporte_pkey" PRIMARY KEY ("id_aporte")
);

-- AddForeignKey
ALTER TABLE "public"."aporte" ADD CONSTRAINT "aporte_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."aporte" ADD CONSTRAINT "aporte_id_campania_fkey" FOREIGN KEY ("id_campania") REFERENCES "public"."campania"("id_campania") ON DELETE SET NULL ON UPDATE CASCADE;
