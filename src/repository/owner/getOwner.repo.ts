import { prismaErrorHandler } from "../../../handlers/prismaErrorHandler.js";
import {
  IOwnerGet,
  OwnerGetResponse,
  PrismaOwnerData,
} from "../../../interfaces/owner.js";
import { db } from "../../../utils/prismaClient.js";

export const getOwner = async (ownerId: number): Promise<IOwnerGet> => {
  try {
    const owner = await db.owner.findFirst({
      where: {
        id: ownerId,
      },
    });
    return {
      status: 200,
      owner: owner as PrismaOwnerData,
    } as OwnerGetResponse;
  } catch (e) {
    console.info(e);
    return prismaErrorHandler(e as Error);
  }
};
