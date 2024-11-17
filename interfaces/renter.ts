import { Address, EmergencyDetails, Renter } from "@prisma/client";

export interface PrismaRenterData extends Renter {
  address?: Address;
  emergencyDetails?: EmergencyDetails;
}
