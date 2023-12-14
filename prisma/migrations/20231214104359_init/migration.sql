/*
  Warnings:

  - You are about to drop the column `reciever` on the `notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notification" DROP COLUMN "reciever",
ADD COLUMN     "receiver" TEXT[];
