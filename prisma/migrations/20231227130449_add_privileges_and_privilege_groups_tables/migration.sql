/*
  Warnings:

  - Added the required column `privilege_id` to the `citizens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "citizens" ADD COLUMN     "privilege_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "privileges" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(400) NOT NULL,
    "type_id" INTEGER NOT NULL,
    "privilege_group_id" INTEGER NOT NULL,
    "factory_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "privileges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "privilege_groups" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(400) NOT NULL,
    "limit" INTEGER NOT NULL,
    "percent" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "privilege_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_privilege_position_glossary" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "privileges_code_key" ON "privileges"("code");

-- CreateIndex
CREATE INDEX "privileges_privilege_group_id_idx" ON "privileges"("privilege_group_id");

-- CreateIndex
CREATE INDEX "privileges_type_id_idx" ON "privileges"("type_id");

-- CreateIndex
CREATE INDEX "privileges_factory_id_idx" ON "privileges"("factory_id");

-- CreateIndex
CREATE UNIQUE INDEX "_privilege_position_glossary_AB_unique" ON "_privilege_position_glossary"("A", "B");

-- CreateIndex
CREATE INDEX "_privilege_position_glossary_B_index" ON "_privilege_position_glossary"("B");

-- CreateIndex
CREATE INDEX "citizens_privilege_id_idx" ON "citizens"("privilege_id");

-- AddForeignKey
ALTER TABLE "citizens" ADD CONSTRAINT "citizens_privilege_id_fkey" FOREIGN KEY ("privilege_id") REFERENCES "privileges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "privileges" ADD CONSTRAINT "privileges_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "glossaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "privileges" ADD CONSTRAINT "privileges_privilege_group_id_fkey" FOREIGN KEY ("privilege_group_id") REFERENCES "privilege_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "privileges" ADD CONSTRAINT "privileges_factory_id_fkey" FOREIGN KEY ("factory_id") REFERENCES "glossaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_privilege_position_glossary" ADD CONSTRAINT "_privilege_position_glossary_A_fkey" FOREIGN KEY ("A") REFERENCES "glossaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_privilege_position_glossary" ADD CONSTRAINT "_privilege_position_glossary_B_fkey" FOREIGN KEY ("B") REFERENCES "privileges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
