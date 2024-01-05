/*
  Warnings:

  - You are about to drop the column `updated_at` on the `action_logs` table. All the data in the column will be lost.
  - Added the required column `entity` to the `action_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entity_id` to the `action_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "action_logs" DROP COLUMN "updated_at",
ADD COLUMN     "entity" TEXT NOT NULL,
ADD COLUMN     "entity_id" INTEGER NOT NULL;
