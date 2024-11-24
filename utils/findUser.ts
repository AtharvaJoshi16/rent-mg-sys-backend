import { UserType } from "@prisma/client";
import { prismaErrorHandler } from "../handlers/prismaErrorHandler.js";
import { db } from "./prismaClient.js";

export const findUser = async (
  email: string,
  userType: UserType
): Promise<any> => {
  try {
    const user = await db.user.findFirst({
      where: {
        email,
        userType,
      },
      include: {
        owner: userType === UserType.owner,
        renter: userType === UserType.renter,
      },
    });
    return user;
  } catch (e) {
    return prismaErrorHandler(e as Error);
  }
};
