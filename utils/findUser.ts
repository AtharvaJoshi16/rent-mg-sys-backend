import { Owner, Renter } from "@prisma/client";
import { prismaErrorHandler } from "../handlers/prismaErrorHandler.js";
import { CustomCreateResponse } from "../interfaces/responses.js";
import { UserType } from "../interfaces/userType.enum.js";
import { db } from "./prismaClient.js";

export const findUser = async (
  email: string,
  userType: UserType
): Promise<Owner | Renter | CustomCreateResponse | null> => {
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

    return user;
  } catch (e) {
    return prismaErrorHandler(e as Error);
  }
};
