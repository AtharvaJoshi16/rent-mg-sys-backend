import { IOwner, IUser } from "../interfaces/owner.js";
import { UpdateOwnerSchema } from "../schemas/owner/ownerUpdateSchema.js";

export const serializeOwnerUpdateData = (data: UpdateOwnerSchema) => {
  const formattedData = { ...data };
  const {
    id,
    email,
    firstName,
    middleName,
    lastName,
    phone1,
    phone2,
    profileImage,
    aadharId,
    aadhar,
    voter,
    voterId,
    drivingLicense,
    drivingLicenseId,
    description,
    pan,
    panId,
    address,
    emergencyDetails,
    preferredContactMethod,
    preferredLanguage,
  } = formattedData;

  return {
    user: {
      id,
      email,
      firstName,
      middleName,
      lastName,
      phone1,
      phone2,
      profileImage,
    } as IUser,
    owner: {
      aadharId,
      aadhar,
      voter,
      voterId,
      drivingLicense,
      drivingLicenseId,
      description,
      pan,
      panId,
      address,
      emergencyDetails,
      preferredContactMethod,
      preferredLanguage,
    } as IOwner,
  };
};
