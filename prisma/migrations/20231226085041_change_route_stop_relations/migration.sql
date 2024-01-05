/*
  Warnings:

  - You are about to drop the column `route_id` on the `route_stops` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "route_stops" DROP CONSTRAINT "route_stops_route_id_fkey";

-- AlterTable
ALTER TABLE "route_stops" DROP COLUMN "route_id",
ADD COLUMN     "backward_route_id" INTEGER,
ADD COLUMN     "forwrd_route_id" INTEGER;

-- AddForeignKey
ALTER TABLE "route_stops" ADD CONSTRAINT "route_stops_forwrd_route_id_fkey" FOREIGN KEY ("forwrd_route_id") REFERENCES "routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_stops" ADD CONSTRAINT "route_stops_backward_route_id_fkey" FOREIGN KEY ("backward_route_id") REFERENCES "routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
