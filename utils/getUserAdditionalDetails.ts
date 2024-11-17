import { db } from "./prismaClient.js";

export const getUserAddress = async (ownerId?: number, renterId?: number) => {
  const address = await db.address.findFirst({
    where: {
      ...(ownerId && { ownerId }),
      ...(renterId && { renterId }),
    },
  });
  return address;
};

export const getUserEmergencyDetails = async (
  ownerId?: number,
  renterId?: number
) => {
  const emergencyDetails = await db.emergencyDetails.findFirst({
    where: {
      ...(ownerId && { ownerId }),
      ...(renterId && { renterId }),
    },
  });
  return emergencyDetails;
};
