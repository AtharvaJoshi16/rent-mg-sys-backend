/*
  Warnings:

  - You are about to drop the column `propertyId` on the `Property` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[propertyTaxId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `propertyTaxId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Property_propertyId_key";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "propertyId",
ADD COLUMN     "propertyTaxId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Property_propertyTaxId_key" ON "Property"("propertyTaxId");
