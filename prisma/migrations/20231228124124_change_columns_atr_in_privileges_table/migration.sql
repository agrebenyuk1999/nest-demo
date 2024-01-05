-- DropForeignKey
ALTER TABLE "privileges" DROP CONSTRAINT "privileges_factory_id_fkey";

-- AlterTable
ALTER TABLE "privileges" ALTER COLUMN "factory_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "privileges" ADD CONSTRAINT "privileges_factory_id_fkey" FOREIGN KEY ("factory_id") REFERENCES "glossaries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
