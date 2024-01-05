/*
  Warnings:

  - You are about to drop the column `forwrd_route_id` on the `route_stops` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "route_stops" DROP CONSTRAINT "route_stops_forwrd_route_id_fkey";

-- AlterTable
ALTER TABLE "route_stops" DROP COLUMN "forwrd_route_id",
ADD COLUMN     "forward_route_id" INTEGER;

-- CreateIndex
CREATE INDEX "route_stops_forward_route_id_idx" ON "route_stops"("forward_route_id");

-- CreateIndex
CREATE INDEX "route_stops_backward_route_id_idx" ON "route_stops"("backward_route_id");

-- CreateIndex
CREATE INDEX "routes_transport_type_id_idx" ON "routes"("transport_type_id");

-- CreateIndex
CREATE INDEX "routes_ticket_price_id_idx" ON "routes"("ticket_price_id");

-- AddForeignKey
ALTER TABLE "route_stops" ADD CONSTRAINT "route_stops_forward_route_id_fkey" FOREIGN KEY ("forward_route_id") REFERENCES "routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
