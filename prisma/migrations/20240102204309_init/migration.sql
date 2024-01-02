/*
  Warnings:

  - You are about to drop the column `initiatorId` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the `Initiator` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `initiator` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_initiatorId_fkey";

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "initiatorId",
ADD COLUMN     "initiator" JSONB NOT NULL;

-- DropTable
DROP TABLE "Initiator";
