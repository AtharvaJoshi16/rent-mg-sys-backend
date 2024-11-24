import { User, UserType } from "@prisma/client";
import bcrypt from "bcrypt";
import { IOwner } from "../interfaces/owner.js";
import { CreateOwnerSchema } from "../schemas/owner/ownerCreateSchema.js";
import { generateId } from "./generateId.js";

export const serializeOwnerCreateData = (data: CreateOwnerSchema) => {
  const formattedData = { ...data };
  const {
    email,
    password,
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
  const userId = generateId();
  const user: Partial<User> = {
    id: userId,
    isEmailVerified: false,
    userType: UserType.owner,
    email,
    password: bcrypt.hashSync(password, 10),
    firstName,
    ...(middleName && { middleName }),
    lastName,
    phone1,
    ...(phone2 && { phone2 }),
    ...(profileImage && { profileImage }),
  };

  const owner: Partial<IOwner> = {
    ownerId: userId,
    isVerified: false,
    aadharId,
    aadhar,
    pan,
    panId,
    voter,
    voterId,
    drivingLicense,
    drivingLicenseId,
    description,
    preferredContactMethod,
    preferredLanguage,
    address,
    emergencyDetails,
  };

  return {
    user: user as User,
    owner: owner as IOwner,
  };
};
