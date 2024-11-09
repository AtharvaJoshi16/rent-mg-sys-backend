-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "isEmailVerified" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Renter" ADD COLUMN     "isEmailVerified" BOOLEAN DEFAULT false;
