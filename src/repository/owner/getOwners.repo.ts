import { prismaErrorHandler } from "../../../handlers/prismaErrorHandler.js";
import { IOwnersGet, IUser } from "../../../interfaces/owner.js";
import { OwnersGetSchema } from "../../../schemas/owner/ownersGetSchema.js";
import { getOwnersFilterConditions } from "../../../utils/getOwnersFilterConditions.js";
import { db } from "../../../utils/prismaClient.js";

export const getOwners = async (
  queries: OwnersGetSchema
): Promise<IOwnersGet> => {
  const whereConditions = getOwnersFilterConditions(queries);
  try {
    const owners = await db.user.findMany({
      where: whereConditions,
      include: {
        owner: {
          include: {
            properties: true,
          },
        },
      },
    });
    return {
      status: 200,
      ownersCount: owners.length,
      owners: owners as IUser[],
    };
  } catch (e) {
    return prismaErrorHandler(e as Error);
  }
};
