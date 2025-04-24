/*
  Warnings:

  - You are about to drop the `Merchant` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('BOOKING_SUCCESS', 'SLOT_OCCUPIED', 'PAYMENT_FAILED', 'GENERAL');

-- DropTable
DROP TABLE "Merchant";

-- DropEnum
DROP TYPE "AuthType";

-- CreateTable
CREATE TABLE "cardetails" (
    "id" SERIAL NOT NULL,
    "Carnumber" TEXT NOT NULL,
    "ownerid" INTEGER NOT NULL,
    "iselectric" BOOLEAN NOT NULL,
    "isparked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "cardetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parkings" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "starttime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endtime" TIMESTAMP(3) NOT NULL,
    "faire" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "totaltime" TEXT NOT NULL,
    "parkingslotid" INTEGER NOT NULL,

    CONSTRAINT "parkings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "From" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userid" INTEGER NOT NULL,
    "readen" BOOLEAN NOT NULL DEFAULT false,
    "Notfifcationtype" "NotificationType" NOT NULL DEFAULT 'GENERAL',

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parkinglot" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "Adress" TEXT NOT NULL,

    CONSTRAINT "parkinglot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slot" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "isoccupied" BOOLEAN NOT NULL DEFAULT false,
    "parkinglotId" INTEGER NOT NULL,

    CONSTRAINT "slot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cardetails_Carnumber_key" ON "cardetails"("Carnumber");

-- CreateIndex
CREATE UNIQUE INDEX "parkinglot_Name_key" ON "parkinglot"("Name");

-- AddForeignKey
ALTER TABLE "cardetails" ADD CONSTRAINT "cardetails_ownerid_fkey" FOREIGN KEY ("ownerid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parkings" ADD CONSTRAINT "parkings_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parkings" ADD CONSTRAINT "parkings_parkingslotid_fkey" FOREIGN KEY ("parkingslotid") REFERENCES "parkinglot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slot" ADD CONSTRAINT "slot_parkinglotId_fkey" FOREIGN KEY ("parkinglotId") REFERENCES "parkinglot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
