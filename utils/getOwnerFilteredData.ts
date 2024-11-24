import { IUser } from "../interfaces/owner.js";

export const getOwnerFilteredData = (user: Partial<IUser>) => {
  const userCopy: Partial<IUser> = { ...user };
  delete userCopy?.owner?.emergencyDetails?.id;
  delete userCopy?.password;
  delete userCopy?.owner?.address?.id;
  delete userCopy?.owner?.address?.renterId;
  delete userCopy?.owner?.address?.propertyId;
  delete userCopy?.owner?.emergencyDetails?.renterId;

  return {
    ...(userCopy as IUser),
  };
};
