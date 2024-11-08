import { UserType } from "@prisma/client";

export const responses = {
  UNKNOWN: "Unknown error",
};

export const creationSuccessMessage = (data: {
  email: string;
  userType: UserType;
}) => {
  return `User created with type ${data.userType}. Email verification link sent to ${data.email}`;
};
