/*
  Warnings:

  - Added the required column `merchantid` to the `parkinglot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parkinglot" ADD COLUMN     "merchantid" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "merchant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "merchant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "parkinglot" ADD CONSTRAINT "parkinglot_merchantid_fkey" FOREIGN KEY ("merchantid") REFERENCES "merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
