-- CreateTable
CREATE TABLE "routes" (
    "id" SERIAL NOT NULL,
    "number" VARCHAR(10) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "transport_type_id" INTEGER NOT NULL,
    "ticket_price_id" INTEGER NOT NULL,
    "ticket_duration" INTEGER NOT NULL,
    "forward_geo_path" TEXT NOT NULL,
    "backward_geo_path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_stops" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "route_stops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "routes_transport_type_id_key" ON "routes"("transport_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "routes_ticket_price_id_key" ON "routes"("ticket_price_id");

-- CreateIndex
CREATE UNIQUE INDEX "routes_number_transport_type_id_key" ON "routes"("number", "transport_type_id");

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_transport_type_id_fkey" FOREIGN KEY ("transport_type_id") REFERENCES "glossaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_ticket_price_id_fkey" FOREIGN KEY ("ticket_price_id") REFERENCES "glossaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
