-- CreateTable
CREATE TABLE "pages" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(30) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "file_name" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pages_key_key" ON "pages"("key");

-- CreateIndex
CREATE INDEX "pages_key_idx" ON "pages"("key");
