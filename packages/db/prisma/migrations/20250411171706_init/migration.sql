/*
  Warnings:

  - You are about to drop the column `adress` on the `parkings` table. All the data in the column will be lost.
  - You are about to drop the column `faire` on the `parkings` table. All the data in the column will be lost.
  - You are about to drop the `slot` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `totalslots` to the `parkinglot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vacantslots` to the `parkinglot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `parkings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pre_booked', 'Completed', 'Cancelled', 'Parked');

-- DropForeignKey
ALTER TABLE "slot" DROP CONSTRAINT "slot_parkinglotId_fkey";

-- AlterTable
ALTER TABLE "parkinglot" ADD COLUMN     "isempty" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "occupiedslots" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalslots" INTEGER NOT NULL,
ADD COLUMN     "vacantslots" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "parkings" DROP COLUMN "adress",
DROP COLUMN "faire",
ADD COLUMN     "status" "Status" NOT NULL,
ALTER COLUMN "endtime" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "totaltime" SET DEFAULT '0 hour 0 min';

-- DropTable
DROP TABLE "slot";
