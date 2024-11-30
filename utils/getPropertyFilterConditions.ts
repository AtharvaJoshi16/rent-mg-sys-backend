import { Prisma } from "@prisma/client";
import { PropertiesGetSchema } from "../schemas/property/propertiesGetSchema.js";

export const getPropertiesFilterConditions = (
  queries: PropertiesGetSchema
): Prisma.PropertyWhereInput => {
  const {
    id,
    ownerId,
    isVerified,
    state,
    status,
    name,
    addressLine,
    city,
    type,
    pincode,
  } = queries;

  return {
    id,
    ownerId,
    isVerified,
    status,
    type,
    name: { contains: name },
    address: {
      state: { contains: state },
      addressLine: { contains: addressLine },
      city: { contains: city },
      pincode,
    },
  };
};
