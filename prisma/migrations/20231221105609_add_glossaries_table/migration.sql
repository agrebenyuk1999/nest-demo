-- CreateTable
CREATE TABLE "glossaries" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "additional_field" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "glossaries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "glossaries_category_value_key" ON "glossaries"("category", "value");
