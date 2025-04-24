/*
  Warnings:

  - Added the required column `carnumber` to the `parkings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parkings" ADD COLUMN     "carnumber" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "nonBooking_parking" (
    "id" SERIAL NOT NULL,
    "startime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endtime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totaltime" TEXT NOT NULL DEFAULT '0 Hours 0 minutes',
    "parkinglslotid" INTEGER NOT NULL,
    "carnumber" TEXT NOT NULL,

    CONSTRAINT "nonBooking_parking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nonBooking_parking" ADD CONSTRAINT "nonBooking_parking_parkinglslotid_fkey" FOREIGN KEY ("parkinglslotid") REFERENCES "parkinglot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
