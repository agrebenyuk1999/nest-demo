-- CreateTable
CREATE TABLE "external_agents" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "api_token" VARCHAR(32) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "external_agents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "external_agents_name_key" ON "external_agents"("name");

-- CreateIndex
CREATE UNIQUE INDEX "external_agents_api_token_key" ON "external_agents"("api_token");

-- CreateIndex
CREATE INDEX "external_agents_name_idx" ON "external_agents"("name");
