/*
  Warnings:

  - Added the required column `route_id` to the `route_stops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `x` to the `route_stops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `route_stops` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "routes" DROP CONSTRAINT "routes_ticket_price_id_fkey";

-- DropForeignKey
ALTER TABLE "routes" DROP CONSTRAINT "routes_transport_type_id_fkey";

-- AlterTable
ALTER TABLE "route_stops" ADD COLUMN     "route_id" INTEGER NOT NULL,
ADD COLUMN     "x" TEXT NOT NULL,
ADD COLUMN     "y" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_transport_type_id_fkey" FOREIGN KEY ("transport_type_id") REFERENCES "glossaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_ticket_price_id_fkey" FOREIGN KEY ("ticket_price_id") REFERENCES "glossaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_stops" ADD CONSTRAINT "route_stops_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
