import { prismaErrorHandler } from "../../../handlers/prismaErrorHandler.js";
import {
  IOwnerGet,
  IUser,
  OwnerGetResponse,
} from "../../../interfaces/owner.js";
import { db } from "../../../utils/prismaClient.js";

export const getOwner = async (ownerId: number): Promise<IOwnerGet> => {
  try {
    const owner: IUser = (await db.user.findFirst({
      where: {
        id: ownerId,
      },
      include: {
        owner: true,
      },
    })) as IUser;
    return {
      status: 200,
      owner: owner,
    } as OwnerGetResponse;
  } catch (e) {
    console.info(e);
    return prismaErrorHandler(e as Error);
  }
};
