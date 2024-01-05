/*
  Warnings:

  - Added the required column `middle_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnel_number` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('WORKING', 'NOT_WORKING', 'TEMPORARILY_NOT_WORKING');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "deleted" TIMESTAMP(3),
ADD COLUMN     "middle_name" VARCHAR(128) NOT NULL,
ADD COLUMN     "name" VARCHAR(128) NOT NULL,
ADD COLUMN     "personnel_number" INTEGER NOT NULL,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'WORKING',
ADD COLUMN     "surname" VARCHAR(128) NOT NULL;
