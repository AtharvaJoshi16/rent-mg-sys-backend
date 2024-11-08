import { Address, EmergencyDetails, Owner } from "@prisma/client";

export interface PrismaOwnerData extends Owner {
  address?: Address;
  emergencyDetails?: EmergencyDetails;
}
