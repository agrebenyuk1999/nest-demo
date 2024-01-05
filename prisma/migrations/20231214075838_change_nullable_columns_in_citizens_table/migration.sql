-- AlterTable
ALTER TABLE "citizens" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "questionnaire_id" DROP NOT NULL,
ALTER COLUMN "card_type" DROP NOT NULL,
ALTER COLUMN "card_type_code" DROP NOT NULL;
