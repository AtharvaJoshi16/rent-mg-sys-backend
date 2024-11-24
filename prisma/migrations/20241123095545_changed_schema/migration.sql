/*
  Warnings:

  - The primary key for the `Owner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `isEmailVerified` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `phone1` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `phone2` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `userType` on the `Owner` table. All the data in the column will be lost.
  - The primary key for the `Property` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Renter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `DOB` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `desription` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `isEmailVerified` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `phone1` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `phone2` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `renterPropertyId` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `userType` on the `Renter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[aadharId]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[panId]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[aadhar]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pan]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[drivingLicenseId]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[drivingLicense]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[voterId]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[voter]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[renterId]` on the table `Renter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[aadharId]` on the table `Renter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[panId]` on the table `Renter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[aadhar]` on the table `Renter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pan]` on the table `Renter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[drivingLicenseId]` on the table `Renter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[drivingLicense]` on the table `Renter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[voterId]` on the table `Renter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[voter]` on the table `Renter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renterId` to the `Renter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_renterId_fkey";

-- DropForeignKey
ALTER TABLE "EmergencyDetails" DROP CONSTRAINT "EmergencyDetails_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "EmergencyDetails" DROP CONSTRAINT "EmergencyDetails_renterId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Renter" DROP CONSTRAINT "Renter_renterPropertyId_fkey";

-- DropForeignKey
ALTER TABLE "RoomDetails" DROP CONSTRAINT "RoomDetails_propertyId_fkey";

-- DropIndex
DROP INDEX "Owner_email_key";

-- DropIndex
DROP INDEX "Owner_phone1_key";

-- DropIndex
DROP INDEX "Owner_phone2_key";

-- DropIndex
DROP INDEX "Renter_email_key";

-- DropIndex
DROP INDEX "Renter_phone1_key";

-- DropIndex
DROP INDEX "Renter_phone2_key";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "propertyId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Owner" DROP CONSTRAINT "Owner_pkey",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "isEmailVerified",
DROP COLUMN "lastName",
DROP COLUMN "middleName",
DROP COLUMN "password",
DROP COLUMN "phone1",
DROP COLUMN "phone2",
DROP COLUMN "userType",
ADD COLUMN     "ownerId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Owner_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Property" DROP CONSTRAINT "Property_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Property_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Renter" DROP CONSTRAINT "Renter_pkey",
DROP COLUMN "DOB",
DROP COLUMN "desription",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "isEmailVerified",
DROP COLUMN "lastName",
DROP COLUMN "middleName",
DROP COLUMN "password",
DROP COLUMN "phone1",
DROP COLUMN "phone2",
DROP COLUMN "profileImage",
DROP COLUMN "renterPropertyId",
DROP COLUMN "userType",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "rentedPropertyId" TEXT,
ADD COLUMN     "renterId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Renter_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RoomDetails" ALTER COLUMN "propertyId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" "UserType" NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "isEmailVerified" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "phone1" TEXT NOT NULL,
    "phone2" TEXT,
    "profileImage" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone1_key" ON "User"("phone1");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone2_key" ON "User"("phone2");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_ownerId_key" ON "Owner"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_aadharId_key" ON "Owner"("aadharId");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_panId_key" ON "Owner"("panId");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_aadhar_key" ON "Owner"("aadhar");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_pan_key" ON "Owner"("pan");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_drivingLicenseId_key" ON "Owner"("drivingLicenseId");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_drivingLicense_key" ON "Owner"("drivingLicense");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_voterId_key" ON "Owner"("voterId");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_voter_key" ON "Owner"("voter");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_renterId_key" ON "Renter"("renterId");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_aadharId_key" ON "Renter"("aadharId");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_panId_key" ON "Renter"("panId");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_aadhar_key" ON "Renter"("aadhar");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_pan_key" ON "Renter"("pan");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_drivingLicenseId_key" ON "Renter"("drivingLicenseId");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_drivingLicense_key" ON "Renter"("drivingLicense");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_voterId_key" ON "Renter"("voterId");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_voter_key" ON "Renter"("voter");

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("ownerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomDetails" ADD CONSTRAINT "RoomDetails_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renter" ADD CONSTRAINT "Renter_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renter" ADD CONSTRAINT "Renter_rentedPropertyId_fkey" FOREIGN KEY ("rentedPropertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("ownerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("renterId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyDetails" ADD CONSTRAINT "EmergencyDetails_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("ownerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyDetails" ADD CONSTRAINT "EmergencyDetails_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("renterId") ON DELETE SET NULL ON UPDATE CASCADE;
