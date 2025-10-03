-- CreateTable
CREATE TABLE "public"."faq" (
    "id_faq" SERIAL NOT NULL,
    "pregunta" TEXT NOT NULL,
    "respuesta" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "faq_pkey" PRIMARY KEY ("id_faq")
);