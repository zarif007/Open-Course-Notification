-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('Commented', 'Enrolled');

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "type" "CategoryType" NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "initiator" JSONB[],
    "reciever" JSONB[],
    "link" TEXT NOT NULL,
    "text" TEXT,
    "isRead" BOOLEAN NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
