-- CreateEnum
CREATE TYPE "Preference" AS ENUM ('family', 'bachelors', 'any');

-- CreateEnum
CREATE TYPE "RentType" AS ENUM ('total', 'perPerson');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('apartment', 'house', 'rooms');

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('available', 'rentedOut', 'underMaintenance', 'notRentingAnymore', 'pendingApproval');

-- CreateEnum
CREATE TYPE "PreferredContactMethod" AS ENUM ('email', 'phone', 'any');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('superuser', 'owner', 'renter');

-- CreateTable
CREATE TABLE "Owner" (
    "id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" "UserType" NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "isVerified" BOOLEAN DEFAULT false,
    "phone1" TEXT NOT NULL,
    "phone2" TEXT,
    "aadharId" TEXT NOT NULL,
    "panId" TEXT NOT NULL,
    "aadhar" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "drivingLicenseId" TEXT,
    "drivingLicense" TEXT,
    "voterId" TEXT,
    "voter" TEXT,
    "profileImage" TEXT,
    "description" TEXT,
    "preferredContactMethod" "PreferredContactMethod",
    "preferredLanguage" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "isVerified" BOOLEAN DEFAULT false,
    "status" "PropertyStatus" NOT NULL DEFAULT 'pendingApproval',
    "nextAvailableDate" TIMESTAMP(3),
    "name" TEXT,
    "type" "PropertyType" NOT NULL,
    "rent" INTEGER,
    "description" TEXT NOT NULL,
    "preferred" "Preference" NOT NULL,
    "photos" TEXT[],
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomDetails" (
    "id" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "rentType" "RentType" NOT NULL,
    "rent" INTEGER,
    "perPersonRent" INTEGER,

    CONSTRAINT "RoomDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Renter" (
    "id" INTEGER NOT NULL,
    "renterPropertyId" INTEGER,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone1" TEXT NOT NULL,
    "phone2" TEXT,
    "DOB" TIMESTAMP(3) NOT NULL,
    "userType" "UserType" NOT NULL,
    "aadharId" TEXT NOT NULL,
    "panId" TEXT NOT NULL,
    "aadhar" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "drivingLicenseId" TEXT,
    "drivingLicense" TEXT,
    "voterId" TEXT,
    "voter" TEXT,
    "profileImage" TEXT NOT NULL,
    "desription" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Renter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "ownerId" INTEGER,
    "propertyId" INTEGER,
    "renterId" INTEGER,
    "addressLine" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,
    "electricityBill" TEXT,
    "propertyTaxBill" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyDetails" (
    "id" TEXT NOT NULL,
    "ownerId" INTEGER,
    "renterId" INTEGER,
    "phone1" TEXT NOT NULL,
    "phone2" TEXT,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EmergencyDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_phone1_key" ON "Owner"("phone1");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_phone2_key" ON "Owner"("phone2");

-- CreateIndex
CREATE UNIQUE INDEX "RoomDetails_propertyId_key" ON "RoomDetails"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_phone1_key" ON "Renter"("phone1");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_phone2_key" ON "Renter"("phone2");

-- CreateIndex
CREATE UNIQUE INDEX "Address_ownerId_key" ON "Address"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_propertyId_key" ON "Address"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_renterId_key" ON "Address"("renterId");

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyDetails_ownerId_key" ON "EmergencyDetails"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyDetails_renterId_key" ON "EmergencyDetails"("renterId");

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyDetails_phone1_key" ON "EmergencyDetails"("phone1");

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyDetails_email_key" ON "EmergencyDetails"("email");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomDetails" ADD CONSTRAINT "RoomDetails_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renter" ADD CONSTRAINT "Renter_renterPropertyId_fkey" FOREIGN KEY ("renterPropertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyDetails" ADD CONSTRAINT "EmergencyDetails_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyDetails" ADD CONSTRAINT "EmergencyDetails_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
