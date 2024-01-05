-- CreateTable
CREATE TABLE "handbooks" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(50) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "handbooks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "handbooks_key_category_key" ON "handbooks"("key", "category");
