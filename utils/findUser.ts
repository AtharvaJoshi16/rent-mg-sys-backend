import { prismaErrorHandler } from "../handlers/prismaErrorHandler.js";
import { PrismaOwnerData } from "../interfaces/owner.js";
import { PrismaRenterData } from "../interfaces/renter.js";
import { CustomCreateResponse } from "../interfaces/responses.js";
import { UserType } from "../interfaces/userType.enum.js";
import { db } from "./prismaClient.js";

export const findUser = async (
  email: string,
  userType: UserType
): Promise<
  PrismaOwnerData | PrismaRenterData | CustomCreateResponse | null
> => {
  try {
    const user =
      userType === UserType.OWNER
        ? await db.owner.findFirst({
            where: {
              email: email,
            },
          })
        : await db.renter.findFirst({
            where: {
              email: email,
            },
          });
    const address = await db.address.findFirst({
      where: {
        ...(userType === UserType.OWNER && {
          ownerId: user?.id,
        }),
        ...(userType === UserType.RENTER && {
          renterId: user?.id,
        }),
      },
    });
    return user;
  } catch (e) {
    return prismaErrorHandler(e as Error);
  }
};
