import { UserType } from "@prisma/client";
import { UserType as UserTypeEnum } from "../interfaces/userType.enum.js";
export const responses = {
  UNKNOWN: "Encountered Unknown error",
  EMAIL_VERIFICATION_SUCCESS: "Email verified successfully",
  USER_UPDATED: "User data updated",
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

export const userAlreadyVerified = (email: string, userType: UserTypeEnum) => {
  return `User is already verified with type ${userType} and email ${email}`;
};

export const emailConfirmation = (email: string) => {
  return `Verification email sent to ${email}`;
};
