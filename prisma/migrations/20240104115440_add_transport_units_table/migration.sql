-- CreateTable
CREATE TABLE "transport_units" (
    "id" SERIAL NOT NULL,
    "qr_code" VARCHAR(12) NOT NULL,
    "number" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "brand" VARCHAR(128) NOT NULL,
    "model" VARCHAR(128) NOT NULL,
    "company_id" INTEGER NOT NULL,
    "division" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transport_units_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transport_units_qr_code_key" ON "transport_units"("qr_code");

-- CreateIndex
CREATE UNIQUE INDEX "transport_units_number_key" ON "transport_units"("number");

-- AddForeignKey
ALTER TABLE "transport_units" ADD CONSTRAINT "transport_units_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "glossaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transport_units" ADD CONSTRAINT "transport_units_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
