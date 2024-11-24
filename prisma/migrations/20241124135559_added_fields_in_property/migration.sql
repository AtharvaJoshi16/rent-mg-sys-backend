/*
  Warnings:

  - A unique constraint covering the columns `[electricityBillConsumerNo]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[propertyId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `electricityBillConsumerNo` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "electricityBillConsumerNo" INTEGER NOT NULL,
ADD COLUMN     "propertyId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Property_electricityBillConsumerNo_key" ON "Property"("electricityBillConsumerNo");

-- CreateIndex
CREATE UNIQUE INDEX "Property_propertyId_key" ON "Property"("propertyId");
