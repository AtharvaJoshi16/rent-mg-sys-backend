import { UserType } from "@prisma/client";
import { UserType as UserTypeEnum } from "../interfaces/userType.enum.js";
export const responses = {
  UNKNOWN: "Encountered Unknown error",
  EMAIL_VERIFICATION_SUCCESS: "Email verified successfully",
  USER_UPDATED: "User data updated",
  property: {
    alreadyExistsMessage: (consumerNo: number, taxId: string) =>
      `Property already exists with consumer No: ${consumerNo}, propertyTaxId: ${taxId}`,
    activeUserCannotActionMsg: (active: number, ownerId: number) =>
      `Active owner ${active} cannot action ownerID: ${ownerId}`,
    propertyCreated: (ownerId: number) =>
      `Property created for ownerID: ${ownerId}`,
  },
};

export const creationSuccessMessage = (data: {
  email: string;
  userType: UserType;
}) => {
  return `User created with type ${data.userType}. Email verification link sent to ${data.email}`;
};

export const updateSuccessMessage = (data: {
  email: string;
  userType: UserType;
}) => {
  return `User updated. Verification link sent to ${data.email} updated email`;
};

export const missingParamMessage = (param: string[]) => {
  return `Missing required query params: ${param}`;
};

export const noUserFoundWithEmailAndTypeMessage = (
  email: string,
  userType: UserTypeEnum
) => {
  return `No user with type ${userType} exists with email ${email}`;
};

export const noOwnerFoundWithId = (ownerId: number) =>
  `Owner not found with ID: ${ownerId}`;

export const ownerDeleteMessage = (ownerId: number) =>
  `Owner deleted with ID: ${ownerId}`;

export const hasActivePropertiesMessage = (ownerId: number) =>
  `Active properties exist for ownerID: ${ownerId}`;

export const activeUserCannotActionMsg = (
  ownerId: number,
  action: "delete" | "update"
) => `Active user cannot ${action} owner ${ownerId}`;

export const userAlreadyVerified = (email: string, userType: UserTypeEnum) => {
  return `User is already verified with type ${userType} and email ${email}`;
};

export const userAlreadyExists = (email: string, userType: UserTypeEnum) => {
  return `User already exists with type ${userType} and email ${email}`;
};

export const emailConfirmation = (email: string) => {
  return `Verification email sent to ${email}`;
};
export const alreadyInUse = (field: string) => {
  return `${field} is already in use`;
};
