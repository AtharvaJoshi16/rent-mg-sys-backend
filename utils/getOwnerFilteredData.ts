import { Address, EmergencyDetails, Owner } from "@prisma/client";
import { PrismaOwnerData } from "../interfaces/owner.js";

export const getOwnerFilteredData = (
  owner: Partial<Owner>,
  address: Partial<Address>,
  emergencyDetails: Partial<EmergencyDetails>
): PrismaOwnerData => {
  const ownerCopy = { ...owner };
  const addressCopy = { ...address };
  const emergencyDetailsCopy = { ...emergencyDetails };
  delete emergencyDetailsCopy?.id;
  delete ownerCopy?.password;
  delete addressCopy?.id;
  delete addressCopy?.renterId;
  delete addressCopy?.propertyId;
  delete emergencyDetailsCopy?.renterId;

  return {
    ...(ownerCopy as Owner),
    address: addressCopy as Address,
    emergencyDetails: emergencyDetailsCopy as EmergencyDetails,
  };
};
