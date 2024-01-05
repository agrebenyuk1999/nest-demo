-- CreateTable
CREATE TABLE "citizens" (
    "id" SERIAL NOT NULL,
    "xo_id" INTEGER,
    "email" VARCHAR(100) NOT NULL,
    "questionnaire_id" INTEGER NOT NULL,
    "card_type" VARCHAR(30) NOT NULL,
    "card_type_code" VARCHAR(30) NOT NULL,
    "institution_name" VARCHAR(200),
    "benefit_code" VARCHAR(10),
    "benefit_name" VARCHAR(200),
    "work_place" VARCHAR(150),
    "position_name" VARCHAR(100),
    "parent_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "citizens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "citizens_xo_id_key" ON "citizens"("xo_id");

-- CreateIndex
CREATE UNIQUE INDEX "citizens_questionnaire_id_key" ON "citizens"("questionnaire_id");

-- CreateIndex
CREATE INDEX "citizens_xo_id_idx" ON "citizens"("xo_id");

-- CreateIndex
CREATE INDEX "citizens_questionnaire_id_idx" ON "citizens"("questionnaire_id");

-- CreateIndex
CREATE INDEX "citizens_parent_id_idx" ON "citizens"("parent_id");

-- AddForeignKey
ALTER TABLE "citizens" ADD CONSTRAINT "citizens_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "citizens"("id") ON DELETE SET NULL ON UPDATE CASCADE;
