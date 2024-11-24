import { Prisma } from "@prisma/client";
import { OwnersGetSchema } from "../schemas/owner/ownersGetSchema.js";

export const getOwnersFilterConditions = (
  queries: OwnersGetSchema
): Prisma.UserWhereInput => {
  const {
    id,
    email,
    firstName,
    aadharId,
    addressLine,
    city,
    drivingLicenseId,
    edEmail,
    edFirstName,
    edLastName,
    edMiddleName,
    edPhone1,
    edPhone2,
    edRelation,
    isEmailVerified,
    isVerified,
    lastName,
    middleName,
    panId,
    phone1,
    phone2,
    pincode,
    preferredContactMethod,
    preferredLanguage,
    voterId,
    state,
  } = queries;
  return {
    id,
    email: { contains: email },
    firstName: { contains: firstName },
    middleName: { contains: middleName },
    lastName: { contains: lastName },
    owner: {
      isVerified,
      aadharId,
      drivingLicenseId,
      voterId,
      panId,
      preferredContactMethod,
      preferredLanguage,
      address: {
        city: { contains: city },
        pincode,
        addressLine: { contains: addressLine },
        state: { contains: state },
      },
      emergencyDetails: {
        email: { contains: edEmail },
        phone1: { contains: edPhone1 },
        phone2: { contains: edPhone2 },
        firstName: { contains: edFirstName },
        middleName: { contains: edMiddleName },
        lastName: { contains: edLastName },
        relation: { contains: edRelation },
      },
    },
    isEmailVerified,
    phone1: { contains: phone1 },
    phone2: { contains: phone2 },
  };
};
