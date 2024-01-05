-- DropForeignKey
ALTER TABLE "citizens" DROP CONSTRAINT "citizens_privilege_id_fkey";

-- AlterTable
ALTER TABLE "citizens" ALTER COLUMN "privilege_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "privileges" ALTER COLUMN "code" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "citizens" ADD CONSTRAINT "citizens_privilege_id_fkey" FOREIGN KEY ("privilege_id") REFERENCES "privileges"("id") ON DELETE SET NULL ON UPDATE CASCADE;
