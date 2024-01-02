/*
  Warnings:

  - Changed the type of `initiator` on the `notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "notification" DROP COLUMN "initiator",
ADD COLUMN     "initiator" JSONB NOT NULL,
ALTER COLUMN "isRead" SET DEFAULT false,
ALTER COLUMN "receiver" SET NOT NULL,
ALTER COLUMN "receiver" SET DATA TYPE TEXT;
