/*
  Warnings:

  - You are about to drop the column `initiator` on the `notification` table. All the data in the column will be lost.
  - Added the required column `initiatorId` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notification" DROP COLUMN "initiator",
ADD COLUMN     "initiatorId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Initiator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Initiator_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "Initiator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
